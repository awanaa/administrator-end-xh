<template>
    <div style="margin-right: 20px;">

      <el-card style="max-width: 674px;">
    <div ref="chartDom" style="width: 674px; height: 401px;"></div>
  </el-card>
       
    </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';

type EChartsOption = echarts.EChartsOption;

const chartDom = ref<HTMLDivElement | null>(null);

onMounted(() => {
  if (chartDom.value) {
    const myChart = echarts.init(chartDom.value);
    const option: EChartsOption = {
      title: {
        text: '学生人数变化图'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['收入', '支出']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['18', '19', '20', '21', '22', '23', '24']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '人数',
          type: 'line',
          stack: 'Total',
          data: [120, 132, 101, 134, 90, 230, 210]
        },
       
       
      ]
    };

    option && myChart.setOption(option);
  }
});
</script>

<style scoped>
/* 在这里添加组件的样式 */
</style>
