import type { Linter } from "eslint"
import { getLanguageOptions } from "../language_options"
import { namingConvertion } from "../naming_convertion"
import { GLOB_TS } from "@rainbowatcher/eslint-config-shared"


const tsBaseConfig: Linter.FlatConfig = {
    name: "rainbowatcher/ts/base",
    files: [GLOB_TS],
    languageOptions: getLanguageOptions(),
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/recommended-requiring-type-checking.ts
    rules: {
        "ts/array-type": ["error", { default: "array-simple" }],
        "ts/adjacent-overload-signatures": "error",
        "ts/await-thenable": "error",
        "ts/ban-ts-comment": ["error", { "ts-expect-error": "allow-with-description", minimumDescriptionLength: 4 }],
        "ts/ban-tslint-comment": "error",
        "ts/only-throw-error": [
            "error",
            {
                // This should ideally be `false`, but it makes rethrowing errors inconvenient. There should be a separate `allowRethrowingUnknown` option.
                allowThrowingUnknown: true,
                allowThrowingAny: false,
            },
        ],
        "ts/ban-types": [
            "error",
            {
                extendDefaults: false,
                types: {
                    String: {
                        message: "Use `string` instead.",
                        fixWith: "string",
                    },
                    Number: {
                        message: "Use `number` instead.",
                        fixWith: "number",
                    },
                    Boolean: {
                        message: "Use `boolean` instead.",
                        fixWith: "boolean",
                    },
                    Symbol: {
                        message: "Use `symbol` instead.",
                        fixWith: "symbol",
                    },
                    BigInt: {
                        message: "Use `bigint` instead.",
                        fixWith: "bigint",
                    },
                    Object: {
                        message: "The `Object` type is mostly the same as `unknown`. You probably want `Record<string, unknown>` instead. See https://github.com/typescript-eslint/typescript-eslint/pull/848",
                        fixWith: "Record<string, unknown>",
                    },
                    // in union type, unknown triggers `ts/no-redundant-type-constituents`
                    // Record<string, unknown> introducing unknown fields into the type
                    // '{}' signifies no additional fields in the type, so there is no type same as '{}'
                    // "{}": {
                    //     message: "The `{}` type is mostly the same as `unknown`. You probably want `Record<string, unknown>` instead.",
                    //     fixWith: "Record<string, unknown>",
                    // },
                    object: {
                        message: "The `object` type is hard to use. Use `Record<string, unknown>` instead. See: https://github.com/typescript-eslint/typescript-eslint/pull/848",
                        fixWith: "Record<string, unknown>",
                    },
                    Function: "Use a specific function type instead, like `() => void`.",
                    null: {
                        message: "Use `undefined` instead, except you known what you want to do. See: https://github.com/sindresorhus/meta/issues/7",
                        fixWith: "undefined",
                    },
                    "[]": "Don't use the empty array type `[]`. It only allows empty arrays. Use `SomeType[]` instead.",
                    "[[]]": "Don't use `[[]]`. It only allows an array with a single element which is an empty array. Use `SomeType[][]` instead.",
                    "[[[]]]": "Don't use `[[[]]]`. Use `SomeType[][][]` instead.",
                    "[[[[]]]]": "ur drunk 🤡",
                    "[[[[[]]]]]": "🦄💥",
                },
            },
        ],
        "ts/class-literal-property-style": ["error", "fields"],
        "ts/consistent-generic-constructors": ["error", "constructor"],
        "ts/consistent-type-assertions": ["error", { assertionStyle: "as", objectLiteralTypeAssertions: "allow-as-parameter" }],
        "ts/consistent-type-definitions": ["error", "type"],
        "ts/consistent-indexed-object-style": "error",
        "ts/default-param-last": "error",
        "ts/consistent-type-imports": ["error", { prefer: "type-imports", disallowTypeAnnotations: false }],
        // "ts/member-delimiter-style": ["error", { multiline: { delimiter: "none" } }],
        "ts/member-ordering": [
            "error",
            {
                default: [
                    "signature",

                    "public-static-field",
                    "public-static-method",

                    "protected-static-field",
                    "protected-static-method",

                    "private-static-field",
                    "private-static-method",

                    "static-field",
                    "static-method",

                    "public-decorated-field",
                    "public-instance-field",
                    "public-abstract-field",
                    "public-field",

                    "protected-decorated-field",
                    "protected-instance-field",
                    "protected-abstract-field",
                    "protected-field",

                    "private-decorated-field",
                    "private-instance-field",
                    "private-field",

                    "instance-field",
                    "abstract-field",
                    "decorated-field",
                    "field",

                    "public-constructor",
                    "protected-constructor",
                    "private-constructor",
                    "constructor",

                    "public-decorated-method",
                    "public-instance-method",
                    "public-abstract-method",
                    "public-method",

                    "protected-decorated-method",
                    "protected-instance-method",
                    "protected-abstract-method",
                    "protected-method",

                    "private-decorated-method",
                    "private-instance-method",
                    "private-method",

                    "instance-method",
                    "abstract-method",
                    "decorated-method",
                    "method",
                ],
            },
        ],
        "ts/no-duplicate-enum-values": "error",
        "ts/no-dynamic-delete": "error",
        "ts/no-extraneous-class": [
            "error",
            {
                allowConstructorOnly: false,
                allowEmpty: false,
                allowStaticOnly: false,
                allowWithDecorator: true,
            },
        ],
        // To allow `ignoreVoid` in `ts/no-floating-promises`
        "no-void": ["error", { allowAsStatement: true }],
        "ts/no-for-in-array": "error",
        "ts/no-inferrable-types": "error",
        "ts/no-misused-new": "error",
        "ts/no-namespace": "error",
        "ts/no-non-null-assertion": "off",
        "ts/no-non-null-asserted-nullish-coalescing": "error",
        "ts/no-non-null-asserted-optional-chain": "error",
        // "ts/no-require-imports": "error",
        "ts/no-this-alias": [
            "error",
            {
                allowDestructuring: true,
            },
        ],
        // This rule may cause eslint to mischeck
        // "ts/no-explicit-any": "error",

        // Off
        // "brace-style": "off",
        // "ts/brace-style": ["error", "stroustrup", { allowSingleLine: true }],
        // "comma-dangle": "off",
        // "ts/comma-dangle": ["error", "always-multiline"],
        // "comma-spacing": "off",
        // "ts/comma-spacing": ["error", { before: false, after: true }],
        "default-param-last": "off",
        "no-unused-vars": "off",
        "ts/no-unused-vars": "off",
        "import/no-unresolved": "off",
        "import/named": "off",
        "no-duplicate-imports": "off",
        "no-empty-function": "off",
        "ts/no-empty-function": "off",
        "ts/no-empty-interface": ["error", { allowSingleExtends: true }],
        // "space-infix-ops": "off",
        // "ts/space-infix-ops": "error",
        // "keyword-spacing": "off",
        // "ts/keyword-spacing": "error",
        // "func-call-spacing": "off",
        // "ts/func-call-spacing": ["error", "never"],
        // indent: "off",
        // "ts/indent": ["error", 4, { SwitchCase: 1, VariableDeclarator: 1, outerIIFEBody: 1 }],
        // "lines-between-class-members": "off",
        // "ts/lines-between-class-members": [
        //     "error",
        //     "always",
        //     {
        //         // Workaround to allow class fields to not have lines between them.
        //         // refer: XO - TODO: Get ESLint to add an option to ignore class fields.
        //         exceptAfterSingleLine: true,
        //     },
        // ],
        "no-array-constructor": "off",
        "ts/no-array-constructor": "error",
        "no-dupe-class-members": "off",
        "ts/no-dupe-class-members": "error",
        "no-loss-of-precision": "off",
        "ts/no-loss-of-precision": "error",
        // "no-extra-parens": "off",
        // "ts/no-extra-parens": ["error", "functions"],
        // "no-extra-semi": "off",
        // "ts/no-extra-semi": "error",
        "no-loop-func": "off",
        "ts/no-loop-func": "error",
        "no-redeclare": "off",
        "ts/no-redeclare": "error",
        "no-restricted-imports": "off",
        "ts/no-restricted-imports": [
            "error",
            {
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
            },
        ],

        // === extra
        // "ts/no-empty-function": "warn",
        "ts/no-var-requires": "error",
        // "no-throw-literal": "off",
        // "ts/no-throw-literal": "error",
        "no-implied-eval": "off",
        "ts/no-implied-eval": "error",
        "dot-notation": "off",
        "ts/dot-notation": ["error", { allowKeywords: true }],
        "ts/no-floating-promises": "error",
        // "ts/no-misused-promises": "error",
        "ts/no-unnecessary-type-assertion": "error",

        /* Will cause incorrect type judgment.
        "ts/no-unsafe-call": "error",
        "ts/no-unsafe-argument": "error",
        "ts/no-unsafe-assignment": "error",
        "ts/no-unsafe-member-access": "error",
        "ts/no-unsafe-return": "error",
        */
        "ts/require-await": "error",
        "ts/restrict-plus-operands": "error",
        "ts/restrict-template-expressions": "error",
        "ts/unbound-method": "error",
        "ts/no-redundant-type-constituents": "error",
        "ts/no-meaningless-void-operator": "error",
        "ts/no-base-to-string": "error",
        "ts/no-confusing-void-expression": "error",
        "ts/consistent-type-exports": ["error", { fixMixedExportsWithInlineTypeSpecifier: true }],
        "ts/no-misused-promises": [
            "error",
            {
                checksConditionals: true,
                // TODO: I really want this to be `true`, but it makes it inconvenient to use
                // async functions as event handlers... I need to find a good way to handle that.
                // https://github.com/sindresorhus/refined-github/pull/2391#discussion_r318990466
                checksVoidReturn: false,
            },
        ],
        "ts/no-unnecessary-boolean-literal-compare": "error",
        ...namingConvertion(false),
    },
}

export default tsBaseConfig
