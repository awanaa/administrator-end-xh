<template>
  <div class="classList">
    <div v-if="gradeList.length" class="wrap">
      <div class="wrap_header" @click="handleSelectClass">
        <span class="wrap_header_label">{{ className }}</span>
        <span class="wrap_header_xsj"></span>
      </div>
      <div v-if="classList.length" class="wrap_body">
        <div class="wrap_body_label">点击学生姓名查看提测档案</div>
        <template v-if="stuList.length">
          <ul class="wrap_body_list">
            <li
              v-for="item, i of stuList"
              :key="i"
              class="wrap_body_list_item"
              @click="handleClick(item)"
            >{{ item.studName }}</li>
          </ul>
        </template>
        <BaseEmpty v-else class="wrap_body"></BaseEmpty>
        <!-- <van-loading v-if="loading" type="spinner" color="#1989fa" /> -->
      </div>
      <BaseEmpty v-else class="wrap_body"></BaseEmpty>
    </div>
    <BaseEmpty v-else></BaseEmpty>
    <!-- 选择班级 -->
    <van-popup
      v-model="visible"
      position="bottom"
      round
      :style="{ height: '50%' }"
    >
      <van-picker
        :columns="columns"
        show-toolbar
        title="选择班级"
        value-key="deptName"
        :loading="loading"
        @change="handleClassChange"
        @confirm="handleConfirm"
      >
        <template #confirm>
          <span class="primary">确定</span>
        </template>
      </van-picker>
    </van-popup>
  </div>
</template>

<script>
import BaseEmpty from '@/components/base/BaseEmpty'
export default {
  props: {},
  components: {
    BaseEmpty
  },
  data() {
    return {
      loading: false,
      schoolYear: '', // 学年
      // 学生列表
      stuList: [],
      gradeList: [], // 年级列表
      visible: false, // 抽屉显隐
      curGradeId: '', // 当前锁定的年级id
      curClass: {} // 当前选中的班级
    }
  },
  computed: {
    schoolId() {
      return this.$store.state.schoolId
    },

    // 班级名称
    className() {
      return this.curClass.className || '三年级一班'
    },
    // 班级列表
    classList() {
      let grade = this.gradeList.find(v => {
        return v.gradeId === this.curGradeId
      })
      return grade ? grade.classDtoList : []
    },
    columns() {
      return [
        {
          values: this.gradeList
        },
        {
          values: this.classList
        }
      ]
    }
  },
  created() {
    this.getCurSchoolYear()
  },
  methods: {
    // 获取当前学年
    getCurSchoolYear() {
      // console.log('获取学年列表参数', this.schoolId);
      this.postByCode('I_DATA_NSCHOOLYEAR_GETCURRENTSCHOOLYEAR', {
        schoolId: this.schoolId
      }).then(async res => {
        if (!res.status) return this.$toast.fail(res.resmsg)
        const data = res.data || {}
        this.schoolYear = data.schoolYear || ''
        this.getGradeList()
      })
    },

    // 获取年级列表
    getGradeList() {
      return this.postByCode('I_DATA_KS_SPORTS_SCHOOL_OVERVIEW_GETGRADEANDCLASSLIST', {
        schoolId: this.schoolId,
        schoolYear: this.schoolYear
      }).then(res => {
        if (!res.status) return this.$toast.fail(res.resmsg)
        const data = res.data || []
        if (data.length) {
          this.gradeList = data.map(v => {
            v.deptName = v.gradeName
            if (v.classDtoList.length) {
              v.classDtoList.map(c => {
                c.deptName = c.className
                return c
              })
            }
            return v
          })
          this.curGradeId = data[0].gradeId
          if (data[0].classDtoList.length) {
            this.curClass = data[0].classDtoList[0]
            this.getList()
          }
        }
      })
    },

    // 获取学生列表
    getList() {
      this.stuList = []
      this.loading = true
      this.postByCode('I_JXHD_REST_STUD_GET_LIST', {
        classId: this.curClass.classId,
        pageNum: 1,
        pageSize: 0,
        schoolId: this.schoolId,
        teacherId: 'W_USERID'
      }).then(res => {
        if (!res.status) return this.$toast.fail(res.resmsg)
        const data = res.data || {}
        this.stuList = data.list || []
      }).finally(() => {
        this.loading = false
      })
    },

    // 选择班级
    handleSelectClass() {
      this.visible = true
    },

    // 点击学生
    handleClick(item) {
      this.$router.push({
        name: 'smartSport_physicalArchives',
        query: {
          schoolId: this.schoolId,
          schoolYear: this.schoolYear,
          userId: item.studId
        }
      })
    },

    // 年级班级切换
    handleClassChange(_, data, i) {
      if (i === 0) {
        this.curGradeId = data[0].gradeId
      }
    },

    // 确定选中的班级
    handleConfirm(data) {
      this.curClass = data[1] || {}
      this.getList()
      this.visible = false
    }
  },
}
</script>

<style scoped lang="less">
.classList {
  width: 100%;
  height: inherit;
}

.wrap {
  height: inherit;
  &_header {
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    &_label {
      color: #323233;
      font-size: 14px;
      line-height: 22px;
    }
    &_xsj {
      width: 0;
      height: 0;
      border: 6px solid transparent;
      border-top-color: #DCDEE0;
      margin: 4px 0 0 8px;
    }
  }
  &_body {
    overflow: auto;
    padding: 16px;
    box-sizing: border-box;
    &_label {
      color: #969799;
      font-size: 14px;
      line-height: 22px;
    }
    &_list {
      display: flex;
      flex-wrap: wrap;
      &_item {
        margin-top: 12px;
        margin-left: 12px;
        height: 40px;
        padding: 8px 12px;
        box-sizing: border-box;
        background: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 4px;
        color: #646566;
        font-size: 16px;
        line-height: 24px;
        width: calc(~'33.33% - 8px');
        &:nth-child(3n + 1) {
          margin-left: 0;
        }
      }
    }
  }
  .wrap_body {
    height: calc(~'100% - 48px');
  }
}

.primary {
  color: @primary-color;
}
</style>
