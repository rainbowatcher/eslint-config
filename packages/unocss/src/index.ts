import { base } from "./configs/base"
import type { EslintFlatConfigs, Options } from "@rainbowatcher/eslint-config-shared"

export function unocssConfigs(opts: Options): EslintFlatConfigs {
    return [
        base(opts),
    ]
}

export default unocssConfigs
