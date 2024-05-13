import { GLOB_MARKDOWN, parserPlain } from "@rainbowatcher/eslint-config-shared"
import type { EslintFlatConfigItem } from "@rainbowatcher/eslint-config-shared"

export function parser(): EslintFlatConfigItem {
    return {
        files: [GLOB_MARKDOWN],
        languageOptions: {
            parser: parserPlain,
        },
        name: "rainbowatcher:markdown:parser",
    }
}
