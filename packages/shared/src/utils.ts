import type { Linter } from "eslint"

type Awaitable<T> = T | Promise<T>

export async function interopDefault<T>(m: Awaitable<T>): Promise<T extends { default: infer U } ? U : T> {
    const resolved = await m as { default?: unknown }
    return ("default" in resolved ? resolved.default : resolved) as T extends { default: infer U } ? U : T
}

export function renameRules(rules?: Partial<Linter.RulesRecord>, map?: Record<string, string>): Partial<Linter.RulesRecord> {
    if (!rules) return {}
    if (!map) return rules
    return Object.fromEntries(Object.entries(rules)
        .map(([key, value]) => {
            for (const [from, to] of Object.entries(map)) {
                if (key.startsWith(`${from}/`)) {
                    return [to + key.slice(from.length), value]
                }
            }
            return [key, value]
        }))
}

export function extractRules(configs: Linter.FlatConfig[]): Partial<Linter.RulesRecord> {
    return configs
        .map(i => i.rules)
        .filter(Boolean)
        .reduce((acc, cur) => ({ ...acc, ...cur }), {}) ?? {}
}
