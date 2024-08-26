import { GLOB_GRAPHQL, parserPlain, resolveAltOption } from "@rainbowatcher/eslint-config-shared"
import { DefaultPrettierOptions } from "../options"
import type { EslintFlatConfigItem, Options } from "@rainbowatcher/eslint-config-shared"

export function graphql(opts: Options): EslintFlatConfigItem {
    if (!opts.style || !opts.graphql) return {}
    const styleOptions = resolveAltOption(opts, "style")
    return {
        files: [GLOB_GRAPHQL],
        languageOptions: {
            parser: parserPlain,
        },
        name: "rainbowatcher:prettier:graphql",
        rules: {
            "prettier/prettier": ["error", {
                ...DefaultPrettierOptions,
                ...styleOptions,
                parser: "graphql",
            }, {
                usePrettierrc: false,
            }],
        },
    }
}
