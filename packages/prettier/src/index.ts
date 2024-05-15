import { css } from "./configs/css"
import { graphql } from "./configs/graphql"
import { markdown } from "./configs/markdown"
import { setup } from "./configs/setup"
import { yaml } from "./configs/yaml"
import type { EslintFlatConfigs, Options } from "@rainbowatcher/eslint-config-shared"

export function prettierConfigs(opts: Options): EslintFlatConfigs {
    if (!opts.style) return []
    return [
        setup(),
        css(opts),
        markdown(opts),
        yaml(opts),
        graphql(opts),
    ]
}

export default prettierConfigs
