import { isInEditor } from "@rainbowatcher/eslint-config-shared"
import { getFiles } from "../files"
import type { EslintFlatConfigItem, Options } from "@rainbowatcher/eslint-config-shared"

export function imports(opts: Options): EslintFlatConfigItem {
    return {
        files: getFiles(opts),
        name: "rainbowatcher:js:imports",
        rules: {
            "antfu/import-dedupe": "error",
            "antfu/no-import-dist": "error",
            "antfu/no-import-node-modules-by-path": "error",

            "import/consistent-type-specifier-style": ["error", "prefer-top-level"],
            "import/first": "error",
            "import/newline-after-import": ["error", { count: 1 }],
            "import/no-duplicates": "error",
            "import/no-mutable-exports": "error",
            "import/no-named-default": "error",
            "import/no-self-import": "error",
            "import/no-webpack-loader-syntax": "error",
            "import/order": ["error", {
                alphabetize: {
                    caseInsensitive: true,
                    order: "asc",
                },
                groups: [
                    "builtin",
                    "external",
                    "internal",
                    "parent",
                    "sibling",
                    "index",
                    "object",
                    "type",
                ],
                pathGroups: [{ group: "internal", pattern: "{{@,~}/,#}**" }],
                pathGroupsExcludedImportTypes: ["type"],
            }],

            "unused-imports/no-unused-imports": isInEditor ? "off" : "error",
            "unused-imports/no-unused-vars": ["error", {
                args: "after-used",
                argsIgnorePattern: "^_",
                ignoreRestSiblings: true,
                vars: "all",
                varsIgnorePattern: "^_",
            }],
        },
    }
}
