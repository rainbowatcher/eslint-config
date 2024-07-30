export const LEGACY_ESLINT_CONFIG_NAMES = [
    ".eslintrc",
    ".eslintrc.js",
    ".eslintrc.cjs",
    ".eslintrc.yaml",
    ".eslintrc.yml",
    ".eslintrc.json",
]

export const VALID_ESLINT_CONFIG_NAMES = [
    ...LEGACY_ESLINT_CONFIG_NAMES,
    "eslint.config.js",
    "eslint.config.cjs",
    "eslint.config.mjs",
]

/* abbrs of modules */
export const ABBRS = {
    javascript: "js",
    markdown: "md",
    typescript: "ts",
}

/* modules that has create eslint config */
export const MODULES = [
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
export const PRETTIER_LINT_LANGS = [
    "markdown",
    "graphql",
    "yaml",
    "css",
] as const

export const CONFIG_PREFIX = "@rainbowatcher/eslint-config"

export const DEFINE_CONFIG = "defineConfig"
