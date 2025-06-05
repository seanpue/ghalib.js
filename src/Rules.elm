module Rules exposing
    ( TransliterationRule, WhitespaceRule, OnMatchRule, OnMatchRules, OnMatchRuleId, OnMatchRuleIds, TransliterationRules, Token, Tokens, TokenClasses, TokenClass, Production
    , costOf
    )

{-| This module defines GraphTransliterator rules.


# Definitions

@docs TransliterationRule, WhitespaceRule, OnMatchRule, OnMatchRules, OnMatchRuleId, OnMatchRuleIds, TransliterationRules, Token, Tokens, TokenClasses, TokenClass, Production


# Helper Methods

@docs costOf

-}

import Array exposing (..)


{-| A transliteration rule containing the specific match conditions and
string output to be produced, as well as the rule's cost.

The specified array of of `tokens` may require particular tokens ahead of
them (`prevTokens`) or behind them (`nextTokens`). A rule can also require
that these or the tokens themselves be preceded (`prevClasses`) or
followed (`nextClasses`) tokens matching particular `TokenClasses`.

The `cost` of a transliteration rule is calculated on construction,
and less specific rules have a higher cost.

-}
type alias TransliterationRule =
    { production : Production
    , prevClasses : Maybe TokenClasses
    , prevTokens : Maybe Tokens
    , tokens : Tokens
    , nextTokens : Maybe Tokens
    , nextClasses : Maybe TokenClasses
    , cost : Cost
    }


{-| Array of `TransliterationRule`
-}
type alias TransliterationRules =
    Array TransliterationRule



---------- Tokens ----------


{-| Individual token for a `GraphTransliterator`, e.g. "aa"
-}
type alias Token =
    String


{-| Array of `Token`
-}
type alias Tokens =
    Array Token


{-| Class of a token, e.g. 'consonant'.
-}
type alias TokenClass =
    String


{-| Array of `TokenClass`
-}
type alias TokenClasses =
    Array TokenClass


{-| String output produced by a particular `TransliterationRule` or `OnMatchRule`
-}
type alias Production =
    String


type alias Cost =
    Float



---------- Whitespace ----------


{-| Whitespace rules of a GraphTransliterator

A `default` whitespace token is specified, as is the
`tokenClass` for whitespace. Whitespace can be set to `consolidate`,
i.e. combining line breaks and spaces, replacing with `default`.

-}
type alias WhitespaceRule =
    { consolidate : Bool
    , default : Token
    , tokenClass : TokenClass -- whitespace
    }



-- defaultWhitespace : WhitespaceRule
-- defaultWhitespace =
--     { consolidate = True
--     , default = " "
--     , tokenClass = "whitespace"
--     }
-- OnMatch Rule


{-| Rules about adding text between certain combinations of matched rules.

When a translation rule has been found and before its production is added
to the output, the `production` string of an OnMatch rule is added if
previously matched tokens and current tokens are of the specified classes
(`prevClasses`, `nextClasses`).

-}
type alias OnMatchRule =
    { prevClasses : TokenClasses
    , nextClasses : TokenClasses
    , production : Production
    }


{-| Array of `OnMatchRule`
-}
type alias OnMatchRules =
    Array OnMatchRule


{-| Identifier for an `OnMatchRule` by its location in `OnMatchRuleIds`
-}
type alias OnMatchRuleId =
    Int


{-| Array of `OnMatchRuleId`
-}
type alias OnMatchRuleIds =
    Array Int



{- Calculate number of tokens in a rule. -}


numTokensOf : Maybe TokenClasses -> Maybe Tokens -> Tokens -> Maybe Tokens -> Maybe TokenClasses -> Int
numTokensOf prevClasses prevTokens tokens nextTokens nextClasses =
    Maybe.withDefault 0 (Maybe.map Array.length prevClasses)
        + Maybe.withDefault 0 (Maybe.map Array.length prevTokens)
        + Array.length tokens
        + Maybe.withDefault 0 (Maybe.map Array.length nextTokens)
        + Maybe.withDefault 0 (Maybe.map Array.length nextClasses)


{-| Calculate cost of a rule. Rules with more tokens cost less so they are tried first.
-}
costOf : Maybe TokenClasses -> Maybe Tokens -> Tokens -> Maybe Tokens -> Maybe TokenClasses -> Float
costOf prevClasses prevTokens tokens nextTokens nextClasses =
    let
        numTokens =
            toFloat <| numTokensOf prevClasses prevTokens tokens nextTokens nextClasses
    in
    logBase 2 (1 + 1 / (1 + numTokens))
