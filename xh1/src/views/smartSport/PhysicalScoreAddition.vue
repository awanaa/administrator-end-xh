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
        :dataList.sync="conditionList"
        class="flex-1"
        @change="ChangeQueryParams"
      ></OtherConditionPopup>
    </div>
    <div class="physical-record_main">
      <ScrollList
        :lists="lists"
        :loading="loading"
        :finished="finished"
        @refresh="onRefresh"
        @load="onload"
      >
        <template slot-scope="{ row }">
          <!-- 成绩补录 -->
          <AdditionProjectCard
            v-if="tabActive == 0"
            :detailData="row"
            :conditionList="conditionList"
          ></AdditionProjectCard>
          <!-- 补录记录 -->
          <AdditionRecordCard
            v-if="tabActive == 1"
            :detailData="row"
          ></AdditionRecordCard>
        </template>
      </ScrollList>
    </div>
    <!-- 底部tab -->
    <div class="physical-record_footer">
      <van-tabbar v-model="tabActive" @change="handleTabChange">
        <van-tabbar-item v-for="(tab, index) in tabList" :key="index">
          <span>{{ tab.name }}</span>
          <template #icon="props">
            <img :src="props.active ? tab.actiiveIcon : tab.inactiveIcon" />
          </template>
        </van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
import ScrollList from "@/components/ScrollList.vue";
import PhyDatePicker from "@/views/smartSport/components/PhyDatePicker.vue";
import OtherConditionPopup from "@/views/smartSport/components/OtherConditionPopup.vue";
import AdditionProjectCard from "@/views/smartSport/components/AdditionProjectCard.vue";
import AdditionRecordCard from "@/views/smartSport/components/AdditionRecordCard.vue";

import IconEditActive from "@/assets/images/smartSport/icon_edit_active.svg";
import IconEditInactive from "@/assets/images/smartSport/icon_edit_inactive.svg";
import IconRecordActive from "@/assets/images/smartSport/icon_record_active.svg";
import IconRecordInactive from "@/assets/images/smartSport/icon_record_inactive.svg";

import { Tabbar, TabbarItem } from "vant";

import { postByCode } from "@/api/common";
import { util } from 'm-com';
const dayjs = require('dayjs');

import {
  CONDITION_LIST,
  CONDITION_CODE_MAP,
} from "@/constants/smartSport/common.js";

