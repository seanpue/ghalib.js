port module Application exposing (..)

--import VirtualDom

import Browser
import Dict exposing (..)
import GraphTransliterator exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onInput)
import Html.Parser exposing (Node(..))
import Task
import VitePluginHelper



---------------


{-| Converts nodes to virtual dom nodes.
-}
toVirtualDom : Model -> List Node -> List (Html msg)
toVirtualDom model nodes =
    List.map (toVirtualDomEach model) nodes


matchSpecialNode : String -> List ( String, String ) -> Bool
matchSpecialNode name attrs =
    name == "em" && List.member ( "class", "urdu" ) attrs


specialNode : Model -> Node -> Html msg
specialNode model node =
    case node of
        Element name _ children ->
            let
                newAttrs =
                    [ ( "class", cssOfDisplayScript model.displayScript ) ]

                newChildren =
                    let
                        transliterateChildren transliterator =
                            List.foldl
                                (\n ->
                                    case n of
                                        Text x ->
                                            (++) [ Text (transliterate x transliterator) ]

                                        _ ->
                                            (++) [ n ]
                                )
                                []
                    in
                    case model.displayScript of
                        PlainRoman ->
                            children

                        Nastaliq ->
                            children |> transliterateChildren model.transliterators.nastaliq

                        Devanagari ->
                            children |> transliterateChildren model.transliterators.devanagari

                        Diacritics ->
                            children |> transliterateChildren model.transliterators.diacritics
            in
            Html.node name (List.map toAttribute newAttrs) (toVirtualDom model newChildren)

        _ ->
            toVirtualDomEach model node


toVirtualDomEach : Model -> Node -> Html msg
toVirtualDomEach model node =
    case node of
        Element name attrs children ->
            if matchSpecialNode name attrs then
                specialNode model node

            else
                Html.node name (List.map toAttribute attrs) (toVirtualDom model children)

        Text s ->
            text s

        Comment _ ->
            text ""


toAttribute : ( String, String ) -> Attribute msg
toAttribute ( name, value ) =
    attribute name value



---- MODEL ----


type DisplayScript
    = Diacritics
    | Nastaliq
    | Devanagari
    | PlainRoman


allDisplayScripts : List DisplayScript
allDisplayScripts =
    [ PlainRoman, Diacritics, Nastaliq, Devanagari ]


cssOfDisplayScript : DisplayScript -> String
cssOfDisplayScript ds =
    case ds of
        PlainRoman ->
            "urdu"

        Devanagari ->
            "urdu Devanagari"

        Nastaliq ->
            "urdu Nastaliq"

        Diacritics ->
            "urdu Diacritics"


displayScriptLabel : DisplayScript -> String
displayScriptLabel ds =
    case ds of
        PlainRoman ->
            "Plain Roman"

        Devanagari ->
            "देवनागरी"

        Nastaliq ->
            "نستعلیق"

        Diacritics ->
            "Ḍiacrītīcs̤"


displayScriptLabels : List String
displayScriptLabels =
    List.map displayScriptLabel allDisplayScripts


displayScriptFromLabel : String -> DisplayScript
displayScriptFromLabel s =
    case s of
        "Plain Roman" ->
            PlainRoman

        "देवनागरी" ->
            Devanagari

        "نستعلیق" ->
            Nastaliq

        _ ->
            Diacritics



-- default
-- Diacritics


type alias Model =
    { transliterators :
        { nastaliq : GraphTransliterator
        , devanagari : GraphTransliterator
        , diacritics : GraphTransliterator
        }
    , origBody : String
    , displayScript : DisplayScript
    }



---- UPDATE ----


type Msg
    = SetScript String
    | NoOp


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        SetScript s ->
            ( { model
                | displayScript = displayScriptFromLabel s
              }
            , setStorage s
              -- && Cmd.none
            )

        _ ->
            ( model, Cmd.none )



-- ---- VIEW ----
-- -- s : String
-- s = VitePluginHelper.asset "/assets/settings.json?inline"
-- gt2 =  (fromEasyReadingJson s)
-- specialEm : Model -> Html Msg


