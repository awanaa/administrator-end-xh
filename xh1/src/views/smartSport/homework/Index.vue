<!--
 * @Author: caiyf
 * @Date: 2024-06-12 11:27:25
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-06-13 10:27:06
 * @Description: 作业管理
 * @FilePath: \mobile\mhealth\src\views\smartSport\homework\Index.vue
-->
<template>
  <div class="index">
    <component class="page" :is="curComponent"></component>
    <ManageTabbar @change="tabbarChange" />
  </div>
</template>

<script>

import ManageTabbar from '@/views/smartSport/components/homework/ManageTabbar'
import HomeworkRecord from './HomeworkRecord'
import AssignHomework from './AssignHomework'
export default {
  props: {},
  components: {
    ManageTabbar,
    HomeworkRecord,
    AssignHomework
  },
  data() {
    return {
      curComponent: ''
    }
  },
  computed: {},
  created() {},
  methods: {
    tabbarChange(str) {
      this.curComponent = str
    }
  },
}
</script>

<style scoped lang="less">
.index {
  height: 100%;
}
.page {
  height: calc(~'100% - 48px');
}
</style>