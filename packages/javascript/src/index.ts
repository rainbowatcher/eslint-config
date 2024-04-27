import type { Linter } from "eslint"
import { ignoreConfig } from "@rainbowatcher/eslint-config-shared"
import jsConfig from "./configs/base"
import jsStyleConfig from "./configs/style"


const jsEsConfig: Linter.FlatConfig[] = [
    ignoreConfig,
    jsConfig,
    jsStyleConfig,
]

export {
    jsConfig,
    jsStyleConfig,
}
export default jsEsConfig
