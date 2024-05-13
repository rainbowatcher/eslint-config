import type { EslintFlatConfigItem } from "@rainbowatcher/eslint-config-shared"

export function cli(): EslintFlatConfigItem {
    return {
        files: ["**/bin/*.?([cm])js"],
        name: "rainbowatcher:js:cli",
        rules: {
            "antfu/no-import-dist": "off",
        },
    }
}
