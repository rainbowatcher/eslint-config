import type { Linter } from "eslint"
import { GLOB_EXCLUDE } from "../globs"

const ignoreConfig: Linter.FlatConfig = {
    ignores: GLOB_EXCLUDE,
}

export default ignoreConfig
