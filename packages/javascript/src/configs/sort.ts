import { getFiles } from "../files"
import type { EslintFlatConfigItem, Options } from "@rainbowatcher/eslint-config-shared"

const commonOptions = { ignoreCase: false, order: "asc", type: "alphabetical" } as const

export function sort(opts: Options): EslintFlatConfigItem {

    return {
        files: getFiles(opts),
        name: "rainbowatcher:js:sort",
        rules: {
            ...jsxRules(opts),

            "perfectionist/sort-array-includes": ["error", {
                ...commonOptions, groupKind: "literals-first",
            }],
            "perfectionist/sort-classes": ["error", {
                ...commonOptions,
                customGroups: [],
                groups: [
                    "index-signature",
                    "static-property",
                    "property",
                    "constructor",
                    "static-method",
                    "method",
                    ["get-method", "set-method"],
                    "unknown",
                ],
                partitionByComment: ["region:*", "REGION:*"],
            }],
            "perfectionist/sort-decorators": ["error", commonOptions],
            // partition comment same as region comment in vscode
            "perfectionist/sort-enums": ["error", { partitionByComment: ["region:*", "REGION:*"], ...commonOptions }],
            "perfectionist/sort-exports": ["error", commonOptions],
            "perfectionist/sort-heritage-clauses": ["error", commonOptions],
            "perfectionist/sort-imports": ["error", {
                ...commonOptions,
                // may make it configurable
                environment: "node",
                groups: [
                    "builtin",
                    "external",
                    "internal",
                    "index",
                    "sibling",
                    "parent",
                    "object",
                    "side-effect",
                    "side-effect-style",
                    "style",
                    "unknown",
                    "builtin-type",
                    "type",
                    "internal-type",
                    "index-type",
                    "sibling-type",
                    "parent-type",
                ],
                internalPattern: ["^#", "^~/", "^@/"],
                newlinesBetween: "never",
                sortSideEffects: false,
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
            "perfectionist/sort-modules": "off",
            "perfectionist/sort-named-exports": ["error", { ...commonOptions, groupKind: "values-first" }],
            "perfectionist/sort-named-imports": ["error", { ...commonOptions, groupKind: "values-first", ignoreAlias: false }],
            "perfectionist/sort-object-types": ["error", {
                ...commonOptions,
                customGroups: {},
                groupKind: "mixed",
                groups: [],
                partitionByComment: ["region:*", "REGION:*"],
                partitionByNewLine: false,
            }],
            "perfectionist/sort-objects": ["error", {
                ...commonOptions,
                customGroups: {},
                destructureOnly: false,
                groups: [],
                ignorePattern: [],
                partitionByComment: ["region:*", "REGION:*"],
                partitionByNewLine: true,
                styledComponents: true,
            }],
            "perfectionist/sort-switch-case": ["error", { ...commonOptions }],
            "perfectionist/sort-union-types": ["error", { ...commonOptions, type: "natural" }],
            "perfectionist/sort-variable-declarations": ["error", commonOptions],
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
