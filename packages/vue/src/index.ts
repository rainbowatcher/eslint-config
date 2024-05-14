import { baseConfig } from "./configs/base"
import type { EslintFlatConfigs, Options } from "@rainbowatcher/eslint-config-shared"

export function vueConfigs(opts: Options): EslintFlatConfigs {
    if (opts.vue === false) return []
    return [
        baseConfig(opts),
    ]
}

export default vueConfigs
