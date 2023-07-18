const expect = require("./test-util")("vue")

// Test for vue/dot-location
expect("vue/dot-location", `<script setup lang="ts">
defineProps<{
  name: string
}>()
</script>`, false)