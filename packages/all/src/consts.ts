export const legacyEslintConfigNames = [
    ".eslintrc",
    ".eslintrc.js",
    ".eslintrc.cjs",
    ".eslintrc.yaml",
    ".eslintrc.yml",
    ".eslintrc.json",
]
export const validEslintConfigNames = [
    ...legacyEslintConfigNames,
    "eslint.config.js",
    "eslint.config.cjs",
    "eslint.config.mjs",
]
export const abbrs = {
    javascript: "js",
    markdown: "md",
    typescript: "ts",
}

export const modules = [
    "ignore",
    "javascript",
    "json",
    "markdown",
    "prettier",
    "typescript",
    "vue",
] as const

export const prettierLintLangs = [
    "markdown",
    "graphql",
    "yaml",
    "css",
] as const

export const configPrefix = "@rainbowatcher/eslint-config"
