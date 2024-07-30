<!--
 * @Author: caiyf
 * @Date: 2024-05-07 09:58:41
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-05-14 16:39:16
 * @Description: 照片详情
 * @FilePath: \mobile\mhealth\src\views\smartSport\picture\PictureDetail.vue
-->
<template>
  <div>
    <div class="info">
      <img :src="imgUrl" class="info_img" @click="handlePreview" />
      <span class="info_name">{{ stuInfo.userName || '--' }}</span>
      <span class="info_label mt12">
        <span class="info_label_label">班级：</span>
        <span class="info_label_value">{{ stuInfo.deptNames || '--' }}</span>
      </span>
      <span class="info_label mt8">
        <span class="info_label_label">学号：</span>
        <span class="info_label_value">{{ stuInfo.sno || '--' }}</span>
      </span>
      <span class="info_label mt8">
        <span class="info_label_label">上传时间：</span>
        <span class="info_label_value">{{ stuInfo.modifyTime | formatDate }}</span>
      </span>
    </div>
    <div class="info_btn">
      <div class="info_btn_retake info_btn_base" @click="handleRetake">重拍</div>
    </div>
  </div>
</template>

<script>
import dayJs from 'dayjs'
import { ImagePreview } from 'vant'
export default {
  props: {},
  components: {
    ImagePreview
  },
  data() {
    return {
      stuInfo: {}
    }
  },
  filters: {
    formatDate(val) {
      if (!val) return '--'
      return dayJs(new Date(val)).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  computed: {
    routeQuery() {
      return this.$route.query || {}
    },

    // 学生照片信息
    userPhotoObj() {
      let userPhotoList = this.stuInfo.userPhotoList || []
      return userPhotoList[0] || {}
    },

    imgUrl() {
      let fileList = this.userPhotoObj.fileList || []
      let file = fileList[0] || {}
      return file.fileUrl || ''
    },

    userPhotoId() {
      return this.userPhotoObj.id || ''
    }
  },
  created() {
    this.getStuDetail()
  },
  methods: {
    // 获取学生详情数据
    getStuDetail() {
      const toast = this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
      });
      this.postByCode('I_REST_OCP_PHOTO_DETAIL_USER', {
        schoolId: this.routeQuery.schoolId,
        userId: this.routeQuery.userId,
        deptId: this.routeQuery.classId
      }).then(res => {
        if (!res.status) return this.$toast.fail(res.resmsg)
        this.stuInfo = res.data || {}
      }).finally(() => {
        toast.clear()
      })
    },
    
    // 重拍
    handleRetake() {
      this.$router.push({
        name: 'smartSport_takePicture',
        query: {
          ...this.routeQuery,
          userPhotoId: this.userPhotoId
        }
      })
    },

    handlePreview() {
      ImagePreview({
        images: [this.imgUrl]
      })
    }
  },
}
</script>

<style scoped lang="less">
.info {
  height: 496px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px 0;
  box-sizing: border-box;
  &_img {
    width: 180px;
    height: 220px;
    border-radius: 12px;
    object-fit: cover;
  }
  &_name {
    margin-top: 24px;
    color: #323233;
    font-size: 20px;
    font-weight: 600;
    line-height: 28px;
  }
  &_label {
    width: 280px;
    color: #646566;
    font-size: 16px;
    line-height: 24px;
    display: flex;
    align-items: center;
    &_label {
      width: 100px;
      text-align: right;
    }
  }
  &_btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    &_base {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 240px;
      height: 44px;
      font-size: 14px;
      border-radius: 4px;
    }
    &_upload {
      color: #fff;
      background: #8CC152;
    }
    &_retake {
      border: 1px solid #EBEDF0;
      color: #323233;
      background: #fff;
      margin-top: 12px;
    }
  }
  .mt12 {
    margin-top: 12px;
  }
  .mt8 {
    margin-top: 8px;
  }
}
</style>