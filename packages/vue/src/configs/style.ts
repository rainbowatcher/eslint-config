import { DEFAULT_STYLE_OPTION, GLOB_VUE, resolveAltOption } from "@rainbowatcher/eslint-config-shared"
import type { EslintFlatConfigItem, Options } from "@rainbowatcher/eslint-config-shared"

export function style(opts: Options): EslintFlatConfigItem {
    if (!opts.style) return {}

    const { indent } = resolveAltOption(opts, "style", DEFAULT_STYLE_OPTION)!
    return {
        files: [GLOB_VUE],
        name: "rainbowatcher:vue:style",
        rules: {
            "vue/array-bracket-spacing": ["error", "never"],
            "vue/arrow-spacing": ["error", { after: true, before: true }],
            "vue/block-spacing": ["error", "always"],
            "vue/block-tag-newline": ["error", {
                multiline: "always",
                singleline: "always",
            }],
            "vue/brace-style": ["error", "stroustrup", { allowSingleLine: true }],
            "vue/comma-dangle": ["error", "always-multiline"],
            "vue/comma-spacing": ["error", { after: true, before: false }],
            "vue/comma-style": ["error", "last"],
            "vue/html-comment-content-spacing": ["error", "always", {
                exceptions: ["-"],
            }],
            "vue/html-indent": ["error", indent],
            "vue/key-spacing": ["error", { afterColon: true, beforeColon: false }],
            "vue/keyword-spacing": ["error", { after: true, before: true }],
            "vue/object-curly-newline": "off",
            "vue/object-curly-spacing": ["error", "always"],
            "vue/object-property-newline": ["error", { allowMultiplePropertiesPerLine: true }],
            "vue/operator-linebreak": ["error", "before"],
            "vue/padding-line-between-blocks": ["error", "always"],
            "vue/quote-props": ["error", "consistent-as-needed"],
            "vue/space-in-parens": ["error", "never"],
            "vue/template-curly-spacing": "error",
        },
    }
}
