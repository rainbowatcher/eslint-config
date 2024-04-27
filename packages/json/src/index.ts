import type { Linter } from "eslint"
import jsonSetup from "./configs/setup"
import jsonBaseConfig from "./configs/base"
import jsonConfig from "./configs/json"
import json5Config from "./configs/json5"
import jsoncConfig from "./configs/jsonc"
import pkgJsonConfig from "./configs/pkg_json"
import tsconfigConfig from "./configs/tsconfig"
import vscodeEslintConfig from "./configs/vscode"
import jsonStyleConfig from "./configs/style"

const jsonEsConfig: Linter.FlatConfig[] = [
    jsonSetup,
    jsonBaseConfig,
    jsonConfig,
    json5Config,
    jsoncConfig,
    vscodeEslintConfig(),
    jsonStyleConfig(),
    // ref to: <https://github.com/antfu/eslint-config/blob/9de13a1cfeb1efafaf2d3813621fc3eacbffe803/src/configs/sort.ts>
    pkgJsonConfig,
    tsconfigConfig,
]

export default jsonEsConfig
