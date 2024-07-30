<template>
    <div>
        <span>所在班级</span>
        <el-select-v2 v-model="value" :options="options" placeholder="全部" style="width: 141px" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const initials = ['1班', '2班', '3班', '4班', '5班', '6班', '7班', '8班', '9班', '10班']

const value = ref()
const options = Array.from({ length: 1000 }).map((_, idx) => ({
  value: `Option ${idx + 1}`,
  label: `${initials[idx % 10]}${idx}`,
}))
</script>

<style scoped></style>