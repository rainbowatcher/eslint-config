import { GLOB_YAML } from "@rainbowatcher/eslint-config-shared"
import { prettierOptions } from "../options"
import type { EslintFlatConfigItem, Options } from "@rainbowatcher/eslint-config-shared"

export function css(opts: Options): EslintFlatConfigItem {
    if (!opts.style || !opts.yaml) return {}
    return {
        files: [GLOB_YAML],
        name: "rainbowatcher:prettier:yaml",
        rules: {
            "prettier/prettier": ["error", {
                ...prettierOptions,
                parser: "yaml",
            }, {
                usePrettierrc: false,
            }],
        },
    }
}
