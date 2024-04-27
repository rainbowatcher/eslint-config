import type { Linter } from "eslint"
import jsonc from "eslint-plugin-jsonc"

const jsonSetup: Linter.FlatConfig = {
    name: "rainbowatcher/json/setup",
    plugins: {
        jsonc: jsonc as any,
    },
}

export default jsonSetup
