<!--
 * @Author: caiyf
 * @Date: 2024-06-14 17:11:44
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-06-17 10:48:13
 * @Description: 班级作业
 * @FilePath: \mobile\mhealth\src\views\smartSport\homework\ClassHomework.vue
-->
<template>
  <div class="work">
    <div class="card">
      <div class="card_header">
        <span class="card_header_name">{{ detail.className }}</span>
        <span
          class="tag"
          :class="statusType(detail.status)"
        >{{ statusText(detail.status) }}</span>
      </div>
      <div class="card_bar">
        <van-progress
          class="card_bar_progress"
          :show-pivot="false"
          color="#8CC152"
          track-color="#EBEDF0"
          :percentage="detail.rate"
          stroke-width="8px" 
        />
        <span class="card_bar_tx">{{ detail.rate }}%</span>
      </div>
      <div class="card_stu">
        <div class="card_stu_item">
          <span class="card_stu_item_label">参与学生</span>
          <span class="card_stu_item_value">{{ detail.stuTotal }}人</span>
        </div>
        <div class="card_stu_item">
          <span class="card_stu_item_label">完成学生</span>
          <span class="card_stu_item_value">{{ detail.stuFinish }}人</span>
        </div>
      </div>
    </div>
    <div class="stu">
      <van-tabs 
        v-model="activeTab"
        class="stu_tabs"
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
          v-for="item, i of stuList"
          :key="i"
          class="list_item"
        >
          <div class="list_item_info">
            <img :src="item.avatar || require('@/assets/images/smartSport/avatar_default.png')" class="list_item_info_avatar" />
            <div class="list_item_box">
              <div class="list_item_box_name">
                <span class="list_item_box_name-name">{{ item.userName }}</span>
                <img v-if="genderIcon(item.gender)" :src="genderIcon(item.gender)" class="list_item_box_name-gender" />
                <span v-else class="list_item_box_name-tx">性别未知</span>
              </div>
              <div class="list_item_box_process">
                <span class="list_item_box_process-label">进度/目标：</span>
                <span class="list_item_box_process-value">
                  {{ `${item.current}/${item.target}${item.unit}` }}
                  <span class="tag" :class="statusType(item.status)">{{ statusText(item.status) }}</span>
                </span>
              </div>
            </div>
          </div>
          <div class="list_item_operate">
            <span class="list_item_operate_item" @click="handleLike(item, i)">
              <img :src="likeIcon(item.isLike)" class="list_item_operate_item-icon" />
              <span class="list_item_operate_item-num">点赞({{ item.like }})</span>
            </span>
            <span class="list_item_operate_item" @click="handleMessage(item)">
              <img src="@/assets/images/smartSport/message_icon.png" class="list_item_operate_item-icon" />
              <span class="list_item_operate_item-num">留言({{ item.message }})</span>
            </span>
            <span class="list_item_operate_item" @click="toRecord(item)">
              <img src="@/assets/images/smartSport/sport_record_icon.png" class="list_item_operate_item-icon" />
              <span class="list_item_operate_item-num">运动记录</span>
            </span>
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
        className: '三年级1班',
        status: 1,
        stuTotal: 1000,
        stuFinish: 1000,
        rate: 80
      },
      tabs: [
        { label: '全部学生', name: 'all' },
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

    // 点赞图标
    likeIcon() {
      return val => {
        return val ? require('@/assets/images/smartSport/like_active_icon.png')
                   : require('@/assets/images/smartSport/like_icon.png') 
      }
    },

    // 性别图标
    genderIcon() {
      return val => {
        return {
          1: require('@/assets/images/smartSport/male_icon.png'),
          2: require('@/assets/images/smartSport/female_icon.png')
        }[val]
      }
    },

    stuList() {
      return this.detail.list || []
    }
  },
  created() {
    let info = utils.getSessionStorage('smartSport_projectDetail')
    this.$nextTick(() => {
      utils.setTitle(`班级作业 - ${info.sportName}`)
    })
    this.getData()
  },
  methods: {
    getData() {
      let detail = {
        className: '三年级1班',
        status: 1,
        stuTotal: 1000,
        stuFinish: 1000,
        rate: 80,
        list: []
      }
      for (let i = 1; i <= 10; i++) {
        detail.list.push({
          id: i,
          userName: '陈果果',
          avatar: '',
          current: 100,
          target: 90,
          status: i % 2 === 0 ? 1 : 2,
          like: 20,
          isLike: i % 2 === 0,
          message: 10,
          unit: '个',
          gender: i % 2 === 0 ? 1 : 2,
          classId: i
        })
      }
      this.detail = detail
    },

    // 点赞 - 取消点赞
    handleLike(data, i) {
      this.$set(this.detail.list[i], 'like', data.isLike ? --this.detail.list[i].like : ++this.detail.list[i].like)
      this.$set(this.detail.list[i], 'isLike', !data.isLike)
      this.debounceLike(data)
    },

    debounce(func) {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {  
        func.apply(this)
        clearTimeout(this.timeout)
        this.timeout = null
      }, 300)
    },

    debounceLike(data) {
      this.debounce(function () {
        // 在这里请求点赞接口
        console.log('点赞222222', data);
      })
    },

    // 打开留言弹窗
    handleMessage(data) {
      this.$router.push({
        name: 'smartSport_leaveMessage'
      })
    },

    // 跳转运动记录
    toRecord(data) {
      this.$router.push({
        name: 'smartSport_sportRecord',
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
.work {
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
  &_stu {
    margin-top: 8px;
    display: flex;
    align-items: center;
    &_item {
      flex: 1;
      border-radius: 8px;
      background: #F7F8FA;
      padding: 8px 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      line-height: 22px;
      &:nth-child(n + 2) {
        margin-left: 12px;
      }
      &_label {
        color: #969799;
      }
      &_value {
        color: #323233;
        font-weight: 600;
      }
    }
  }
}

.stu {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  margin-top: 16px;
  &_tabs {
    border-bottom: 0.5px solid #EBEDF0;
  }
  .list{
    padding: 16px;
    box-sizing: border-box;
    &_item {
      &:nth-child(n + 2) {
        margin-top: 16px;
      }
      &_info {
        display: flex;
        align-items: center;
        &_avatar {
          width: 48px;
          height: 48px;
          flex-shrink: 0;
        }
      }
      &_box {
        flex: 1;
        margin-left: 8px;
        &_name {
          display: flex;
          align-items: center;
          &-name {
            color: #323233;
            font-size: 16px;
            font-weight: 600;
            line-height: 24px;
          }
          &-gender {
            margin-left: 6px;
            width: 18px;
            height: 18px;
          }
          &-tx {
            margin-left: 6px;
            border-radius: 20px;
            background: #C8C9CC;
            padding: 0 8px;
            color: #fff;
            font-size: 12px;
            font-weight: 600;
            line-height: 20px;
          }
        }
        &_process {
          display: flex;
          align-items: center;
          font-size: 14px;
          line-height: 22px;
          &-label {
            color: #969799;
          }
          &-value {
            color: #323233;
          }
        }
      }
      &_operate {
        margin-top: 12px;
        display: flex;
        align-items: center;
        border-radius: 8px;
        background: #F7F8FA;
        height: 38px;
        &_item {
          flex: 1;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          &-icon {
            width: 16px;
            height: 16px;
          }
          &-num {
            margin-left: 4px;
            color: #323233;
            font-size: 14px;
            font-weight: 600;
            line-height: 22px;
          }
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