<template>
  <div class="physical-record">
    <div class="physical-record_header">
      <PhyClassPickerPopup
        v-if="showClassPicker"
        ref="$phyClassPickerPopup"
        v-model="selClassList"
        :columns="classColumns"
        valuekey="label"
        class="flex-1"
        @change="ChangeQueryParams"
      ></PhyClassPickerPopup>
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
        @load="handleLoadMore"
      >
        <template slot-scope="{ row }">
          <PhyRecordCard :detailData="row" :conditionList="conditionList"></PhyRecordCard>
        </template>
      </ScrollList>
    </div>
  </div>
</template>

<script>
import { postByCode } from "@/api/common";
import { CONDITION_LIST, CONDITION_CODE_MAP } from "@/constants/smartSport/common.js";

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
    minDate() {
      return new Date(new Date().getFullYear() - 6, 0, 1)
    },
    maxDate() {
      return new Date()
    },
    // 如果指定查询某一个学生,则不需要切换班级
    showClassPicker() {
      const { userId, classId } = this.$route.query
      return !(userId || classId)
    }
  },
  data() {
    return {
      dateTime: "",
      conditionList: [],
      selClassList: [],
      classColumns: [],
      page: {
        pageNum: 1,
        pageSize: 20,
        totalcount: 0,
      },
      // 加载中
      loading: false,
      // 列表数据
      lists: [],
      // 到底了
      finished: true
    };
  },
  mounted() {
    const title = this.$route.meta.title || '';
    util.setTitle(title);

    Promise.all([
      this.showClassPicker && this.queryDeptTree(),
      this.getConditionList()
    ]).then(() => {
      this.handleRefresh()
    })
  },
  methods: {
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
    /**
     * 根据状态查询列表
     */
    async queryList() {
      this.loading = true;
      // 指定学生: 有值则指定, 否则无
      let { userId, classId } = this.$route.query
      // 班级
      let classIds = []
      // 指定班级
      if (classId) {
        classIds.push(classId)
      }
      // 手动选择班级
      if(this.selClassList && this.selClassList.length) {
        classIds.push(this.selClassList[this.selClassList.length - 1].value)
      }
      // 时间
      let startTime = this.dateTime && new Date(dayjs(this.dateTime).startOf('day')).getTime() || ''
      let endTime = this.dateTime && new Date(dayjs(this.dateTime).endOf('day')).getTime() || ''
      // 运动项目
      let sportIds = []
      // 运动模式
      let sceneType = ''
      // 成绩等级
      let sportLevel = ''
      // 是否合格
      let isValid = ''
      this.conditionList.forEach(condition => {
        if (condition.code === CONDITION_CODE_MAP['OBJECT']) {
          condition.value && sportIds.push(condition.value)
        }
        if (condition.code === CONDITION_CODE_MAP['SCENE']) {
          sceneType = condition.value
        }
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
        userId
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
    handleRefresh() {
      this.page.pageNum = 1;
      this.page.totalcount = 0;

      this.finished = false
      this.lists = []
      this.queryList();
    },
    /** 加载更多 */
    handleLoadMore() {
      this.page.pageNum = this.page.pageNum + 1;
      this.queryList();
    },
    /** 获取年级班级列表 */
    async queryDeptTree() {
      let { resmsg, status, data } = await postByCode(
        "I_CORE_QUERY_SCHOOL_DEPT",
        { schoolId: this.schoolId }
      );
      if (!status) {
        this.$vux.alert.show({
          title: "错误",
          content: resmsg,
        });
        return;
      }
      const gradeInfoList = data.gradeInfoList || []
      const gradeClassOpts = gradeInfoList.map(g => {
        return {
          label: g.gradeName,
          value: g.gradeId,
          children: (g.classInfoDtos || []).map(c => {
            return {
              label: c.className,
              value: c.classId
            }
          })
        }
      })
      this.classColumns = gradeClassOpts || []
      // 初始化组件值
      await this.$nextTick(() => {
        this.$refs.$phyClassPickerPopup.init()
      })
    },

    /** 获取运动项目 */
    async getConditionList() {
      const params = {
        schoolId: this.schoolId,
        filterLap: true
      }
      let { resmsg, status, data } = await postByCode(
        "I_DATA_KS_SPORTS_PROJECT_SCHOOLPROJECTLIST",
        params
      );
      if (!status) {
        this.$vux.alert.show({
          title: "错误",
          content: resmsg,
        });
        return;
      }
      let projectList = (data || []).map(v => {
        return {
          ...v,
          label: v.sportName,
          value: v.sportId
        }
      })
      // 补一个全部
      projectList.unshift({
        label: '全部',
        value: ''
      })
      // 组合值
      this.conditionList = CONDITION_LIST

      this.conditionList = this.conditionList.map(item => {
        if (item.code === 'SPORT_OBJECT') {
          return {
            ...item,
            dataList: projectList
          }
        }
        return item
      })
      await this.$nextTick()
      this.$refs.$otherConditionPopup.init()
    }
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
