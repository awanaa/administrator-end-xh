<!--
 * @Author: caiyf
 * @Date: 2024-06-12 11:36:58
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-06-12 17:50:33
 * @Description: 作业管理页面 - 搜索组件
 * @FilePath: \mobile\mhealth\src\views\smartSport\components\homework\ManageSearch.vue
-->
<template>
  <div class="search">
    <ul class="list">
      <li
        v-for="(val, key) in list"
        :key="key"
        class="list_item"
        @click="handleClick(key)"
      >
        <span class="list_item_label">{{ val }}</span>
        <span class="list_item_icon"></span>
      </li>
    </ul>
    <!-- 班级抽屉 -->
    <van-popup
      v-model="classVisible"
      position="bottom"
      round
    >
      <div class="box_header">
        <span class="box_header_cancel">取消</span>
        <span class="box_header_title">选择班级</span>
        <span class="box_header_confirm" @click="handleClassConfirm">确定</span>
      </div>
      <div class="box">
        <ul class="box_tab">
          <li
            v-for="item, i of classTabs"
            :key="i"
            class="box_tab_item"
            :class="{ active: item.value === curClassTab }"
            @click="handleClickClassTab(item.value)"
          >{{ item.label }}</li>
        </ul>
        <van-picker
          v-show="curClassTab === 2"
          ref="classPicker"
          :show-toolbar="false" 
          title="选择班级" 
          :columns="classColumns"
        >
          <template #option="data">{{ data.label }}</template>
        </van-picker>
      </div>
    </van-popup>
    <!-- 日期抽屉 -->
    <van-popup 
      v-model="dateVisible"
      position="bottom"
      round
    >
      <div class="box_header">
        <span class="box_header_cancel">取消</span>
        <span class="box_header_title">选择日期</span>
        <span class="box_header_confirm" @click="handleDateConfirm">确定</span>
      </div>
      <div class="box">
        <ul class="box_tab">
          <li
            v-for="item, i of dateTabs"
            :key="i"
            class="box_tab_item"
            :class="{ active: item.value === curDateTab }"
            @click="handleClickDateTab(item.value)"
          >{{ item.label }}</li>
        </ul>
        <van-datetime-picker
          ref="datetime"
          v-show="curDateTab === 2"
          v-model="date"
          :show-toolbar="false"
          type="date"
          :min-date="minDate"
          :max-date="maxDate"
        />
      </div>
    </van-popup>
    <!-- 状态抽屉 -->
    <van-popup 
      v-model="statusVisible"
      position="bottom"
      round
      :style="{ 'max-height': '50%' }"
    >
      <van-picker
        ref="statusPicker"
        show-toolbar 
        title="选择状态" 
        :columns="statusColumns"
        @confirm="handleStatusConfirm"
      >
        <template #option="data">{{ data.label }}</template>
      </van-picker>
    </van-popup>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  props: {},
  components: {},
  data() {
    return {
      list: {
        class: '全部班级',
        date: '全部日期',
        status: '全部状态'
      },
      classTabs: [
        { label: '全部班级', value: 1 },
        { label: '选择班级', value: 2 }
      ],
      curClassTab: 1,
      dateTabs: [
        { label: '全部日期', value: 1 },
        { label: '选择某天', value: 2 }
      ],
      curDateTab: 1,
      date: '',
      searchForm: {
        classId: '', // 班级
        date: '', // 日期
        status: '' // 状态
      },
      classVisible: false, // 班级抽屉
      dateVisible: false, // 日期抽屉
      statusVisible: false, // 状态抽屉
      classColumns: [], // 班级配置
      statusColumns: [
        { label: '全部', value: '' },
        { label: '进行中', value: 1 },
        { label: '已完成', value: 2 },
        { label: '已取消', value: 3 },
        { label: '未完成', value: 4 },
      ]
    }
  },
  computed: {
    minDate() {
      return new Date(new Date().getFullYear() - 6, 0, 1)
    },
    maxDate() {
      return new Date()
    },
  },
  created() {
    this.getGradeList()
    this.handleSearch()
  },
  methods: {
    // 点击搜索项
    handleClick(key) {
      let obj = {
        class: 'classVisible',
        date: 'dateVisible',
        status: 'statusVisible'
      }
      if (obj[key]) this[obj[key]] = true
    },

    // 获取年级、班级列表
    getGradeList() {
      let list = []
      for (let i = 1; i <= 5; i++) {
        list.push({
          label: `${i}年级`,
          value: i,
          children: []
        })
        for (let j = 1; j <= 5; j++) {
          list[i - 1].children.push({
            label: `${i}年级${j}班`,
            value: j
          })
        }
      }
      this.classColumns = list
    },

    // 班级确定
    handleClassConfirm() {
      if (this.curClassTab === 1) {
        this.list.class = '全部班级'
        this.searchForm.classId = ''
      } else {
        let val = this.$refs.classPicker.getValues()
        if (val && val[1]) {
          this.list.class = val[1].label
          this.searchForm.classId = val[1].value
        }
      }
      this.classVisible = false
      this.handleSearch()
    },

    // 日期确认
    handleDateConfirm() {
      if (this.curDateTab === 1) {
        this.searchForm.date = ''
        this.list.date = '全部日期'
      } else {
        this.searchForm.date = dayjs(this.date).format('YYYY-MM-DD')
        this.list.date = this.searchForm.date
      }
      this.dateVisible = false
      this.handleSearch()
    },

    // 状态确认
    handleStatusConfirm() {
      let val = this.$refs.statusPicker.getValues()
      this.statusVisible = false
      if (val && val[0]) {
        this.list.status = val[0].label === '全部' ? '全部状态' : val[0].label
        this.searchForm.classId = val[0].value
      }
      this.handleSearch()
    },

    // 通知父组件搜索表单项
    handleSearch() {
      this.$emit('change', this.searchForm)
    },

    // 切换班级类型 1：查看全部班级 2：查看某一个班级
    handleClickClassTab(val) {
      this.curClassTab = val
    },

    // 切换日期类型 1：查看全部日期 2：查看某一天
    handleClickDateTab(val) {
      this.curDateTab = val
    },

  },
}
</script>

