<!--
 * @Author: caiyf
 * @Date: 2024-04-17 15:57:41
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-04-22 14:49:56
 * @Description: 模式
 * @FilePath: \mobile\mhealth\src\views\smartSport\components\sportItem\Mode.vue
-->
<template>
  <div class="mode">
    <!-- tab -->
    <ul class="mode_tab">
      <li
        v-for="item, i of tabs"
        :key="i" 
        class="mode_tab_item"
        :class="{ active: i === curTabIndex }"
        @click="handleTabClick(item, i)"
      >
        {{ item.label }}
      </li>
    </ul>
    <div class="mode_cont">
      <!-- 体测次数、年级排名、班级排名、最佳成绩 -->
      <BaseInfo :data="stat" :params="params" />
      <!-- 成绩等级分布 -->
      <Level class="mt12" :data="levelDistribution" />
      <!-- 成绩评分 -->
      <Score class="mt12" :data="studLevelGrade" />
      <!-- 成绩top3 -->
      <ScoreTop3 class="mt12" :data="studTop" :params="params" />
    </div>
  </div>
</template>

<script>
import Components from './components'
export default {
  props: {
    // 体测次数、年级排名、班级排名、最佳成绩
    stat: {
      type: Object,
      default: () => ({})
    },
    // 成绩等级分布
    levelDistribution: {
      type: Object,
      default: () => ({})
    },
    // 成绩评分
    studLevelGrade: {
      type: Object,
      default: () => ({})
    },
    // 成绩top3
    studTop: {
      type: Object,
      default: () => ({})
    },
    // 请求参数
    params: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    ...Components
  },
  data() {
    return {
      tabs: [
        { label: '训练模式', value: 1 },
        { label: '测试模式', value: 2 }
      ],
      curTabIndex: 0
    }
  },
  computed: {},
  created() {
    this.$emit('modeChange', this.tabs[this.curTabIndex].value)
  },
  methods: {
    // 点击tab
    handleTabClick(item, i) {
      if (i === this.curTabIndex) return 
      this.curTabIndex = i
      this.$emit('modeChange', this.tabs[this.curTabIndex].value)
    }
  },
}
</script>

<style scoped lang="less">
.mode {
  background: #fff;
  border-radius: 12px;
  &_tab {
    display: flex;
    height: 42px;
    padding: 0 12px;
    box-sizing: border-box;
    border-bottom: 1px solid #EBEDF0;
    &_item {
      position: relative;
      height: 100%;
      padding: 10px 8px;
      box-sizing: border-box;
      color: #646566;
      font-size: 14px;
      line-height: 22px;
      &.active {
        color: #323233;
        font-weight: 600;
        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 20%;
          width: 60%;
          height: 3px;
          border-radius: 3px;
          background: #8CC152;
        }
      }
    }
  }
  &_cont {
    padding: 12px;
    box-sizing: border-box;
  }
  .mt12 {
    margin-top: 12px;
  }
}
</style>