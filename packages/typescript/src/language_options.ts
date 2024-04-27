import type { Linter } from "eslint"
import tsParser from "@typescript-eslint/parser"

export function getLanguageOptions(): Linter.FlatConfig["languageOptions"] {
    return {
        parser: tsParser,
        parserOptions: {
            sourceType: "module",
            project: ["tsconfig.json"],
            tsconfigRootDir: process.cwd(),
            ecmaFeatures: {
                jsx: true,
            },
        },
    }
}
