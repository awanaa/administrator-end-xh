<!--
 * @Author: caiyf
 * @Date: 2024-06-17 10:44:03
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-06-17 15:01:12
 * @Description: 
 * @FilePath: \mobile\mhealth\src\views\smartSport\homework\SportRecord.vue
-->
<!--
 * @Author: caiyf
 * @Date: 2024-06-17 10:44:03
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-06-17 14:52:31
 * @Description: 运动记录
 * @FilePath: \mobile\mhealth\src\views\smartSport\homework\SportRecord.vue
-->
<template>
  <div class="record">
    <div class="record_process" :class="statusType(2)">
      <span>进度/目标：{{ 800 }}/{{ 1000 }}</span>
      <span class="record_process_status">{{ statusText(2) }}</span>
    </div>
    <van-tabs 
      v-model="activeTab"
      class="record_tabs"
      color="#8CC152"
      title-inactive-color="#646566"
      title-active-color="#323233"
    >
      <van-tab
        v-for="item, i of tabs"
        :key="i"
        :title="item.label"
        :name="item.name"
      ></van-tab>
    </van-tabs>
    <div class="record_hint">
      <van-icon name="info-o" :size="16" color="#1989FA" />
      <span class="record_hint_tx">无效成绩不计入作业统计</span>
    </div>
    <div class="record_list">
      <PhyRecordCard
        v-for="item, i of list"
        :key="i"
        :detailData="item"
        class="record_list_item"
      />
    </div>
  </div>
</template>

<script>
import BaseEmpty from "@/components/base/BaseEmpty";
import PhyRecordCard from "@/views/smartSport/components/PhyRecordCard";
export default {
  props: {},
  components: {
    BaseEmpty,
    PhyRecordCard
  },
  data() {
    return {
      activeTab: 'all',
      tabs: [
        { label: '全部', name: 'all' },
        { label: '有效成绩', name: 'valid' },
        { label: '无效成绩', name: 'invalid' }
      ],
      list: []
    }
  },
  computed: {
    statusType() {
      return val => {
        return {
          1: 'finish',
          2: 'unfinish'
        }[val] || 'finish'
      }
    },

    statusText() {
      return val => {
        return {
          1: '已完成',
          2: '未完成'
        }[val] || '未完成'
      }
    },
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      let list = []
      for (let i = 1; i <= 10; i++) {
        list.push({
          id: i,
          sportName: '多人跳绳',
          exerciseTime: 1718606612393,
          userName: '陈果果',
          className: '三年级1班',
          showSportScore: 1000,
          showSportValue: 1000,
          isValid: i % 2 === 0 ? 1 : 2,
          sportLevel: '优秀',
          sportGrade: 90,
          hasReport: true,
          hasPlayback: true
        })
      }
      this.list = list
      console.log('list', list);
    }
  },
}
</script>

<style scoped lang="less">
.record {
  height: inherit;
  &_process {
    height: 34px;
    padding: 6px 16px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    &.finish {
      background: #8CC152;
    }
    &.unfinish {
      background: #FF911F;
    }
    &_status {
      display: flex;
      align-items: center;
      &::after {
        content: '';
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #fff;
        margin-left: 4px;
      }
    }
  }
  &_tabs {
    border-bottom: 0.5px solid #EBEDF0;
  }
  &_hint {
    height: 40px;
    display: flex;
    align-items: center;
    padding: 0 16px;
    color: #1989FA;
    font-size: 14px;
    background: #ECF9FF;
    &_tx {
      margin-left: 8px;
    }
  }
  &_list {
    height: calc(~'100% - 119px');
    overflow: auto;
    padding: 16px;
    box-sizing: border-box;
    &_item {
      &:not(:first-child) {
        margin-top: 16px;
      }
    }
  }
}
/deep/ .van-tab--active {
  font-weight: 600;
}
</style>