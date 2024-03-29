const { defineConfig } = require("eslint-define-config")

module.exports = defineConfig({
    extends: [
        "plugin:jsonc/recommended-with-jsonc",
        "plugin:jsonc/recommended-with-json",
    ],
    ignorePatterns: [
        "output",
        "out",
        "coverage",
        "public",
        "temp",
        "package-lock.json",
    ],
    overrides: [
        {
            files: ["*.json", "*.json5"],
            parser: "jsonc-eslint-parser",
            rules: {
                "jsonc/array-bracket-spacing": ["error", "never"],
                "jsonc/comma-dangle": ["error", "never"],
                "jsonc/comma-style": ["error", "last"],
                "jsonc/indent": ["error", 4],
                "jsonc/key-spacing": ["error", { beforeColon: false, afterColon: true }],
                "jsonc/no-octal-escape": "error",
                "jsonc/object-curly-newline": ["error", { multiline: true, consistent: true }],
                "jsonc/object-curly-spacing": ["error", "always"],
                "jsonc/object-property-newline": ["error", { allowMultiplePropertiesPerLine: true }],
            },
        },
        {
            files: ["package.json"],
            parser: "jsonc-eslint-parser",
            rules: {
                "jsonc/sort-keys": [
                    "error",
                    {
                        pathPattern: "^$",
                        order: [
                            "publisher",
                            "name",
                            "displayName",
                            "type",
                            "version",
                            "private",
                            "packageManager",
                            "description",
                            "author",
                            "license",
                            "funding",
                            "homepage",
                            "repository",
                            "bugs",
                            "keywords",
                            "categories",
                            "sideEffects",
                            "exports",
                            "main",
                            "module",
                            "unpkg",
                            "jsdelivr",
                            "types",
                            "typesVersions",
                            "bin",
                            "icon",
                            "files",
                            "engines",
                            "activationEvents",
                            "contributes",
                            "scripts",
                            "peerDependencies",
                            "peerDependenciesMeta",
                            "dependencies",
                            "optionalDependencies",
                            "devDependencies",
                            "pnpm",
                            "overrides",
                            "resolutions",
                            "husky",
                            "simple-git-hooks",
                            "lint-staged",
                            "eslintConfig",
                        ],
                    },
                    {
                        pathPattern: "^(?:dev|peer|optional|bundled)?[Dd]ependencies$",
                        order: { type: "asc" },
                    },
                    {
                        pathPattern: "^exports.*$",
                        order: [
                            "types",
                            "require",
                            "import",
                        ],
                    },
                ],
            },
        },
        {
            files: ["tsconfig.*.json"],
            rules: {
                "jsonc/no-comments": "off",
            },
        },
    ],
    rules: {
    // override/add rules settings here, such as:
    // 'jsonc/rule-name': 'error'
    },
})