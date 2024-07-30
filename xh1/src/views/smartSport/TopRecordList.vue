<template>
  <div class="physical-record">
    <div class="physical-record_main">
      <ScrollList
        :lists="lists"
        :loading="loading"
        :finished="finished"
        @refresh="handleRefresh"
      >
        <template slot-scope="{ row }">
          <PhyRecordCard :detailData="row">
            <template slot="headerRight">
              {{row.sportTestTime}}
            </template>
          </PhyRecordCard>
        </template>
      </ScrollList>
    </div>
  </div>
</template>

<script>
import ScrollList from "@/components/ScrollList.vue";
import PhyRecordCard from "@/views/smartSport/components/PhyRecordCard.vue";
import { util } from 'm-com';

export default {
  components: {
    ScrollList,
    PhyRecordCard
  },
  filters: {},
  props: {

  },
  watch: {},
  computed: {
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
      // 到最底
      finished: false
    };
  },
  mounted() {
    this.queryList()
    const title = this.$route.meta.title || '';
    util.setTitle(title);
  },
  methods: {
    /**
     * 根据状态查询列表
     */
    async queryList() {
      this.loading = true;
      this.finished = false;
      // 指定学生
      let {
        userId,
        classId,
        gradeId,
        schoolYear,
        sportId
      } = this.$route.query

      const params = {
        schoolId: this.schoolId,
        userId,
        classId,
        gradeId,
        schoolYear,
        sportId
      };

      let { resmsg, status, data } = await this.postByCode(
        "I_DATA_KS_SPORTS_STUD_OVERVIEW_GETSTUDTOP",
        params
      );
      this.loading = false;
      // 无分页
      this.finished = true;

      if (!status) {
        this.$vux.alert.show({
          title: "错误",
          content: resmsg,
        });
        return;
      }
      this.lists = data || [];
    },
    /** 刷新 */
    handleRefresh() {
      this.lists = []
      this.queryList();
    }
  },
};
</script>

<style lang="less" scoped>
.physical-record {
  height: 100%;
  background-color: #f7f8fa;
  &_main {
    height: 100%;
  }
}
</style>
