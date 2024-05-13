import { GLOB_DTS } from "@rainbowatcher/eslint-config-shared"
import type { EslintFlatConfigItem } from "@rainbowatcher/eslint-config-shared"

export function dts(): EslintFlatConfigItem {
    return {
        files: [GLOB_DTS],
        name: "rainbowatcher:ts:dts",
        rules: {
            "ts/no-unused-vars": "off",
        },
    }
}
