import ts from 'typescript';
import { Mode } from '../types';
export declare const InlineMode: {
    if: import("ts-union").Unpack<{
        UsingConsFunc: import("ts-union").Of<[import("ts-union").Unit]>;
        UsingLiteralObjects: import("ts-union").Of<[Mode]>;
    }>;
    T: import("ts-union").UnionVal<{
        UsingConsFunc: import("ts-union").Of<[import("ts-union").Unit]>;
        UsingLiteralObjects: import("ts-union").Of<[Mode]>;
    }>;
    match: import("ts-union").MatchFunc<{
        UsingConsFunc: import("ts-union").Of<[import("ts-union").Unit]>;
        UsingLiteralObjects: import("ts-union").Of<[Mode]>;
    }>;
    matchWith: <Other extends import("ts-union").SingleDataRecordType, Result>(other: {
        if: import("ts-union").Unpack<Other>;
        T: import("ts-union").UnionVal<Other>;
        match: import("ts-union").MatchFunc<Other>;
        matchWith: Other extends import("ts-union").SingleDataRecordType ? <Other_1 extends import("ts-union").SingleDataRecordType, Result_1>(other: {
            if: import("ts-union").Unpack<Other_1>;
            T: import("ts-union").UnionVal<Other_1>;
            match: import("ts-union").MatchFunc<Other_1>;
            matchWith: Other_1 extends import("ts-union").SingleDataRecordType ? <Other_2 extends import("ts-union").SingleDataRecordType, Result_2>(other: {
                if: import("ts-union").Unpack<Other_2>;
                T: import("ts-union").UnionVal<Other_2>;
                match: import("ts-union").MatchFunc<Other_2>;
                matchWith: Other_2 extends import("ts-union").SingleDataRecordType ? <Other_3 extends import("ts-union").SingleDataRecordType, Result_3>(other: {
                    if: import("ts-union").Unpack<Other_3>;
                    T: import("ts-union").UnionVal<Other_3>;
                    match: import("ts-union").MatchFunc<Other_3>;
                    matchWith: Other_3 extends import("ts-union").SingleDataRecordType ? <Other_4 extends import("ts-union").SingleDataRecordType, Result_4>(other: {
                        if: import("ts-union").Unpack<Other_4>;
                        T: import("ts-union").UnionVal<Other_4>;
                        match: import("ts-union").MatchFunc<Other_4>;
                        matchWith: Other_4 extends import("ts-union").SingleDataRecordType ? <Other_5 extends import("ts-union").SingleDataRecordType, Result_5>(other: {
                            if: import("ts-union").Unpack<Other_5>;
                            T: import("ts-union").UnionVal<Other_5>;
                            match: import("ts-union").MatchFunc<Other_5>;
                            matchWith: Other_5 extends import("ts-union").SingleDataRecordType ? <Other_6 extends import("ts-union").SingleDataRecordType, Result_6>(other: {
                                if: import("ts-union").Unpack<Other_6>;
                                T: import("ts-union").UnionVal<Other_6>;
                                match: import("ts-union").MatchFunc<Other_6>;
                                matchWith: Other_6 extends import("ts-union").SingleDataRecordType ? <Other_7 extends import("ts-union").SingleDataRecordType, Result_7>(other: {
                                    if: import("ts-union").Unpack<Other_7>;
                                    T: import("ts-union").UnionVal<Other_7>;
                                    match: import("ts-union").MatchFunc<Other_7>;
                                    matchWith: Other_7 extends import("ts-union").SingleDataRecordType ? <Other_8 extends import("ts-union").SingleDataRecordType, Result_8>(other: {
                                        if: import("ts-union").Unpack<Other_8>;
                                        T: import("ts-union").UnionVal<Other_8>;
                                        match: import("ts-union").MatchFunc<Other_8>;
                                        matchWith: Other_8 extends import("ts-union").SingleDataRecordType ? <Other_9 extends import("ts-union").SingleDataRecordType, Result_9>(other: {
                                            if: import("ts-union").Unpack<Other_9>;
                                            T: import("ts-union").UnionVal<Other_9>;
                                            match: import("ts-union").MatchFunc<Other_9>;
                                            matchWith: Other_9 extends import("ts-union").SingleDataRecordType ? <Other_10 extends import("ts-union").SingleDataRecordType, Result_10>(other: any & import("ts-union").Constructors<Other_10>, matchObj: import("ts-union").MatchCasesForTwo<Other_9, Other_10, Result_10>) => (a: import("ts-union").UnionVal<Other_9>, b: import("ts-union").UnionVal<Other_10>) => Result_10 : never;
                                        } & import("ts-union").Constructors<Other_9>, matchObj: import("ts-union").MatchCasesForTwo<Other_8, Other_9, Result_9>) => (a: import("ts-union").UnionVal<Other_8>, b: import("ts-union").UnionVal<Other_9>) => Result_9 : never;
                                    } & import("ts-union").Constructors<Other_8>, matchObj: import("ts-union").MatchCasesForTwo<Other_7, Other_8, Result_8>) => (a: import("ts-union").UnionVal<Other_7>, b: import("ts-union").UnionVal<Other_8>) => Result_8 : never;
                                } & import("ts-union").Constructors<Other_7>, matchObj: import("ts-union").MatchCasesForTwo<Other_6, Other_7, Result_7>) => (a: import("ts-union").UnionVal<Other_6>, b: import("ts-union").UnionVal<Other_7>) => Result_7 : never;
                            } & import("ts-union").Constructors<Other_6>, matchObj: import("ts-union").MatchCasesForTwo<Other_5, Other_6, Result_6>) => (a: import("ts-union").UnionVal<Other_5>, b: import("ts-union").UnionVal<Other_6>) => Result_6 : never;
                        } & import("ts-union").Constructors<Other_5>, matchObj: import("ts-union").MatchCasesForTwo<Other_4, Other_5, Result_5>) => (a: import("ts-union").UnionVal<Other_4>, b: import("ts-union").UnionVal<Other_5>) => Result_5 : never;
                    } & import("ts-union").Constructors<Other_4>, matchObj: import("ts-union").MatchCasesForTwo<Other_3, Other_4, Result_4>) => (a: import("ts-union").UnionVal<Other_3>, b: import("ts-union").UnionVal<Other_4>) => Result_4 : never;
                } & import("ts-union").Constructors<Other_3>, matchObj: import("ts-union").MatchCasesForTwo<Other_2, Other_3, Result_3>) => (a: import("ts-union").UnionVal<Other_2>, b: import("ts-union").UnionVal<Other_3>) => Result_3 : never;
            } & import("ts-union").Constructors<Other_2>, matchObj: import("ts-union").MatchCasesForTwo<Other_1, Other_2, Result_2>) => (a: import("ts-union").UnionVal<Other_1>, b: import("ts-union").UnionVal<Other_2>) => Result_2 : never;
        } & import("ts-union").Constructors<Other_1>, matchObj: import("ts-union").MatchCasesForTwo<Other, Other_1, Result_1>) => (a: import("ts-union").UnionVal<Other>, b: import("ts-union").UnionVal<Other_1>) => Result_1 : never;
    } & import("ts-union").Constructors<Other>, matchObj: import("ts-union").MatchCasesForTwo<{
        UsingConsFunc: import("ts-union").Of<[import("ts-union").Unit]>;
        UsingLiteralObjects: import("ts-union").Of<[Mode]>;
    }, Other, Result>) => (a: import("ts-union").UnionVal<{
        UsingConsFunc: import("ts-union").Of<[import("ts-union").Unit]>;
        UsingLiteralObjects: import("ts-union").Of<[Mode]>;
    }>, b: import("ts-union").UnionVal<Other>) => Result;
} & import("ts-union").Constructors<{
    UsingConsFunc: import("ts-union").Of<[import("ts-union").Unit]>;
    UsingLiteralObjects: import("ts-union").Of<[Mode]>;
}>;
export declare type InlineMode = typeof InlineMode.T;
export declare const createInlineListFromArrayTransformer: (inlineMode: import("ts-union").UnionVal<{
    UsingConsFunc: import("ts-union").Of<[import("ts-union").Unit]>;
    UsingLiteralObjects: import("ts-union").Of<[Mode]>;
}>) => ts.TransformerFactory<ts.SourceFile>;
