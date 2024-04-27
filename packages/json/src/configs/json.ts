import { GLOB_JSON } from "@rainbowatcher/eslint-config-shared"
import type { ESLint, Linter } from "eslint"
import pluginJsonc from "eslint-plugin-jsonc"

const jsonConfig: Linter.FlatConfig = {
    name: "rainbowatcher/json",
    files: [GLOB_JSON],
    rules: {
        ...pluginJsonc.configs["recommended-with-json"].rules as Linter.RulesRecord,
    },
}

export default jsonConfig
