<!--
 * @Author: caiyf
 * @Date: 2024-05-07 09:33:04
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-05-11 14:56:16
 * @Description: 选择班级
 * @FilePath: \mobile\mhealth\src\views\smartSport\picture\SelectClass.vue
-->

<template>
  <div class="sclass">
    <div class="sclass_grade" @click="handleGrade">
      {{ gradeName }}
      <span class="sclass_grade_xsj"></span>
    </div>
    <ul v-if="classList.length" class="sclass_list">
      <li
        v-for="item, i of classList"
        :key="i"
        class="sclass_list_item"
        @click="handleClass(item)"
      >
        <span class="sclass_list_item_name">{{ item.deptName }}</span>
        <span class="sclass_list_item_count">{{ item.stuFaceNum }}/{{ item.stuTotalNum }}</span>
        <van-icon name="arrow" size="16" color="#969799" />
      </li>
    </ul>
    <BaseEmpty v-else class="BaseEmpty" />

    <!-- 选择年级抽屉 -->
    <van-popup 
      v-model="visible" 
      position="bottom" 
      :style="{ height: '50%' }"
    >
      <van-picker
        title="选择年级"
        show-toolbar
        value-key="deptName"
        :columns="columns"
        @confirm="onConfirm"
        @cancel="visible = false"
      >
        <template #confirm>
          <span class="confirm">确认</span>
        </template>
      </van-picker>
    </van-popup>
  </div>
</template>

<script>
import utils from '@/utils/util'
import BaseEmpty from 'components/base/BaseEmpty'
export default {
  props: {},
  components: {
    BaseEmpty
  },
  data() {
    return {
      visible: false,
      toast: '',
      schoolYear: '', // 当前学年
      gradeList: [], // 年级列表
      classList: [], // 班级列表
      curGrade: {} // 当前选中的年级
    }
  },
  computed: {
    // 年级名称
    gradeName() {
      return this.curGrade.deptName || '--'
    },

    columns() {
      return [
        {
          values: this.gradeList
        }
      ]
    },
    
    schoolId() {
      let query = this.$route.query || {}
      let schoolId = this.$store.state.schoolId
      return query.schoolId || schoolId
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
      const toast = this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
      });
      this.postByCode('I_DATA_KS_SPORTS_SCHOOL_OVERVIEW_GETGRADELIST', {
        schoolId: this.schoolId,
        schoolYear: this.schoolYear
      }).then(res => {
        if (!res.status) return this.$toast.fail(res.resmsg)
        this.gradeList = (res.data || []).map(v => {
          v.deptName = v.gradeName
          return v
        })
        if (this.gradeList.length) {
          this.curGrade = this.gradeList[0]
          this.getClassList()
        }
      }).finally(() => {
        toast.clear()
      })
    },

    // 获取班级列表
    getClassList() {
      const toast = this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
      });
      this.postByCode('I_OCP_OCP_PHOTO_QUERY_DEPT_PHOTO', {
        schoolId: this.schoolId,
        deptId: this.curGrade.gradeId
      }).then(res => {
        if (!res.status) return this.$toast.fail(res.resmsg)
        this.classList = (res.data || []).map(v => {
          v.deptName = v.className
          return v
        })
      }).finally(() => {
        toast.clear()
      })
    },

    // 选择年级
    handleGrade() {
      this.visible = true
    },

    // 选择班级
    handleClass(item) {
      utils.setSessionStorage('smartSport_selectClass', item)
      this.$router.push({
        name: 'smartSport_picUploadList',
        query: {
          schoolId: this.schoolId,
          classId: item.classId
        }
      })
    },

    // 选择年级确认事件
    onConfirm(a, b) {
      this.curGrade = a[0]
      this.visible = false
      this.getClassList()
    }
  },
}
</script>

<style scoped lang="less">
@height: 48px;
.sclass {
  height: 100%;
  &_grade {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: @height;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    &_xsj {
      border: 4px solid transparent;
      border-top-color: #DCDEE0;
      margin: 4px 0 0 4px;
    }
  }
  &_list {
    margin-top: @height;
    overflow: auto;
    padding: 16px;
    box-sizing: border-box;
    &_item {
      border-radius: 8px;
      background: #FFF;
      display: flex;
      align-items: center;
      padding: 16px;
      box-sizing: border-box;
      &:not(:first-child) {
        margin-top: 16px;
      }
      &_name {
        flex: 1;
        color: #323233;
        font-size: 16px;
        font-weight: 600;
        line-height: 24px;
      }
      &_count {
        margin: 0 12px;
        color: #8CC152;
        font-size: 14px;
        line-height: 22px;
      }
    }
  }
  .confirm {
    color: #8CC152;
  }
  .BaseEmpty {
    height: calc(~'100% - @{height}');
  }
}
</style>