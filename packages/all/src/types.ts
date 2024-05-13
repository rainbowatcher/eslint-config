import type { spinner } from "@clack/prompts"
import type { Options } from "@rainbowatcher/eslint-config-shared"

export type CliContext = {
    configName: string
    configOptions: Partial<Options>
    deps: Set<string>
    spinner: ReturnType<typeof spinner>
}
