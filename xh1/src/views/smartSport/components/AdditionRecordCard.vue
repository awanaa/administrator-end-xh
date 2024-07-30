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
        }}</LevelTag>
        <div class="title">{{ detailData.sportName }}</div>
      </div>
    </div>
    <div class="record-card-main">
      <div class="dis-item">
        <img :src="iconCalendar" alt="">
        <span class="dis-item_label">运动时间：</span>
        <span class="dis-item_value">{{ detailData.exerciseTime | date("yyyy-MM-dd HH:mm:ss") }}</span>
      </div>
      <div class="dis-item">
        <img :src="iconUser" alt="">
        <span class="dis-item_label">补录学生：</span>
        <span class="dis-item_value">{{ detailData.userName || '-'}}｜{{ detailData.className }}</span>
      </div>
      <div class="dis-item display-flex display-flex-middle">
        <img :src="iconDoc" alt="">
        <span class="dis-item_label">补录成绩：</span>
        <span class="dis-item_value">{{ detailData.showSportScore }}</span>
      </div>
    </div>
    <div class="record-card-footer">
      <div class="tool-btn">
        <span class="">操作人：</span>
        <span class="">{{ detailData.creatorName }}</span>
      </div>
      <div class="tool-btn">
        <span>{{ detailData.createTime | date("yyyy-MM-dd HH:mm:ss") }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import iconCalendar from '@/assets/images/smartSport/icon_calendar.png';
import iconUser from '@/assets/images/smartSport/icon_user.png';
import iconDoc from '@/assets/images/smartSport/icon_doc.png';

import LevelTag from '@/views/smartSport/components/LevelTag.vue';

import DateFilter from "@/filters/DateFilter";
import { CONDITION_LIST, CONDITION_CODE_MAP } from "@/constants/smartSport/common.js";
import { getLabelByValue } from "@/utils/common.js";
export default {
  components: {
    LevelTag
  },
  filters: {
  },
  mixins: [DateFilter],
  props: {
    detailData: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {

  },
  computed: {

  },
  data() {
    return {
      iconCalendar,
      iconUser,
      iconDoc,
      conditionList: CONDITION_LIST,
      conditionTypeMap: CONDITION_CODE_MAP,
    };
  },
  mounted() {
  },
  methods: {
    /**
     * 根据code获取数据
     * @param {*} val  标识值
     * @param {*} code 数据源标识
     * @param {*} labelKey 数据源中需要获取值的key
     */
    getInfoByVal(val, code, labelKey) {
      // 取出数据源
      const condition = this.conditionList.find((item) => item.code === code);
      // 在数据源中根据某个标识获取指定labelKey的值
      return condition && getLabelByValue(String(val), condition.dataList, labelKey) || '';
    },
  }
}
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
    &_left, &_right {
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
  }
  &-main {
    padding: 0 16px 12px;
    .dis-item {
      font-family: "PingFang SC";
      .display-flex;
      .display-flex-middle;
      &_label {
        color:#969799;
        font-size: 14px;
        flex-shrink: 0;
        margin-left: 8px;
      }
      &_value {
        color: #646566;
        font-size: 14px;
      }
      img {
        width: 16px;
        height: 16px;
      }
    }
    .dis-item + .dis-item {
      margin-top: 8px;
    }
  }
  &-footer {
    padding: 12px 16px;
    .display-flex;
    justify-content: space-between;
    border-top: 1px solid #EBEDF0;
    .tool-btn {
      flex: 1;
      color: #969799;
      font-family: "PingFang SC";
      font-size: 14px;
    }
    .tool-btn:last-child {
      text-align: right;
    }
  }
}
</style>
