import type { EslintFlatConfigItem, EslintFlatConfigs } from "./types"
import type { Linter } from "eslint"
import type { Awaitable } from "eslint-flat-config-utils"

export async function interopDefault<T>(m: Awaitable<T>): Promise<T extends { default: infer U } ? U : T> {
    const resolved = await m as { default?: unknown }
    return ("default" in resolved ? resolved.default : resolved) as T extends { default: infer U } ? U : T
}

export function renameRules(
    rules?: Partial<Linter.RulesRecord>,
    map?: Record<string, string>,
): Partial<Linter.RulesRecord> {
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

export async function extractRules(configs: Array<Awaitable<EslintFlatConfigItem>>, configName?: string): Promise<Partial<Linter.RulesRecord>> {
    const acc: Partial<Linter.RulesRecord> = {}
    for await (const config of configs) {
        if (!configName || config.name?.includes(configName)) {
            const { rules } = config
            if (rules) {
                for (const [key, value] of Object.entries(rules)) {
                    acc[key] = value
                }
            }
        }
    }
    return acc
}

export async function findConfig(configs: EslintFlatConfigs, configName?: string): Promise<EslintFlatConfigItem | undefined> {
    let configItem: EslintFlatConfigItem | undefined = undefined

    for await (const config of configs) {
        if (!configName || config.name?.includes(configName)) {
            configItem = config
            break
        }
    }
    return configItem
}

export const parserPlain = {
    meta: {
        name: "parser-plain",
    },
    parseForESLint: (code: string) => ({
        ast: {
            body: [],
            comments: [],
            loc: { end: code.length, start: 0 },
            range: [0, code.length],
            tokens: [],
            type: "Program",
        },
        scopeManager: null,
        services: { isPlain: true },
        visitorKeys: {
            Program: [],
        },
    }),
}
