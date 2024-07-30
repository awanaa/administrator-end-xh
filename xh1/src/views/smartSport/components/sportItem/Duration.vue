<!--
 * @Author: caiyf
 * @Date: 2024-04-17 15:56:51
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-04-19 15:39:23
 * @Description: 近七天体测时长
 * @FilePath: \mobile\mhealth\src\views\smartSport\components\sportItem\Duration.vue
-->
<template>
  <BaseCard title="近七天体测时长" :style="{ padding: '16px 16px 20px' }">
    <BaseChart v-if="lineOption" :option="lineOption" class="chart" />
    <BaseEmpty v-else imgWidth="150" imgHeight="120" textMt="0" :style="{
      width: '100%',
      height: '180px',
      marginTop: '20px'
    }" />
  </BaseCard>
</template>

<script>
import BaseCard from '../BaseCard'
import BaseEmpty from 'components/base/BaseEmpty'
import BaseChart from 'components/base/BaseChart'
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  components: {
    BaseCard,
    BaseChart,
    BaseEmpty
  },
  data() {
    return {}
  },
  computed: {
    // 成长趋势 折线图配置项
    lineOption() {
      if (!this.list.length) return false
      let xData = []
      let lineData = []
      let obj = {}
      this.list.forEach(v => {
        let date = v.showDateStr
        obj[date] = v.dayDurationStr
        xData.push(date)
        lineData.push(v.dayDuration)
      })
      let options = {
        tooltip: {
          trigger: 'axis',
          borderColor: 'transparent',
          backgroundColor: '#fff',
          formatter: function (params) {
            let name = params[0].axisValue
            return `<div style="font-size: 16px; line-height: 24px; color: rgba(0, 0, 0, 0.80);">
                      <span>${name.slice(-5)}</span>
                      <span style="font-weight: 600; margin-left: 12px">${obj[name]}</span>
                  </div>`;
          }
        },
        grid: {
          top: 18,
          left: 0,
          right: 0,
          bottom: 0,
          containLabel: true
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            color: '#969799',
            margin: 12,
            fontSize: 12,
            formatter(val) {
              return val.slice(-5)
            }
          },
          axisTick: {
            show: false
          },
          data: xData
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: '#969799',
            fontSize: 12
          },
          splitLine: {
            lineStyle: {
              type: 'dashed',
              color: '#E9E9E9'
            }
          }
        },
        series: [
          {
            data: lineData,
            type: 'line',
            symbol: 'circle',
            itemStyle: {
              color: '#1990FF'
            },
            areaStyle: {
              opacity: 0.25,
              color: {
                type: 'linear', // 渐变类型
                x: 0, // 渐变起始点 x 坐标
                y: 0, // 渐变起始点 y 坐标
                x2: 0, // 渐变结束点 x 坐标
                y2: 1, // 渐变结束点 y 坐标
                colorStops: [
                  {
                    offset: 0, // 渐变起始点颜色的位置
                    color: '#1990FF', // 渐变起始点颜色
                  },
                  {
                    offset: 1, // 渐变结束点颜色的位置
                    color: '#fff', // 渐变结束点颜色
                  },
                ],
              },
            },
            symbol: 'none'
          }
        ]
      }
      return options
    }
  },
  created() {},
  methods: {},
}
</script>

<style scoped lang="less">
.base_chart.chart {
  width: 100%;
  height: 180px;
  margin-top: 20px;
}
</style>