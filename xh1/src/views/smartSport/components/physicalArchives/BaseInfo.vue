<!--
 * @Author: caiyf
 * @Date: 2024-04-16 10:20:50
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-04-19 14:17:09
 * @Description: 体测基础信息
 * @FilePath: \mobile\mhealth\src\views\smartSport\components\physicalArchives\BaseInfo.vue
-->

<template>
  <BaseCard :showHeader="false">
    <ul class="list">
      <li class="list_item">
        <span class="list_item_label">连续体测</span>
        <span class="list_item_value">{{ data.consecutiveSportDay }}天</span>
      </li>
      <li class="list_item">
        <span class="list_item_label">今日体测</span>
        <span class="list_item_value">{{ Math.floor(data.dayDuration) || 0 }}分钟</span>
      </li>
    </ul>
    <div class="total">
      <span class="total_label">累计体测</span>
      <div class="total_value">
        <span class="total_value_time">{{ accTotal }}</span>
        <span class="total_value_ratio">超越{{ data.surpassSameGradePercent || 0 }}%的同学</span>
      </div>
    </div>
  </BaseCard>
</template>

<script>
import BaseCard from '../BaseCard'
export default {
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    BaseCard
  },
  computed: {
    accTotal() {
      let h = Math.floor(this.data.accumulatedDuration / 60) || 0
      let m = Math.floor(this.data.accumulatedDuration % 60) || 0
      return `${h}小时${m}分钟`
    }
  }
}
</script>

<style scoped lang="less">
.list {
  display: flex;
  &_item {
    &:not(:first-child) {
      margin-left: 12px;
    }
    flex: 1;
    padding: 8px 12px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    background: #F7F8FA;
    border-radius: 8px;
    &_label {
      color: #969799;
      font-size: 14px;
      line-height: 22px;
    }
    &_value {
      margin-top: 2px;
      color: #323233;
      font-size: 16px;
      font-weight: 600;
      line-height: 24px;
    }
  }
}
.total {
  margin-top: 12px;
  background: #F7F8FA;
  border-radius: 8px;
  padding: 8px 12px;
  box-sizing: border-box;
  &_label {
    color: #969799;
    font-size: 14px;
    line-height: 22px;
  }
  &_value {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 2px;
    &_time {
      color: #323233;
      font-size: 16px;
      font-weight: 600;
      line-height: 24px;
    }
    &_ratio {
      margin-left: 4px;
      color: #5FBA00;
      font-size: 14px;
      line-height: 22px;
    }
  }
}
</style>