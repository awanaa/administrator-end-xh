<template>
  <div class="record-card">
    <div class="record-card-header">
      <div class="record-card-header_left">
        <LevelTag
          :type="
            getInfoByVal(
              detailData.sceneType,
              conditionTypeMap['SCENE'],
              'theme'
            )
          "
          :plain="false"
          >{{
            getInfoByVal(
              detailData.sceneType,
              conditionTypeMap["SCENE"],
              "label"
            )
          }}</LevelTag
        >
        <div class="title">{{ detailData.sportName }}</div>
      </div>
      <div class="record-card-header_right">
        <slot name="headerRight">{{
          detailData.exerciseTime | date("yyyy-MM-dd HH:mm:ss")
        }}</slot>
      </div>
    </div>
    <div class="record-card-main">
      <div class="dis-item">
        <img :src="iconCircle" alt="" />
        <span class="dis-item_label">姓名：</span>
        <span class="dis-item_value">{{ detailData.userName }}</span>
      </div>
      <div class="dis-item">
        <img :src="iconCircle" alt="" />
        <span class="dis-item_label">班级：</span>
        <span class="dis-item_value">{{ detailData.className }}</span>
      </div>
      <div class="dis-item display-flex display-flex-middle">
        <img :src="iconCircle" alt="" />
        <span class="dis-item_label">成绩：</span>
        <span class="dis-item_value">{{ detailData.showSportScore || detailData.showSportValue }}</span>
        <div class="dis-item_tag">
          <LevelTag type="success">{{ detailData.isValid == 1 ? '有效' : '无效' }}</LevelTag>
          <LevelTag
            :type="
              getInfoByVal(
                detailData.sportLevel,
                conditionTypeMap['LEVEL'],
                'theme'
              )
            "
            >{{ detailData.sportLevel }}</LevelTag
          >
          <LevelTag>{{ detailData.sportGrade }}分</LevelTag>
          <LevelTag v-if="detailData.patchType">补录</LevelTag>
        </div>
      </div>
    </div>
    <div
      class="record-card-footer"
      :class="{ 'border-top': detailData.hasReport || detailData.hasPlayback }"
    >
      <div
        v-if="detailData.hasReport"
        class="tool-btn"
        @click="handleClickReport"
      >
        <img :src="iconReport" alt="" style="margin-right: 8px" />
        运动报告
      </div>
      <div
        v-if="detailData.hasPlayback"
        class="tool-btn"
        @click="handleClickReview"
      >
        <img :src="iconVideo" alt="" style="margin-right: 8px" />
        视频回放
      </div>
    </div>
  </div>
</template>

<script>
import LevelTag from "@/views/smartSport/components/LevelTag.vue";
import iconCircle from "@/assets/images/smartSport/icon_circle.png";
import iconReport from "@/assets/images/smartSport/icon_report.svg";
import iconVideo from "@/assets/images/smartSport/icon_video.svg";

import DateFilter from "@/filters/DateFilter";
import {
  CONDITION_LIST,
  CONDITION_CODE_MAP,
} from "@/constants/smartSport/common.js";
import { getLabelByValue } from "@/utils/common.js";
import { postByCode } from "@/api/common";
export default {
  components: {
    LevelTag,
  },
  mixins: [DateFilter],
  props: {
    // 详情数据
    detailData: {
      type: Object,
      default: () => ({}),
    },
    // 常量值, 本地常量 + 后端返回数据
    conditionList: {
      type: Array,
      default: () => [],
    },
  },
  filters: {},
  watch: {},
  computed: {
    schoolId() {
      return this.$store.state.schoolId;
    },
  },
  data() {
    return {
      iconCircle,
      iconReport,
      iconVideo,
      conditionTypeMap: CONDITION_CODE_MAP,
    };
  },
  mounted() {},
  methods: {
    handleClickReport() {
      postByCode("I_DATA_KS_SPORTS_SCORE_GETREPORT", {
        schoolId: this.schoolId,
        scoreId: this.detailData.id,
      }).then((res) => {
        if (!res.status) {
          this.$vux.alert.show({
            title: "错误",
            content: res.resmsg,
          });
          return;
        }
        let data = res.data || [];
        if (!data[0]) {
          this.$vux.alert.show({
            title: "暂无运动报告",
            content: res.resmsg,
          });
        }
        window.open(data[0].reportUrl, "_blank");
      });
    },
    handleClickReview() {
      this.$router.push({
        name: "smartSport_physical_review",
        query: {
          id: this.detailData.id || this.detailData.scoreId || '',
          hasBtnGroup: this.detailData.hasPicture,
        },
      });
    },
    /**
     * 根据code获取数据
     * @param {*} val  标识值
     * @param {*} code 数据源标识
     * @param {*} labelKey 数据源中需要获取值的key
     */
    getInfoByVal(val, code, labelKey) {
      // 取出数据源
      const cleConditionList = this.conditionList.length
        ? this.conditionList
        : CONDITION_LIST;
      const condition = cleConditionList.find((item) => item.code === code);
      // 在数据源中根据某个标识获取指定labelKey的值
      return (
        (condition &&
          getLabelByValue(String(val), condition.dataList, labelKey)) ||
        ""
      );
    },
  },
};
</script>

<style lang="less" scoped>
.mixin-overflow-hidden {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}
.display-flex {
  display: flex;
}
.display-flex-middle {
  align-items: center;
}
.record-card {
  background: #fff;
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;
  &-header {
    display: flex;
    padding: 16px;
    align-items: center;
    &_left,
    &_right {
      flex: 1;
    }
    &_left {
      display: flex;
      align-items: center;
      .mixin-overflow-hidden;
      .title {
        width: 100%;
        margin-left: 8px;
        .mixin-overflow-hidden;
      }
    }
    &_right {
      margin-left: 8px;
      color: #969799;
      font-family: "PingFang SC";
      font-size: 12px;
      text-align: right;
    }
  }
  &-main {
    padding: 0 16px 12px;
    .dis-item {
      font-family: "PingFang SC";
      .display-flex;
      .display-flex-middle;
      &_label {
        color: #969799;
        font-size: 14px;
        flex-shrink: 0;
        margin-left: 8px;
      }
      &_value {
        color: #646566;
        font-size: 14px;
      }
      &_tag {
        // display: grid;
        // grid-template-columns: 1fr 1fr 1fr;
        // gap: 4px;
        display: flex;
        flex-wrap: wrap;
        flex: 1;
        margin-left: 8px;
        justify-content: flex-start;
      }
    }
    .dis-item + .dis-item {
      margin-top: 8px;
    }
  }
  &-footer {
    padding: 0 16px;
    .display-flex;
    .display-flex-middle;
    &.border-top {
      border-top: 1px solid #ebedf0;
    }
    .tool-btn {
      flex: 1;
      .display-flex;
      .display-flex-middle;
      justify-content: center;
      padding: 12px 0;
      color: #323233;
      font-family: "PingFang SC";
      font-size: 14px;
      font-weight: 600;
    }
    .tool-btn + .tool-btn {
      border-left: 1px solid #ebedf0;
    }
  }
}
</style>
