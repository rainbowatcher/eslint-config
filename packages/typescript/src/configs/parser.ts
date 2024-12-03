import {
    GLOB_TS, GLOB_TSX, GLOB_VUE, interopDefault,
} from "@rainbowatcher/eslint-config-shared"
import type { EslintFlatConfigItem, Options } from "@rainbowatcher/eslint-config-shared"
import type { Linter } from "eslint"

export async function vueParserConfig(opts: Options): Promise<EslintFlatConfigItem> {
    if (!opts.vue) return {}
    const files = opts.jsx ? [GLOB_TS, GLOB_TSX] : [GLOB_TS]
    opts.vue && files.push(GLOB_VUE)
    return await makeParser({ componentExts: ["vue"], files })
}

export async function tsParserConfig(opts: Options): Promise<EslintFlatConfigItem> {
    const files = opts.jsx ? [GLOB_TS, GLOB_TSX] : [GLOB_TS]
    return await makeParser({ files, tsconfigPath: "tsconfig.json", typeAware: true })
}

export async function tsxParseConfig(opts: Options): Promise<EslintFlatConfigItem> {
    if (!opts.jsx) return {}
    const parserTs = await interopDefault(import("@typescript-eslint/parser"))

    return {
        files: [GLOB_TSX],
        languageOptions: {
            parser: parserTs,
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
                project: null,
            },
            sourceType: "module",
        },
        name: "rainbowatcher:ts:tsx-parser",
    }
}

type MakeParserOptions = {
    componentExts?: string[]
    files: string[]
    ignores?: string[]
    parserOptions?: Linter.ParserOptions
    tsconfigPath?: string
    typeAware?: boolean
}

async function makeParser(opts: MakeParserOptions): Promise<EslintFlatConfigItem> {
    const parserTs = await interopDefault(import("@typescript-eslint/parser"))

    return {
        files: opts.files,
        ...opts.ignores ? { ignores: opts.ignores } : {},
        languageOptions: {
            parser: parserTs,
            parserOptions: {
                extraFileExtensions: opts.componentExts?.map(ext => `.${ext}`),
                sourceType: "module",
                ...opts.typeAware
                    ? {
                        project: opts.tsconfigPath,
                        tsconfigRootDir: import.meta.dirname,
                    }
                    : {},
                ...opts.parserOptions as any,
            },
        },
        name: `rainbowatcher:ts:${opts.typeAware ? "type-aware-parser" : "parser"}`,
    }
}
