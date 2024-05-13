import type { Linter } from "eslint"

export function vscode(): Linter.FlatConfig {
    return {
        files: ["**/.vscode/settings.json", "**/.vscode/extensions.json"],
        name: "rainbowatcher:json:vscode",
        rules: {
            "jsonc/comma-dangle": ["error", "always"],
            "jsonc/no-comments": "off",
        },
    }
}
