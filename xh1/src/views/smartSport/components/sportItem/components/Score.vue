<!--
 * @Author: caiyf
 * @Date: 2024-04-17 16:20:49
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-04-19 16:51:05
 * @Description: 成绩评分
 * @FilePath: \mobile\mhealth\src\views\smartSport\components\sportItem\components\Score.vue
-->
<template>
  <BaseCard title="成绩评分" cardBg="#F7F8FA" :style="{ padding: '12px' }">
    <div v-if="list.length" class="box">
      <Wave class="box_wave" :rangeValue="sportGradePassRate">
        <div class="waveO">
          <span>合格率</span>
          <span class="waveO_ratio">{{ sportGradePassRate }}<span class="waveO_unit">%</span></span>
        </div>
      </Wave>
      <ul class="list">
        <li
          v-for="item, i of list"
          :key="i"
          class="list_item"
        >
          <span class="list_item_label">{{ item.label }}</span>
          <span class="list_item_value">{{ item.value }}分</span>
          <LevelTag class="list_item_tag" :type="changeLevel(item.level)">{{ item.level }}</LevelTag>
        </li>
      </ul>
    </div>
    <BaseEmpty v-else imgWidth="150" imgHeight="120" textMt="0" :style="{
      height: '158px',
      marginTop: '12px'
    }" />
  </BaseCard>
</template>

<script>
import BaseCard from 'views/smartSport/components/BaseCard'
import LevelTag from 'views/smartSport/components/LevelTag'
import BaseEmpty from 'components/base/BaseEmpty'
import Wave from 'components/wave'
import { levelMap } from '@/constants/smartSport/common'
export default {
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    BaseCard,
    LevelTag,
    Wave,
    BaseEmpty
  },
  data() {
    return {}
  },
  computed: {
    changeLevel() {
      return val => {
        return levelMap[val] || ''
      }
    },

    list() {
      return [
        { label: '最高分', value: this.data.bestSportGrade || 0, level: this.data.bestSportLevel },
        { label: '最低分', value: this.data.lowestSportGrade || 0, level: this.data.lowestSportLevel },
        { label: '平均分', value: this.data.avgSportGrade || 0, level: this.data.avgSportLevel }
      ]
    },

    sportGradePassRate() {
      return Number(this.data.sportGradePassRate) || 0
    }
  },
  created() {},
  methods: {},
}
</script>

<style scoped lang="less">
.box {
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  .list {
    width: 160px;   
    &_item {
      height: 34px;
      padding: 6px 6px 6px 10px;
      box-sizing: border-box;
      background: #fff;
      border-radius: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &:not(:first-child) {
        margin-top: 8px;
      }
      &_label {
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px;
      }
      &_value {
        text-align: right;
        color: rgba(0, 0, 0, 0.80);
        font-size: 14px;
        font-weight: 600;
      }
      &_tag {
        width: 44px;
        box-sizing: border-box;
      }
    }
  }
  &_wave {
    margin-left: 8px;
  }
  .waveO {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #252526;
    font-size: 14px;
    &_ratio {
      font-size: 20px;
      font-weight: 600;
    }
    &_unit {
      font-size: 14px;
    }
  }
}
</style>