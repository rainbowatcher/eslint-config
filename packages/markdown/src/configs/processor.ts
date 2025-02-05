import { GLOB_MARKDOWN, GLOB_NEST_MARKDOWN, interopDefault } from "@rainbowatcher/eslint-config-shared"
import { mergeProcessors, processorPassThrough } from "eslint-merge-processors"
import type { EslintFlatConfigItem } from "@rainbowatcher/eslint-config-shared"

export async function processor(): Promise<EslintFlatConfigItem> {
    const pluginMarkdown = await interopDefault(import("@eslint/markdown"))

    return {
        files: [GLOB_MARKDOWN],
        ignores: [GLOB_NEST_MARKDOWN],
        name: "rainbowatcher:markdown:processor",
        processor: mergeProcessors([
            processorPassThrough,
            pluginMarkdown.processors.markdown,
        ]),
    }
}
