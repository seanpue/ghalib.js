{- Notes: whitespace consolidation is not just returning the default but the first whitespace char

-}


module GraphTransliterator exposing
    ( GraphTransliterator
    , transliterate
    , GraphTransliteratorConfig, graphTransliterator, EasyReadingSettings, fromEasyReadingYaml
    , fromEasyReadingJson, fromEasyReadingSettings, never
    )

{-| Load and use a graph-based transliterator.


# Definition

@docs GraphTransliterator


# Methods

@docs transliterate


# Initializing

@docs GraphTransliteratorConfig, graphTransliterator, EasyReadingSettings, fromEasyReadingYaml

-}

import Array exposing (..)
import Dict exposing (Dict)
import Graphs exposing (DirectedGraph, Edge, EdgeDataType(..), EdgeId, Node, NodeDataType(..), NodeId, NodeLabel, NodeType(..), addEdge, addNode, childrenOfType, getEdge, getNode, initGraph, updateEdgeData)
import Json.Decode as JSON
import Regex exposing (Regex)
import Rules exposing (OnMatchRule, OnMatchRuleIds, OnMatchRules, Production, Token, TokenClass, TokenClasses, Tokens, TransliterationRule, TransliterationRules, WhitespaceRule, costOf)
import Set exposing (Set)
import Yaml.Decode exposing (Decoder, Error, field, list)


type alias Metadata =
    Dict String String


type alias EasyReadingSettings =
    { tokens : Dict Token TokenClasses
    , rules : Dict String String
    , onmatch_rules : Maybe (List (Dict String String))
    , whitespace : WhitespaceRule
    , metadata : Maybe Metadata
    }


{-| Configuration settings for a `GraphTransliterator`.
-}
type alias GraphTransliteratorConfig =
    { tokens : Dict Token TokenClasses
    , rules : TransliterationRules
    , whitespaceRule : WhitespaceRule
    , onMatchRules : Maybe OnMatchRules
    , metadata : Maybe Metadata
    }


{-| Graph transliterator type
-}
type GraphTransliterator
    = GraphTransliterator
        { tokens : Dict Token TokenClasses
        , rules : TransliterationRules
        , whiteSpace : WhitespaceRule
        , onMatchRules : Maybe OnMatchRules
        , metadata : Maybe Metadata

        -- , ignoreErrors : Bool
        , onMatchRulesLookup : Maybe OnMatchRulesLookup
        , tokensByClass : TokensByClass
        , tokenizerPattern : Regex
        , graph : GTGraph

        --, graphTransliteratorVersion : Maybe String
        }


type alias OnMatchRulesLookup =
    Dict Token (Dict Token OnMatchRuleIds)


type alias TokensByClass =
    Dict TokenClass (Set Token)


type GTNodeType
    = Start
    | Token
    | Rule


type GTNodeDataType
    = NoNodeData
    | TokenData { token : String }
    | RuleData { ruleId : Int }


type GTEdgeDataType
    = EdgeData { cost : Float }


type alias GTNode =
    Node GTNodeType GTNodeDataType


type alias GTEdge =
    Edge GTEdgeDataType


type alias GTGraph =
    DirectedGraph GTNodeType GTNodeDataType GTEdgeDataType


type alias RuleId =
    Int


type MatchAtResult
    = None
    | RuleIdx Int -- | RuleIdxList (List Int)


yamlWhitespaceRuleDecoder : Decoder WhitespaceRule
yamlWhitespaceRuleDecoder =
    Yaml.Decode.map3 WhitespaceRule
        (field "consolidate" Yaml.Decode.bool)
        (field "default" Yaml.Decode.string)
        (field "token_class" Yaml.Decode.string)


jsonWhitespaceRuleDecoder : JSON.Decoder WhitespaceRule
jsonWhitespaceRuleDecoder =
    JSON.map3 WhitespaceRule
        (JSON.field "consolidate" JSON.bool)
        (JSON.field "default" JSON.string)
        (JSON.field "token_class" JSON.string)



{- Decodes a Yaml array as an Array of type x, using specified subDecoder -}
{- (this is necessary because Yaml.Decode does not have an array function ) -}


arrayDecoder : Decoder x -> Decoder (Array x)
arrayDecoder subDecoder =
    let
        listDecoder : Decoder (List x)
        listDecoder =
            Yaml.Decode.list subDecoder
    in
    Yaml.Decode.map Array.fromList listDecoder


tokensDecoder : Decoder (Dict Token TokenClasses)
tokensDecoder =
    Yaml.Decode.dict (arrayDecoder Yaml.Decode.string)


