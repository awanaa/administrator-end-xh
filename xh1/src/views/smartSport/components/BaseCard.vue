<!--
 * @Author: caiyf
 * @Date: 2024-04-16 13:59:36
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-04-17 17:13:55
 * @Description: 基础卡片组件
 * @FilePath: \mobile\mhealth\src\views\smartSport\components\BaseCard.vue
-->
<template>
  <div class="card" :style="{ background: cardBg }">
    <template v-if="showHeader">
      <div class="card_header">
        <div class="card_header_left">
          <img v-if="showHeadIcon" :src="iconUrl" class="card_header_left_icon" />
          <span class="card_header_left_title">{{ title }}</span>
        </div>
        <div class="card_header_right">
          <slot name="headerRight"></slot>
        </div>
      </div>
    </template>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    // 卡片标题
    title: String,
    // 显示头部
    showHeader: {
      type: Boolean,
      default: true
    },
    // 显示头部icon 默认false
    showHeadIcon: Boolean,
    iconType: {
      type: [String, Number],
      default: 1
    },
    cardBg: {
      type: String,
      default: '#fff'
    }
  },
  components: {},
  data() {
    return {}
  },
  computed: {
    iconUrl() {
      return {
        1: require('@/assets/images/smartSport/time_icon.png'),
        2: require('@/assets/images/smartSport/project_icon.png')
      }[this.iconType]
    }
  },
  created() {},
  methods: {},
}
</script>

<style scoped lang="less">
.card {
  padding: 16px;
  background: #fff;
  border-radius: 12px;
  box-sizing: border-box;
  &_header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    &_left{
      display: flex;
      align-items: center;
      &_icon {
        width: 18px;
        height: 18px;
        margin-right: 8px;
      }
      &_title {
        color: #323233;
        font-size: 16px;
        font-weight: 600;
        line-height: 24px;
      }
    }
    &_right {
      display: flex;
      align-items: center;
    }
  }
}
</style>