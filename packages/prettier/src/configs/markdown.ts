import { GLOB_MARKDOWN, parserPlain } from "@rainbowatcher/eslint-config-shared"
import { prettierOptions } from "../options"
import type { EslintFlatConfigItem, Options } from "@rainbowatcher/eslint-config-shared"

export function markdown(opts: Options): EslintFlatConfigItem {
    if (!opts.style || !opts.markdown) return {}

    return {
        files: [GLOB_MARKDOWN],
        languageOptions: {
            parser: parserPlain,
        },
        name: "rainbowatcher:prettier:markdown",
        rules: {
            "prettier/prettier": ["error", {
                ...prettierOptions,
                parser: "markdown",
                tabWidth: 2,
            }, {
                usePrettierrc: false,
            }],
        },
    }
}
