<!--
 * @Author: caiyf
 * @Date: 2024-04-10 15:56:59
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-04-19 14:35:10
 * @Description: 近七天体测时长
 * @FilePath: \mobile\mhealth\src\views\smartSport\components\physicalArchives\Duration.vue
-->
<template>
  <BaseCard title="近七天体测时长" showHeadIcon>
    <div class="cont">
      <BaseChart v-if="barOptions" :option="barOptions"></BaseChart>
      <BaseEmpty v-else imgWidth="150" imgHeight="120" textMt="0"></BaseEmpty>
    </div>
  </BaseCard>
</template>

<script>
import BaseCard from '../BaseCard'
import BaseChart from 'components/base/BaseChart'
import BaseEmpty from 'components/base/BaseEmpty'
import * as echarts from 'echarts';
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
    barOptions() {
      if (!this.list.length) return
      let xData = []
      let seriesData = []
      let objData = {}
      this.list.forEach(v => {
        xData.push(v.showDateStr)
        seriesData.push(v.dayDuration)
        objData[v.showDateStr] = v.dayDurationStr
      })
      let options = {
        tooltip: {
          trigger: 'item',
          axisPointer: {
            type: 'shadow'
          },
          borderColor: 'transparent',
          backgroundColor: '#fff',
          borderRadius: 12,
          formatter: function (params) {
            return `<div style="display: flex; align-items: center; border-radius: 4px;>
                      <span style="color: rgba(0, 0, 0, 0.80); font-size: 16px; line-height: 24px">${params.name}</span>
                      <span 
                        style="color: rgba(0, 0, 0, 0.80); font-weight: 600; margin-left: 12px; font-size: 16px; line-height: 24px"
                      >${objData[params.name]}</span>
                  </div>`;
          }
        },
        grid: {
          top: 24,
          bottom: 0,
          right: 0,
          left: 0,
          containLabel: true
        },
        xAxis: {
          data: xData,
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#d9d9d9'
            }
          },
          axisLabel: {
            color: '#969799',
            margin: 12,
            fontSize: 12,
            formatter: val => {
              return val.replace('.', '-')
            }
          }
        },
        yAxis: {
          type: 'value',
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            color: '#969799',
            fontSize: 12
          },
          splitLine: {
            lineStyle: {
              color: '#d9d9d9',
              type: 'dashed'
            }
          }
        },
        series: [
          {
            data: seriesData,
            type: 'bar',
            barWidth: 16,
            itemStyle: {
              // color: '#fc6435',
              borderRadius: [4, 4, 0, 0],
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#1890FF'
                },
                {
                  offset: 1,
                  color: '#18ADFF'
                }
              ])
            }
          }
        ]
      }
      
      return options
    }
  },
  created() {},
  methods: {
    getData() {
      this.openPostByCode('I_DATA_KS_SPORTS_STUD_OVERVIEW_GETSTUDSEVENDAYDURATION', {
        ...this.params
      }).then(res => {
        if (!res.status) return this.$message.error(res.resmsg)
        this.list = res.data || []
      })
    },

    // 20231212 => 12-12
    formatDateString(str) {
      const month = str.slice(4, 6)
      const day = str.slice(6, 8)
      return `${month}-${day}`
    }
  },
}
</script>

<style scoped lang="less">
.cont {
  margin-top: 20px;
  width: 100%;
  height: 180px;
}
</style>