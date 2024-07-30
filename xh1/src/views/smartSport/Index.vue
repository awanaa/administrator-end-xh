<!--
 * @Author: caiyf
 * @Date: 2024-04-09 11:11:50
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-06-12 11:29:49
 * @Description: 班级名单
 * @FilePath: \mobile\mhealth\src\views\smartSport\Index.vue
-->

<template>
  <div class="enter">
    <ul class="list">
      <li
        v-for="item, i of list"
        :key="i"
        class="list_item"
        @click="handleClick(item)"
      >
        <img :src="item.icon" class="list_item_icon" />
        <span class="list_item_text">{{ item.text }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {},
  components: {},
  data() {
    return {
      list: [
        {
          icon: require('@/assets/images/smartSport/physical_record.png'),
          text: '体测记录',
          route: 'smartSport_physical_record'
        },
        {
          icon: require('@/assets/images/smartSport/physical_file.png'),
          text: '体测档案',
          route: 'smartSport_classList'
        },
        {
          icon: require('@/assets/images/smartSport/physical_back_tracking.png'),
          text: '成绩补录',
          route: 'smartSport_physical_score_addition'
        },
        {
          icon: require('@/assets/images/smartSport/homework_icon.png'),
          text: '作业管理',
          route: 'smartSport_homeworkManage'
        }
      ],
      checked: true
    }
  },
  computed: {},
  created() {},
  methods: {
    handleClick(item) {
      console.log(item);
      this.$router.push({
        name: item.route
      })
    }
  },
}
</script>

<style scoped lang="less">
.enter {
  padding: 16px;
  box-sizing: border-box;
  .list {
    display: flex;
    flex-wrap: wrap;
    &_item {
      width: calc(~'33.33% - 32px / 3');
      margin-left: 16px;
      &:nth-child(3n + 1) {
        margin-left: 0;
      }
      &:nth-child(n + 4) {
        margin-top: 16px;
      }
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 108px;
      background: #fff;
      border-radius: 8px;
      &_icon {
        width: 52px;
        height: 52px;
      }
      &_text {
        margin-top: 8px;
        color: #303133;
        font-size: 16px;
        line-height: 24px;
      }
    }
  }
}
</style>
