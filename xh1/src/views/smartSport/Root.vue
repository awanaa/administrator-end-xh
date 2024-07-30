<!--
 * @Author: caiyf
 * @Date: 2024-04-09 11:11:50
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-04-26 15:45:26
 * @Description:
 * @FilePath: \mobile\mhealth\src\views\smartSport\Root.vue
-->
<template>
  <div class="layout" ref="layout">
    <router-view></router-view>
  </div>
</template>
<script>
import { util } from "m-com";
export default {
  components: {
  },
  filters: {},
  props: {
  },
  watch: {
    '$route.path'() {
      this.$refs.layout.scrollTop = 0
    }
  },
  computed: {
  },
  data() {
    return {
    };
  },
  mounted() {
    const title = this.$route.meta.title || '';
    util.setTitle(title);
  },
  methods: {
  },
};
</script>

<style scoped lang="less">
.layout {
  width: 100%;
  height: inherit;
  overflow: auto;
  background: #F7F8FA;
}
</style>
