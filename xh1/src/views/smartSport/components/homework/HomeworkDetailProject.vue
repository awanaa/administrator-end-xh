<!--
 * @Author: caiyf
 * @Date: 2024-06-14 10:54:55
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-06-14 16:59:05
 * @Description: 作业详情 - 项目列表组件
 * @FilePath: \mobile\mhealth\src\views\smartSport\components\homework\HomeworkDetailProject.vue
-->
<template>
  <div class="project">
    <van-tabs
      v-model="active"
      class="project_tabs"
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
    <ul class="list">
      <li
        v-for="item, i of list"
        :key="i" 
        class="list_item"
        @click="handleClick(item)"
      >
        <div class="list_item_header">
          <span class="list_item_header_tag" :class="statusType(item.status)">{{ statusText(item.status) }}</span>
          <span class="list_item_header_name">{{ item.sportName }}</span>
          <van-icon name="arrow" :size="16" color="#C8C9CC" />
        </div>
        <div class="list_item_content">
          <div class="list_item_content_acc">
            <span class="list_item_content_label">作业要求：</span>
            <span class="list_item_content_value">
              个人累计
              <template>男{{ item.maleNum }}{{ item.unit }}</template>
              <template>女{{ item.femaleNum }}{{ item.unit }}</template>
            </span>
          </div>
          <div class="list_item_content_bar">
            <van-progress
              class="list_item_content_bar_progress"
              :show-pivot="false"
              color="#8CC152"
              track-color="#EBEDF0"
              :percentage="item.rate"
              stroke-width="8px" 
            />
            <span class="list_item_content_bar_tx">{{ item.rate }}%</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import LevelTag from '@/views/smartSport/components/LevelTag'
export default {
  props: {},
  components: {
    LevelTag
  },
  data() {
    return {
      tabs: [
        { label: '全部项目', name: 'all' },
        { label: '已完成', name: 'finish' },
        { label: '未完成', name: 'unfinish' }
      ],
      active: 'all'
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

    list() {
      let list = []
      for (let i = 1; i <= 5; i++) {
        list.push({
          id: i,
          sportName: '跳绳' + i,
          status: i % 2 === 0 ? 1 : 2,
          maleNum: 100 + i,
          femaleNum: 100 + i,
          unit: '次',
          rate: 30
        })
      }
      return list
    }
  },
  created() {},
  methods: {
    // 跳转项目详情
    handleClick(data) {
      this.$router.push({
        name: 'smartSport_projectDetail',
        query: {
          id: this.$route.query.id,
          workId: data.id
        }
      })
    }
  },
}
</script>

<style scoped lang="less">
.project {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  &_tabs {
    border-bottom: 0.5px solid #EBEDF0;
  }
}
/deep/ .van-tab--active {
  font-weight: 600;
}

.list {
  padding: 16px;
  box-sizing: border-box;
  &_item {
    &:not(:first-child) {
      margin-top: 16px;
    }
    &_header {
      display: flex;
      align-items: center;
      &_tag {
        border-radius: 4px;
        font-size: 12px;
        line-height: 20px;
        padding: 0 4px;
        &.finish {
          background: #F3F9EE;
          color: #8CC152;
        }
        &.unfinish {
          background: #FFF0E5;
          color: #F60;
        }
      }
      &_name {
        flex: 1;
        margin: 0 4px;
        color: #323233;
        font-size: 16px;
        font-weight: 600;
        line-height: 24px;
      }
    }
    &_content {
      margin-top: 8px;
      border-radius: 8px;
      background: #F7F8FA;
      padding: 8px 16px;
      box-sizing: border-box;
      &_acc {
        display: flex;
        align-items: center;
        font-size: 14px;
        line-height: 22px;
      }
      &_label {
        color: #969799;
      }
      &_value {
        color: #323233;
      }
      &_bar {
        display: flex;
        align-items: center;
        margin-top: 4px;
        &_progress {
          flex: 1;
        }
        &_tx {
          color: #969799;
          font-size: 14px;
          line-height: 22px;
          margin-left: 8px;
        }
      }
    }
  }
}
</style>