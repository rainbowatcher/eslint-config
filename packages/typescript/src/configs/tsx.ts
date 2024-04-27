import { GLOB_TSX } from "@rainbowatcher/eslint-config-shared"
import type { Linter } from "eslint"
import { getLanguageOptions } from "../language_options"
import { namingConvertion } from "../naming_convertion"

const tsxConfig: Linter.FlatConfig = {
    name: "rainbowatcher/ts/tsx",
    files: [GLOB_TSX],
    languageOptions: getLanguageOptions(),
    rules: {
        ...namingConvertion(true),
    },
}

export default tsxConfig
