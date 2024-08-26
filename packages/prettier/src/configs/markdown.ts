import { GLOB_MARKDOWN, parserPlain, resolveAltOption } from "@rainbowatcher/eslint-config-shared"
import { DefaultPrettierOptions } from "../options"
import type { EslintFlatConfigItem, Options } from "@rainbowatcher/eslint-config-shared"

export function markdown(opts: Options): EslintFlatConfigItem {
    if (!opts.style || !opts.markdown) return {}
    const styleOptions = resolveAltOption(opts, "style")
    return {
        files: [GLOB_MARKDOWN],
        languageOptions: {
            parser: parserPlain,
        },
        name: "rainbowatcher:prettier:markdown",
        rules: {
            "prettier/prettier": ["error", {
                ...DefaultPrettierOptions,
                ...styleOptions,
                parser: "markdown",
                tabWidth: 2,
            }, {
                usePrettierrc: false,
            }],
        },
    }
}
