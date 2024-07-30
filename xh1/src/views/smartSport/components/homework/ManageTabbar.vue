<!--
 * @Author: caiyf
 * @Date: 2024-06-13 09:32:46
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-06-13 10:15:01
 * @Description: 作业管理tabbar
 * @FilePath: \mobile\mhealth\src\views\smartSport\components\homework\ManageTabbar.vue
-->
<template>
  <van-tabbar 
    v-model="active" 
    active-color="#8CC152" 
    inactive-color="#969799" 
    class="tabbar"
    @change="handleChange"
  >
    <van-tabbar-item name="homeworkRecord">
      <span>作业记录</span>
      <template #icon="props">
        <img
          class="tabbar_icon"
          :src="props.active ?
          require('@/assets/images/smartSport/homework_record_active_icon.png') : 
          require('@/assets/images/smartSport/homework_record_icon.png')" 
        />
      </template>
    </van-tabbar-item>
    <van-tabbar-item icon="add" name="assignHomework">布置作业</van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  props: {},
  components: {},
  data() {
    return {
      active: 'homeworkRecord'
    }
  },
  computed: {},
  created() {
    this.handleChange(this.active)
  },
  methods: {
    handleChange(val) {
      this.$emit('change', val)
    }
  },
}
</script>

<style scoped lang="less">
.tabbar {
  height: 48px;
  background: #F7F7F7;
  box-shadow: 0 0.5px 0 0 #E7E7E7 inset;
  /deep/ .van-tabbar-item--active {
    background: inherit;
  }
  /deep/ .van-tabbar-item__icon {
    font-size: 24px;
  }
  &_icon {
    width: 24px;
    height: 24px;
  }
}
</style>