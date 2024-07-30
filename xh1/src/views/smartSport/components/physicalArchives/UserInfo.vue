<!--
 * @Author: caiyf
 * @Date: 2024-04-10 15:49:09
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-04-19 14:10:39
 * @Description: 用户信息
 * @FilePath: \mobile\mhealth\src\views\smartSport\components\physicalArchives\UserInfo.vue
-->
<template>
  <BaseCard cardBg="transparent" :showHeader="false">
    <div class="cont">
      <img :src="defaultAvatarUrl" class="cont_avatar" />
      <div class="cont_name">
        <span class="cont_name_name">{{ data.userName || '--' }}</span>
        <img v-if="data.gender == 1" src="@/assets/images/smartSport/male_icon.png" class="cont_name_icon" />
        <img v-else-if="data.gender == 2" src="@/assets/images/smartSport/female_icon.png" class="cont_name_icon" />
      </div>
      <div class="cont_class">
        <span class="cont_class_name">{{ data.className || '--' }}</span>
        <span class="cont_class_sn">学号：{{ data.sno || '--' }}</span>
      </div>
    </div>
  </BaseCard>
</template>

<script>
import BaseCard from '../BaseCard'
export default {
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    BaseCard
  },
  data() {
    return {}
  },
  computed: {
    // 默认学生头像
    defaultAvatarUrl() {
      return this.data.avatar || require('@/assets/images/smartSport/avatar_default.png')
    }
  },
}
</script>

<style scoped lang="less">
.cont {
  display: flex;
  flex-direction: column;
  &_avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
  &_name {
    display: flex;
    align-items: center;
    margin-top: 12px;
    &_name {
      color: #323233;
      font-size: 18px;
      font-weight: 600;
      line-height: 26px;
      margin-right: 6px;
    }
    &_icon {
      width: 20px;
      height: 20px;
    }
  }
  &_class {
    margin-top: 2px;
    display: flex;
    align-items: center;
    color: #323233;
    font-size: 14px;
    line-height: 22px;
    &_name {
      margin-right: 16px;
    }
  }
}
</style>