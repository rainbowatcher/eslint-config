import { GLOB_JSON, GLOB_JSONC, GLOB_JSON5 } from "@rainbowatcher/eslint-config-shared"
import jsonc from "eslint-plugin-jsonc"
import type { Linter } from "eslint"

const jsonBaseConfig: Linter.FlatConfig = {
    name: "rainbowatcher/json/base",
    files: [GLOB_JSON, GLOB_JSONC, GLOB_JSON5],
    languageOptions: {
        parser: jsonc,
    },
    rules: {
        "jsonc/strict": "off",
        "jsonc/no-unused-expressions": "off",
        "jsonc/no-unused-vars": "off",
    },
}

export default jsonBaseConfig
