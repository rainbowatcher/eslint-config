import type { EslintFlatConfigItem } from "@rainbowatcher/eslint-config-shared"

export function cli(): EslintFlatConfigItem {
    return {
        files: ["**/bin/*.?([cm])js", "**/cli.?([cm])[jt]s"],
        name: "rainbowatcher:js:cli",
        rules: {
            "antfu/no-import-dist": "off",
            "unicorn/filename-case": "off",
            "unicorn/no-process-exit": "off",
            "unicorn/prefer-module": "off",
        },
    }
}