tokensDecoderJSON : JSON.Decoder (Dict Token TokenClasses)
tokensDecoderJSON =
    JSON.dict (JSON.array JSON.string)


easyReadingSettingsDecoder : Decoder EasyReadingSettings
easyReadingSettingsDecoder =
    Yaml.Decode.map5 EasyReadingSettings
        (field "tokens" tokensDecoder)
        (field "rules" (Yaml.Decode.dict Yaml.Decode.string))
        (Yaml.Decode.maybe (field "onmatch_rules" (Yaml.Decode.list (Yaml.Decode.dict Yaml.Decode.string))))
        (field "whitespace" yamlWhitespaceRuleDecoder)
        (Yaml.Decode.maybe (field "metadata" (Yaml.Decode.dict Yaml.Decode.string)))


easyReadingSettingsDecoderJSON : JSON.Decoder EasyReadingSettings
easyReadingSettingsDecoderJSON =
    JSON.map5 EasyReadingSettings
        (JSON.field "tokens" tokensDecoderJSON)
        (JSON.field "rules" (JSON.dict JSON.string))
        (JSON.maybe (JSON.field "onmatch_rules" (JSON.list (JSON.dict JSON.string))))
        (JSON.field "whitespace" jsonWhitespaceRuleDecoder)
        (JSON.maybe (JSON.field "metadata" (JSON.dict JSON.string)))


easyReadingRuleRegex : Regex
easyReadingRuleRegex =
    Maybe.withDefault Regex.never (Regex.fromString "(?:\\(((?:\\s?<.+?>\\s+)+)?(.+?)\\s?\\) |((?:\\s?<.+?>\\s+)+)?)?((?:\\n|\\r|.)+?)(?:\\s+(?:\\((.+?)((?:\\s+<.+?>?)?)\\)$)|((?:\\s+<.+?>)+)|$)")


classesRegex : Regex.Regex
classesRegex =
    Maybe.withDefault Regex.never (Regex.fromString "<(.+?)>")


getClasses : String -> List String
getClasses z =
    List.filterMap (\x -> List.head (.submatches x)) (Regex.find classesRegex z) |> List.filterMap identity


getKeyMatches : String -> Maybe (List (Maybe String))
getKeyMatches key =
    Regex.find easyReadingRuleRegex key |> List.head |> Maybe.map .submatches


tokenClassRegex : Regex
tokenClassRegex =
    Maybe.withDefault Regex.never (Regex.fromString "<(.+?)>")


getPrevClasses : List (Maybe String) -> Maybe TokenClasses
getPrevClasses m =
    let
        matches =
            Array.fromList m

        -- (List.filterMap identity m)
        zeroMatch =
            Array.get 0 matches |> Maybe.andThen identity

        twoMatch =
            Array.get 2 matches |> Maybe.andThen identity

        validMatch : Maybe String
        validMatch =
            List.filterMap identity [ zeroMatch, twoMatch ] |> List.head
    in
    Maybe.map (Regex.find tokenClassRegex) validMatch
        |> Maybe.map (List.map (.submatches >> List.filterMap identity))
        |> Maybe.map (List.map List.head >> List.filterMap identity)
        |> Maybe.map Array.fromList


getPrevTokens : List (Maybe String) -> Maybe Tokens
getPrevTokens m =
    let
        matches =
            Array.fromList m

        oneMatch =
            Array.get 1 matches |> Maybe.andThen identity
    in
    oneMatch |> Maybe.map (String.split " ") |> Maybe.map Array.fromList


getTokens : List (Maybe String) -> Maybe Tokens
getTokens m =
    let
        matches =
            Array.fromList m

        fourMatch =
            Array.get 3 matches |> Maybe.andThen identity
    in
    if fourMatch == Just " " then
        Just (Array.fromList [ " " ])

    else
        fourMatch |> Maybe.map (String.split " ") |> Maybe.map Array.fromList


getNextTokens : List (Maybe String) -> Maybe Tokens
getNextTokens m =
    let
        matches =
            Array.fromList m

        fourMatch =
            Array.get 4 matches |> Maybe.andThen identity
    in
    fourMatch |> Maybe.map (String.split " ") |> Maybe.map Array.fromList


getNextClasses : List (Maybe String) -> Maybe TokenClasses
getNextClasses m =
    let
        matches =
            Array.fromList m

        fiveMatch =
            Array.get 5 matches |> Maybe.andThen identity

        -- |> Maybe.andThen identity
        sixMatch =
            Array.get 6 matches |> Maybe.andThen identity

        -- |> Maybe.andThen identity
        validMatch =
            List.filterMap identity [ fiveMatch, sixMatch ] |> List.head
    in
    -- validMatch |> Maybe.map (Regex.find tokenClassRegex) |> Maybe.map (List.map .match) |> Maybe.map Array.fromList
    Maybe.map (Regex.find tokenClassRegex) validMatch
        |> Maybe.map (List.map (.submatches >> List.filterMap identity))
        |> Maybe.map (List.map List.head >> List.filterMap identity)
        |> Maybe.map Array.fromList


