import type { Linter } from "eslint"

export default function vscodeEslintConfig(): Linter.FlatConfig {
    return {
        files: ["**/.vscode/settings.json", "**/.vscode/extensions.json"],
        name: "rainbowatcher/vscode/settings.json",
        rules: {
            "jsonc/no-comments": "off",
        },
    }
}
