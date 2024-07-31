import { interopDefault } from "@rainbowatcher/eslint-config-shared"
import { getFiles } from "../files"
import type { EslintFlatConfigItem, Options } from "@rainbowatcher/eslint-config-shared"
import type { Linter } from "eslint"

export async function sort(opts: Options): Promise<EslintFlatConfigItem> {
    const pluginPerfectionist = await interopDefault(import("eslint-plugin-perfectionist"))

    const commonOptions = { ignoreCase: true, order: "asc", type: "natural" } as const
    return {
        files: getFiles(opts),
        name: "rainbowatcher:js:sort",
        rules: {
            ...pluginPerfectionist.configs["recommended-natural"].rules as Linter.RulesRecord,
            "perfectionist/sort-array-includes": ["error", {
                groupKind: "literals-first", ignoreCase: false, order: "asc", type: "natural",
            }],
            "perfectionist/sort-imports": ["error", {
                ...commonOptions,
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
                internalPattern: ["#*/*", "~/**", "@/**"],
                newlinesBetween: "never",
            }],
            "perfectionist/sort-vue-attributes": "off",
        },
    }
}
