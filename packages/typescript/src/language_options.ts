import process from "node:process"
import { interopDefault } from "@rainbowatcher/eslint-config-shared"
import type { Options } from "@rainbowatcher/eslint-config-shared"
import type { Linter } from "eslint"

export async function getLanguageOptions(opts: Options): Promise<Linter.FlatConfig["languageOptions"]> {
    const parserVue = await interopDefault(import("vue-eslint-parser"))
    const parserTs = await interopDefault(import("@typescript-eslint/parser"))

    return {
        parser: opts.vue ? parserVue : parserTs,
        parserOptions: {
            ...opts.vue
                ? {
                    parser: parserTs,
                }
                : {
                    project: ["tsconfig.json"],
                    tsconfigRootDir: process.cwd(),
                },
            ecmaFeatures: {
                jsx: true,
            },
            extraFileExtensions: [".vue"],
            sourceType: "module",
        },
    }
}
