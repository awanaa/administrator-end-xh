<!--
 * @Author: caiyf
 * @Date: 2024-04-17 16:13:59
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-04-22 14:49:36
 * @Description: 体测次数、年级排名、班级排名、最佳成绩
 * @FilePath: \mobile\mhealth\src\views\smartSport\components\sportItem\components\BaseInfo.vue
-->
<template>
  <div>
    <ul class="list">
      <li class="list_item">
        <span class="list_item_label">体测次数</span>
        <span class="list_item_value" @click="toRecord">
          <span class="list_item_count">{{ data.accumulatedSportCount || '--' }}次</span>
          <img src="@/assets/images/smartSport/arrow_circle_icon.png" class="list_item_arrow">
        </span>
      </li>
      <li class="list_item flex1">
        <span class="list_item_label">年级排名</span>
        <span class="list_item_value">{{ data.gradeRank || '--' }}</span>
      </li>
      <li class="list_item flex1">
        <span class="list_item_label">班级排名</span>
        <span class="list_item_value">{{ data.classRank || '--' }}</span>
      </li>
    </ul>
    <div class="best">
      <span class="best_label">最佳成绩</span>
      <span class="best_value">
        <span class="best_count">{{ data.showSportScore || '--' }}</span>
        <LevelTag class="ml8" :type="changeLevel(data.bestSportLevel)" hasBorder>{{ data.bestSportGrade }} | {{ data.bestSportLevel }}</LevelTag>
      </span>
    </div>
  </div>
</template>

<script>
import LevelTag from 'views/smartSport/components/LevelTag'
import { levelMap } from '@/constants/smartSport/common'
export default {
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    params: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    LevelTag
  },
  data() {
    return {}
  },
  computed: {
    changeLevel() {
      return val => {
        return levelMap[val] || ''
      }
    }
  },
  created() {},
  methods: {
    toRecord() {
      this.$router.push({
        name: 'smartSport_project_record',
        query: this.params
      })
    }
  },
}
</script>

<style scoped lang="less">
.list {
  display: flex;
  height: 64px;
  &_item {
    display: flex;
    flex-direction: column;
    padding: 8px 12px;
    box-sizing: border-box;
    height: 100%;
    flex: 1.45;
    border-radius: 8px;
    background: #F7F8FA;
    &:not(:first-child) {
      margin-left: 8px;
    }
    &.flex1 {
      flex: 1;
    }
    &_label {
      color: #969799;
      font-size: 14px;
      line-height: 22px;
    }
    &_value {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 2px;
      color: #323233;
      font-size: 16px;
      font-weight: 600;
    }
    &_count {
      line-height: 24px;
    }
    &_arrow {
      width: 16px;
      height: 16px;
    }
  }
}
.best {
  border-radius: 8px;
  background: #F7F8FA;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  margin-top: 12px;
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
    margin-left: 8px;
  }
  &_count {
    color: #323233;
    font-size: 16px;
    font-weight: 600;
  }
  .ml8 {
    margin-left: 8px;
  }
}
</style>