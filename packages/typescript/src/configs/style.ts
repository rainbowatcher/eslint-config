import {
    DEFAULT_STYLE_OPTION, GLOB_TS, GLOB_TSX, GLOB_VUE, interopDefault, renameRules, resolveAltOption,
} from "@rainbowatcher/eslint-config-shared"
import type { EslintFlatConfigItem, Options } from "@rainbowatcher/eslint-config-shared"

export async function style(opts: Options): Promise<EslintFlatConfigItem> {
    if (!opts.style) return {}
    const [pluginStylisticTs, pluginStylisticPlus] = await Promise.all([
        interopDefault(import("@stylistic/eslint-plugin-ts")),
        interopDefault(import("@stylistic/eslint-plugin-plus")),
    ])
    const files = opts.jsx ? [GLOB_TS, GLOB_TSX] : [GLOB_TS]
    opts.vue && files.push(GLOB_VUE)

    const { semi, singleQuote, tabWidth, trailingComma } = resolveAltOption(opts, "style", DEFAULT_STYLE_OPTION)
    return {
        files,
        name: "rainbowatcher:ts:style",
        plugins: {
            "style-ex": pluginStylisticPlus,
            "style-ts": pluginStylisticTs,
        },
        rules: {
            ...renameRules(pluginStylisticTs.configs["all-flat"].rules, { "@stylistic/ts": "style-ts" }),

            // "style-ts/func-call-spacing": ["error", "never"],
            // "style-ts/comma-spacing": ["error", { after: true, before: false }],
            // "style-ts/key-spacing": ["error", { afterColon: true, beforeColon: false }],
            // "style-ts/space-infix-ops": "error",
            "style-ex/type-generic-spacing": "error",
            // "style-ts/block-spacing": ["error", "always"],
            "style-ex/type-named-tuple-spacing": "error",

            "style-js/brace-style": "off",
            "style-js/comma-dangle": "off",
            "style-js/comma-spacing": "off",
            "style-js/function-call-spacing": "off",
            "style-js/indent": "off",
            "style-js/lines-around-comment": "off",
            "style-js/no-extra-parens": "off",
            "style-js/object-curly-newline": "off",
            "style-js/object-curly-spacing": "off",
            "style-js/object-property-newline": "off",
            "style-js/quotes": "off",
            "style-js/semi": "off",
            "style-js/space-infix-ops": "off",
            "style-ts/brace-style": ["error", "1tbs", { allowSingleLine: true }],
            "style-ts/comma-dangle": ["error", trailingComma === "all" ? "always-multiline" : "never"],
            "style-ts/function-call-spacing": ["error", "never"],
            "style-ts/indent": ["error", tabWidth ?? DEFAULT_STYLE_OPTION.tabWidth, {
                outerIIFEBody: 1, SwitchCase: 1, VariableDeclarator: 1,
            }],
            "style-ts/lines-around-comment": ["error", {
                afterBlockComment: false,
                afterHashbangComment: true,
                afterLineComment: false,
                allowArrayEnd: false,
                allowArrayStart: true,
                allowBlockEnd: false,
                allowBlockStart: true,
                allowClassEnd: false,
                allowClassStart: true,
                allowEnumEnd: false,
                allowEnumStart: true,
                allowInterfaceEnd: false,
                allowInterfaceStart: true,
                allowModuleEnd: false,
                allowModuleStart: true,
                allowObjectEnd: false,
                allowObjectStart: true,
                allowTypeEnd: false,
                allowTypeStart: true,
                beforeBlockComment: true,
                beforeLineComment: false,
                ignorePattern: "eslint|global",
            }],
            // "style-ts/keyword-spacing": "error",
            "style-ts/lines-between-class-members": "off",
            "style-ts/member-delimiter-style": ["error", { multiline: { delimiter: "none" } }],
            // don't need this, because we clear semi in source code
            // "style-ts/no-extra-semi": "error",
            "style-ts/no-extra-parens": ["error", "functions"],
            "style-ts/object-curly-newline": ["error", {
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
                TSInterfaceBody: {
                    consistent: true, minProperties: 4, multiline: true,
                },
                TSTypeLiteral: {
                    consistent: true, minProperties: 4, multiline: true,
                },
            }],
            "style-ts/object-curly-spacing": ["error", "always"],
            "style-ts/object-property-newline": ["error", { allowAllPropertiesOnSameLine: true }],
            "style-ts/quote-props": ["error", "as-needed"],
            "style-ts/quotes": ["error", singleQuote ? "single" : "double", { allowTemplateLiterals: true, avoidEscape: true }],
            "style-ts/semi": ["error", semi ? "always" : "never"],
            "style-ts/space-before-blocks": "error",
            "style-ts/space-before-function-paren": ["error", {
                anonymous: "always", asyncArrow: "always", named: "never",
            }],
            "style-ts/type-annotation-spacing": "error",
        },
    }
}
