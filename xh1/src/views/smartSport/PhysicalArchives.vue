<!--
 * @Author: caiyf
 * @Date: 2024-04-10 15:34:12
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-04-19 15:08:29
 * @Description: 体测档案
 * @FilePath: \mobile\mhealth\src\views\smartSport\PhysicalArchives.vue
-->
<template>
  <div class="physical">
    <span class="physical_bg1"></span>
    <span class="physical_bg2"></span>
    <div class="content">
      <!-- 学生 - 用户信息 -->
      <UserInfo :data="userInfo" />
      <!-- 体测基础信息 -->
      <BaseInfo class="mt16" :data="userInfo" />
      <!-- 近七天体测时长 -->
      <Duration class="mt16" :list="durationData" />
      <!-- 项目数据 -->
      <ProjectData class="mt16" :list="studSportStat" :params="params" />
    </div>
  </div>
</template>

<script>
import Components from './components/physicalArchives' // 统一引入该页面全部子组件
export default {
  props: {},
  components: {
    ...Components
  },
  data() {
    return {
      params: {},
      userInfo: {},
      durationData: [], // 近七天体测时长数据
      studSportStat: [], // 项目数据
    }
  },
  computed: {},
  created() {
    this.params = this.$route.query || {}
    this.getUserInfo()
  },
  methods: {
    // 获取用户信息
    getUserInfo() {
      this.postByCode('I_DATA_KS_SPORTS_STUD_OVERVIEW_GETSTUDSPORTINFO', {
        ...this.$route.query,
        searchConsecutiveSportDay: true
      }).then(res => {
        if (!res.status) return this.$toast.fail(res.resmsg)
        const data = res.data || {}
        this.userInfo = data
        this.params = {
          ...this.params,
          userId: data.userId || '',
          classId: data.classId || '',
          gradeId: data.gradeId || ''
        }
        this.getDuration()
        this.getStudSportStat()
      })
    },

    // 获取近七天体测时长
    getDuration() {
      this.postByCode('I_DATA_KS_SPORTS_STUD_OVERVIEW_GETSTUDSEVENDAYDURATION', {
        ...this.params
      }).then(res => {
        if (!res.status) return this.$message.error(res.resmsg)
        this.durationData = res.data || []
      })
    },

    // 获取项目数据
    getStudSportStat() {
      this.postByCode('I_DATA_KS_SPORTS_STUD_OVERVIEW_GETSTUDSPORTSTAT', {
        ...this.params
      }).then(res => {
        if (!res.status) return this.$message.error(res.resmsg)
        this.studSportStat = res.data || []
      })
    }
  },
}
</script>

<style scoped lang="less">
.physical {
  position: relative;
  height: inherit;
  min-height: 100%;
  &_bg1 {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 600px;
    background: url('~assets/images/smartSport/physical_archives_bg.png') no-repeat;
    background-size: 100% 100%;
    z-index: 0;
  }
  &_bg2 {
    position: absolute;
    top: 0;
    right: 0;
    width: 164px;
    height: 208px;
    background: url('~assets/images/smartSport/physical_archives_bg2.png') no-repeat;
    background-size: 100% 100%;
    z-index: 0;
  }
  .content {
    position: absolute;
    width: 100%;
    height: 100%;
    min-height: 100%;
    padding: 16px;
    box-sizing: border-box;
    top: 0;
    left: 0;
    z-index: 2;
  }
  .mt16 {
    margin-top: 16px;
  }
}
</style>