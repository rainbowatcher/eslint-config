import { DEFAULT_STYLE_OPTION, resolveAltOption } from "@rainbowatcher/eslint-config-shared"
import type { EslintFlatConfigItem, Options } from "@rainbowatcher/eslint-config-shared"

export function style(opts: Options): EslintFlatConfigItem {
    if (!opts.toml || !opts.style) return {}

    const { indent } = resolveAltOption(opts, "style", DEFAULT_STYLE_OPTION)!
    return {
        name: "rainbowatcher:toml:style",
        rules: {
            "toml/array-bracket-newline": "error",
            "toml/array-bracket-spacing": ["error", "never"],
            "toml/array-element-newline": ["error", "consistent"],
            "toml/indent": ["error", indent],
            "toml/inline-table-curly-spacing": "error",
            "toml/key-spacing": "error",
            "toml/no-space-dots": "error",
            "toml/padding-line-between-pairs": "off",
            "toml/padding-line-between-tables": "error",
            "toml/precision-of-fractional-seconds": "error",
            "toml/quoted-keys": "error",
            "toml/spaced-comment": "error",
            "toml/table-bracket-spacing": "error",
            "toml/tables-order": "error",
        },
    }
}
