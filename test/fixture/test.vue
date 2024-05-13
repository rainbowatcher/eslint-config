<script setup lang="ts">
const props = defineProps<{ name: string }>()

const a = "foo"
const b = [1, 2, 3]
console.log(a, b)
</script>

<template>
    <div v-html="props.name" />
</template>

<style>

</style>
