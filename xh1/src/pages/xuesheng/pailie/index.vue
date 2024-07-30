<template>
    <div>
        <span>排列方式</span>
        <el-select-v2 v-model="value" :options="options" placeholder="按姓名A-Z" style="width: 141px" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const initials = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']

const value = ref()
const options = Array.from({ length: 1000 }).map((_, idx) => ({
  value: `Option ${idx + 1}`,
  label: `${initials[idx % 10]}${idx}`,
}))
</script>

<style scoped></style>