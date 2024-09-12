import { interopDefault } from "@rainbowatcher/eslint-config-shared"
import globals from "globals"
import { getFiles } from "../files"
import type { EslintFlatConfigItem, Options } from "@rainbowatcher/eslint-config-shared"

export async function base(opts: Options): Promise<EslintFlatConfigItem> {
    const eslintJs = await interopDefault(import("@eslint/js"))

    return {
        files: getFiles(opts),
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.es2021,
                ...globals.node,
                document: "readonly",
                navigator: "readonly",
                window: "readonly",
            },
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
                ecmaVersion: "latest",
                sourceType: "module",
            },
            sourceType: "module",
        },
        linterOptions: {
            // report unused eslint-disable directives
            reportUnusedDisableDirectives: true,
        },
        name: "rainbowatcher:js:rules",
        rules: {
            ...eslintJs.configs.recommended.rules,
            "array-callback-return": ["error", {
                allowImplicit: true,
                checkForEach: true,
            }],
            "default-param-last": "error",
            eqeqeq: ["error", "smart"],
            "no-array-constructor": "error",
            "no-await-in-loop": "warn",
            "no-constructor-return": "error",
            "no-control-regex": "off",
            "no-duplicate-imports": [
                "error", {
                    includeExports: true,
                },
            ],
            "no-empty-function": "warn",
            "no-loop-func": "error",
            "no-loss-of-precision": "error",
            "no-new-func": "error",
            "no-restricted-globals": [
                "error",
                {
                    message: "Use local parameter instead.",
                    name: "event",
                },
                {
                    message: "Do not commit fdescribe. Use describe instead.",
                    name: "fdescribe",
                },
            ],
            "no-undef": "off",
            "no-unneeded-ternary": "error",
            "no-useless-escape": "error",
            "no-var": "error",
            "object-shorthand": "error",
            "prefer-const": ["error", {
                destructuring: "all",
                ignoreReadBeforeAssign: true,
            }],
            "prefer-destructuring": ["error", {
                AssignmentExpression: {
                    array: false,
                    object: false,
                },
                VariableDeclarator: {
                    array: false,
                    object: true,
                },
            }],
            "prefer-rest-params": "error",
            "prefer-template": "error",

            // use import/order instead
            "sort-imports": "off",
        },
    }
}
