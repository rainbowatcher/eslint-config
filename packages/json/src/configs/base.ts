import {
    GLOB_JSON, GLOB_JSON5, GLOB_JSONC, interopDefault,
} from "@rainbowatcher/eslint-config-shared"
import type { EslintFlatConfigItem } from "@rainbowatcher/eslint-config-shared"

export async function base(): Promise<EslintFlatConfigItem> {
    const files = [GLOB_JSON, GLOB_JSONC, GLOB_JSON5]
    const parserJsonc = await interopDefault(import("jsonc-eslint-parser"))

    return {
        files,
        languageOptions: {
            parser: parserJsonc,
        },
        name: "rainbowatcher:json:rules",
        rules: {
            "jsonc/no-bigint-literals": "error",
            "jsonc/no-binary-expression": "error",
            "jsonc/no-binary-numeric-literals": "error",

            "jsonc/no-dupe-keys": "error",
            "jsonc/no-escape-sequence-in-identifier": "error",
            "jsonc/no-floating-decimal": "error",
            "jsonc/no-hexadecimal-numeric-literals": "error",
            "jsonc/no-infinity": "error",
            "jsonc/no-multi-str": "error",
            "jsonc/no-nan": "error",
            "jsonc/no-number-props": "error",
            "jsonc/no-numeric-separators": "error",
            "jsonc/no-octal": "error",
            "jsonc/no-octal-escape": "error",
            "jsonc/no-octal-numeric-literals": "error",
            "jsonc/no-parenthesized": "error",
            "jsonc/no-plus-sign": "error",
            "jsonc/no-regexp-literals": "error",
            "jsonc/no-sparse-arrays": "error",
            "jsonc/no-template-literals": "error",
            "jsonc/no-undefined-value": "error",
            "jsonc/no-unicode-codepoint-escapes": "error",
            "jsonc/no-unused-expressions": "off",
            "jsonc/no-unused-vars": "off",
            "jsonc/no-useless-escape": "error",
            "jsonc/space-unary-ops": "error",
            "jsonc/strict": "off",
            "jsonc/valid-json-number": "error",
            "jsonc/vue-custom-block/no-parsing-error": "error",
        },
    }
}
