import { base, typeAware } from "./configs/base"
import { dts } from "./configs/dts"
import { tsParserConfig, vueParserConfig } from "./configs/parser"
import { setup } from "./configs/setup"
import { style } from "./configs/style"
import { tsx } from "./configs/tsx"
import type { EslintFlatConfigs, Options } from "@rainbowatcher/eslint-config-shared"

export function tsConfigs(opts: Options): EslintFlatConfigs {
    if (opts.typescript === false) return []

    return [
        setup(),
        tsParserConfig(opts),
        vueParserConfig(opts),
        typeAware(opts),
        base(opts),
        style(opts),
        dts(),
        tsx(),
    ]
}
