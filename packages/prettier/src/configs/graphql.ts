import { prettierOptions } from "../options"
import type { EslintFlatConfigItem, Options } from "@rainbowatcher/eslint-config-shared"

export function toml(opts: Options): EslintFlatConfigItem {
    if (!opts.style || !opts.graphql) return {}
    return {
        name: "rainbowatcher:prettier:graphql",
        rules: {
            "prettier/prettier": ["error", {
                ...prettierOptions,
                parser: "graphql",
            }, {
                usePrettierrc: false,
            }],
        },
    }
}
