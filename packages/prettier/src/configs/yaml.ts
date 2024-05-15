import { GLOB_YAML, interopDefault } from "@rainbowatcher/eslint-config-shared"
import { prettierOptions } from "../options"
import type { EslintFlatConfigItem, Options } from "@rainbowatcher/eslint-config-shared"

export async function yaml(opts: Options): Promise<EslintFlatConfigItem> {
    if (!opts.style || !opts.yaml) return {}

    const parserYaml = await interopDefault(import("yaml-eslint-parser"))
    return {
        files: [GLOB_YAML],
        languageOptions: {
            parser: parserYaml,
        },
        name: "rainbowatcher:prettier:yaml",
        rules: {
            "prettier/prettier": ["error", {
                ...prettierOptions,
                parser: "yaml",

                // vscode always treats tab as 2 spaces for yaml file
                tabWidth: 2,
            }, {
                usePrettierrc: false,
            }],
        },
    }
}