processEasyReadingRule : String -> Production -> Maybe TransliterationRule
processEasyReadingRule key value =
    let
        keyMatches : Maybe (List (Maybe String))
        keyMatches =
            getKeyMatches key
    in
    keyMatches
        |> Maybe.map
            (\x ->
                { production = value
                , prevClasses = getPrevClasses x
                , prevTokens = getPrevTokens x
                , tokens = Maybe.withDefault Array.empty (getTokens x) -- should check this
                , nextTokens = getNextTokens x
                , nextClasses = getNextClasses x
                , cost = costOf (getPrevClasses x) (getPrevTokens x) (Maybe.withDefault Array.empty (getTokens x)) (getNextTokens x) (getNextClasses x)
                }
            )



----------- process onmatch_rules -----------


easyReadingOnMatchRuleRegex : Regex
easyReadingOnMatchRuleRegex =
    Maybe.withDefault Regex.never (Regex.fromString "^((?:<[^+< \\s]+>\\s*)+)\\+((?:\\s*<[^+<]+>)+)\\s*$")


processEasyReadingOnMatchRules : List (Dict String String) -> Maybe OnMatchRules
processEasyReadingOnMatchRules eromr =
    let
        onMatchRule : ( List String, List String, String ) -> OnMatchRule
        onMatchRule ( a, b, c ) =
            { prevClasses = Array.fromList a
            , nextClasses = Array.fromList b
            , production = c
            }
    in
    eromr
        |> List.map
            (Dict.toList
                >> List.map
                    (\( key, production ) ->
                        Regex.find easyReadingOnMatchRuleRegex key
                            |> List.head
                            |> Maybe.map .submatches
                            |> Maybe.map (List.filterMap (Maybe.map getClasses))
                            |> Maybe.map Array.fromList
                            |> Maybe.map (\a -> Tuple.pair (Array.get 0 a) (Array.get 1 a))
                            |> Maybe.map (\t -> Tuple.pair t production)
                    )
                >> List.head
            )
        |> List.filterMap identity
        |> List.filterMap identity
        |> List.map
            (\( ( a, b ), c ) ->
                case ( a, b ) of
                    ( Just x, Just y ) ->
                        Just ( x, y, c )

                    _ ->
                        Nothing
            )
        |> List.filterMap identity
        -- Remove any invalid entries, if there are any
        |> List.map (\( a, b, c ) -> onMatchRule ( a, b, c ))
        |> Just
        << Array.fromList


fromEasyReadingSettings : EasyReadingSettings -> GraphTransliteratorConfig
fromEasyReadingSettings settings =
    let
        getRules : List TransliterationRule
        getRules =
            List.filterMap identity <| List.map (\( a, b ) -> processEasyReadingRule a b) <| Dict.toList <| settings.rules
    in
    { tokens = settings.tokens
    , whitespaceRule = settings.whitespace
    , onMatchRules = settings.onmatch_rules |> Maybe.andThen processEasyReadingOnMatchRules
    , rules = getRules |> Array.fromList
    , metadata = settings.metadata -- |> Maybe.andThen Just
    }


{-| Construct a `GraphTransliterator` from a YAML string of `EasyReadingSettings`.
-}
fromEasyReadingYaml : String -> Result Error GraphTransliterator
fromEasyReadingYaml x =
    let
        yamlDecoded : Result Error EasyReadingSettings
        yamlDecoded =
            Yaml.Decode.fromString easyReadingSettingsDecoder x
    in
    yamlDecoded |> Result.map fromEasyReadingSettings |> Result.map graphTransliterator


fromEasyReadingJson : String -> Result JSON.Error GraphTransliterator
fromEasyReadingJson x =
    let
        -- jsonDecoded : Result JSON.Error EasyReadingSettings
        jsonDecoded =
            JSON.decodeString easyReadingSettingsDecoderJSON x
    in
    jsonDecoded |> Result.map fromEasyReadingSettings |> Result.map graphTransliterator



---------- initialize tokens ----------


