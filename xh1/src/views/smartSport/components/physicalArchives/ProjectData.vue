<!--
 * @Author: caiyf
 * @Date: 2024-04-10 16:32:22
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-04-29 10:47:06
 * @Description: 项目数据
 * @FilePath: \mobile\mhealth\src\views\smartSport\components\physicalArchives\ProjectData.vue
-->

<template>
  <BaseCard showHeadIcon iconType="2" title="项目数据">
    <div slot="headerRight" class="header_right" @click="toPhysicalRecord">
      <span class="header_right_text">体测记录</span>
      <van-icon name="arrow" color="#5FBA00" size="14" />
    </div>
    <!-- 运动项目时长 -->
    <div class="chart flex" v-if="pieOptions">
      <BaseChart :option="pieOptions" class="chart_pie" :colors="colors" />
      <ul class="chart_list">
        <li
          v-for="item, i of list"
          :key="i" 
          class="chart_list_item"
        >
          <span class="chart_list_item_circle" :style="{ background: colors[i] }"></span>
          <span class="chart_list_item_name">{{ item.sportName }}</span>
          <span class="chart_list_item_time">{{ item.accumulatedDurationStr }}</span>
        </li>
      </ul>
    </div>
    <BaseEmpty v-else class="chart_empty" imgWidth="150" imgHeight="120" textMt="0" />
    <!-- 运动项目次数 -->
    <ul v-if="list.length" class="sports">
      <li
        v-for="item, i of list"
        :key="i"
        class="sports_item"
        @click="handleClickSport(item)"
      >
        <img :src="logoUrl(item)" class="sports_item_icon" />
        <span class="sports_item_name">{{ item.sportName }}</span>
        <span class="sports_item_value">{{ item.accumulatedSportCount }}次</span>
        <img src="@/assets/images/smartSport/arrow_circle_icon.png" class="sports_item_arrow" />
      </li>
    </ul>
    <BaseEmpty v-else class="chart_empty" imgWidth="150" imgHeight="120" textMt="0" />
  </BaseCard>
</template>

<script>
import BaseCard from '../BaseCard'
import BaseChart from 'components/base/BaseChart'
import BaseEmpty from 'components/base/BaseEmpty'
import utils from '@/utils/util'
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    },
    // 请求参数
    params: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    BaseCard,
    BaseChart,
    BaseEmpty
  },
  data() {
    return {
      initColor: ['#1990FF', '#16C2C1', '#30C25B', '#FACC14', '#F04864', '#8543E0', '#213273', '#3436C7', '#41D9C7', '#9AE65C', '#E6965C', '#7564CC', '#5C8EE6', '#A081E6', '#D141D9']
    }
  },
  computed: {
    pieOptions() {
      if (!this.list.length) return false
      let objData = {}
      let list = this.list.map(v => {
        objData[v.sportName] = {
          value: v.accumulatedDurationStr,
          ratio: v.accumulatedSportPersent
        }
        return {
          name: v.sportName,
          value: v.accumulatedDuration
        }
      });

      let options = {
        tooltip: {
          borderColor: 'transparent',
          backgroundColor: '#fff',
          position: ['50%', '50%'],
          formatter: function (params) {
            return `<div style="font-size: 14px; line-height: 22px">
                      <span style="color: #252526">${params.name}</span>
                      <span style="color: #252526; font-weight: 600; margin-left: 12px">${objData[params.name].value}
                      <span style="margin: 0 2px"></span>
                      ${objData[params.name].ratio}%</span>
                  </div>`;
          }
        },
        series: [
          {
            type: 'pie',
            left: 'left',
            radius: ['55%', '90%'],
            center: ['50%', '50%'],
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 1
            },
            label: {
              show: false
            },
            emphasis: {
              label: {
                show: false
              }
            },
            data: list
          }
        ]
      }
      
      return options
    },

    // 图表取色盘，项目过多情况循环使用
    colors() {
      let resColors = []
      let len = Math.ceil(this.list.length / this.initColor.length)
      for (let i = 0; i < len; i++) {
        resColors.push(...this.initColor)
      }
      return resColors
    },

    logoUrl() {
      return item => {
        return item.logoUrl || require('@/assets/images/smartSport/sports_default_icon.png')
      }
    }
  },
  created() {},
  methods: {
    // 跳转体测记录
    toPhysicalRecord() {
      this.$router.push({
        name: 'smartSport_physical_record',
        query: this.params
      })
    },

    // 点击某个运动项目
    handleClickSport(item) {
      utils.setSessionStorage('smartSport_sportItem', item)
      this.$router.push({
        name: 'smartSport_sportItem',
        query: {
          ...this.params,
          sportId: item.sportId
        }
      })
    }
  },
}
</script>

<style scoped lang="less">
.flex {
  display: flex;
}

.chart {
  display: flex;
  justify-content: space-between;
  margin-top: 32px;
  &_pie.base_chart {
    height: inherit;
    width: 136px;
  }
  &_list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 158px;
    height: 100%;
    min-height: 200px;
    &_item {
      display: flex;
      align-items: center;
      height: 22px;
      color: rgba(0, 0, 0, 0.80);
      font-size: 14px;
      &:not(:first-child) {
        margin-top: 4px;
      }
      &_circle {
        width: 12px;
        height: 8px;
        border-radius: 2px;
      }
      &_name {
        margin-left: 6px;
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 22px;
      }
      &_time {
        margin-left: 6px;
        width: 54px;
        line-height: 22px;
      }
    }
  }
  &_empty.empty {
    width: 100%;
    height: 158px;
    margin-top: 32px;
  }
}

.sports {
  margin-top: 20px;
  &_item {
    display: flex;
    align-items: center;
    height: 64px;
    padding: 12px;
    box-sizing: border-box;
    color: #323233;
    border-radius: 12px;
    background: #F7F8FA;
    &:not(:first-child) {
      margin-top: 8px;
    }
    &_icon {
      width: 40px;
      height: 40px;
    }
    &_name {
      margin-left: 12px;
      flex: 1;
      font-size: 16px;
      font-weight: 600;
      line-height: 24px;
    }
    &_value {
      font-size: 14px;
      font-weight: 600;
      margin-left: 12px;
      line-height: 22px;
    }
    &_arrow {
      width: 20px;
      height: 20px;
      margin-left: 12px;
    }
  }
}

.header_right {
  display: flex;
  align-items: center;
  color: #5FBA00;
  font-size: 14px;
  line-height: 22px;
  &_text {
    margin-right: 2px;
  }
}
</style>