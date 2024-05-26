import { base } from "./configs/base"
import { gitignore } from "./configs/gitignore"
import type { EslintFlatConfigs, Options } from "@rainbowatcher/eslint-config-shared"

export function ignoreConfigs(opts: Options): EslintFlatConfigs {
    return [
        base(),
        gitignore(opts),
    ]
}

export default ignoreConfigs
