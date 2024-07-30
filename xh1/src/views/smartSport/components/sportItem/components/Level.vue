<!--
 * @Author: caiyf
 * @Date: 2024-04-17 16:20:17
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-04-19 16:25:59
 * @Description: 成绩等级分布
 * @FilePath: \mobile\mhealth\src\views\smartSport\components\sportItem\components\Level.vue
-->
<template>
  <BaseCard title="成绩等级分布" cardBg="#F7F8FA" :style="{ padding: '12px' }">
    <BaseChart class="chart" v-if="pieOptions" :option="pieOptions" :colors="pieColors" />
    <BaseEmpty v-else imgWidth="150" imgHeight="120" textMt="0" :style="{
      height: '158px'
    }" />
  </BaseCard>
</template>

<script>
import BaseCard from 'views/smartSport/components/BaseCard'
import BaseChart from 'components/base/BaseChart'
import BaseEmpty from 'components/base/BaseEmpty'
export default {
  props: {
    data: {
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
      pieColors: ['#2FC25B', '#1890FF', '#8543E0', '#F04864']
    }
  },
  computed: {
    // 成绩等级分布图表配置项
    pieOptions() {
      if (!this.list.length) return false
      let objData = {}
      this.list.forEach(v => {
        objData[v.name] = {
          value: v.value,
          ratio: v.ratio
        }
      });

      let options = {
        tooltip: {
          borderColor: 'transparent',
          backgroundColor: '#fff',
          formatter: function (params) {
            return `<div style="font-size: 14px;">
                      <span style="color: #252526">${params.name}</span>
                      <span style="color: #252526; font-weight: 600; margin-left: 6px">${objData[params.name].value}
                      <span style="margin: 0 2px"></span>
                      ${objData[params.name].ratio}%</span>
                  </div>`;
          }
        },
        legend: {
          orient: 'vertical',
          top: 'center',
          right: '0',
          // icon: 'circle',
          itemWidth: 12, // 图例标记的宽度
          itemHeight: 8, // 图例标记的高度
          textStyle: {
            rich: {
              a: {
                width: 48,
                fontSize: 14,
                color: 'rgba(0, 0, 0, 0.8)'
              },
              b: {
                width: 48,
                fontSize: 14,
                color: 'rgba(0, 0, 0, 0.8)',
                padding: [0, 0, 0, 6]
              }
            }
          },
          formatter(name) {
            return [
              `{a|${name}}`,
              `{b|${objData[name].value}次}`
            ].join('')
            // return name + '   ' + objData[name] + '  ' + percent
          }
        },
        series: [
          {
            type: 'pie',
            left: 'left',
            radius: ['40%', '80%'],
            center: ['25%', '50%'],
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
            data: this.list
          }
        ]
      }
      
      return options
    },
    
    list() {
      return [
        { value: this.data.excellentNum || 0, name: '优秀', ratio: this.data.excellentPersent || 0 },
        { value: this.data.goodNum || 0, name: '良好', ratio: this.data.goodPersent || 0 },
        { value: this.data.passNum || 0, name: '及格', ratio: this.data.passPersent || 0 },
        { value: this.data.notPassNum || 0, name: '不及格', ratio: this.data.notPassPersent || 0 }
      ]
    }
  },
  created() {},
  methods: {
    // 获取成绩等级分布数据 
    getLevelDistribution() {
      this.openPostByCode('I_DATA_KS_SPORTS_STUD_OVERVIEW_GETSTUDLEVELDISTRIBUTION', {
        ...this.params
      }).then(res => {
        if (!res.status) return this.$message.error(res.resmsg)
        const data = res.data || {}
        this.list = [
          { value: data.excellentNum || 0, name: '优秀', ratio: data.excellentPersent || 0 },
          { value: data.goodNum || 0, name: '良好', ratio: data.goodPersent || 0 },
          { value: data.passNum || 0, name: '及格', ratio: data.passPersent || 0 },
          { value: data.notPassNum || 0, name: '不及格', ratio: data.notPassPersent || 0 }
        ]
      })
    },
  },
}
</script>

<style scoped lang="less">
.base_chart.chart {
  margin-top: 12px;
  height: 144px;
}
</style>