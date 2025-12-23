import process from "node:process"
import { getPackageInfoSync, isPackageExists } from "local-pkg"

export function isInEditor(): boolean {
    if (!process) return false
    if (process.env.CI) return false
    if (isInGitHooksOrLintStaged()) return false
    return !!(
        process.env.VSCODE_PID
        ?? process.env.VSCODE_CWD
        ?? process.env.JETBRAINS_IDE
        ?? process.env.VIM
        ?? process.env.NVIM
    )
}

export function isInGitHooksOrLintStaged(): boolean {
    if (!process) return false
    return !!(
        process.env.GIT_PARAMS
        ?? process.env.VSCODE_GIT_COMMAND
        ?? process.env.npm_lifecycle_script?.startsWith("lint-staged")
    )
}

export function hasVue(): boolean {
    return isPackageExists("vue")
}

/** @deprecated drop support for vue2 */
export function isVue3(): boolean {
    if (!hasVue()) return false
    const pkg = getPackageInfoSync("vue")
    if (
        pkg
        && typeof pkg.version === "string"
        && !Number.isNaN(+pkg.version[0])
    ) {
        return +pkg.version[0] === 3
    }
    return false
}