switch : Model -> Html Msg
switch model =
    div
        [ style "position" "fixed"
        , style "bottom" "2em"
        , style "right" "2em"
        , style "height" "24pt"

        --, style "color" "white"
        , style "font-family" "monospace"
        , style "pointer-events" "auto"
        , style "z-index" "2147483647"
        , style "display" "flex"
        , style "justify-content" "center"
        , style "align-items" "center"
        , style "cursor" "pointer"
        ]
        -- [ img
        --     [ style "height" "24pt"
        --     , Html.Attributes.src <| VitePluginHelper.asset "/assets/inkwell-icon.svg?inline"
        --     ]
        --     []
        --,
        [ select
            [ style "height" "24pt"
            , style "font-size" "24px"
            , value (displayScriptLabel model.displayScript)
            , onInput SetScript

            --, style "background-color" "red"
            ]
            (displayScriptLabels
                --|> List.map (\label -> option [ value label ] [ text label ])
                |> List.map (\label -> option [ value label ] [ text label ])
             -- "text", img [ Html.Attributes.src <| VitePluginHelper.asset "/assets/diacritics.svg?inline" ] [] ])
            )
        ]


view : Model -> Html Msg
view model =
    -- getText = List.filterMap getTextEach
    -- getTextEach n = case n of
    --     Text t -> Just t
    --     _ -> Nothing
    -- addOrigText : List (String,String) -> (List String) -> List (String,String)
    -- addOrigText attrs origText =  attrs ++ [("origText", (String.join "\n" origText))]
    -- foldNodeEach n =
    --     case n of
    --         Text t -> (++)  [n]
    --         Comment _ -> (++) [n]
    --         Element nodeType attrs children ->
    --             if matchSpecialNode nodeType attrs  then
    --                 (++)([Element nodeType (getText children |> addOrigText attrs)  (children)])
    --             else
    --                 (++) ([Element nodeType attrs (foldNodes children)])
    -- foldNodes : List Node -> List Node
    -- foldNodes nodes = List.foldl foldNodeEach [] nodes
    Html.node "body"
        []
        (case Html.Parser.run model.origBody of
            Ok nodes ->
                let
                    x =
                        nodes |> filterNodes |> toVirtualDom model
                in
                switch model :: x

            Err _ ->
                [ text "ERROR!" ]
        )


run : msg -> Cmd msg
run m =
    Task.perform (always m) (Task.succeed ())


init : ConfigSettings -> ( Model, Cmd Msg )
init cfg =
    ( { transliterators =
            { nastaliq = Result.withDefault GraphTransliterator.never (GraphTransliterator.fromEasyReadingJson cfg.transliterators.nastaliq)
            , diacritics = Result.withDefault GraphTransliterator.never (GraphTransliterator.fromEasyReadingJson cfg.transliterators.diacritics)
            , devanagari = Result.withDefault GraphTransliterator.never (GraphTransliterator.fromEasyReadingJson cfg.transliterators.devanagari)
            }
      , origBody = cfg.origBody
      , displayScript = PlainRoman
      }
    , case cfg.storedData of
        Nothing ->
            run (SetScript "Diacritics")

        --
        Just storedData ->
            run (SetScript storedData)
      --  (SetScript storedData)
    )


filterNodes : List Node -> List Node
filterNodes nodes =
    List.filter
        (\n ->
            case n of
                Text _ ->
                    True

                Comment _ ->
                    True

                Element nodeType _ _ ->
                    nodeType /= "script"
        )
        nodes



---- PROGRAM ----


type alias ConfigSettings =
    { origBody : String, transliterators : { nastaliq : String, diacritics : String, devanagari : String }, storedData : Maybe String }


main : Program ConfigSettings Model Msg
main =
    Browser.element
        { view = view --  \model -> { title = "Test", body = [ view model ] }
        , init = init --settings _ _ -> ( {}, Cmd.none )
        , update = update
        , subscriptions = always Sub.none

        -- , onUrlRequest = \_ -> NoOp
        -- , onUrlChange = \_ -> NoOp
        }


port setStorage : String -> Cmd msg
