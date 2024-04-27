import { GLOB_DTS } from "@rainbowatcher/eslint-config-shared"
import type { Linter } from "eslint"


const dtsConfig: Linter.FlatConfig = {
    name: "rainbowatcher/ts/dts",
    files: [GLOB_DTS],
    rules: {
        "ts/no-unused-vars": "off",
    },
}

export default dtsConfig
