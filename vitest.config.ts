import { defaultExclude, defineConfig } from "vitest/config"

export default defineConfig({
    test: {
        exclude: [
            "**/fixture/**",
            ...defaultExclude,
        ],
        name: "@rainbowatcher/eslint-config",
        retry: 3,
    },
})
