<!--
 * @Author: caiyf
 * @Date: 2024-05-07 09:36:20
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-05-22 15:14:06
 * @Description: 学生照片上传、未上传列表
 * @FilePath: \mobile\mhealth\src\views\smartSport\picture\PicUploadList.vue
-->
<template>
  <div class="pic">
    <van-tabs v-model="activeName" color="#8CC152">
      <van-tab
        v-for="item, i of tabs"
        :key="i"
        :title="item.label" 
        :name="item.name"
      ></van-tab>
    </van-tabs>
    <div class="box">
      <ul class="list">
        <li 
          v-for="item, i of list"
          :key="i"
          class="list_item"
          @click="handleClick(item)"
        >
          <span v-if="activeName === 'wsc'" class="list_item_badge">未上传</span>
          <span class="list_item_name">{{ item.userName }}</span>
          <span class="list_item_sn">{{ item.sno || '暂无学号' }}</span>
        </li>
      </ul>
      <div class="return">
        <!-- <van-icon name="arrow-left" size="14" color="#8CC152" /> -->
        <span class="return_btn" @click="handleReturn">返回</span>
      </div>
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
      tabs: [
        { label: '未上传', name: 'wsc' },
        { label: '已上传', name: 'ysc' }
      ],
      activeName: 'wsc',
      totalList: [],
      classInfo: {} // 上个页面缓存的班级信息
    }
  },
  computed: {
    list() {
      return this.totalList.filter(v => (v.isUpload === 1) === (this.activeName === 'ysc'))
    },

    routeQuery() {
      return this.$route.query || {}
    },

    schoolId() {
      let schoolId = this.$store.state.schoolId
      return this.routeQuery.schoolId || schoolId
    }
  },
  created() {
    this.setTitle()
    this.getList()
  },
  methods: {
    getList() {
      const toast = this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
      });
      // this.totalList = list
      this.postByCode('I_OCP_OCP_PHOTO_QUERY_FACE_USER', {
        schoolId: this.schoolId,
        deptId: this.routeQuery.classId
      }).then(res => {
        if (!res.status) return this.$toast(res.resmsg)
        this.totalList = res.data || []
      }).finally(() => {
        toast.clear()
      })
    },

    setTitle() {
      let storage = utils.getSessionStorage('smartSport_selectClass') || {}
      this.classInfo = storage
      setTimeout(() => {
        utils.setTitle(storage.deptName || '上传列表')
      })
    },

    handleClick(item) {
      utils.setSessionStorage('smartSport_picUploadList', {
        ...this.classInfo,
        ...item
      })
      this.$router.push({
        name: this.activeName === 'wsc' ? 'smartSport_takePicture' : 'smartSport_pictureDetail',
        query: {
          ...this.$route.query,
          userId: item.userId
        }
      })
    },

    // 返回到选择班级页面
    handleReturn() {
      this.$router.push({
        name: 'smartSport_selectClass',
        query: {
          schoolId: this.schoolId
        }
      })
    }
  },
}
</script>

<style scoped lang="less">
.pic {
  height: inherit;
}
.box {
  position: relative;
  height: calc(~'100% - 44px');
  padding: 0 16px 68px;
  box-sizing: border-box;
  overflow: auto;
}
.list {
  display: flex;
  flex-wrap: wrap;
  &_item {
    position: relative;
    width: calc(~'50% - 6px');
    padding: 16px;
    box-sizing: border-box;
    border-radius: 8px;
    background: #fff;
    display: flex;
    flex-direction: column;
    margin: 16px 0 0 12px;
    height: 82px;
    &:nth-child(2n + 1) {
      margin-left: 0;
    }
    &_name {
      font-size: 16px;
      font-weight: 600;
      line-height: 24px;
      color: #323233;
    }
    &_sn {
      margin-top: 4px;
      color: #969799;
      font-size: 14px;
      line-height: 22px;
    }
    &_badge {
      position: absolute;
      top: 0;
      right: 0;
      border-radius: 0 8px;
      background: #F76260;
      padding: 0 4px;
      color: #fff;
      font-size: 12px;
      line-height: 20px;
    }
  }
}
.return {
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  height: 60px;
  border-top: 0.5px solid #EBEDF0;
  background: #FFF;
  padding: 8px 16px;
  box-sizing: border-box;
  &_btn {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    background: #8CC152;
    color: #fff;
    font-size: 14px;
  }
}
</style>