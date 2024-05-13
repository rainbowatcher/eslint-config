import { interopDefault } from "@rainbowatcher/eslint-config-shared"
import type { EslintFlatConfigItem, Options } from "@rainbowatcher/eslint-config-shared"

export async function gitignoreConfig(opts: Options): Promise<EslintFlatConfigItem> {
    if (opts.gitignore === false) {
        return {}
    }
    const gitignore = await interopDefault(import("eslint-config-flat-gitignore"))
    return gitignore()
}
