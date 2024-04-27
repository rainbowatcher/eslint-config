import type { Linter } from "eslint"
import { GLOB_JSON, GLOB_JSON5, GLOB_JSONC } from "@rainbowatcher/eslint-config-shared"

export default function jsonStyleConfig(): Linter.FlatConfig {
    return {
        name: "rainbowatcher/json/style",
        files: [GLOB_JSON, GLOB_JSONC, GLOB_JSON5],
        rules: {
            "jsonc/array-bracket-spacing": ["error", "never"],
            "jsonc/comma-dangle": ["error", "never"],
            "jsonc/comma-style": ["error", "last"],
            "jsonc/indent": ["error", 4],
            "jsonc/key-spacing": ["error", { afterColon: true, beforeColon: false }],
            "jsonc/object-curly-newline": ["error", { consistent: true, multiline: true }],
            "jsonc/object-curly-spacing": ["error", "always"],
            "jsonc/object-property-newline": ["error", { allowMultiplePropertiesPerLine: true }],
            "jsonc/quote-props": "error",
            "jsonc/quotes": "error",
            "jsonc/array-bracket-newline": "off",
            "jsonc/array-element-newline": "off",
            "jsonc/no-floating-decimal": "off",
            "jsonc/space-unary-ops": "off",
        },
    }
}
