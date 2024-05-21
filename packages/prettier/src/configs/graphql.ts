import { GLOB_GRAPHQL, parserPlain } from "@rainbowatcher/eslint-config-shared"
import { prettierOptions } from "../options"
import type { EslintFlatConfigItem, Options } from "@rainbowatcher/eslint-config-shared"

export function graphql(opts: Options): EslintFlatConfigItem {
    if (!opts.style || !opts.graphql) return {}
    return {
        files: [GLOB_GRAPHQL],
        languageOptions: {
            parser: parserPlain,
        },
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
