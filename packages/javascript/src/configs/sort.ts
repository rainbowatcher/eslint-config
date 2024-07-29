import { interopDefault } from "@rainbowatcher/eslint-config-shared"
import { getFiles } from "../files"
import type { EslintFlatConfigItem, Options } from "@rainbowatcher/eslint-config-shared"
import type { Linter } from "eslint"

export async function sort(opts: Options): Promise<EslintFlatConfigItem> {
    const pluginPerfectionist = await interopDefault(import("eslint-plugin-perfectionist"))
    return {
        files: getFiles(opts),
        name: "rainbowatcher:js:sort",
        rules: {
            ...pluginPerfectionist.configs["recommended-natural"].rules as Linter.RulesRecord,
            "perfectionist/sort-array-includes": ["error", {
                groupKind: "literals-first", ignoreCase: false, order: "asc", type: "natural",
            }],
            "perfectionist/sort-imports": "off",
            "perfectionist/sort-vue-attributes": "off",
        },
    }
}
