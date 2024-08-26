import { GLOB_YAML, interopDefault, resolveAltOption } from "@rainbowatcher/eslint-config-shared"
import { DefaultPrettierOptions } from "../options"
import type { EslintFlatConfigItem, Options } from "@rainbowatcher/eslint-config-shared"

export async function yaml(opts: Options): Promise<EslintFlatConfigItem> {
    if (!opts.style || !opts.yaml) return {}

    const parserYaml = await interopDefault(import("yaml-eslint-parser"))
    const styleOptions = resolveAltOption(opts, "style")
    return {
        files: [GLOB_YAML],
        languageOptions: {
            parser: parserYaml,
        },
        name: "rainbowatcher:prettier:yaml",
        rules: {
            "prettier/prettier": ["error", {
                ...DefaultPrettierOptions,
                ...styleOptions,
                parser: "yaml",
                // vscode always treats tab as 2 spaces for yaml file
                tabWidth: 2,
            }, {
                usePrettierrc: false,
            }],
        },
    }
}
