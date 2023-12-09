module.exports = {
    extends: ["@commitlint/config-conventional"],
    rules: {
        "scope-enum": [
            2,
            "always",
            ["vue", "javascript", "typescript", "json", "all"],
        ],
    },
}