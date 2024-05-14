import { baseConfig } from "./configs/base"
import { parser } from "./configs/parser"
import { processor } from "./configs/processor"
import { setup } from "./configs/setup"
import type { EslintFlatConfigs, Options } from "@rainbowatcher/eslint-config-shared"

export function mdConfigs(opts: Options): EslintFlatConfigs {
    if (opts.markdown === false) return []
    return [
        setup(),
        processor(),
        parser(),
        baseConfig(),
    ]
}

export default mdConfigs
