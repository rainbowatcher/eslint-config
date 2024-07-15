import { GLOB_TOML, interopDefault } from "@rainbowatcher/eslint-config-shared"
import type { EslintFlatConfigItem, Options } from "@rainbowatcher/eslint-config-shared"


export async function base(opts: Options): Promise<EslintFlatConfigItem> {
    if (!opts.toml) return {}

    const parserToml = await interopDefault(import("toml-eslint-parser"))

    return {
        files: [GLOB_TOML],
        languageOptions: {
            parser: parserToml,
        },
        name: "rainbowatcher:toml:base",
        rules: {
            "toml/comma-style": "error",
            "toml/keys-order": "error",
            "toml/no-space-dots": "error",
            "toml/no-unreadable-number-separator": "error",
            "toml/precision-of-fractional-seconds": "error",
            "toml/precision-of-integer": "error",
            "toml/tables-order": "error",

            ...opts.vue
                ? {
                    "toml/vue-custom-block/no-parsing-error": "error",
                }
                : {},
        },
    }
}
