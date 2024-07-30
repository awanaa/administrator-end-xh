<template>
  <div class="addition-menber my-container">
    <div class="addition-menber_header">
      <van-notice-bar
        scrollable
        color="#1989fa"
        background="#ecf9ff"
        left-icon="info-o"
      >
        可通过登录平台查看视频回放，找出该学生通过终点的时间作为补录参考，或者根据现场反馈直接进行补录。（只能对3天内的跑步进行补录成绩）
      </van-notice-bar>
    </div>
    <div class="addition-menber_main">
      <ScrollList
        :lists="lists"
        :loading="loading"
        :finished="finished"
        @refresh="handleRefresh"
      >
        <template slot-scope="{ row }">
          <AdditionMenberCard
            :detailData="row"
            @additionEdit="showAdditionEditDialog(row)"
          ></AdditionMenberCard>
        </template>
      </ScrollList>
    </div>
    <!-- 补录弹窗 -->
    <van-popup
      v-model="additionEditVisible"
      :close-on-click-overlay="false"
      :get-container="getContainer"
      round
    >
      <AdditionEdit
        v-if="additionEditVisible"
        :loading="additionEditLoading"
        :detailData="curAdditionInfo"
        @cancel="additionEditVisible = false"
        @confirm="submitForm"
      ></AdditionEdit>
    </van-popup>
    <!-- 补录提交结果弹窗 -->
    <van-dialog
      v-model="additionResultVisible"
      title="提示"
      confirm-button-text="关闭"
      confirm-button-color="#8CC152"
      class="addition-menber_warn"
    >
      <div class="addition-menber_warn-content">
        {{additionResmsg}}
      </div>
    </van-dialog>
  </div>
</template>

<script>
import { NoticeBar, Popup, Dialog, Toast } from "vant";
import ScrollList from "@/components/ScrollList.vue";
import AdditionMenberCard from "@/views/smartSport/components/AdditionMenberCard.vue";
import AdditionEdit from "@/views/smartSport/AdditionEdit.vue";
import { postByCode } from "@/api/common";

export default {
  components: {
    vanNoticeBar: NoticeBar,
    vanPopup: Popup,
    [Dialog.Component.name]: Dialog.Component,
    ScrollList,
    AdditionMenberCard,
    AdditionEdit,
  },
  filters: {},
  props: {},
  watch: {},
  computed: {
    user(){
      return this.$store.state.user || {}
    },
    schoolId() {
      return this.$store.state.schoolId
    },
  },
  data() {
    return {
      // 加载中
      loading: false,
      // 列表数据
      lists: [],
      // 是否到底
      finished: true,
      additionEditLoading: false,
      additionEditVisible: false,
      additionResultVisible: false,
      additionResmsg: '只能对3天内的跑步进行成绩补录！（例：3月1日进行跑步，那么3月1日、2日和3日可进行成绩补录）',
      // 当前要补录人员的信息
      curAdditionInfo: null
    };
  },
  mounted() {
    this.handleRefresh();
  },
  methods: {
    getContainer() {
      return document.querySelector(".my-container");
    },
    /**
     * 查询补录名单列表
     */
    async queryList() {
      this.loading = true;
      this.lists = []
      const { taskId } = this.$route.query;
      const params = {
        schoolId: this.schoolId,
        taskId,
      };
      let { resmsg, status, data } = await postByCode(
        "I_DATA_KS_SPORTS_PATCH_PATCHLIST",
        params
      );
      this.loading = false;
      // 到底了
      this.finished = true;
      if (!status) {
        this.$vux.alert.show({
          title: "错误",
          content: resmsg,
        });
        return;
      }
      // 一页展示
      this.lists = data || [];
    },
    /** 刷新 */
    handleRefresh() {
      this.finished = false;
      this.queryList();
    },
    // 弹出补录编辑弹窗
    showAdditionEditDialog(data) {
      this.additionEditVisible = true;
      // 记录当前要补录人员的信息
      this.curAdditionInfo = data;
    },
    // 提交
    async submitForm(formData) {
      this.additionEditLoading = true;
      const { userId, taskId } = this.curAdditionInfo;
      const params = {
        schoolId: this.schoolId,
        userId,
        taskId,
        creatorId: this.user.userId,
        creatorName: this.user.userName,
        ...formData,
      };

      let { resmsg, status, data } = await postByCode(
        "I_DATA_KS_SPORTS_PATCH_PATCHSCORE",
        params
      );
      this.additionEditLoading = false;
      if (!status) {
        // 错误信息统一展示
        this.additionResmsg = resmsg
        this.additionResultVisible = true;
        return
      }
      // 补录成功
      this.additionEditVisible = false
      Toast.success('提交成功');
      setTimeout(() => {
        this.handleRefresh()
      }, 300)
    },
  },
};
</script>

<style lang="less" scoped>
.flex-1 {
  flex: 1;
}
.addition-menber {
  background-color: #f7f8fa;
  &_header {
    position: sticky;
    top: 44px;
    z-index: 1000;
  }
  &_main {
    height: calc(~"100vh - 84px");
  }
  &_warn {
    /deep/.van-dialog__header {
      color: #323233;
      font-size: 16px;
      font-weight: 600;
    }
    &-content {
      padding: 8px 24px 26px;
      text-align: center;
      color: #646566;
      font-family: "PingFang SC";
      font-size: 14px;
    }
  }
}
</style>
