<!--
 * @Author: caiyf
 * @Date: 2024-05-06 17:57:54
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-05-14 10:51:45
 * @Description: 选择学校
 * @FilePath: \mobile\mhealth\src\views\smartSport\picture\SelectSchool.vue
-->
<template>
  <div class="school">
    <ul v-if="schoolList.length" class="list">
      <li
        v-for="item of schoolList"
        :key="item.schoolId" 
        class="list_item"
        @click="handleClick(item)"
      >
        <img :src="require('@/assets/images/smartSport/picture/default_school_icon.png')" class="list_item_icon" />
        <span class="list_item_name">{{ item.schoolName }}</span>
        <van-icon name="arrow" size="16" color="#969799" />
      </li>
    </ul>
    <BaseEmpty v-else />
  </div>
</template>

<script>
import { postByUrl } from '@/api/common'
import BaseEmpty from 'components/base/BaseEmpty'
export default {
  props: {},
  components: {
    BaseEmpty
  },
  data() {
    return {
      schoolList: []
    }
  },
  computed: {},
  created() {
    this.getList()
  },
  methods: {
    getList() {
      const toast = this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
      });
      postByUrl('common/queryUserRoleSchoolList').then(res => {
        let data = res.data || []
        let obj = {}
        data.forEach(v => {
          if ([4, 8].includes(v.roleType)) {
            (v.schoolList || []).forEach(school => {
              obj[school.schoolId] = school
            })
          }
        })
        this.schoolList = Object.values(obj)
      }).finally(() => {
        toast.clear()
      })
    },

    handleClick(item) {
      this.$router.push({
        name: 'smartSport_photographNotice',
        query: {
          schoolId: item.schoolId
        }
      })
    }
  },
}
</script>

<style scoped lang="less">
.school {
  height: inherit;
}
.list {
  padding: 16px;
  box-sizing: border-box;
  &_item {
    display: flex;
    align-items: center;
    padding: 16px;
    box-sizing: border-box;
    border-radius: 8px;
    background: #fff;
    &:not(:first-child) {
      margin-top: 16px;
    }
    &_icon {
      width: 48px;
      height: 48px;
    }
    &_name {
      flex: 1;
      margin: 0 12px;
      color: #323233;
      font-size: 16px;
      font-weight: 600;
    }
  }
}
</style>