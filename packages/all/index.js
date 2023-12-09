const { defineConfig } = require("eslint-define-config")

module.exports = defineConfig({
    extends: [
        "@rainbowatcher/eslint-config-vue",
        "@rainbowatcher/eslint-config-json",
    ],
})