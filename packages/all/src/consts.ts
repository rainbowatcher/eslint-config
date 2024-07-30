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

/* abbrs of modules */
export const abbrs = {
    javascript: "js",
    markdown: "md",
    typescript: "ts",
}

/* modules that has create eslint config */
export const modules = [
    "ignore",
    "javascript",
    "json",
    "markdown",
    "prettier",
    "unocss",
    "toml",
    "typescript",
    "vue",
] as const

/* languages that prettier can format */
export const prettierLintLangs = [
    "markdown",
    "graphql",
    "yaml",
    "css",
] as const

export const configPrefix = "@rainbowatcher/eslint-config"
