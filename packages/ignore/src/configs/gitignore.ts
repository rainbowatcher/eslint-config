import { interopDefault } from "@rainbowatcher/eslint-config-shared"
import type { EslintFlatConfigItem, Options } from "@rainbowatcher/eslint-config-shared"

export async function gitignore(opts: Options): Promise<EslintFlatConfigItem> {
    if (opts.gitignore === false) {
        return {}
    }
    const configGitignore = await interopDefault(import("eslint-config-flat-gitignore"))
    return configGitignore({ strict: false })
}
