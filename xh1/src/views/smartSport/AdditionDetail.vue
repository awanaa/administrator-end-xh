<!--
 * @Author: xiejh 1415413020@qq.com
 * @Date: 2024-04-12 14:11:03
 * @LastEditors: xiejh 1415413020@qq.com
 * @LastEditTime: 2024-04-23 15:56:38
 * @FilePath: \portal\mhealth\src\views\smartSport\AdditionDetail.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="addition-detail">
    <div class="addition-detail_header">
      <van-tabs v-model="tabActive">
        <van-tab
          :title="item.name"
          :name="item.routerName"
          v-for="(item, index) in tabList"
          :key="index"
        ></van-tab>
      </van-tabs>
    </div>
    <component :is="componentName"></component>
  </div>
</template>

<script>
import { Tab, Tabs } from "vant";
import AdditionMenberList from '@/views/smartSport/components/AdditionMenberList.vue'
import AdditionScoreList from '@/views/smartSport/components/AdditionScoreList.vue'
import { util } from 'm-com';


export default {
  components: {
    vanTab: Tab,
    vanTabs: Tabs,
    AdditionMenberList,
    AdditionScoreList
  },
  filters: {},
  props: {},
  watch: {},
  computed: {
    tabs() {
      return "";
    },
    componentName() {
      const routerNameArr = this.tabList.map(item => item.routerName)
      const routerNameMap = {}
      for (let val of routerNameArr) {
        routerNameMap[val] = val
      }
      return routerNameMap[this.tabActive]
    }
  },
  data() {
    return {
      tabActive: 0,
      tabList: [
        {
          name: "补录名单",
          routerName: "AdditionMenberList",
        },
        {
          name: "成绩名单",
          routerName: "AdditionScoreList",
        },
      ],
    };
  },
  mounted() {
    const title = this.$route.meta.title || '';
    util.setTitle(title);
  },
  methods: {},
};
</script>

<style lang="less" scoped>
/deep/.van-tab {
  font-family: "PingFang SC";
  font-size: 14px;
  color: #646566;
}
/deep/.van-tab--active {
  color: #323233;
  font-weight: 600;
}
/deep/.van-tabs__line {
  background-color:  @button-primary-active-bg-color;
}
.addition-detail {
  &_header {
    position: sticky;
    top: 0;
    z-index: 1000;
  }
}
</style>
