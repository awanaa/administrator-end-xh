<!--
 * @Author: caiyf
 * @Date: 2024-06-14 15:08:32
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-06-14 17:15:17
 * @Description: 项目详情
 * @FilePath: \mobile\mhealth\src\views\smartSport\homework\ProjectDetail.vue
-->
<template>
  <div class="project">
    <div class="card">
      <div class="card_header">
        <span class="card_header_name">{{ detail.sportName }}</span>
        <span
          class="tag"
          :class="statusType(detail.status)"
        >{{ statusText(detail.status) }}</span>
      </div>
      <div class="card_content">
        <div class="card_content_info">
          <span class="card_content_info_label">作业要求：</span>
            <span class="card_content_info_value">
              个人累计
              <template>男{{ detail.maleNum }}{{ detail.unit }}</template>
              <template>女{{ detail.femaleNum }}{{ detail.unit }}</template>
            </span>
        </div>
        <div class="card_content_bar">
          <van-progress
            class="card_content_bar_progress"
            :show-pivot="false"
            color="#8CC152"
            track-color="#EBEDF0"
            :percentage="detail.rate"
            stroke-width="8px" 
          />
          <span class="card_content_bar_tx">{{ detail.rate }}%</span>
        </div>
      </div>
    </div>
    <div class="class">
      <van-tabs 
        v-model="activeTab"
        class="class_tabs"
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
      <ul class="class_list">
        <li
          v-for="item, i of classList"
          :key="i" 
          class="class_list_item"
          @click="handleClick(item)"
        >
          <div class="class_list_item_class">
            <span class="class_list_item_class_name">{{ item.className }}</span>
            <van-icon name="arrow" :size="16" color="#C8C9CC" />
          </div>
          <div class="class_list_item_bar">
            <van-progress
              class="class_list_item_bar_progress"
              :show-pivot="false"
              color="#8CC152"
              track-color="#EBEDF0"
              :percentage="item.rate"
              stroke-width="8px" 
            />
            <span class="class_list_item_bar_tx">{{ item.rate }}%</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import utils from '@/utils/util'
export default {
  props: {},
  components: {},
  data() {
    return {
      detail: {
        sportName: '多人跳绳',
        status: 1,
        maleNum: 1000,
        femaleNum: 1000,
        unit: '个',
        rate: 80
      },
      tabs: [
        { label: '全部班级', name: 'all' },
        { label: '已完成', name: 'finish' },
        { label: '未完成', name: 'unfinish' }
      ],
      activeTab: 'all'
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

    classList() {
      let list = []
      for (let i = 1; i <= 10; i++) {
        list.push({
          classId: i,
          className: `三年级${i}班`,
          rate: 80 + i
        })
      }
      return list
    }
  },
  created() {},
  methods: {
    // 跳转作业详情
    handleClick(data) {
      utils.setSessionStorage('smartSport_projectDetail', {
        ...data,
        sportName: this.detail.sportName
      })
      this.$router.push({
        name: 'smartSport_classHomework',
        query: {
          ...this.$route.query,
          classId: data.classId
        }
      })
    }
  },
}
</script>

<style scoped lang="less">
.project {
  padding: 16px;
  box-sizing: border-box;
}

.card {
  border-radius: 12px;
  background: #FFF;
  padding: 16px;
  box-sizing: border-box;
  &_header {
    display: flex;
    align-items: center;
    &_name {
      flex: 1;
      margin-right: 4px;
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
    &_info {
      display: flex;
      align-items: center;
      font-size: 14px;
      line-height: 22px;
      &_label {
        color: #969799;
      }
      &_value {
        color: #323233;
      }
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

.class {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  margin-top: 16px;
  &_tabs {
    border-bottom: 0.5px solid #EBEDF0;
  }
  &_list {
    padding: 16px;
    box-sizing: border-box;
    &_item {
      border-radius: 8px;
      background: #F7F8FA;
      padding: 12px;
      box-sizing: border-box;
      &:not(:first-child) {
        margin-top: 16px;
      }
      &_class {
        display: flex;
        align-items: center;
        &_name {
          flex: 1;
          margin-right: 4px;
          color: #323233;
          font-size: 14px;
          font-weight: 600;
          line-height: 22px;
        }
      }
      &_bar {
        display: flex;
        align-items: center;
        margin-top: 8px;
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

.tag {
  border-radius: 4px;
  padding: 0 4px;
  box-sizing: border-box;
  font-size: 12px;
  line-height: 20px;
  &.finish {
    background: #F3F9EE;
    color: #8CC152;
  }
  &.unfinish {
    background: #FFF0E5;
    color: #F60;
  }
}

/deep/ .van-tab--active {
  font-weight: 600;
}

</style>