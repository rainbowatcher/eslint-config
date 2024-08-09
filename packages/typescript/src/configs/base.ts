import {
    GLOB_MARKDOWN_CODE, GLOB_TS, GLOB_TSX, GLOB_VUE,
} from "@rainbowatcher/eslint-config-shared"
import { namingConvertion } from "../naming_convertion"
import type { EslintFlatConfigItem, Options } from "@rainbowatcher/eslint-config-shared"

export function base(opts: Options): EslintFlatConfigItem {
    const files = opts.jsx ? [GLOB_TS, GLOB_TSX] : [GLOB_TS]
    opts.vue && files.push(GLOB_VUE)

    return {
        files,
        name: "rainbowatcher:ts:rules",
        // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/recommended-requiring-type-checking.ts
        rules: {
            "default-param-last": "off",
            "dot-notation": "off",
            "import/named": "off",
            "import/no-unresolved": "off",
            "no-array-constructor": "off",
            "no-dupe-class-members": "off",
            "no-duplicate-imports": "off",
            "no-empty-function": "off",
            "no-implied-eval": "off",
            "no-loop-func": "off",
            "no-loss-of-precision": "off",
            "no-redeclare": "off",
            "no-restricted-imports": "off",
            "no-throw-literal": "off",
            "no-unused-vars": "off",
            // To allow `ignoreVoid` in `ts/no-floating-promises`
            "no-void": ["error", { allowAsStatement: true }],
            // conflict with ts/member-ordering
            "perfectionist/sort-classes": "off",
            "ts/adjacent-overload-signatures": "error",
            "ts/array-type": ["error", { default: "array-simple" }],
            "ts/ban-ts-comment": ["error", {
                minimumDescriptionLength: 4,
                "ts-expect-error": "allow-with-description",
            }],
            "ts/ban-tslint-comment": "error",
            "ts/class-literal-property-style": ["error", "getters"],
            "ts/consistent-generic-constructors": ["error", "constructor"],
            "ts/consistent-indexed-object-style": "error",
            "ts/consistent-type-assertions": ["error", {
                assertionStyle: "as",
                objectLiteralTypeAssertions: "allow-as-parameter",
            }],
            "ts/consistent-type-definitions": ["error", "type"],
            "ts/consistent-type-imports": ["error", { disallowTypeAnnotations: false, prefer: "type-imports" }],
            "ts/default-param-last": "error",
            "ts/member-ordering": ["error", {
                default: {
                    memberTypes: [
                        "signature",
                        "static-field",
                        "field",
                        "constructor",
                        "static-method",
                        "method",
                    ],
                    order: "alphabetically",
                },
            }],
            "ts/no-array-constructor": "error",
            "ts/no-dupe-class-members": "error",
            "ts/no-duplicate-enum-values": "error",
            "ts/no-dynamic-delete": "error",
            "ts/no-empty-function": "off",
            "ts/no-empty-interface": ["error", { allowSingleExtends: true }],
            "ts/no-empty-object-type": "off",
            // This rule may cause eslint to mischeck
            "ts/no-explicit-any": "off",
            "ts/no-extraneous-class": ["error", {
                allowConstructorOnly: false,
                allowEmpty: false,
                allowStaticOnly: false,
                allowWithDecorator: true,
            }],
            "ts/no-inferrable-types": "error",
            "ts/no-loop-func": "error",
            "ts/no-loss-of-precision": "error",
            "ts/no-misused-new": "error",
            "ts/no-namespace": "error",
            "ts/no-non-null-asserted-nullish-coalescing": "error",
            "ts/no-non-null-asserted-optional-chain": "error",
            "ts/no-non-null-assertion": "off",
            "ts/no-redeclare": "error",
            "ts/no-require-imports": "error",
            "ts/no-restricted-imports": ["error", {
                paths: [
                    "error",
                    "domain",
                    "freelist",
                    "smalloc",
                    "punycode",
                    "sys",
                    "querystring",
                    "colors",
                ],
            }],
            "ts/no-restricted-types": [
                "error",
                {
                    types: {
                        "[[[[[]]]]]": "🦄💥",
                        "[[[[]]]]": "ur drunk 🤡",
                        "[[[]]]": "Don't use `[[[]]]`. Use `SomeType[][][]` instead.",
                        "[[]]": "Don't use `[[]]`. It only allows an array with a single element which is an empty array. Use `SomeType[][]` instead.",
                        "[]": "Don't use the empty array type `[]`. It only allows empty arrays. Use `SomeType[]` instead.",
                        Buffer: {
                            message: "Use Uint8Array instead. See: https://sindresorhus.com/blog/goodbye-nodejs-buffer",
                            suggest: [
                                "Uint8Array",
                            ],
                        },
                        null: {
                            fixWith: "undefined",
                            message: "Use `undefined` instead. See: https://github.com/sindresorhus/meta/issues/7",
                        },
                        object: {
                            fixWith: "Record<string, unknown>",
                            message: "The `object` type is hard to use. Use `Record<string, unknown>` instead. See: https://github.com/typescript-eslint/typescript-eslint/pull/848",
                        },
                    },
                },
            ],
            "ts/no-this-alias": ["error", {
                allowDestructuring: true,
            }],
            "ts/no-unsafe-function-type": "error",
            "ts/no-unused-vars": "off",
            "ts/no-wrapper-object-types": "error",

            ...namingConvertion(false),
        },
    }
}

