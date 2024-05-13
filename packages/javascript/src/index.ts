import { base } from "./configs/base"
import { cli } from "./configs/cli"
import { imports } from "./configs/imports"
import { node } from "./configs/node"
import { setup } from "./configs/setup"
import { sort } from "./configs/sort"
import { style } from "./configs/style"
import { test } from "./configs/test"
import { unicorn } from "./configs/unicorn"
import type { EslintFlatConfigs, Options } from "@rainbowatcher/eslint-config-shared"

export function jsConfigs(opts: Options): EslintFlatConfigs {
    return [
        setup(),
        base(opts),
        style(opts),
        imports(opts),
        sort(opts),
        test(),
        node(),
        unicorn(),
        cli(),
    ]
}
