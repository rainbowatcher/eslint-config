import dedent from "dedent"
import { concat } from "eslint-flat-config-utils"
import { jsConfigs } from "packages/javascript/src"
import { tsConfigs } from "packages/typescript/src"
import { vueConfigs } from "packages/vue/src"
import { describe, expect, it } from "vitest"
import { createExpectFn } from "./__util__/test_util"

const opts = { style: true, typescript: true, vue: true }
const configs = await concat(
    ...jsConfigs(opts),
    ...tsConfigs(opts),
    ...vueConfigs(opts),
    {
        rules: {
            "style-js/eol-last": "off",
        },
    },
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

    expectRule("vue/no-async-in-computed-properties", dedent`
        <script setup>
            computed(async () => {})
        </script>
    `)
    expectRule("vue/no-async-in-computed-properties", dedent`
        <script setup>
            computed(() => setTimeout(() => {}, 0))
        </script>
    `)
    expectRule("vue/no-async-in-computed-properties", dedent`
        <script setup>
            computed(() => setInterval(() => {}, 0))
        </script>
    `)
    expectRule("vue/no-async-in-computed-properties", dedent`
        <script setup>
            computed(() => requestAnimationFrame(() => {}))
        </script>
    `)
    expectRule("vue/no-child-content", dedent`
        <template>
            <div v-html="replacesChildContent">child content</div>
        <template>
    `)
    expectRule("ts/no-array-constructor", dedent`
        <script setup>
            const arr = new Array()
        </script>
    `)
    expectRule("style-ts/lines-around-comment", dedent`
        <script lang="ts" setup>
        /** comment */
        const ref = ref("")
        </script>

        <template>
            <div>hi</div>
        </template>
    `, { expected: false })
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
            </template>
        `)
    })
})
