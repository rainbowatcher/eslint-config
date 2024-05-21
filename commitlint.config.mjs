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
                "typescript",
                "unocss",
                "vue",
            ],
        ],
    },
}
