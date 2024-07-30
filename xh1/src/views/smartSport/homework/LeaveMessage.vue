<!--
 * @Author: caiyf
 * @Date: 2024-06-17 10:42:35
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-06-17 11:09:25
 * @Description: 留言
 * @FilePath: \mobile\mhealth\src\views\smartSport\homework\LeaveMessage.vue
-->
<template>
  <div class="message">
    <ul class="list">
      <li 
        v-for="item, i of list"
        :key="i"
        class="list_item"
      >
        <p class="list_item_title">{{ item.title }}</p>
        <div class="list_item_info">
          <span class="list_item_info_name">{{ item.userName }}</span>
          <span class="list_item_info_date">{{ item.date }}</span>
          <span v-if="true" class="list_item_info_return" @click="handleReturn(item)">
            撤回<img src="@/assets/images/smartSport/return_icon.png" class="list_item_info_icon" />
          </span>
        </div>
      </li>
    </ul>
    <div class="comment">
      <van-field class="comment_input" v-model="remark" maxlength="100" placeholder="请输入留言" />
      <van-button class="comment_btn" :disabled="!remark" @click="handleSubmit">发布</van-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  components: {},
  data() {
    return {
      list: [],
      remark: ''
    }
  },
  computed: {
    user() {
      return this.$store.state.user || {}
    },

    userId() {
      return this.user.userId
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
          title: '这几天下雨下雪刮风，同学们完成作业的时候要注意安全！',
          userName: '张三',
          date: '2022-06-14 14:08:41'
        })
      }
      this.list = list
    },

    // 撤回
    handleReturn(item) {

    },

    // 发布
    handleSubmit() {

    },
  },
}
</script>

<style scoped lang="less">
.message {
  height: inherit;
}

.list {
  padding: 16px;
  box-sizing: border-box;
  height: calc(~'100% - 49px');
  overflow: auto;
  &_item {
    border-radius: 12px;
    background: #FFF;
    padding: 16px;
    box-sizing: border-box;
    &:not(:first-child) {
      margin-top: 16px;
    }
    &_title {
      color: #323233;
      font-size: 16px;
      font-weight: 600;
      line-height: 24px;
    }
    &_info {
      display: flex;
      align-items: center;
      margin-top: 8px;
      color: #969799;
      font-size: 14px;
      line-height: 22px;
      &_date {
        flex: 1;
        margin: 0 12px;
      }
      &_return {
        color: #F76260;
      }
      &_icon {
        width: 20px;
        height: 20px;
        vertical-align: text-bottom;
      }
    }
  }
}

.comment {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 49px;
  padding: 8px 16px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  background: #fff;
  border-top: 1px solid #EBEDF0;
  &_input {
    flex: 1;
    height: 32px;
    background: #F7F8FA;
    border-radius: 4px;
    display: flex;
    align-items: center;
    padding: 0 12px;
    /deep/ .van-field__body {
      width: 100%;
    }
  }
  &_btn {
    margin-left: 8px;
    flex-shrink: 0;
    width: 60px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #8CC152;
    border-radius: 4px;
    color: #fff;
    font-size: 14px;
  }
}
</style>