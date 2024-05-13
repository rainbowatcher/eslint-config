import { GLOB_JSON, GLOB_JSON5, GLOB_JSONC } from "@rainbowatcher/eslint-config-shared"
import type { EslintFlatConfigItem, Options } from "@rainbowatcher/eslint-config-shared"

export function style(opts: Options): EslintFlatConfigItem {
    if (!opts.style) return {}

    const files = [GLOB_JSON, GLOB_JSONC, GLOB_JSON5]

    return {
        files,
        name: "rainbowatcher:json:style",
        rules: {
            "jsonc/array-bracket-newline": "off",
            "jsonc/array-bracket-spacing": ["error", "never"],
            "jsonc/array-element-newline": "off",
            "jsonc/comma-dangle": "off",
            "jsonc/comma-style": ["error", "last"],
            "jsonc/indent": ["error", 4],
            "jsonc/key-spacing": ["error", { afterColon: true, beforeColon: false }],
            "jsonc/no-floating-decimal": "off",
            "jsonc/object-curly-newline": ["error", { consistent: true, minProperties: 4, multiline: true }],
            "jsonc/object-curly-spacing": ["error", "always"],
            "jsonc/object-property-newline": ["error", { allowMultiplePropertiesPerLine: true }],
            "jsonc/quote-props": "error",
            "jsonc/quotes": "error",
            "jsonc/space-unary-ops": "off",
        },
    }
}
