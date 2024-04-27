import type { Linter } from "eslint"
import tsSetup from "./configs/setup"
import { tsStyleConfig, tsStyleExtendJsConfig } from "./configs/style"
import tsxConfig from "./configs/tsx"
import dtsConfig from "./configs/dts"
import tsBaseConfig from "./configs/base"
import { ignoreConfig } from "@rainbowatcher/eslint-config-shared"

const tsEsConfig: Linter.FlatConfig[] = [
    ignoreConfig,
    tsSetup,
    tsStyleExtendJsConfig(),
    tsStyleConfig,
    tsBaseConfig,
    dtsConfig,
    tsxConfig,
]

export {
    tsSetup,
    tsStyleConfig,
    tsBaseConfig,
    dtsConfig,
    tsxConfig,
}
export default tsEsConfig
