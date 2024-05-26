import { base } from "./configs/base"
import { style } from "./configs/style"
import type { EslintFlatConfigs, Options } from "@rainbowatcher/eslint-config-shared"

export function vueConfigs(opts: Options): EslintFlatConfigs {
    if (opts.vue === false) return []
    return [
        base(opts),
        style(opts),
    ]
}

export default vueConfigs
