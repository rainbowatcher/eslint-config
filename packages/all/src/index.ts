import vueEsConfig from "@rainbowatcher/eslint-config-vue"
import jsonEsConfig from "@rainbowatcher/eslint-config-json"

const rainbEslintConfig = [
    ...jsonEsConfig,
    ...vueEsConfig,
]

export default rainbEslintConfig
