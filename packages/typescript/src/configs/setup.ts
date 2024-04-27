import type { Linter } from "eslint"
import antfu from "eslint-plugin-antfu"
import pluginTs from "@typescript-eslint/eslint-plugin"

function getTsSetup(): Linter.FlatConfig {
    return {
        name: "rainbowatcher/ts/setup",
        plugins: {
            ts: pluginTs as any,
            antfu,
        },
    }
}

export default getTsSetup()
