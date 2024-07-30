<!--
 * @Author: caiyf
 * @Date: 2024-05-07 09:40:38
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-05-29 14:32:29
 * @Description: 拍照
 * @FilePath: \mobile\mhealth\src\views\smartSport\picture\TakePicture.vue
-->
<template>
  <div class="pic">
    <div class="pic_stu">
      {{ userInfo.deptNames }} {{ userInfo.userName }}
    </div>
    <div class="pic_bg">
      <!-- <img src="@/assets/images/smartSport/picture/pic_bg.png" class="pic_bg_person pic_bg_base"> -->
      <!-- <video ref="video" autoplay class="pic_bg_person pic_bg_base"></video> -->
      <!-- <img src="@/assets/images/smartSport/picture/shade_bg.png" class="pic_bg_shade pic_bg_base"> -->
      <!-- <span class="pic_bg_tx">请正对手机，光线充足，放慢动作</span> -->
      <img src="@/assets/images/smartSport/picture/placeholder_bg.png" class="pic_bg_place">
    </div>
    <div class="pic_explain">
      <p class="pic_explain_tx">1、竖屏拍照，切勿横屏拍照</p>
      <p class="pic_explain_tx strong">2、必须使用后置摄像头，不要使用前置摄像头（自拍）。</p>
      <p class="pic_explain_tx">3、手机照片长宽比例为4:3或1:1（手机一般默认是4:3）</p>
      <p class="pic_explain_tx">4、示例照片如上图，类似生活中的大头照（大头照指摄影时以头部、肩以上为主体的照片</p>
    </div>
    <div class="pic_camera">
      <div class="pic_camera_xj">
        <!-- <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80" fill="none">
          <circle cx="40" cy="40" r="38" stroke="#8CC152" stroke-width="4"/>
          <circle cx="40" cy="40" r="32" fill="#EBEDF0"/>
        </svg> -->
        <img src="@/assets/images/smartSport/picture/circle_icon.png" class="pic_camera_xj_icon" />
        <input type="file" accept="image/*" capture="camera" class="pic_camera_xj_input" @change="inputChange">
      </div>
      <div v-if="false" class="pic_camera_camera">
        <img src="@/assets/images/smartSport/picture/album_icon.png" class="pic_camera_camera_icon">
        <input type="file" accept="image/*" class="pic_camera_camera_input" @change="inputChange">
      </div>
    </div>
    <canvas ref="canvas" class="pic_canvas"></canvas>
    <!-- <img :src="photoUrl" alt="" style="object-fit: cover; width: 200px; height: 200px"> -->
  </div>
</template>

