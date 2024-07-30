<template>
  <div class="physical-record">
    <div class="physical-record_header">
      <PhyDatePicker
        v-model="dateTime"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        class="flex-1"
        @change="ChangeQueryParams"
      ></PhyDatePicker>
      <OtherConditionPopup
        ref="$otherConditionPopup"
        class="flex-1"
        :dataList.sync="conditionList"
        @change="ChangeQueryParams"
      ></OtherConditionPopup>
    </div>
    <div class="physical-record_main">
      <ScrollList
        :lists="lists"
        :loading="loading"
        :finished="finished"
        @refresh="handleRefresh"
        @load="handleLoad"
      >
        <template slot-scope="{ row }">
          <PhyRecordCard :detailData="row"></PhyRecordCard>
        </template>
      </ScrollList>
    </div>
  </div>
</template>

<script>
import { postByCode } from "@/api/common";
import { CONDITION_LEVEL_VALID, CONDITION_CODE_MAP } from "@/constants/smartSport/common.js";

import ScrollList from "@/components/ScrollList.vue";
import PhyRecordCard from "@/views/smartSport/components/PhyRecordCard.vue";
import PhyDatePicker from "@/views/smartSport/components/PhyDatePicker.vue";
import PhyClassPickerPopup from "@/views/smartSport/components/PhyClassPickerPopup.vue";
import OtherConditionPopup from "@/views/smartSport/components/OtherConditionPopup.vue";
const dayjs = require('dayjs');
import { util } from 'm-com';

export default {
  components: {
    ScrollList,
    PhyRecordCard,
    PhyDatePicker,
    PhyClassPickerPopup,
    OtherConditionPopup,
  },
  filters: {},
  props: {
  },
  watch: {},
  computed: {
    schoolId() {
      return this.$store.state.schoolId
    },
    maxDate() {
      const maxLength = 6
      // 获取当前时间
      const currentDate = new Date();
      // 获取当前年份
      const currentYear = currentDate.getFullYear();
      // 计算6年后的年份
      const futureYear = currentYear + maxLength;
      // 设置未来时间
      const futureDate = new Date(currentDate);
      futureDate.setFullYear(futureYear);
      return futureDate
    }
  },
  data() {
    return {
      minDate: new Date(),
      dateTime: "",
      // 其他查询条件
      conditionList: CONDITION_LEVEL_VALID,
      page: {
        pageNum: 1,
        pageSize: 20,
        totalcount: 0,
      },
      // 加载中
      loading: false,
      // 是否到底
      finished: true,
      // 列表数据
      lists: []
    };
  },
  mounted() {
    const title = this.$route.meta.title || '';
    util.setTitle(title);

    this.handleRefresh()
  },
  methods: {
    /**
     * 根据状态查询列表
     */
    async queryList() {
      this.loading = true
      // 指定学生
      let { userId, classId, sceneType, sportId } = this.$route.query
      // 班级
      let classIds = classId ?[classId] : ''
      // 时间
      let startTime = this.dateTime && new Date(dayjs(this.dateTime).startOf('day')).getTime() || ''
      let endTime = this.dateTime && new Date(dayjs(this.dateTime).endOf('day')).getTime() || ''
      // 运动项目
      let sportIds = sportId ? [sportId] : ''
      // 成绩等级
      let sportLevel = ''
      // 是否合格
      let isValid = ''
      this.conditionList.forEach(condition => {
        if (condition.code === CONDITION_CODE_MAP['LEVEL']) {
          sportLevel = condition.value
        }
        if (condition.code === CONDITION_CODE_MAP['VALID']) {
          isValid = condition.value
        }
      });

      const { pageNum, pageSize } = this.page;
      const params = {
        schoolId: this.schoolId,
        pageNum,
        pageSize,
        classIds,
        sportIds,
        sceneType,
        sportLevel,
        isValid,
        startTime,
        endTime,
        userId,
        sceneType
      };

      let { resmsg, status, data } = await postByCode(
        "I_DATA_KS_SPORTS_SCORE_SCORELIST",
        params
      );
      this.loading = false;

      if (!status) {
        this.$vux.alert.show({
          title: "错误",
          content: resmsg,
        });
        return;
      }
      const { list, totalcount } = data || {};

      this.page.totalcount = totalcount || 0;
      // 判断是否到底
      this.finished = pageNum * pageSize >= this.page.totalcount

      this.page.pageNum == 1
        ? (this.lists = list || [])
        : (this.lists = this.lists.concat(list || []));
    },
    /** 刷新 */
    async handleRefresh() {
      // 触发了刷新, 清空列表数据, 重置刷新状态
      this.finished = false;

      // 重置列表和页数
      this.lists = [];
      this.page.pageNum = 1;

      await this.queryList();
    },

    /** 加载更多 */
    async handleLoad() {
      this.page.pageNum = this.page.pageNum + 1;
      await this.queryList();
    },
    /**
     * 改变查询条件
     */
    ChangeQueryParams() {
      // 重置列表和页数
      this.lists = [];
      this.finished = false

      this.page.pageNum = 1
      this.page.totalcount = 0

      // 重新加载数据
      this.queryList();
    },
  },
};
</script>

<style lang="less" scoped>
.flex-1 {
  flex: 1;
}
.physical-record {
  background-color: #f7f8fa;
  &_header {
    display: flex;
    display:  -webkit-box;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #f7f8fa;
    z-index: 100000;
  }
  &_main {
    padding-top: 47px;
    height: calc(~'100vh - 47px');
  }
}
</style>
