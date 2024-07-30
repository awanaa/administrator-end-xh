<!--
 * @Author: xiejh 1415413020@qq.com
 * @Date: 2024-04-15 14:36:02
 * @LastEditors: xiejh 1415413020@qq.com
 * @LastEditTime: 2024-04-22 14:42:14
 * @FilePath: \portal\mhealth\src\views\smartSport\components\AdditionProjectCard.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="project-card">
    <div class="project-card_header" @click="handleViewDetail">
      <div class="project-card_header__tag">
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
      </div>
      <div class="project-card_header__title">{{ detailData.sportName }}</div>
      <div class="project-card_header__icon">
        <van-icon name="arrow" />
      </div>
    </div>
    <div class="project-card_content">
      <div>
        开始时间：{{ detailData.taskRunningTime | date("yyyy-MM-dd HH:mm:ss") }}
      </div>
    </div>
  </div>
</template>

<script>
import LevelTag from "@/views/smartSport/components/LevelTag.vue";

import DateFilter from "@/filters/DateFilter";
import { CONDITION_CODE_MAP } from "@/constants/smartSport/common.js";
import { getLabelByValue } from "@/utils/common.js";

export default {
  components: {
    LevelTag,
  },
  filters: {},
  mixins: [DateFilter],
  props: {
    detailData: {
      type: Object,
      default: () => ({
        sceneType: 1,
        sportName: "1000米",
        taskRunningTime: "2024-12-12 20:00:00",
      }),
    },
    conditionList: {
      type: Array,
      default: () => [],
    },
  },
  watch: {},
  computed: {},
  data() {
    return {
      conditionTypeMap: CONDITION_CODE_MAP,
    };
  },
  mounted() {},
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
      return (
        (condition &&
          getLabelByValue(String(val), condition.dataList, labelKey)) ||
        ""
      );
    },
    /**
     * 查看详情
     */
    handleViewDetail() {
      this.$router.push({
        name: "smartSport_physical_score_addition_detail",
        query: {
          taskId: this.detailData.taskId,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.project-card {
  width: 100%;
  padding: 0 16px;
  box-sizing: border-box;
  &_header {
    display: flex;
    align-items: center;
    padding: 16px 0;
    border-bottom: 1px solid #ebedf0;
    &__title {
      flex: 1;
      margin-left: 8px;
    }
    &__icon {
      color: #c8c9cc;
      font-size: 20px;
    }
  }
  &_content {
    padding: 12px 0;
    color: #969799;
    font-family: "PingFang SC";
    font-size: 14px;
    line-height: 22px;
  }
}
</style>
