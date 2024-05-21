import {
    GLOB_JS, GLOB_JSON, GLOB_JSON5, GLOB_JSONC, GLOB_JSX, GLOB_SRC, GLOB_TS, GLOB_VUE,
} from "@rainbowatcher/eslint-config-shared"
import type { Options } from "@rainbowatcher/eslint-config-shared"

export function getFiles(opts: Options): string[] {
    const files = []
    const { json, jsx, typescript, vue } = opts
    if (jsx && typescript) {
        files.push(GLOB_SRC)
    } else {
        if (jsx) files.push(GLOB_JSX)
        else if (typescript) files.push(GLOB_TS, GLOB_JS)
        else files.push(GLOB_JS)
    }
    if (vue && !typescript) files.push(GLOB_VUE)
    json && files.push(GLOB_JSON, GLOB_JSON5, GLOB_JSONC)

    return files
}
