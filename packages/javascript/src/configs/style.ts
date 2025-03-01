// import process from "node:process"
import {
    DEFAULT_STYLE_OPTION, GLOB_JSX, GLOB_TSX, interopDefault,
    renameRules, resolveAltOption,
} from "@rainbowatcher/eslint-config-shared"
import { getFiles } from "../files"
import type { EslintFlatConfigItem, Options } from "@rainbowatcher/eslint-config-shared"

export async function style(opts: Options): Promise<EslintFlatConfigItem> {
    if (!opts.style) return {}

    const pluginStylisticJs = await interopDefault(import("@stylistic/eslint-plugin-js"))
    const { semi, singleQuote, tabWidth, trailingComma } = resolveAltOption(opts, "style", DEFAULT_STYLE_OPTION)
    return {
        files: getFiles(opts),
        name: "rainbowatcher:js:style",
        rules: {
            "antfu/top-level-function": "error",

            ...renameRules(pluginStylisticJs.configs["all-flat"].rules, { "@stylistic/js": "style-js" }),

            // "style-js/newline-per-chained-call": ["error", { ignoreChainWithDepth: 3 }],
            "style-ex/indent-binary-ops": ["error", tabWidth ?? DEFAULT_STYLE_OPTION.tabWidth],
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
            // "style-js/keyword-spacing": "error",
            "style-js/array-bracket-newline": ["error", "consistent"],
            // "style-js/key-spacing": ["error", { afterColon: true, beforeColon: false }],
            "style-js/array-bracket-spacing": ["error", "never"],
            "style-js/array-element-newline": ["error", "consistent"],
            "style-js/arrow-parens": ["error", "as-needed", { requireForBlockBody: true }],
            "style-js/brace-style": ["error", "1tbs", { allowSingleLine: true }],
            "style-js/comma-dangle": ["error", trailingComma === "all" ? "always-multiline" : "never"],
            // "style-js/block-spacing": ["error", "always"],
            "style-js/comma-spacing": ["error", { after: true, before: false }],
            "style-js/comma-style": ["error", "last"],
            "style-js/dot-location": ["error", "property"],
            "style-js/eol-last": ["error", "always"],
            "style-js/function-call-argument-newline": ["error", "consistent"],
            "style-js/indent": ["error", tabWidth ?? DEFAULT_STYLE_OPTION.tabWidth, {
                outerIIFEBody: 1, SwitchCase: 1, VariableDeclarator: 1,
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
                beforeLineComment: false,
                ignorePattern: "eslint|global",
            }],
            "style-js/lines-between-class-members": "off",
            "style-js/multiline-comment-style": "off",
            "style-js/multiline-ternary": ["error", "always-multiline"],
            "style-js/no-extra-parens": ["error", "functions"],
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
            "style-js/padded-blocks": "off",

            // this rule does not work
            "style-js/padding-line-between-statements": [
                "error",
                { blankLine: "always", next: "*", prev: "function" },
                { blankLine: "always", next: "function", prev: "*" },
            ],
            "style-js/quote-props": ["error", "as-needed"],
            "style-js/quotes": ["error", singleQuote ? "single" : "double", { avoidEscape: true }],
            "style-js/semi": ["error", semi ? "always" : "never"],
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


            "unicorn/template-indent": ["error", {
                functions: ["dedent", "stripIndent"],
                indent: tabWidth ?? DEFAULT_STYLE_OPTION.tabWidth,
                tags: ["outdent", "dedent", "gql", "sql", "html", "styled"],
            }],
        },
    }
}


export async function jsxStyle(opts: Options): Promise<EslintFlatConfigItem> {
    if (!opts.style) return {}
    if (!opts.jsx) return {}
    const pluginStylisticJsx = await interopDefault(import("@stylistic/eslint-plugin-jsx"))

    return {
        files: [GLOB_JSX, GLOB_TSX],
        name: "rainbowatcher:js:jsx-style",
        rules: {
            ...renameRules(pluginStylisticJsx.configs["all-flat"].rules, { "@stylistic/jsx": "style-jsx" }),
            "style-jsx/jsx-newline": ["error", { allowMultilines: true, prevent: true }],
            "style-jsx/jsx-wrap-multilines": ["error", { return: "parens-new-line" }],
        },
    }
}
