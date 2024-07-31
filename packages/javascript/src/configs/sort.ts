import { getFiles } from "../files"
import type { EslintFlatConfigItem, Options } from "@rainbowatcher/eslint-config-shared"

const commonOptions = { ignoreCase: true, order: "asc", type: "alphabetical" } as const

export function sort(opts: Options): EslintFlatConfigItem {

    return {
        files: getFiles(opts),
        name: "rainbowatcher:js:sort",
        rules: {
            ...jsxRules(opts),

            "perfectionist/sort-array-includes": ["error", {
                groupKind: "literals-first", ignoreCase: false, order: "asc", type: "natural",
            }],
            "perfectionist/sort-classes": ["error", {
                ...commonOptions,
                customGroups: {},
                groups: [
                    "index-signature",
                    "static-property",
                    "private-property",
                    "property",
                    "constructor",
                    "static-method",
                    "private-method",
                    ["get-method", "set-method"],
                    "method",
                    "unknown",
                ],
                partitionByComment: false,
            }],
            // partition comment same as region comment in vscode
            "perfectionist/sort-enums": ["error", { partitionByComment: "#region", ...commonOptions }],
            // TODO: enable it when support astro
            // "perfectionist/sort-astro-attributes": "off",
            "perfectionist/sort-exports": ["error", commonOptions],
            "perfectionist/sort-imports": ["error", {
                ...commonOptions,
                // may make it configurable
                environment: "node",
                groups: [
                    "builtin",
                    "external",
                    "internal",
                    "index",
                    "parent",
                    "sibling",
                    "object",
                    "unknown",
                    "internal-type",
                    "type",
                    "index-type",
                    "parent-type",
                    "sibling-type",
                ],
                internalPattern: ["#**", "~/**", "@/**"],
                newlinesBetween: "never",
            }],
            "perfectionist/sort-interfaces": ["error", {
                ...commonOptions,
                customGroups: {},
                groupKind: "mixed",
                groups: [],
                ignorePattern: [],
                partitionByNewLine: false,
            }],
            "perfectionist/sort-intersection-types": ["error", { ...commonOptions, groups: [] }],
            "perfectionist/sort-maps": ["error", commonOptions],
            "perfectionist/sort-named-exports": ["error", { ...commonOptions, groupKind: "values-first" }],
            "perfectionist/sort-named-imports": ["error", { ...commonOptions, groupKind: "values-first", ignoreAlias: false }],
            "perfectionist/sort-object-types": ["error", {
                ...commonOptions,
                customGroups: {},
                groupKind: "mixed",
                groups: [],
                partitionByNewLine: false,
            }],
            "perfectionist/sort-objects": ["error", {
                ...commonOptions,
                customGroups: {},
                customIgnore: [],
                groups: [],
                ignorePattern: [],
                partitionByComment: "#region",
                partitionByNewLine: false,
                styledComponents: true,
            }],
            "perfectionist/sort-switch-case": ["error", commonOptions],
            "perfectionist/sort-union-types": ["error", { ...commonOptions, groups: [] }],
            "perfectionist/sort-variable-declarations": ["error", commonOptions],
            "perfectionist/sort-vue-attributes": "off",
        },
    }
}

function jsxRules(opts: Options): EslintFlatConfigItem["rules"] {
    if (!opts.jsx) return {}
    return {
        "perfectionist/sort-jsx-props": ["error", {
            ...commonOptions, customGroups: {}, groups: [], ignorePattern: [],
        }],
    }
}
