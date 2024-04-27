import { GLOB_JS } from "@rainbowatcher/eslint-config-shared"
import type { Linter } from "eslint"
import eslintJs from "@eslint/js"
import globals from "globals"

const jsConfig: Linter.FlatConfig = {
    name: "rainbowatcher/js/base",
    // https://github.com/micromatch/micromatch#extglobs
    files: [GLOB_JS],
    languageOptions: {
        sourceType: "module",
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
    },
    linterOptions: {
        // report unused eslint-disable directives
        reportUnusedDisableDirectives: true,
    },
    rules: {
        ...eslintJs.configs.recommended.rules,
        // https://eslint.org/docs/latest/rules/<rule-name>
        "no-var": "error",
        "object-shorthand": "error",
        "no-array-constructor": "error",
        "array-callback-return": ["error", { checkForEach: true }],
        "prefer-destructuring": ["error", {
            VariableDeclarator: {
                array: false,
                object: true,
            },
            AssignmentExpression: {
                array: false,
                object: false,
            },
        }],
        "prefer-template": "error",
        "no-useless-escape": "error",
        "prefer-rest-params": "error",
        "default-param-last": "error",
        "no-new-func": "error",
        "no-loop-func": "error",
        "no-empty-function": "warn",
        "no-constructor-return": "error",
        "no-undef": "off",
        "no-duplicate-imports": ["error", { includeExports: true }],
        "sort-imports": [
            "error",
            {
                ignoreCase: false,
                ignoreDeclarationSort: true,
                ignoreMemberSort: false,
                memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
                allowSeparatedGroups: false,
            },
        ],
        "no-await-in-loop": "warn",
        "prefer-const": [
            "error",
            {
                destructuring: "all",
                ignoreReadBeforeAssign: true,
            },
        ],
        "no-unneeded-ternary": "error",
        "no-restricted-globals": [
            "error",
            "event",
        ],
        "no-control-regex": "off",
    },
}

export default jsConfig