{-| Generates lookup table of tokens in each class.
Can replace with foldl instead of
-}
tokensByClassOf : Dict Token TokenClasses -> TokensByClass
tokensByClassOf tokenDict =
    let
        update : ( Token, TokenClasses ) -> TokensByClass -> TokensByClass
        update ( token, tokenClasses ) origDict =
            let
                addTokenToClasses : TokenClass -> TokensByClass -> TokensByClass
                addTokenToClasses tokenClass currDict =
                    Dict.update tokenClass
                        (\currValue ->
                            case currValue of
                                Nothing ->
                                    Just (Set.singleton token)

                                Just currTokensSet ->
                                    Just (Set.insert token currTokensSet)
                        )
                        currDict
            in
            Array.foldl (\tokenClass -> addTokenToClasses tokenClass) origDict tokenClasses
    in
    List.foldl update Dict.empty (Dict.toList tokenDict)


tokenizerPatternFrom : List Token -> Regex.Regex
tokenizerPatternFrom tkns =
    Maybe.withDefault Regex.never <| Regex.fromString (tokenizerPatternStrFrom tkns)


tokenizerPatternStrFrom : List Token -> String
tokenizerPatternStrFrom tkns =
    let
        escape : Char -> String
        escape char =
            case char of
                '.' ->
                    "\\."

                '*' ->
                    "\\*"

                '?' ->
                    "\\?"

                '|' ->
                    "\\|"

                '[' ->
                    "\\["

                '(' ->
                    "\\("

                ')' ->
                    "\\)"

                '^' ->
                    "\\^"

                '/' ->
                    "\\/"

                _ ->
                    String.fromChar char

        escaped : String -> String
        escaped x =
            String.toList x |> List.map escape |> String.concat
    in
    (\x -> "^(" ++ x ++ ")") <|
        String.join "|" <|
            List.map escaped <|
                List.sortBy (negate << String.length) tkns


