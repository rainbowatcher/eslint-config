export default {
    extends: ["@commitlint/config-conventional"],
    rules: {
        "scope-enum": [
            2,
            "always",
            [
                "all",
                "ignore",
                "javascript",
                "json",
                "markdown",
                "prettier",
                "shared",
                "toml",
                "typescript",
                "unocss",
                "vue",
            ],
        ],
    },
}
