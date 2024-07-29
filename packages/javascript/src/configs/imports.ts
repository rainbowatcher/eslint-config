import { isInEditor } from "@rainbowatcher/eslint-config-shared"
import { getFiles } from "../files"
import type { EslintFlatConfigItem, Options } from "@rainbowatcher/eslint-config-shared"
import type { Linter } from "eslint"

export function imports(opts: Options): EslintFlatConfigItem {
    return {
        files: getFiles({ ...opts, json: false }),
        name: "rainbowatcher:js:imports",
        rules: {
            "no-unused-vars": "off",
            ...pluginAntfuRules,
            ...pluginImportOnRules,
            ...pluginImportOffRules,
            ...pluginUnusedimportRules,
            ...opts.style ? stylisticRules : {},
        },
    }
}

const pluginAntfuRules: Linter.RulesRecord = {
    "antfu/import-dedupe": "error",
    "antfu/no-import-dist": "error",
    "antfu/no-import-node-modules-by-path": "error",
}

const pluginImportOnRules: Linter.RulesRecord = {
    "import/no-absolute-path": "error",
    "import/no-amd": "error",
    "import/no-cycle": "error",
    "import/no-duplicates": "error",
    "import/no-empty-named-blocks": "error",
    "import/no-mutable-exports": "error",
    "import/no-named-default": "error",
    "import/no-self-import": "error",
    "import/no-useless-path-segments": "error",
    "import/no-webpack-loader-syntax": "error",
}

const pluginImportOffRules: Linter.RulesRecord = {
    "import/default": "off",
    "import/extensions": "off",
    "import/group-exports": "off",
    "import/max-dependencies": "off",
    "import/named": "off",
    "import/namespace": "off",
    "import/no-anonymous-default-export": "off",
    "import/no-commonjs": "off",
    "import/no-default-export": "off",
    "import/no-dynamic-require": "off",
    "import/no-internal-modules": "off",
    "import/no-relative-packages": "off",
    "import/no-relative-parent-imports": "off",
    "import/no-restricted-paths": "off",
    "import/no-unassigned-import": "off",
    "import/no-unresolved": "off",
    "import/prefer-default-export": "off",
}

const pluginUnusedimportRules: Linter.RulesRecord = {
    "unused-imports/no-unused-imports": isInEditor ? "off" : "error",
    "unused-imports/no-unused-vars": ["error", {
        args: "after-used",
        argsIgnorePattern: "^_",
        ignoreRestSiblings: true,
        vars: "all",
        varsIgnorePattern: "^_",
    }],
}

const stylisticRules: Linter.RulesRecord = {
    "import/consistent-type-specifier-style": ["error", "prefer-top-level"],
    "import/exports-last": "off",
    "import/first": "error",
    "import/newline-after-import": ["error", { count: 1 }],
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
}