{-| Dictionary keyed by current token to previous token containing a list of
OnMatchRule\` in order that would apply
-}
indexedOnMatchRules : OnMatchRules -> List ( Int, OnMatchRule )
indexedOnMatchRules onmatchRules =
    Array.indexedMap Tuple.pair onmatchRules |> Array.toList


indexedOnMatchRulesAndTokens : Dict Token TokenClasses -> OnMatchRules -> List ( ( Set Token, Set Token ), Int )
indexedOnMatchRulesAndTokens tokenClasses onMatchRules =
    indexedOnMatchRules onMatchRules
        |> List.map
            (\( ruleIndex, rule ) ->
                let
                    currClassMaybe : Maybe TokenClass
                    currClassMaybe =
                        Array.get 0 rule.nextClasses

                    prevClassMaybe : Maybe TokenClass
                    prevClassMaybe =
                        Array.get (Array.length rule.prevClasses - 1) rule.prevClasses

                    -- List.reverse rule.prevClasses |> List.head
                    -- update dict based on rule
                in
                case ( currClassMaybe, prevClassMaybe ) of
                    ( Just currClass, Just nextClass ) ->
                        let
                            tokensByClass : Dict String (Set String)
                            tokensByClass =
                                tokensByClassOf tokenClasses

                            prevTokens : Set Token
                            prevTokens =
                                Dict.get nextClass tokensByClass |> Maybe.withDefault Set.empty

                            currTokens : Set Token
                            currTokens =
                                Dict.get currClass tokensByClass |> Maybe.withDefault Set.empty
                        in
                        Just (Tuple.pair (Tuple.pair currTokens prevTokens) ruleIndex)

                    _ ->
                        Nothing
            )
        |> List.filterMap identity


{-| This constructs an `OnMatchRules` dictionary of currToken -> prevToken.
-}
generateOnMatchRulesLookup : Dict Token TokenClasses -> OnMatchRules -> OnMatchRulesLookup
generateOnMatchRulesLookup tokenClasses ruleSetList =
    let
        initDict : OnMatchRulesLookup
        initDict =
            Dict.empty

        processRule : List ( ( Set Token, Set Token ), Int ) -> OnMatchRulesLookup -> OnMatchRulesLookup
        processRule ruleList dict =
            case ruleList of
                [] ->
                    dict

                ( ( currTokenSet, prevTokenSet ), ruleId ) :: rest ->
                    let
                        updateDict : List Token -> List Token -> OnMatchRulesLookup -> OnMatchRulesLookup
                        updateDict currTokens prevTokens innerDict =
                            case currTokens of
                                [] ->
                                    innerDict

                                firstToken :: restCurrTokens ->
                                    List.foldl
                                        (\prevToken ->
                                            Dict.update firstToken
                                                (\currToken ->
                                                    case currToken of
                                                        Nothing ->
                                                            Just (Dict.singleton prevToken (Array.fromList [ ruleId ]))

                                                        Just dict2 ->
                                                            Dict.update prevToken
                                                                (\nextToken ->
                                                                    case nextToken of
                                                                        Nothing ->
                                                                            Just (Array.fromList [ ruleId ])

                                                                        Just list ->
                                                                            Just (Array.append list (Array.fromList [ ruleId ]))
                                                                )
                                                                dict2
                                                                |> Just
                                                )
                                        )
                                        innerDict
                                        prevTokens
                                        |> updateDict restCurrTokens prevTokens
                    in
                    updateDict (Set.toList currTokenSet) (Set.toList prevTokenSet) dict
                        |> processRule rest
    in
    processRule (indexedOnMatchRulesAndTokens tokenClasses ruleSetList) initDict


startNode : GTNode
startNode =
    { id = 0
    , type_ = NodeType Start
    , label = "Start"
    , data = NodeDataType NoNodeData
    }


addGTNode : GTGraph -> NodeType GTNodeType -> NodeLabel -> NodeDataType GTNodeDataType -> ( GTGraph, GTNode )
addGTNode graph nodeType nodeLabel nodeData =
    addNode graph nodeType nodeLabel nodeData


addGTEdge : GTGraph -> NodeId -> NodeId -> GTEdgeDataType -> ( GTGraph, GTEdge )
addGTEdge graph head tail data =
    addEdge graph head tail (EdgeDataType data)


filterNodeIdsByToken : GTGraph -> Token -> NodeId -> Bool
filterNodeIdsByToken graph token nodeId =
    case getNode graph nodeId |> Maybe.map .data of
        Just (NodeDataType (TokenData t)) ->
            t.token == token

        _ ->
            False


addRuleToken : Token -> ( GTGraph, NodeId, TransliterationRule ) -> ( GTGraph, NodeId, TransliterationRule )
addRuleToken token ( graph, parentId, rule ) =
    let
        getEdgeToToken =
            childrenOfType graph parentId (NodeType Token)
                |> Maybe.map (List.filter (filterNodeIdsByToken graph token))
                |> Maybe.andThen List.head
                |> Maybe.andThen (getEdge graph parentId)

        addN g =
            addGTNode g (NodeType Token) token (NodeDataType (TokenData { token = token }))

        addE g h t d =
            addGTEdge g h t d

        addNodeAndEdge =
            addN graph |> (\( g, n ) -> addE g parentId n.id (EdgeData { cost = 1 }))

        getOrAddEdgeToToken =
            case getEdgeToToken of
                Nothing ->
                    addNodeAndEdge

                Just edge ->
                    ( graph, edge )

        updateCost : ( GTGraph, GTEdge ) -> ( GTGraph, GTEdge )
        updateCost ( g, e ) =
            let
                newCost =
                    case e.data of
                        EdgeDataType (EdgeData x) ->
                            max x.cost rule.cost
            in
            updateEdgeData g e (EdgeDataType (EdgeData { cost = newCost })) |> (\updatedG -> ( updatedG, e ))
    in
    getOrAddEdgeToToken |> updateCost |> (\( g, e ) -> ( g, e.tail, rule ))


indexedRules : TransliterationRules -> List ( RuleId, TransliterationRule )
indexedRules rules =
    Array.indexedMap Tuple.pair rules |> Array.toList


initialGraph : GTGraph
initialGraph =
    initGraph [ startNode ] Dict.empty Nothing


addRulesToGraph : GTGraph -> List ( RuleId, TransliterationRule ) -> GTGraph
addRulesToGraph graph irt =
    case irt of
        [] ->
            graph

        ( ruleId, rule ) :: rest ->
            let
                addedRuleTokens : ( GTGraph, NodeId, TransliterationRule )
                addedRuleTokens =
                    Array.foldl addRuleToken ( graph, 0, rule ) rule.tokens

                addRuleNodeAndEdge : ( GTGraph, NodeId, TransliterationRule ) -> GTGraph
                addRuleNodeAndEdge ( g, lastTokenNodeId, r ) =
                    addGTNode g
                        (NodeType Rule)
                        ("Rule #" ++ String.fromInt ruleId)
                        (NodeDataType (RuleData { ruleId = ruleId }))
                        |> (\( updatedG, ruleNode ) ->
                                addGTEdge updatedG lastTokenNodeId ruleNode.id (EdgeData { cost = rule.cost })
                           )
                        |> Tuple.first

                updated =
                    addedRuleTokens |> addRuleNodeAndEdge
            in
            addRulesToGraph updated rest


graphFromRules : TransliterationRules -> GTGraph
graphFromRules rules =
    let
        ir =
            indexedRules rules

        x =
            addRulesToGraph initialGraph ir
    in
    x


{-| Construct a GraphTransliterator from a `GraphTransliteratorConfig`.
-}
never : GraphTransliterator
never =
    let
        tr : TransliterationRules
        tr =
            Array.empty

        tkns : Dict Token TokenClasses
        tkns =
            Dict.empty

        tbc : TokensByClass
        tbc =
            Dict.empty

        ws : WhitespaceRule
        ws =
            { consolidate = True, tokenClass = "", default = "" }
    in
    GraphTransliterator
        { tokens = tkns
        , rules = tr
        , whiteSpace = ws
        , metadata = Nothing
        , onMatchRules = Nothing
        , onMatchRulesLookup = Nothing
        , tokensByClass = tbc
        , tokenizerPattern = Regex.never
        , graph = graphFromRules (Array.fromList [])
        }


graphTransliterator : GraphTransliteratorConfig -> GraphTransliterator
graphTransliterator config =
    let
        onlyTokens : List Token
        onlyTokens =
            Dict.keys config.tokens
    in
    GraphTransliterator
        { tokens = config.tokens
        , rules = config.rules
        , whiteSpace = config.whitespaceRule
        , metadata = config.metadata
        , onMatchRules = config.onMatchRules
        , onMatchRulesLookup =
            config.onMatchRules
                |> Maybe.map (generateOnMatchRulesLookup config.tokens)
        , tokensByClass = tokensByClassOf config.tokens
        , tokenizerPattern = tokenizerPatternFrom onlyTokens
        , graph = graphFromRules config.rules
        }


isWhiteSpace : GraphTransliterator -> Token -> Bool
isWhiteSpace (GraphTransliterator { whiteSpace, tokensByClass }) token =
    case
        Dict.get whiteSpace.tokenClass tokensByClass
            |> Maybe.map (Set.member token)
    of
        Just True ->
            True

        _ ->
            False


tokenize : String -> Bool -> GraphTransliterator -> Tokens
tokenize input _ (GraphTransliterator { tokensByClass, whiteSpace, tokenizerPattern }) =
    let
        initTokens : Tokens
        initTokens =
            Array.fromList [ whiteSpace.default ]

        initMatchAt =
            0

        inputLength =
            String.length input

        -- currMatch int ->
        currMatch : Int -> List Regex.Match
        currMatch matchAt =
            Regex.find tokenizerPattern (String.slice matchAt inputLength input)

        match : ( Int, Tokens ) -> Tokens
        match ( matchAt, tokens ) =
            if matchAt >= String.length input then
                tokens

            else
                case List.head (currMatch matchAt) of
                    Nothing ->
                        match ( matchAt + 1, tokens )

                    Just regexMatch ->
                        match ( matchAt + String.length regexMatch.match, Array.push regexMatch.match tokens )
    in
    match ( initMatchAt, initTokens )
        |> (\tokens ->
                let
                    lastToken : Maybe Token
                    lastToken =
                        Array.get (-1 + Array.length tokens) tokens

                    whiteSpaceTokens =
                        Dict.get whiteSpace.tokenClass tokensByClass

                    lastTokenWhiteSpace =
                        case ( lastToken, whiteSpaceTokens ) of
                            ( Just lt, Just wst ) ->
                                Set.member lt wst

                            _ ->
                                False
                in
                if whiteSpace.consolidate && lastTokenWhiteSpace then
                    tokens

                else
                    Array.push whiteSpace.default tokens
           )


isAccepting : GTNode -> Bool
isAccepting n =
    n.type_ == NodeType Rule


getGTNode : GTGraph -> NodeId -> Maybe GTNode
getGTNode gt nodeId =
    Array.get nodeId (Array.fromList gt.nodes)


orderedOutgoing : NodeId -> Maybe Token -> GTGraph -> ( List EdgeId, List EdgeId )
orderedOutgoing nodeId currToken graph =
    let
        children : List EdgeId
        children =
            List.filter (\( head, _ ) -> head == nodeId) graph.edgeList

        getEdgeCost : EdgeId -> Float
        getEdgeCost edgeId =
            let
                edge =
                    Dict.get edgeId graph.edges
            in
            case edge of
                Nothing ->
                    0

                Just e ->
                    case e.data of
                        EdgeDataType (EdgeData d) ->
                            d.cost

        getNodeType : Int -> Maybe (NodeType GTNodeType)
        getNodeType nId =
            Array.get nId (Array.fromList graph.nodes) |> Maybe.map .type_

        filterTokenNode : NodeId -> Maybe Token -> Bool
        filterTokenNode nId token =
            case
                getGTNode graph nId
            of
                Nothing ->
                    False

                Just e ->
                    case e.data of
                        NodeDataType (TokenData t) ->
                            Just t.token == token

                        _ ->
                            False

        orderedByCost : List EdgeId
        orderedByCost =
            List.sortBy getEdgeCost children

        ( nodeEdges, ruleEdges ) =
            List.partition (\( _, tail ) -> getNodeType tail == Just (NodeType Token)) orderedByCost
    in
    ( List.filter (\( _, tail ) -> filterTokenNode tail currToken) nodeEdges
    , ruleEdges
    )


tokenInClass : Maybe Token -> Maybe TokenClass -> TokensByClass -> Bool
tokenInClass token tokenClass tokensByClass =
    case ( token, tokenClass ) of
        ( Just tkn, Just tknClass ) ->
            Set.member tkn (Maybe.withDefault Set.empty (Dict.get tknClass tokensByClass))

        _ ->
            False


matchConstraints : GTNode -> Int -> Tokens -> GraphTransliterator -> Bool
matchConstraints node tokenIdx tokens (GraphTransliterator { rules, tokensByClass }) =
    let
        nodeData =
            node.data

        matchPrevTokens rule =
            case rule.prevTokens of
                Nothing ->
                    True

                Just prevTokens ->
                    let
                        startIdx =
                            tokenIdx - Array.length prevTokens

                        endIdx =
                            startIdx + Array.length prevTokens
                    in
                    if startIdx < 0 then
                        False

                    else
                        Array.slice startIdx endIdx tokens == prevTokens

        matchNextTokens rule =
            case rule.nextTokens of
                Nothing ->
                    True

                Just nextTokens ->
                    let
                        startIdx =
                            tokenIdx + Array.length rule.tokens

                        endIdx =
                            tokenIdx + Array.length rule.tokens + Array.length nextTokens
                    in
                    if endIdx > Array.length tokens then
                        False

                    else
                        Array.slice startIdx endIdx tokens == nextTokens

        matchPrevClasses rule =
            case rule.prevClasses of
                Nothing ->
                    True

                Just prevClasses ->
                    let
                        startIdx =
                            tokenIdx
                                - Maybe.withDefault 0 (rule.prevTokens |> Maybe.map Array.length)
                                - Array.length prevClasses
                    in
                    if startIdx < 0 then
                        False

                    else
                        List.all
                            (\i ->
                                let
                                    tkn =
                                        tokens |> Array.get (startIdx + i)

                                    class =
                                        Array.get i prevClasses
                                in
                                tokenInClass tkn class tokensByClass
                            )
                            (List.range
                                0
                                (-1 + Array.length prevClasses)
                            )

        matchNextClasses rule =
            case rule.nextClasses of
                Nothing ->
                    True

                Just nextClasses ->
                    let
                        startIdx =
                            tokenIdx
                                + (rule.tokens |> Array.length)
                                + Maybe.withDefault 0 (rule.nextTokens |> Maybe.map Array.length)
                    in
                    if startIdx + Array.length rule.tokens > Array.length tokens then
                        False

                    else
                        List.all
                            (\i ->
                                let
                                    tkn =
                                        tokens |> Array.get (startIdx + i)

                                    class =
                                        Array.get i nextClasses
                                in
                                tokenInClass tkn class tokensByClass
                            )
                            (List.range
                                0
                                (-1 + Array.length nextClasses)
                            )
    in
    case nodeData of
        NodeDataType (RuleData x) ->
            let
                rule =
                    Array.get x.ruleId rules

                ruleFound =
                    Maybe.map
                        (\r ->
                            matchPrevClasses r
                                && matchPrevTokens r
                                && matchNextTokens r
                                && matchNextClasses r
                        )
                        rule
            in
            Maybe.withDefault False ruleFound

        _ ->
            False


matchOnMatchRuleAt : Int -> Int -> Tokens -> GraphTransliterator -> Bool
matchOnMatchRuleAt ruleIdx tokenIdx tokens (GraphTransliterator { onMatchRules, tokensByClass }) =
    let
        rule : Maybe OnMatchRule
        rule =
            onMatchRules |> Maybe.andThen (Array.get ruleIdx)

        prevTokenClasses : Maybe OnMatchRule -> Maybe TokenClasses
        prevTokenClasses =
            Maybe.map .prevClasses

        nextTokenClasses : Maybe OnMatchRule -> Maybe TokenClasses
        nextTokenClasses =
            Maybe.map .nextClasses

        matchPrevTokenClasses =
            case prevTokenClasses rule of
                Nothing ->
                    True

                Just prevClasses ->
                    let
                        startIdx =
                            tokenIdx
                                - Array.length prevClasses
                    in
                    if startIdx < 0 then
                        False

                    else
                        List.all
                            (\i ->
                                let
                                    tkn =
                                        tokens |> Array.get (startIdx + i)

                                    class =
                                        Array.get i prevClasses
                                in
                                tokenInClass tkn class tokensByClass
                            )
                            (List.range
                                0
                                (-1 + Array.length prevClasses)
                            )

        matchNextTokenClasses =
            case nextTokenClasses rule of
                Nothing ->
                    True

                Just nextClasses ->
                    let
                        startIdx =
                            tokenIdx
                    in
                    List.all
                        (\i ->
                            let
                                tkn =
                                    tokens |> Array.get (startIdx + i)

                                class =
                                    Array.get i nextClasses
                            in
                            tokenInClass tkn class tokensByClass
                        )
                        (List.range
                            0
                            (-1 + Array.length nextClasses)
                        )
    in
    matchPrevTokenClasses && matchNextTokenClasses


matchRuleAt : Int -> Tokens -> GraphTransliterator -> MatchAtResult
matchRuleAt tokenIdx tokens gt =
    case gt of
        GraphTransliterator { graph } ->
            let
                currToken currTokenIdx =
                    Array.get currTokenIdx tokens

                addToStack : Int -> Int -> List ( Int, EdgeId )
                addToStack currTokenIdx nodeId =
                    orderedOutgoing nodeId (currToken currTokenIdx) graph
                        |> (\( edgesToTokens, edgesToRules ) -> edgesToTokens ++ edgesToRules)
                        |> List.map (Tuple.pair (currTokenIdx + 1))

                -- advance token idx
                initialStack : List ( Int, EdgeId )
                initialStack =
                    addToStack tokenIdx 0

                processStack stack =
                    case stack of
                        [] ->
                            None

                        first :: rest ->
                            let
                                ( currTokenIdx, ( _, currNodeId ) ) =
                                    first

                                currNode =
                                    Array.get currNodeId (Array.fromList graph.nodes)
                            in
                            case currNode of
                                Nothing ->
                                    processStack rest

                                Just n ->
                                    let
                                        accepting =
                                            isAccepting n
                                    in
                                    if accepting && matchConstraints n tokenIdx tokens gt then
                                        case n.data of
                                            NodeDataType (RuleData x) ->
                                                RuleIdx x.ruleId

                                            _ ->
                                                processStack rest
                                        -- _  would be an error

                                    else
                                        -- addToStack adds +1 to currTokenIdx
                                        addToStack currTokenIdx currNodeId ++ rest |> processStack
            in
            processStack initialStack


transliterate : String -> GraphTransliterator -> String
transliterate input gt =
    case gt of
        GraphTransliterator { rules, onMatchRules, onMatchRulesLookup } ->
            let
                tokens =
                    tokenize input True gt

                numTokens =
                    Array.length tokens

                initOutput =
                    ""

                initTokenIdx =
                    1

                process : Int -> String -> String
                process tokenIdx output =
                    if tokenIdx >= -1 + numTokens then
                        output

                    else
                        let
                            matchedRule : MatchAtResult
                            matchedRule =
                                matchRuleAt tokenIdx tokens gt
                        in
                        case matchedRule of
                            None ->
                                process (tokenIdx + 1) output

                            RuleIdx ruleId ->
                                let
                                    currToken =
                                        Array.get tokenIdx tokens

                                    prevToken =
                                        Array.get (-1 + tokenIdx) tokens

                                    currOnMatchRules =
                                        onMatchRulesLookup
                                            |> Maybe.andThen
                                                (\x ->
                                                    case ( currToken, prevToken ) of
                                                        ( Just cT, Just pT ) ->
                                                            Dict.get cT x |> Maybe.andThen (Dict.get pT)

                                                        _ ->
                                                            Nothing
                                                )

                                    oMRPRoduction =
                                        case currOnMatchRules of
                                            Just oMR ->
                                                Array.filter (\x -> matchOnMatchRuleAt x tokenIdx tokens gt) oMR
                                                    |> Array.get 0
                                                    |> Maybe.andThen (\xid -> Maybe.map (Array.get xid) onMatchRules)
                                                    |> Maybe.andThen (Maybe.map .production)

                                            _ ->
                                                Nothing

                                    rule =
                                        Array.get ruleId rules

                                    numRuleTokens =
                                        Maybe.withDefault
                                            1
                                            (Maybe.map (.tokens >> Array.length) rule)

                                    newOutput =
                                        (case oMRPRoduction of
                                            Nothing ->
                                                output

                                            Just production ->
                                                output
                                                    ++ production
                                        )
                                            ++ Maybe.withDefault "(Error accessing)" (Maybe.map .production rule)

                                    newTokenIdx =
                                        tokenIdx + numRuleTokens
                                in
                                process newTokenIdx newOutput
            in
            process initTokenIdx
                initOutput
