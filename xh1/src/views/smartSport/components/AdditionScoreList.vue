<template>
  <div class="addition-score">
    <div class="addition-score_header">
      <van-radio-group v-model="tabActive" direction="horizontal" @change="handleTabChange">
        <van-radio
          :name="item.value"
          :class="{ active: tabActive === item.value }"
          v-for="item in tabList"
          :key="item.value"
          >{{ item.name }}</van-radio
        >
      </van-radio-group>
    </div>
    <div class="addition-score_main">
      <ScrollList
        :lists="lists"
        :loading="loading"
        :finished="finished"
        @refresh="handleRefresh"
      >
        <template slot-scope="{ row }">
          <AdditionMenberCard
            :detailData="row"
            :tagText="row.patchType ? '补录':''"
            :badgeSrc="getIconRange(row.sortNum)"
          >
            <div class="score">{{ row.showSportScore }}</div>
          </AdditionMenberCard>
        </template>
      </ScrollList>
    </div>
  </div>
</template>

<script>
import { RadioGroup, Radio } from "vant";
import ScrollList from "@/components/ScrollList.vue";
import AdditionMenberCard from "@/views/smartSport/components/AdditionMenberCard.vue";
import IconRangeFt from "@/assets/images/smartSport/icon_range_1.png";
import IconRangeSd from "@/assets/images/smartSport/icon_range_2.png";
import IconRangeTd from "@/assets/images/smartSport/icon_range_3.png";

export default {
  components: {
    vanRadioGroup: RadioGroup,
    vanRadio: Radio,
    ScrollList,
    AdditionMenberCard,
  },
  filters: {},
  props: {},
  watch: {},
  computed: {
    schoolId() {
      return this.$store.state.schoolId || "";
    },
  },
  data() {
    return {
      IconRangeFt,
      IconRangeSd,
      IconRangeTd,
      tabList: [
        {
          name: "有效成绩",
          value: "1",
        },
        {
          name: "无效成绩",
          value: "0",
        },
      ],
      tabActive: "1",
      // 加载中
      loading: false,
      finished: true,
      // 列表数据
      lists: [],
    };
  },
  mounted() {
    this.handleRefresh();
  },
  methods: {
    getIconRange(index) {
      if (this.tabActive == 0) {
        // 无效成绩不显示排名
        return ''
      }
      const iconRangeSrcMap = {
        1: IconRangeFt,
        2: IconRangeSd,
        3: IconRangeTd,
      }
      return iconRangeSrcMap[index] || '';
    },
    handleTabChange() {
      this.lists = []
      this.handleRefresh()
    },
    /**
     * 根据状态查询列表
     */
    async queryList() {
      this.loading = true;
      const params = {
        schoolId: this.schoolId,
        isValid: this.tabActive,
        taskId: this.$route.query.taskId
      };
      let { resmsg, status, data } = await this.postByCode(
        "I_DATA_KS_SPORTS_SCORE_TASKSCORELIST",
        params
      );
      this.loading = false;
      this.finished = true;

      if (!status) {
        this.$vux.alert.show({
          title: "错误",
          content: resmsg,
        });
        return;
      }
      this.lists = data || []
    },
    /** 刷新 */
   handleRefresh() {
      this.finished = false
      this.queryList();
    }
  },
};
</script>

<style lang="less" scoped>
.flex-1 {
  flex: 1;
}
/deep/.card-list__items:first-child {
  margin-top: 0;
}
.addition-score {
  background-color: #f7f8fa;
  &_header {
    position: sticky;
    top: 0;
    z-index: 100;
    padding: 12px 16px 12px;
    background-color: #f7f8fa;
    /deep/.van-radio {
      font-size: 14px;
      padding: 8px 16px;
      margin-right: 0;
      .van-radio__label {
        color: #575859;
      }
      &.active {
        border-radius: 24px;
        background: #ebecf0;
        font-family: "PingFang SC";
        font-size: 14px;
        font-weight: 600;
        .van-radio__label {
          color: #252526;
        }
      }
    }
    /deep/.van-radio__icon {
      display: none;
    }
  }
  &_main {
    height: calc(~'100vh - 104px');
    overflow: auto;
    .score {
      color: #323233;
      font-family: "PingFang SC";
      font-size: 14px;
      font-weight: 600;
    }
  }
}
</style>