<style scoped lang="less">
.search {
  /deep/ .van-picker__cancel {
    color: #646566;
  }
  /deep/ .van-picker__title {
    color: #323233;
  }
  /deep/ .van-picker__confirm {
    color: #8CC152;
  }
}

.list {
  height: 48px;
  background: #fff;
  border-bottom: 0.5px solid #F2F3F5;
  display: flex;
  &_item {
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    &_label {
      color: #323233;
      font-size: 14px;
      margin-right: 6px;
    }
    &_icon {
      width: 0;
      height: 0;
      border: 4px solid transparent;
      border-top-color: #DCDEE0;
      margin-top: 2px;
    }
  }
}

.box {
  padding: 12px 16px;
  box-sizing: border-box;
  &_header {
    display: flex;
    align-items: center;
    width: 100%;
    height: 44px;
    &_cancel {
      padding: 0 16px;
      box-sizing: border-box;
      color: #646566;
      font-size: 14px;
    }
    &_title {
      color: #323233;
      font-size: 16px;
      font-weight: 600;
      flex: 1;
      text-align: center;
    }
    &_confirm {
      padding: 0 16px;
      box-sizing: border-box;
      color: #8CC152;
      font-size: 14px;
    }
  }
  &_tab {
    display: flex;
    align-items: center;
    &_item {
      flex: 1;
      padding: 5px 12px;
      box-sizing: border-box;
      border-radius: 4px;
      background: #F6F7F9;
      text-align: center;
      color: #646566;
      font-size: 16px;
      line-height: 24px;
      &.active {
        border: 0.5px solid #8CC152;
        background: rgba(140, 193, 82, 0.10);
        color: #8CC152;
        font-weight: 600;
      }
      &:not(:first-child) {
        margin-left: 8px;
      }
    }
  }
}
</style>