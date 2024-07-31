import dedent from "dedent"
import { concat } from "eslint-flat-config-utils"
import { jsConfigs } from "packages/javascript/src"
import { tsConfigs } from "packages/typescript/src"
import { vueConfigs } from "packages/vue/src"
import { describe, expect, it } from "vitest"
import { createExpectFn } from "./test_util"

const opts = { style: true, typescript: true, vue: true }
const configs = await concat(
    ...jsConfigs(opts),
    ...tsConfigs(opts),
    ...vueConfigs(opts),
)
const { expectRule, formatCode } = createExpectFn(configs, "_.vue")


describe.concurrent("rules", () => {
    expectRule("vue/dot-location", dedent`
        <script setup lang="ts">
        defineProps<{
            name: string
        }>()
        </script>
    `, { expected: false })

    expectRule("vue/no-arrow-functions-in-watch", dedent`
        <script>
        export default {
            watch: {
                a: () => {},
            }
        }
        </script>
    `)

    expectRule("vue/no-async-in-computed-properties", `<script setup>
    computed(async () => {})
    </script>`)
    expectRule("vue/no-async-in-computed-properties", `<script setup>
    computed(() => setTimeout(() => {}, 0))
    </script>`)
    expectRule("vue/no-async-in-computed-properties", `<script setup>
    computed(() => setInterval(() => {}, 0))
    </script>`)
    expectRule("vue/no-async-in-computed-properties", `<script setup>
    computed(() => requestAnimationFrame(() => {}))
    </script>`)

    expectRule("vue/no-child-content", `<template>
    <div v-html="replacesChildContent">child content</div>
    <template>`)

    expectRule("ts/ban-types", `<script setup>
    const str: String = 'foo'
    </script>`)

    expectRule("ts/no-array-constructor", `<script setup>
    const arr = new Array()
    </script>`)
})


describe.concurrent("style", () => {
    it("indent", () => {
        const code = dedent`
            <template>
            <div class="foo">
            <i class="bar"></i>
            </div>
            </template>
        `
        expect(formatCode(code)).toBe(dedent`
            <template>
                <div class="foo">
                    <i class="bar" />
                </div>
            </template>\n
        `)
    })
})
