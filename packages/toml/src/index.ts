import { base } from "./configs/base"
import { setup } from "./configs/setup"
import { style } from "./configs/style"
import type { EslintFlatConfigs, Options } from "@rainbowatcher/eslint-config-shared"

export function tomlConfigs(opts: Options): EslintFlatConfigs {
    if (!opts.style) return []
    return [
        setup(opts),
        base(opts),
        style(opts),
    ]
}

export default tomlConfigs