export default {
  components: {
    ScrollList,
    PhyDatePicker,
    OtherConditionPopup,
    AdditionProjectCard,
    AdditionRecordCard,
    vanTabbar: Tabbar,
    vanTabbarItem: TabbarItem,
  },
  filters: {},
  props: {},
  watch: {},
  computed: {
    schoolId() {
      return this.$store.state.schoolId;
    },
    maxDate() {
      return new Date()
    },
    minDate() {
      return new Date(new Date().getFullYear() - 6, 0, 1)
    }
  },
  data() {
    return {
      dateTime: "",
      conditionList: [],
      tabActive: 0,
      tabList: [
        {
          name: "成绩补录",
          inactiveIcon: IconEditInactive,
          actiiveIcon: IconEditActive,
        },
        {
          name: "补录记录",
          inactiveIcon: IconRecordInactive,
          actiiveIcon: IconRecordActive,
        },
      ],
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
      lists: [],
    };
  },
  mounted() {
    Promise.all([
      this.getConditionList(),
    ]).then(async () => {
      // 默认查询成绩补录列表
      await this.onRefresh();
    })
    const title = this.$route.meta.title || '';
    util.setTitle(title);
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
      this.query();
    },
    /**
     * 查询列表
     * @params {*} params 参数
     * @params {*} code  请求码
     */
    async queryList(params, postCode) {
      this.loading = true;
      // 公共查询条件
      // 运动项目
      let sportIds = []
      // 运动模式
      let sceneType = ''

      const { pageNum, pageSize } = this.page;

      this.conditionList.forEach(condition => {
        if (condition.code === CONDITION_CODE_MAP['OBJECT']) {
          condition.value && sportIds.push(condition.value)
        }
        if (condition.code === CONDITION_CODE_MAP['SCENE']) {
          sceneType = condition.value
        }
      });

      let { resmsg, status, data } = await postByCode(
        postCode,
        {
          schoolId: this.schoolId,
          pageNum,
          pageSize,
          sportIds,
          sceneType,
          ...params
        }
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
      // 获取总数
      this.page.totalcount = totalcount || 0;
      // 判断是否到底
      this.finished = pageNum * pageSize >= this.page.totalcount

      // 列表展示
      this.page.pageNum == 1
        ? (this.lists = list || [])
        : (this.lists = this.lists.concat(list || []));
    },
    /**
     * 成绩补录列(任务)表查询
     */
    async queryTaskList() {
      // 运动日期
      const exerciseDate = this.dateTime && new Date(dayjs(this.dateTime).startOf('day')).getTime() || ''
      // 发起请求
      const params = {
        exerciseDate
      }
      const postCode = "I_DATA_KS_SPORTS_TASK_TASKLIST"
      await this.queryList(params, postCode)
    },
    /**
     * 补录记录列表查询
     */
    async queryAdditionRecordList() {
      // 运动日期
      const patchStartTime = this.dateTime && new Date(dayjs(this.dateTime).startOf('day')).getTime() || ''
      const patchEndTime = this.dateTime && new Date(dayjs(this.dateTime).endOf('day')).getTime() || ''

      // 发起请求
      const params = {
        patchStartTime,
        patchEndTime
      }
      const postCode = "I_DATA_KS_SPORTS_PATCH_PATCHRECORDLIST"
      await this.queryList(params, postCode)
    },
    /**
     * 列表加载事件, 默认组件加载完毕触发/触底触发
     */
    onload() {
      this.page.pageNum = this.page.pageNum + 1
      // 查询
      this.query()
    },
    /**
     * 查询列表数据
     */
    query() {
      if (this.tabActive == 0) {
        // 查询成绩补录列表
        this.queryTaskList()
      } else if (this.tabActive == 1) {
        // 查询补录记录列表
        this.queryAdditionRecordList()
      }
    },
    /**
     * 刷新
     */
    onRefresh() {
      // 触发了刷新, 清空列表数据, 重置刷新状态
      this.finished = false;
      // 重置列表和页数
      this.lists = [];
      this.page.pageNum = 1
      this.page.totalcount = 0

      // 重新加载数据
      this.query();
    },
    /** 获取运动项目 */
    async getConditionList() {
      const params = {
        schoolId: this.schoolId,
        sportType: 2
      };
      let { resmsg, status, data } = await postByCode(
        "I_DATA_KS_SPORTS_PROJECT_LIST",
        params
      );
      if (!status) {
        this.$vux.alert.show({
          title: "错误",
          content: resmsg,
        });
        return;
      }
      // 运动项目数据项
      let projectList = (data || []).map((v) => {
        return {
          ...v,
          label: v.sportName,
          value: v.sportId,
        };
      });
      // 补一个全部
      projectList.unshift({
        label: "全部",
        value: "",
      });

      const cleConditionList = CONDITION_LIST;
      // 运动项目
      const sportObjecttData = cleConditionList.find(
        (item) => item.code === CONDITION_CODE_MAP["OBJECT"]
      );
      sportObjecttData.dataList = projectList;

      // 运动模式
      const sportSceneData = cleConditionList.find(
        (item) => item.code === CONDITION_CODE_MAP["SCENE"]
      );

      // 其他条件: 运动项目 + 运动模式
      this.conditionList = [sportObjecttData, sportSceneData];
      await this.$nextTick();
      this.$refs.$otherConditionPopup.init();
    },
    /**
     * 切换不同列表
     */
    handleTabChange() {
      // 重置查询条件
      this.dateTime = ''
      this.conditionList.forEach(condition => condition.value = '');
      // 重新请求
      this.onRefresh()
    }
  },
};
</script>

<style lang="less" scoped>
.flex-1 {
  flex: 1;
}
/deep/.van-tabbar-item__text {
  font-size: 12px;
}
/deep/.van-tabbar-item--active {
  color: @button-primary-active-bg-color;
}
.physical-record {
  background-color: #f7f8fa;
  &_header {
    display: flex;
    display: -webkit-box;
    position: sticky;
    top: 0;
    background-color: #f7f8fa;
    z-index: 100;
  }
  &_main {
    height: calc(~'100vh - 97px');
    overflow: auto;
  }
}
</style>
