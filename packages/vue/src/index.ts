import type { Linter } from "eslint"
import { isPackageExists } from "local-pkg"
import getBaseConfig from "./configs/base"
import setupConfig from "./configs/setup"

const TS = isPackageExists("typescript")

if (!TS) {
    console.warn("[@rainbowatcher/eslint-config] TypeScript is not installed, fallback to JS only.")
}

const vueEsConfig: Array<Linter.FlatConfig | Promise<Linter.FlatConfig>> = [
    setupConfig,
    getBaseConfig(TS),
]

export default vueEsConfig