<script>
import { dataURItoBlob, uploadFile } from 'm-com/utils/cosUploadfile'
import util from '@/utils/util'
import { postByUrl } from '@/api/common'
export default {
  props: {},
  components: {},
  data() {
    return {
      userInfo: {},
      current_img: '',
      stream: '',
      photoUrl: ''
    }
  },
  computed: {
    routeQuery() {
      return this.$route.query || {}
    },

    user() {
      return this.$store.state.user || {}
    },

    schoolId() {
      return this.routeQuery.schoolId
    },

    userType() {
      this.$store.state.userType
    }
  },
  created() {
    this.getStuDetail()
  },
  mounted() {
    // this.openCamera()
  },
  beforeDestroy() {
    // if (this.stream) this.stream.getTracks().forEach((track) => track.stop());  
  },
  methods: {
    // 获取学生详情数据
    getStuDetail() {
      const toast = this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
      });
      this.postByCode('I_REST_OCP_PHOTO_DETAIL_USER', {
        schoolId: this.schoolId,
        userId: this.routeQuery.userId,
        deptId: this.routeQuery.classId
      }).then(res => {
        if (!res.status) return this.$toast.fail(res.resmsg)
        this.userInfo = res.data || {}
      }).finally(() => {
        toast.clear()
      })
    },

    // 截取图片，尺寸超过4096*4096的图片等比剪切到4096以下
    curPicture(file) {
      return new Promise((resolve, reject) => {
        try {
          let reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = (e) => {
            let img = new Image()
            img.src = e.target.result
            img.onload = () => {
              let imgW = img.width
              let imgH = img.height
              // 如果宽高都不超过4096，既尺寸合格
              if (imgW < 4096 && imgH < 4096) return resolve(file)
              let canvas = document.createElement('canvas')
              let ctx = canvas.getContext('2d')
              let canvasW = 0
              let canvasH = 0
              if (imgW > imgH && imgW >= 4096) {
                canvasW = 4096
                canvasH = (4096 * imgH) / imgW
              } else if (imgH > imgW && imgH >= 4096) {
                canvasH = 4096
                canvasW = (4096 * imgW) / imgH
              }
              canvas.width = canvasW
              canvas.height = canvasH
              ctx.drawImage(img, 0, 0, canvasW, canvasH)
              let dataURL;
              if (file.type.includes('png')) {
                dataURL = canvas.toDataURL('image/png')
              } else {
                dataURL = canvas.toDataURL('image/jpeg', 0.99)
              }
              // this.photoUrl = dataURL
              const newFile = dataURItoBlob(dataURL)
              resolve(newFile)
            }
          }
        } catch (error) {
          reject(error)
        }
      })
    },

    // 拍照或选择相册
    async inputChange(e) {
      let file = e.target.files[0]
      console.log('file: ', file.size);
      if (file.size < 100 * 1024) return this.$toast('照片大小不能小于100KB')
      if (file.size > 20 * 1024 * 1024) return this.$toast('照片大小不能大于20MB')
      file = await this.curPicture(file)
      console.log('newfile: ', file.size);
      let options = {
        extension: 'cos-pub',
        userId: this.user.userId,
        areaCode: this.schoolId,
        userName: this.user.userName,
        userType: this.userType
      }
      const toast = this.$toast.loading({
        forbidClick: true,
        loadingType: 'spinner',
      });
      uploadFile({
        file,
        options,
        onFileFinish: res => {
          if (res.code === 200) {
            let fileUrl = res.data.finalUrl
            util.setSessionStorage('smartSport_takePicture', {
              fileUrl
            })
            this.$router.push({
              name: 'smartSport_uploading',
              query: this.$route.query || {}
            })
          } else {
            this.$toast.fail('上传失败，请刷新重试')
          }
          toast.clear()
        },
        onError: err => {
          this.$toast.fail(err.text)
          toast.clear()
        }
      })
    },

    // 截取照片并跳转上传页面
    handleTakePicture() {
      // this.$toast('当前不在拍照时间内')
      if (!this.stream) return
      const video = this.$refs.video
      const canvas = this.$refs.canvas
      const context = canvas.getContext('2d')
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      // 捕获当前视频帧
      context.drawImage(video, 0, 0, canvas.width, canvas.height)
      // 将canvas内容转换为数据URL
      this.photoUrl = canvas.toDataURL('image/jpg')
      const file = dataURItoBlob(this.photoUrl)
      if (file.size < 100 * 1024) return this.$toast('照片大小不能小于100KB')
      let options = {
        extension: 'cos-pub',
        userId: this.user.userId,
        areaCode: this.schoolId,
        userName: this.user.userName,
        userType: this.userType
      }
      uploadFile({
        file,
        options,
        onFileFinish: res => {
          if (res.code === 200) {
            let fileUrl = res.data.finalUrl
            util.setSessionStorage('smartSport_takePicture', {
              fileUrl
            })
            this.$router.push({
              name: 'smartSport_uploading',
              query: this.$route.query || {}
            })
          } else {
            this.$toast.fail('上传失败，请刷新重试')
          }
        },
        onError: err => {
          this.$toast.fail(err.text)
        }
      })
    },

    async openCamera() {
      try {
        // 请求摄像头访问权限
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: {
            facingMode: { exact: 'environment' }
          }
        })
        // 将摄像头数据流设置到video元素的srcObject属性上
        this.$refs.video.srcObject = stream
        // 将流保存到组件的data中，以便稍后可能需要关闭它
        this.stream = stream
      } catch (error) {
        console.log('error', error);
        this.$router.go(-1)
      }
    }
  },
}
</script>

<style scoped lang="less">
.pic {
  height: inherit;
  background: #fff;
  &_stu {
    background: #8CC152;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 16px;
    font-weight: 600;
  }
  &_bg {
    position: relative;
    height: 400px;
    &_place {
      width: 100%;
      height: 100%;
    }
    &_base {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
    &_person {
      z-index: 1;
      object-fit: cover;
    }
    &_shade {
      z-index: 2;
    }
    &_tx {
      position: absolute;
      left: calc(~'50% - 113px');
      bottom: 12px;
      width: 226px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 8px;
      background: rgba(0, 0, 0, 0.40);
      color: #fff;
      font-size: 14px;
      z-index: 3;
    }
  }
  &_explain {
    width: 100%;
    padding: 4px 8px;
    box-sizing: border-box;
    background: #323233;
    color: #fff;
    font-size: 14px;
    line-height: 22px;
    .strong {
      color: #F76260;
      font-weight: 600;
    }
  }
  &_camera {
    position: relative;
    height: 160px;
    display: flex;
    justify-content: center;
    align-items: center;
    &_xj {
      position: relative;
      width: 80px;
      height: 80px;
      &_icon {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }
      &_input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        opacity: 0;
      }
    }
    &_camera {
      position: absolute;
      top: 56px;
      right: 39px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 48px;
      height: 48px;
      background: #F2F3F5;
      border-radius: 50%;
      &_input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        z-index: 1;
      }
      &::after {
        content: '相册';
        position: absolute;
        left: 12px;
        bottom: -24px;
        color: #646566;
        font-size: 12px;
        line-height: 20px;
      }
      &_icon {
        width: 20px;
        height: 20px;
      }
    }
  }
  &_canvas {
    display: none;
  }
}
</style>