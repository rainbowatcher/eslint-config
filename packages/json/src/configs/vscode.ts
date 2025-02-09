import type { EslintFlatConfigItem } from "@rainbowatcher/eslint-config-shared"

export function vscode(): EslintFlatConfigItem {
    return {
        files: ["**/.vscode/settings.json", "**/.vscode/extensions.json"],
        name: "rainbowatcher:json:vscode",
        rules: {
            "jsonc/comma-dangle": ["error", "always"],
            "jsonc/no-comments": "off",
        },
    }
}
