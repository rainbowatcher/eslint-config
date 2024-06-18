import { base } from "./configs/base"
import { cli } from "./configs/cli"
import { imports } from "./configs/imports"
import { jsx } from "./configs/jsx"
import { node } from "./configs/node"
import { regexp } from "./configs/regexp"
import { setup } from "./configs/setup"
import { sort } from "./configs/sort"
import { jsxStyle, style } from "./configs/style"
import { test } from "./configs/test"
import { fileName, jsxFileName, unicorn } from "./configs/unicorn"
import type { EslintFlatConfigs, Options } from "@rainbowatcher/eslint-config-shared"

export function jsConfigs(opts: Options): EslintFlatConfigs {
    return [
        setup(opts),
        base(opts),
        jsx(opts),
        style(opts),
        jsxStyle(opts),
        imports(opts),
        sort(opts),
        node(opts),
        unicorn(opts),
        fileName(),
        jsxFileName(),
        regexp(opts),
        test(),
        cli(),
    ]
}

export default jsConfigs
