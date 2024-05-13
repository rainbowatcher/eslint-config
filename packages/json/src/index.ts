import { base } from "./configs/base"
import { packageJson } from "./configs/pkg_json"
import { setup } from "./configs/setup"
import { style } from "./configs/style"
import { tsconfig } from "./configs/tsconfig"
import { vscode } from "./configs/vscode"
import type { EslintFlatConfigs, Options } from "@rainbowatcher/eslint-config-shared"

export function jsonConfigs(opts: Options): EslintFlatConfigs {
    if (opts.json === false) return []
    return [
        setup(),
        base(),
        style(opts),
        // ref to: <https://github.com/antfu/eslint-config/blob/9de13a1cfeb1efafaf2d3813621fc3eacbffe803/src/configs/sort.ts>
        packageJson(),
        tsconfig(),
        vscode(),
    ]
}
