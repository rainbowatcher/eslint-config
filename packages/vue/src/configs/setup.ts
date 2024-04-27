import type { Linter } from "eslint"
// @ts-expect-error missing types
import pluginVue from "eslint-plugin-vue"

const setupConfig: Linter.FlatConfig = {
    // This allows Vue plugin to work with auto imports
    // https://github.com/vuejs/eslint-plugin-vue/pull/2422
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
    },
    name: "rainbowatcher/vue/setup",
    plugins: {
        vue: pluginVue,
    },
}

export default setupConfig
