import { GLOB_VUE, interopDefault } from "@rainbowatcher/eslint-config-shared"
import { mergeProcessors } from "eslint-merge-processors"
import type { EslintFlatConfigItem, Options } from "@rainbowatcher/eslint-config-shared"
import type { Linter } from "eslint"

export async function base(opts: Options): Promise<EslintFlatConfigItem> {
    const [pluginVue, parserVue, processorVueBlocks] = await Promise.all([
        interopDefault(import("eslint-plugin-vue")),
        interopDefault(import("vue-eslint-parser")),
        interopDefault(import("eslint-processor-vue-blocks")),
    ])

    let vue3RecommendedRules: Linter.RulesRecord = {}
    for (const config of pluginVue.configs["flat/recommended"]) {
        if (config.rules) {
            vue3RecommendedRules = { ...vue3RecommendedRules, ...config.rules as Linter.RulesRecord }
        }
    }

    return {
        files: [GLOB_VUE],
        languageOptions: {
            globals: {
                computed: "readonly",
                defineEmits: "readonly",
                defineExpose: "readonly",
                defineProps: "readonly",
                onMounted: "readonly",
                onUnmounted: "readonly",
                reactive: "readonly",
                ref: "readonly",
                shallowReactive: "readonly",
                shallowRef: "readonly",
                toRef: "readonly",
                toRefs: "readonly",
                watch: "readonly",
                watchEffect: "readonly",
            },
            parser: parserVue,
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
                extraFileExtensions: [".vue"],
                parser: opts.typescript
                    ? await interopDefault(import("@typescript-eslint/parser")) as any
                    : null,
                sourceType: "module",
            },
        },
        name: "rainbowatcher:vue:base",
        plugins: {
            vue: pluginVue,
        },
        processor: mergeProcessors([
            pluginVue.processors[".vue"] as Linter.Processor<Linter.ProcessorFile>,
            processorVueBlocks({
                blocks: {
                    // scriptSetup: true,
                    script: false,
                    styles: true,
                    template: false,
                },
            }),
        ]),
        rules: {
            ...vue3RecommendedRules,
            // https://github.com/un-ts/eslint-plugin-import-x/issues/177
            "import/first": "off",
            "node/prefer-global/process": "off",
            "vue/block-order": ["error", {
                order: ["script", "template", "style"],
            }],

            "vue/component-name-in-template-casing": ["error", "PascalCase"],
            "vue/component-options-name-casing": ["error", "PascalCase"],

            "vue/custom-event-name-casing": ["error", "camelCase"],
            "vue/define-macros-order": ["error", {
                order: ["defineOptions", "defineProps", "defineEmits", "defineSlots"],
            }],
            "vue/dot-location": ["error", "property"],
            "vue/dot-notation": ["error", { allowKeywords: true }],
            "vue/eqeqeq": ["error", "smart"],
            "vue/html-quotes": ["error", "double"],
            "vue/max-attributes-per-line": "off",
            "vue/multi-word-component-names": "off",
            "vue/no-dupe-keys": "off",
            "vue/no-empty-pattern": "error",
            "vue/no-irregular-whitespace": "error",
            "vue/no-loss-of-precision": "error",
            // due to shadcn/ui use class as property name
            "vue/no-reserved-props": "off",
            "vue/no-restricted-syntax": [
                "error",
                "DebuggerStatement",
                "LabeledStatement",
                "WithStatement",
            ],
            "vue/no-restricted-v-bind": ["error", "/^v-/"],
            "vue/no-setup-props-reactivity-loss": "off",
            "vue/no-sparse-arrays": "error",
            "vue/no-unused-refs": "error",
            "vue/no-useless-v-bind": "error",
            "vue/no-v-html": "off",
            "vue/object-shorthand": [
                "error",
                "always",
                {
                    avoidQuotes: true,
                    ignoreConstructors: false,
                },
            ],
            "vue/prefer-separate-static-class": "error",
            "vue/prefer-template": "error",
            "vue/prop-name-casing": ["error", "camelCase"],
            "vue/require-default-prop": "off",
            "vue/require-prop-types": "off",
            "vue/space-infix-ops": "error",
            "vue/space-unary-ops": ["error", { nonwords: false, words: true }],
        },
    }
}
