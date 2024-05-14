export default {
    extends: ["@commitlint/config-conventional"],
    rules: {
        "scope-enum": [
            2,
            "always",
            [
                "all",
                "javascript",
                "json",
                "markdown",
                "prettier",
                "typescript",
                "vue",
            ],
        ],
    },
}
