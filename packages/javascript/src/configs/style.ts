// import process from "node:process"
import { interopDefault, renameRules } from "@rainbowatcher/eslint-config-shared"
import { getFiles } from "../files"
import type { EslintFlatConfigItem, Options } from "@rainbowatcher/eslint-config-shared"

export async function style(opts: Options): Promise<EslintFlatConfigItem> {
    if (!opts.style) return {}

    const [
        pluginStylisticJs, pluginStylisticJsPlus, pluginStylisticJsx,
    ] = await Promise.all([
        interopDefault(import("@stylistic/eslint-plugin-js")),
        interopDefault(import("@stylistic/eslint-plugin-plus")),
        interopDefault(import("@stylistic/eslint-plugin-jsx")),
    ])

    return {
        files: getFiles(opts),
        name: "rainbowatcher:js:style",
        plugins: {
            "style-ex": pluginStylisticJsPlus,
            "style-js": pluginStylisticJs,
            "style-jsx": pluginStylisticJsx,
        },
        rules: {
            "antfu/top-level-function": "error",

            ...renameRules(pluginStylisticJs.configs["all-flat"].rules, { "@stylistic/js": "style-js" }),

            // "style-js/lines-between-class-members": ["error", "always", { exceptAfterSingleLine: true }],
            // "style-js/no-mixed-spaces-and-tabs": "error",
            // "style-js/space-in-parens": ["error", "never"],
            // "style-js/space-before-blocks": ["error", "always"],
            // "style-js/template-curly-spacing": "error",
            // "style-js/wrap-iife": [
            //     "error",
            //     "inside",
            //     {
            //         functionPrototypeMethods: true,
            //     },
            // ],
            // "style-js/space-infix-ops": "error",
            // "style-js/arrow-spacing": ["error", { after: true, before: true }],
            // "style-js/block-spacing": ["error", "always"],
            // "style-js/comma-spacing": ["error", { after: true, before: false }],
            // "style-js/comma-style": ["error", "last"],
            // "style-js/key-spacing": ["error", { afterColon: true, beforeColon: false }],
            // "style-js/dot-location": ["error", "property"],
            // "style-js/keyword-spacing": "error",
            // "style-js/newline-per-chained-call": ["error", { ignoreChainWithDepth: 3 }],
            "style-ex/indent-binary-ops": ["error", 4],
            "style-js/array-bracket-newline": ["error", "consistent"],
            "style-js/array-bracket-spacing": ["error", "never"],
            "style-js/array-element-newline": ["error", "consistent"],
            "style-js/arrow-parens": ["error", "as-needed", { requireForBlockBody: true }],
            "style-js/brace-style": ["error", "1tbs", { allowSingleLine: true }],
            "style-js/comma-dangle": ["error", "always-multiline"],
            "style-js/eol-last": ["error", "always"],
            "style-js/function-call-argument-newline": ["error", "consistent"],
            "style-js/indent": ["error", 4, {
                SwitchCase: 1, VariableDeclarator: 1, outerIIFEBody: 1,
            }],
            "style-js/linebreak-style": ["error", "unix"],
            "style-js/lines-around-comment": ["error", {
                afterBlockComment: false,
                afterHashbangComment: true,
                afterLineComment: false,
                allowArrayEnd: false,
                allowArrayStart: true,
                allowBlockEnd: false,
                allowBlockStart: true,
                allowClassEnd: false,
                allowClassStart: true,
                allowObjectEnd: false,
                allowObjectStart: true,
                beforeBlockComment: true,
                beforeLineComment: true,
                ignorePattern: "eslint|global",
            }],
            "style-js/multiline-comment-style": "off",
            "style-js/multiline-ternary": ["error", "always-multiline"],
            "style-js/no-extra-parens": ["error", "all", { nestedBinaryExpressions: false }],
            "style-js/no-multi-spaces": "error",
            "style-js/no-multiple-empty-lines": ["error", {
                max: 2, maxBOF: 0, maxEOF: 0,
            }],
            "style-js/no-trailing-spaces": "error",
            "style-js/object-curly-newline": ["error", {
                ExportDeclaration: {
                    minProperties: 4, multiline: true,
                },
                ImportDeclaration: {
                    minProperties: 4, multiline: true,
                },
                ObjectExpression: {
                    consistent: true, minProperties: 4, multiline: true,
                },
                ObjectPattern: {
                    consistent: true, minProperties: 6, multiline: true,
                },
            }],
            "style-js/object-curly-spacing": ["error", "always"],
            "style-js/object-property-newline": ["error", { allowMultiplePropertiesPerLine: true }],
            "style-js/operator-linebreak": ["error", "before"],

            "style-js/padded-blocks": ["error", {
                blocks: "never",
                classes: "always",
                switches: "never",
            }, { allowSingleLineBlocks: true }],

            // this rule does not work
            "style-js/padding-line-between-statements": [
                "error",
                { blankLine: "always", next: "*", prev: "function" },
                { blankLine: "always", next: "function", prev: "*" },
            ],
            "style-js/quote-props": ["error", "as-needed"],
            "style-js/quotes": ["error", "double", { avoidEscape: true }],
            "style-js/semi": ["error", "never"],
            "style-js/space-before-function-paren": ["error", {
                anonymous: "always",
                asyncArrow: "always",
                named: "never",
            }],
            "style-js/spaced-comment": ["error", "always", {
                block: {
                    balanced: true,
                    exceptions: ["*"],
                    markers: ["!"],
                },
                line: {
                    exceptions: ["/", "#"],
                    markers: ["/"],
                },
            }],
            "style-js/wrap-regex": "off",
        },
    }
}
