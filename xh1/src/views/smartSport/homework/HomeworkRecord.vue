<!--
 * @Author: caiyf
 * @Date: 2024-06-13 10:16:40
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-06-14 09:46:31
 * @Description: 作业记录
 * @FilePath: \mobile\mhealth\src\views\smartSport\homework\HomeworkRecord.vue
-->
<template>
  <div class="record">
    <ManageSearch @change="handleSearch" />
    <BaseScrollList
      class="list"
      :loading.sync="loading"
      :finished.sync="finished"
      :refresh.sync="refresh"
      :option="scrollListOption"
      @refresh="handleRefresh"
      @load="handleLoadMore"
    >
      <template v-if="list.length">
        <div
          v-for="item, i of list"
          :key="i" 
          class="list_item"
          @click="handleClick(item)"
        >
          <div class="list_item_status" :class="statusClass(item.status)">
            <span class="list_item_status_time">{{ item.createTime }} 发布</span>
            <span class="list_item_status_status">{{ item.status | statusFilter }}</span>
          </div>
          <div class="list_item_content">
            <div v-if="item.title" class="list_item_content_title">{{ item.title }}</div>
            <div class="list_item_content_item">
              <span class="list_item_content_label">
                <img src="@/assets/images/smartSport/icon_doc.png" class="list_item_content_icon" />
                <span>作业内容</span>
              </span>
              <span class="list_item_content_value">{{ item.sportNames }}</span>
            </div>
            <div class="list_item_content_item">
              <span class="list_item_content_label">
                <img src="@/assets/images/smartSport/group_icon.png" class="list_item_content_icon" />
                <span>参与班级</span>
              </span>
              <span class="list_item_content_value">{{ item.classNames }}</span>
            </div>
            <div class="list_item_content_item">
              <span class="list_item_content_label">
                <img src="@/assets/images/smartSport/icon_calendar.png" class="list_item_content_icon" />
                <span>截止时间</span>
              </span>
              <span class="list_item_content_value">{{ item.closeTime }}</span>
            </div>
            <div class="list_item_content_item">
              <span class="list_item_content_label">
                <img src="@/assets/images/smartSport/icon_user.png" class="list_item_content_icon" />
                <span>发布人</span>
              </span>
              <span class="list_item_content_value">{{ item.publishName }}</span>
            </div>
          </div>
          <div class="list_item_operate">
            <span class="list_item_operate_tx">查看详情</span>
            <van-icon name="arrow" color="#C8C9CC" :size="16" />
          </div>
        </div>
      </template>
      <BaseEmpty v-if="!loading && !list.length" class="baseEmpty" />
    </BaseScrollList>
  </div>
</template>

<script>
import ManageSearch from '@/views/smartSport/components/homework/ManageSearch'
import BaseScrollList from "@/components/base/BaseScrollList";
import BaseEmpty from "@/components/base/BaseEmpty";
export default {
  props: {},
  components: {
    ManageSearch,
    BaseScrollList,
    BaseEmpty
  },
  filters: {
    statusFilter(val) {
      return {
        1: '进行中',
        2: '已完成',
        3: '未完成',
        4: '已取消'
      }[val] || '进行中'
    }
  },
  data() {
    return {
      list: [],
      loading: true,
      finished: false,
      refresh: false
    }
  },
  computed: {
    statusClass() {
      return val => {
        return {
          1: 'success',
          2: 'primary',
          3: 'danger',
          4: 'default'
        }[val] || 'success'
      }
    },

    scrollListOption() {
      if (this.finished && !this.list.length && !this.loading) return { 'finished-text': '' }
      return {
        'finished-text': '没有更多了'
      }
    }
  },
  watch: {},
  created() {
    this.handleLoadMore()
  },
  created() {},
  methods: {
    getList() {
      setTimeout(() => {
        let list = []
        for (let i = 1; i <= 5; i++) {
          list.push({
            id: i,
            createTime: '2020-09-01 10:00:00',
            classNames: '三年级1班三年级1班三年级1班三年级1班三年级1班三年级1班',
            publishName: '张三',
            status: 1,
            sportNames: '多人跳绳、立定跳远、仰卧起坐,多人跳绳、立定跳远、仰卧起坐',
            closeTime: '2024-05-12 (周五) 20:00',
            title: '无敌是多么寂寞'
          })
        }
        this.list = this.list.concat(list)
        this.loading = false
        // this.finished = true
        // console.log('loading', this.loading);
        if (this.list.length >= 20) this.finished = true
      }, 2000)
    },

    handleClick(data) {
      this.$router.push({
        name: 'smartSport_homeworkDetail',
        query: {
          id: data.id
        }
      })
    },

    // 搜索
    handleSearch(data) {},

    handleRefresh() {
      this.refresh = false
      this.finished = false
      this.loading = true
      this.list = []
      this.handleLoadMore()
    },

    handleLoadMore() {
      this.getList()
    }
  },
}
</script>

<style scoped lang="less">
.baseEmpty {
  // height: calc(~'100% - 48px');
  margin-top: 120px;
}
.list {
  height: calc(~'100% - 48px');
  overflow: auto;
  padding: 16px;
  box-sizing: border-box;
  &_item {
    background: #fff;
    overflow: hidden;
    border-radius: 12px;
    &:not(:first-child) {
      margin-top: 16px;
    }
    &_status {
      height: 30px;
      padding: 0 16px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #fff;
      font-size: 14px;
      font-weight: 600;
      &.success {
        background: #8cc152;
      }
      &.primary {
        background: #10aeff;
      }
      &.danger {
        background: #f76260;
      }
      &.default {
        background: #c8c9cc;
      }
      &_time {
        flex: 1;
      }
      &_status {
        margin-left: 8px;
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
    &_content {
      padding: 16px;
      box-sizing: border-box;
      &_title {
        color: #323233;
        font-size: 16px;
        font-weight: 600;
        line-height: 24px;
        margin-bottom: 12px;
      }
      &_item {
        display: flex;
        align-items: center;
        margin-top: 8px;
        &:first-child {
          margin-top: 0;
        }
      }
      &_label {
        width: 76px;
        display: flex;
        align-items: center;
        color: #323233;
        font-size: 14px;
        line-height: 22px;
        flex-shrink: 0;
      }
      &_icon {
        width: 16px;
        height: 16px;
        margin-right: 4px;
      }
      &_value {
        margin-left: 8px;
        color: #323233;
        font-size: 14px;
        line-height: 22px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    &_operate {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 10px 16px;
      box-sizing: border-box;
      border-top: 0.5px solid #EBEDF0;
      &_tx {
        color: #969799;
        font-size: 14px;
        line-height: 22px;
        margin-right: 4px;
      }
    }
  }
}
</style>