<!--
 * @Author: caiyf
 * @Date: 2024-04-17 15:51:07
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-04-29 11:17:36
 * @Description: 运动单项信息页
 * @FilePath: \mobile\mhealth\src\views\smartSport\SportItem.vue
-->
<template>
  <div class="sport">
    <!-- 模式 -->
    <Mode
      :stat="stat"
      :levelDistribution="levelDistribution"
      :studLevelGrade="studLevelGrade"
      :studTop="studTop"
      :params="params"
      @modeChange="handleModeChange"
    />
    <!-- 近七天体测时长 -->
    <Duration class="mt16" :list="studsevendaytrend" />
    <!-- 成绩趋势 -->
    <Trend class="mt16" :list="scoreTrend" />
  </div>
</template>

<script>
import Components from './components/sportItem'
import utils from '@/utils/util'
export default {
  props: {},
  components: {
    ...Components
  },
  data() {
    return {
      params: {}, // 请求参数
      stat: {}, // 运动统计信息
      levelDistribution: {}, // 成绩等级分布
      studLevelGrade: {}, // 成绩评分
      studTop: {}, // 成绩top3，只拿第一条数据
      studsevendaytrend: [], // 近七天体测时长
      scoreTrend: [] // 成绩趋势数据
    }
  },
  computed: {},
  created() {
    this.params = this.$route.query
    // 路由前置守卫也设置了title
    setTimeout(() => {
      let paegInfo = utils.getSessionStorage('smartSport_sportItem') || {}
      utils.setTitle(paegInfo.sportName)
    })
  },
  methods: {
    getData() {
      this.getStat()
      this.getLevelDistribution()
      this.getStudLevelGrade()
      this.getStudTop()
      this.getStudsevendaytrend()
      this.getScoreTrend()
    },

    // 获取指定运动的运动统计信息
    getStat() {
      this.postByCode('I_DATA_KS_SPORTS_STUD_OVERVIEW_GETSTUDONESPORTINFO', {
        ...this.params
      }).then(res => {
        if (!res.status) return this.$toast.fail(res.resmsg)
        this.stat = res.data || {}
      })
    },

    // 获取成绩等级分布数据 
    getLevelDistribution() {
      this.postByCode('I_DATA_KS_SPORTS_STUD_OVERVIEW_GETSTUDLEVELDISTRIBUTION', {
        ...this.params
      }).then(res => {
        if (!res.status) return this.$toast.fail(res.resmsg)
        // this.list = [
        //   { value: data.excellentNum || 0, name: '优秀', ratio: data.excellentPersent || 0 },
        //   { value: data.goodNum || 0, name: '良好', ratio: data.goodPersent || 0 },
        //   { value: data.passNum || 0, name: '及格', ratio: data.passPersent || 0 },
        //   { value: data.notPassNum || 0, name: '不及格', ratio: data.notPassPersent || 0 }
        // ]
        this.levelDistribution = res.data || {}
      })
    },

    // 获取成绩评分
    getStudLevelGrade() {
      this.postByCode('I_DATA_KS_SPORTS_STUD_OVERVIEW_GETSTUDLEVELGRADE', {
        ...this.params
      }).then(res => {
        if (!res.status) return this.$toast.fail(res.resmsg)
        // const data = res.data || {}
        // this.scoreList2 = [
        //   { label: '最高分', value: data.bestSportGrade || 0, level: data.bestSportLevel },
        //   { label: '最低分', value: data.lowestSportGrade || 0, level: data.lowestSportLevel },
        //   { label: '平均分', value: data.avgSportGrade || 0, level: data.avgSportLevel }
        // ]
        // this.passPersent = Number(data.passPersent) || 0
        this.studLevelGrade = res.data || {}
      })
    },

    // 获取成绩top3数据
    getStudTop() {
      this.studTop = {}
      this.postByCode('I_DATA_KS_SPORTS_STUD_OVERVIEW_GETSTUDTOP', {
        ...this.params
      }).then(res => {
        if (!res.status) return this.$toast.fail(res.resmsg)
        let data = res.data || []
        if (data.length) this.studTop = data[0]
      })
    },

    // 获取近七天体测时长
    getStudsevendaytrend() {
      this.postByCode('I_DATA_KS_SPORTS_STUD_OVERVIEW_GETSTUDSEVENDAYTREND', {
        ...this.params,
        sceneType: null
      }).then(res => {
        if (!res.status) return this.$toast.fail(res.resmsg)
        this.studsevendaytrend = res.data || []
      })
    },

    // 获取成绩趋势数据
    getScoreTrend() {
      this.postByCode('I_DATA_KS_SPORTS_STUD_OVERVIEW_GETSCORETREND', {
        ...this.params,
        sceneType: null
      }).then(res => {
        if (!res.status) return this.$toast.fail(res.resmsg)
        this.scoreTrend = res.data || []
        // 只拿最新七条数据
        if (this.scoreTrend.length > 7) this.scoreTrend = this.scoreTrend.slice(-7)
      })
    },

    // 模式切换 1训练 2测试
    handleModeChange(val) {
      this.params = {
        ...this.params,
        sceneType: val
      }
      this.getData()
    }
  },
}
</script>

<style scoped lang="less">
.sport {
  padding: 16px;
  box-sizing: border-box;
  .mt16 {
    margin-top: 16px;
  }
}
</style>