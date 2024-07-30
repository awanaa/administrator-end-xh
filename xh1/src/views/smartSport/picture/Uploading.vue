<!--
 * @Author: caiyf
 * @Date: 2024-05-07 09:55:33
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-05-14 16:45:06
 * @Description: 照片上传
 * @FilePath: \mobile\mhealth\src\views\smartSport\picture\Uploading.vue
-->
<template>
  <div>
    <div class="info">
      <img :src="storage.fileUrl" class="info_img" @click="handlePreview" />
      <span class="info_name">{{ stuInfo.userName || '--' }}</span>
      <span class="info_label mt12">
        <span class="info_label_label">班级：</span>
        <span class="info_label_value">{{ stuInfo.deptNames || '--' }}</span>
      </span>
      <span class="info_label mt8">
        <span class="info_label_label">学号：</span>
        <span class="info_label_value">{{ stuInfo.sno || '--' }}</span>
      </span>
    </div>
    <div class="info_btn">
      <div class="info_btn_upload info_btn_base" @click="handleUpload">上传</div>
      <div class="info_btn_retake info_btn_base" @click="handleRetake">重拍</div>
    </div>
  </div>
</template>

<script>
import util from '@/utils/util'
import { ImagePreview } from 'vant'
export default {
  props: {},
  components: {},
  data() {
    return {
      stuInfo: {},
      storage: {}
    }
  },
  computed: {
    routeQuery() {
      return this.$route.query || {}
    },

    user() {
      return this.$store.state.user || {}
    }
  },
  created() {
    this.getStuDetail()
    this.storage = util.getSessionStorage('smartSport_takePicture') || {}
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

    // 上传
    async handleUpload() {
      const bool = await this.checkTime()
      if (!bool) return this.$toast.fail('当前不在拍照时间内')
      const toast = this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
      });
      this.postByCode('I_OCP_OCP_PHOTO_UPLOAD_FACE', {
        id: this.routeQuery.userPhotoId || '', // 学生照片id，存在即修改，不存在就是新增
        schoolId: this.routeQuery.schoolId,
        userId: this.stuInfo.userId,
        roleType: 1,
        userName: this.stuInfo.userName,
        operatorName: this.user.userName,
        fileList: [
          {
            fileType: 1,
            fileName: this.stuInfo.deptNames + this.stuInfo.userName,
            fileUrl: this.storage.fileUrl
          }
        ]
      }).then(res => {
        if (!res.status) return this.$toast.fail(res.resmsg)
        this.$toast.success('上传成功')
        this.$router.push({
          name: 'smartSport_picUploadList',
          query: {
            schoolId: this.routeQuery.schoolId,
            classId: this.routeQuery.classId
          }
        })
      }).finally(() => {
        toast.clear()
      })
    },

    // 验证是否在拍照时间内
    checkTime() {
      const toast = this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
      });
      return this.postByCode('I_BDM_SCH_PARAM_CHECK_ADD_FACE_TIME', {
        schoolId: this.routeQuery.schoolId
      }).then(res => {
        if (!res.status) return this.$toast.fail(res.resmsg)
        return res.data
      }).finally(() => {
        toast.clear()
      })
    },

    // 重拍
    handleRetake() {
      this.$router.go(-1)
    },

    handlePreview() {
      ImagePreview({
        images: [this.storage.fileUrl]
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