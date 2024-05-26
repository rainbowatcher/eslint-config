import { interopDefault } from "@rainbowatcher/eslint-config-shared"
import { getFiles } from "../files"
import type { EslintFlatConfigItem, Options } from "@rainbowatcher/eslint-config-shared"

export async function regexp(opts: Options): Promise<EslintFlatConfigItem> {
    const pluginRegexp = await interopDefault(import("eslint-plugin-regexp"))

    return {
        files: getFiles(opts),
        name: "rainbowatcher:js:regexp",
        rules: {
            ...pluginRegexp.configs.recommended.rules,
            "regexp/match-any": ["error", {
                allows: [
                    // eslint-disable-next-line unicorn/prefer-string-raw
                    "[\\S\\s]", "dotAll", "[^]",
                ],
            }],
            // we do want turn on this rule, but it can lead unwanted false positives
            "regexp/no-super-linear-backtracking": "off",
        },
    }
}