export function typeAware(opts: Options): EslintFlatConfigItem {
    if (typeof opts.typescript === "object" && !opts.typescript.typeAware) return {}
    const files = [GLOB_TS]
    opts.jsx && files.push(GLOB_TSX)
    return {
        files: [GLOB_TS],
        ignores: [GLOB_MARKDOWN_CODE],
        name: "rainbowatcher:ts:type-aware",
        rules: {
            "ts/await-thenable": "error",
            "ts/consistent-type-exports": ["error", { fixMixedExportsWithInlineTypeSpecifier: true }],
            "ts/dot-notation": ["error", {
                allowIndexSignaturePropertyAccess: true,
                allowKeywords: true,
            }],
            "ts/no-base-to-string": "error",
            "ts/no-confusing-void-expression": "error",
            "ts/no-floating-promises": "error",
            "ts/no-for-in-array": "error",
            "ts/no-implied-eval": "error",
            "ts/no-meaningless-void-operator": "error",
            "ts/no-misused-promises": ["error", {
                checksConditionals: true,
                // TODO: I really want this to be `true`, but it makes it inconvenient to use
                // async functions as event handlers... I need to find a good way to handle that.
                // https://github.com/sindresorhus/refined-github/pull/2391#discussion_r318990466
                checksVoidReturn: false,
            }],
            "ts/no-redundant-type-constituents": "error",
            "ts/no-unnecessary-boolean-literal-compare": "error",
            "ts/no-unnecessary-type-assertion": "error",
            "ts/no-unsafe-return": "error",
            "ts/no-var-requires": "error",
            // may cause incorrect type judgment.
            // "ts/no-unsafe-argument": "error",
            // "ts/no-unsafe-assignment": "off",
            // "ts/no-unsafe-member-access": "error",
            // "ts/no-unsafe-call": "error",
            "ts/only-throw-error": ["error", {
                allowThrowingAny: false,
                // This should ideally be `false`, but it makes rethrowing errors inconvenient. There should be a separate `allowRethrowingUnknown` option.
                allowThrowingUnknown: true,
            }],
            "ts/prefer-nullish-coalescing": ["error", {
                ignoreConditionalTests: false,
                ignoreMixedLogicalExpressions: true,
                ignoreTernaryTests: false,
            }],
            "ts/prefer-optional-chain": "error",
            "ts/require-await": "error",
            "ts/restrict-plus-operands": "error",
            "ts/restrict-template-expressions": "error",
            "ts/unbound-method": "error",
        },
    }
}
