<!--
 * @Author: caiyf
 * @Date: 2024-06-14 09:42:39
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-06-14 14:10:19
 * @Description: 作业详情
 * @FilePath: \mobile\mhealth\src\views\smartSport\homework\HomeworkDetail.vue
-->
<template>
  <div class="detail">
    <div class="card">
      <div class="card_status" :class="statusClass(detail.status)">
        <span class="card_status_time">{{ detail.createTime }} 发布</span>
        <span class="card_status_status">{{ detail.status | statusFilter }}</span>
      </div>
      <div class="card_content">
        <div v-if="detail.title" class="card_content_title">{{ detail.title }}</div>
        <div class="card_content_item">
          <span class="card_content_label">
            <img src="@/assets/images/smartSport/icon_doc.png" class="card_content_icon" />
            <span>作业内容</span>
          </span>
          <span class="card_content_value">{{ detail.sportNames }}</span>
        </div>
        <div class="card_content_item">
          <span class="card_content_label">
            <img src="@/assets/images/smartSport/group_icon.png" class="card_content_icon" />
            <span>参与班级</span>
          </span>
          <span class="card_content_value">{{ detail.classNames }}</span>
        </div>
        <div class="card_content_item">
          <span class="card_content_label">
            <img src="@/assets/images/smartSport/icon_calendar.png" class="card_content_icon" />
            <span>截止时间</span>
          </span>
          <span class="card_content_value">{{ detail.closeTime }}</span>
        </div>
        <div class="card_content_item">
          <span class="card_content_label">
            <img src="@/assets/images/smartSport/icon_user.png" class="card_content_icon" />
            <span>发布人</span>
          </span>
          <span class="card_content_value">{{ detail.publishName }}</span>
        </div>
      </div>
      <div class="card_operate">
        <span class="card_operate_btn cancel" @click="handleCancel">取消作业</span>
        <span class="card_operate_btn" @click="handleShowClass">查看班级</span>
        <span class="card_operate_btn" @click="handleRemark">作业备注</span>
      </div>
    </div>
    <HomeworkDetailProject class="mt16" />
    <!-- 查看班级抽屉 -->
    <van-popup 
      v-model="classVisible"
      position="bottom"
      round
      :style="{ height: '55%' }"
    >
      <div class="class">
        <div class="class_header">
          <span class="class_header_title">查看班级</span>
          <span class="class_header_close" @click="classVisible = false">关闭</span>
        </div>
        <ul class="class_list">
          <li
            v-for="item, i of gradeList"
            :key="i" 
            class="class_list_item"
          >
            <span class="class_list_item_grade">{{ item.gradeName }}</span>
            <ul class="class_list_item_class">
              <li
                v-for="clazz, j of item.classList"
                :key="j"
                class="class_list_item_class_item"
              >{{ clazz.className }}</li>
            </ul>
          </li>
        </ul>
      </div>
    </van-popup>
  </div>
</template>

<script>
import HomeworkDetailProject from '@/views/smartSport/components/homework/HomeworkDetailProject'
export default {
  props: {},
  components: {
    HomeworkDetailProject
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
      detail: {
        createTime: '2020-09-01 10:00:00',
        classNames: '三年级1班三年级1班三年级1班三年级1班三年级1班三年级1班',
        publishName: '张三',
        status: 1,
        sportNames: '多人跳绳、立定跳远、仰卧起坐,多人跳绳、立定跳远、仰卧起坐',
        closeTime: '2024-05-12 (周五) 20:00',
        title: '无敌是多么寂寞'
      },
      classVisible: false
    };
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

    gradeList() {
      let list = []
      for (let i = 1; i <= 6; i++) {
        list.push({
          gradeName: `${i}年级`,
          classList: [
            { className: `${i}年级1班` },
            { className: `${i}年级2班` },
            { className: `${i}年级3班` },
            { className: `${i}年级4班` },
            { className: `${i}年级5班` },
            { className: `${i}年级6班` },
          ]
        })
      }
      return list
    }
  },
  created() {},
  methods: {
    // 取消作业
    handleCancel() {
      this.$dialog.confirm({
        title: '取消作业',
        message: '确定取消作业？取消后不可恢复'
      }).then(() => {
        this.$toast('取消成功')
      }).catch(() => {})
    },

    // 查看班级
    handleShowClass() {
      this.classVisible = true
    },

    // 作业备注
    handleRemark() {
      this.$router.push({
        name: 'smartSport_homeworkRemark',
        query: {
          ...this.$route.query
        }
      })
    }
  },
};
</script>

<style scoped lang="less">
.detail {
  padding: 16px;
  box-sizing: border-box;
}
.card {
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
        content: "";
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
    align-items: center;
    padding: 0 16px 16px;
    box-sizing: border-box;
    &_btn {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 8px;
      border: 0.5px solid #5FBA00;
      box-sizing: border-box;
      color: #5FBA00;
      font-size: 14px;
      font-weight: 600;
      line-height: 22px;
      padding: 5px 12px;
      &.cancel {
        color: #F76260;
        border-color: #F76260;
      }
      &:not(:first-child) {
        margin-left: 8px;
      }
    }
  }
}

.class {
  height: 100%;
  &_header {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 44px;
    position: relative;
    &_title {
      color: #323233;
      font-size: 16px;
      font-weight: 600;
    }
    &_close {
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
      padding: 0 16px;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #969799;
      font-size: 14px;
    }
  }
  &_list {
    padding: 12px 16px;
    box-sizing: border-box;
    height: calc(~'100% - 44px');
    overflow: auto;
    &_item {
      &:not(:first-child) {
        margin-top: 16px;
      }
      &_grade {
        color: #323233;
        font-size: 14px;
        font-weight: 600;
        line-height: 22px;
      }
      &_class {
        display: flex;
        flex-wrap: wrap;
        &_item {
          padding: 5px 12px;
          box-sizing: border-box;
          border-radius: 4px;
          background: #F6F7F9;
          width: calc(~'33.33% - 16px / 3');
          margin: 8px 0 0 8px;
          text-align: center;
          color: #323233;
          font-size: 14px;
          line-height: 22px;
          &:nth-child(3n + 1) {
            margin-left: 0;
          }
        }
      }
    }
  }
}

.mt16 {
  margin-top: 16px;
}
</style>
