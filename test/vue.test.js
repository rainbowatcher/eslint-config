const expect = require("./test-util")("vue")

expect("vue/dot-location", `<script setup lang="ts">
defineProps<{
  name: string
}>()
</script>`, false)