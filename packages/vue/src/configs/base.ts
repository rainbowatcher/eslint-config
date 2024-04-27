import type { Linter } from "eslint"
import { GLOB_VUE, interopDefault, extractRules } from "@rainbowatcher/eslint-config-shared"
import { mergeProcessors } from "eslint-merge-processors"
// @ts-expect-error missing types
import pluginVue from "eslint-plugin-vue"
import parserVue from "vue-eslint-parser"
import processorVueBlocks from "eslint-processor-vue-blocks"

async function getBaseConfig(ts: boolean): Promise<Linter.FlatConfig<Linter.RulesRecord>> {
    return {
        name: "rainbowatcher/vue/recommended",
        files: [GLOB_VUE],
        languageOptions: {
            parser: parserVue,
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
                extraFileExtensions: [".vue"],
                parser: ts
                    ? await interopDefault(import("@typescript-eslint/parser")) as any
                    : null,
                sourceType: "module",
            },
        },
        processor: mergeProcessors([
            pluginVue.processors![".vue"] as Linter.Processor<Linter.ProcessorFile>,
            processorVueBlocks({
                blocks: {
                    styles: true,
                    customBlocks: true,
                    // Usually it's not recommended to lint <script> and <template>
                    // As eslint-plugin-vue already provides the support
                    script: false,
                    template: false,
                },
            }),
        ]),
        rules: {
            ...extractRules(pluginVue.configs["flat/recommended"]),
            ...extractRules(pluginVue.configs["flat/strongly-recommended"]),
        },
    }
}

export default getBaseConfig
