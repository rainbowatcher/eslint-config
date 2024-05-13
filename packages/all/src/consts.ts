export const legacyEslintConfigNames = [
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

export const configPrefix = "@rainbowatcher/eslint-config"
