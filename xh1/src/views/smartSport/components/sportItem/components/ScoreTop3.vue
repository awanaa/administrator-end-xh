<!--
 * @Author: caiyf
 * @Date: 2024-04-17 16:21:22
 * @LastEditors: xiejh 1415413020@qq.com
 * @LastEditTime: 2024-04-29 11:33:55
 * @Description: 成绩top3
 * @FilePath: \mobile\mhealth\src\views\smartSport\components\sportItem\components\ScoreTop3.vue
-->
<template>
  <BaseCard title="成绩top3" cardBg="#F7F8FA" :style="{ padding: '12px' }">
    <div v-if="Object.keys(data).length" class="cont">
      <div class="cont_card">
        <div class="cont_card_count">
          <img src="@/assets/images/smartSport/medal_icon.png" class="cont_card_count_icon" />
          <span class="cont_card_count_tx">{{ data.showSportValue }}</span>
        </div>
        <div class="cont_card_tag">
          <LevelTag type="success">{{ data.isValid == 1 ? '有效' : '无效' }}</LevelTag>
          <LevelTag :type="changeLevel(data.sportLevel)">{{ data.sportLevel }}</LevelTag>
          <LevelTag>{{ data.sportGrade }}分</LevelTag>
          <!--  0 非补录成绩 1 设备补录 2 移动端补录 3 PC端补录 -->
          <LevelTag v-if="data.patchType">补录</LevelTag>
        </div>
        <div class="cont_card_date">{{ data.sportTestTime }}</div>
        <div class="cont_card_btn" :class="{ mt0: !data.hasReport && !data.hasPlayback }">
          <div v-if="data.hasReport" class="cont_card_btn_item" @click="handleReport">
            <img src="@/assets/images/smartSport/run_report_icon.png" class="cont_card_btn_icon" />
            <span class="cont_card_btn_tx">运动报告</span>
          </div>
          <div v-if="data.hasPlayback" class="cont_card_btn_item" @click="handlePlay">
            <img src="@/assets/images/smartSport/play_circle_icon.png" class="cont_card_btn_icon" />
            <span class="cont_card_btn_tx">视频播放</span>
          </div>
        </div>
      </div>
      <div class="cont_more" @click="handleMore">
        <span class="cont_more_text">查看更多</span>
        <van-icon name="arrow" color="#323233" size="14" />
      </div>
    </div>
    <BaseEmpty v-else imgWidth="150" imgHeight="120" textMt="0" :style="{
      height: '158px',
      marginTop: '12px'
    }" />
  </BaseCard>
</template>

<script>
import BaseCard from 'views/smartSport/components/BaseCard'
import BaseEmpty from 'components/base/BaseEmpty'
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
    BaseCard,
    BaseEmpty,
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
    // 查看更多
    handleMore() {
      let query = JSON.parse(JSON.stringify(this.params))
      delete query.sceneType
      this.$router.push({
        name: 'smartSport_top_record',
        query
      })
    },

    // 查看运动报告
    handleReport() {
      this.postByCode('I_DATA_KS_SPORTS_SCORE_GETREPORT', {
        schoolId: this.params.schoolId,
        scoreId: this.data.scoreId,
      }).then(res => {
        if (!res.status) return this.$toast.fail(res.resmsg)
        const data = res.data || []
        if (!data[0]) return this.$toast.fail('暂无报告')
        window.location.href = data[0].reportUrl
      })
    },

    // 查看视频播放
    handlePlay() {
      this.$router.push({
        name: 'smartSport_physical_review',
        query: {
          id: this.data.scoreId
        }
      })
    }
  },
}
</script>

<style scoped lang="less">
.cont {
  &_card {
    margin-top: 12px;
    width: 100%;
    padding: 12px;
    background: #FFF;
    border-radius: 12px;
    box-sizing: border-box;
    &_count {
      display: flex;
      align-items: center;
      &_icon {
        width: 20px;
        height: 20px;
      }
      &_tx {
        margin-left: 4px;
        flex: 1;
        color: #323233;
        font-size: 16px;
        font-weight: 600;
        line-height: 24px;
      }
    }
    &_tag {
      display: flex;
      align-items: center;
      margin-top: 4px;
    }
    &_date {
      margin-top: 4px;
      color: #969799;
      font-size: 14px;
      line-height: 22px;
    }
    &_btn {
      margin-top: 8px;
      display: flex;
      align-items: center;
      &.mt0 {
        margin-top: 0;
      }
      &_item {
        &:not(:first-child) {
          margin-left: 8px;
        }
        display: flex;
        align-items: center;
        padding: 4px 12px;
        border: 1px solid #5FBA00;
        border-radius: 8px;
      }
      &_icon {
        width: 16px;
        height: 16px;
      }
      &_tx {
        margin-left: 4px;
        color: #5FBA00;
        font-size: 14px;
        font-weight: 600;
        line-height: 22px;
      }
    }
  }
  &_more {
    margin-top: 12px;
    height: 26px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #323233;
    font-size: 14px;
    &_text {
      margin-right: 2px;
    }
  }
}
</style>
