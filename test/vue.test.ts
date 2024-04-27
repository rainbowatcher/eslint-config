import { createExpectFn } from "./test-util"

const { expectRule } = await createExpectFn("vue")

// Test for vue/dot-location
expectRule("vue/dot-location", `<script setup lang="ts">
defineProps<{
  name: string
}>()
</script>`, { expected: false })

expectRule("vue/multi-word-component-names", `<script>
export default {
  name: 'Todo',
}
</script>`)
