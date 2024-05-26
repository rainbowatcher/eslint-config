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
        },
    }
}
