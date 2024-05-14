import { baseConfig } from "./configs/base"
import { gitignoreConfig } from "./configs/gitignore"
import type { EslintFlatConfigs, Options } from "@rainbowatcher/eslint-config-shared"

export function ignoreConfigs(opts: Options): EslintFlatConfigs {
    return [
        baseConfig(),
        gitignoreConfig(opts),
    ]
}

export default ignoreConfigs
