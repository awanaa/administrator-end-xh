<!--
 * @Author: caiyf
 * @Date: 2024-05-06 17:58:45
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-05-22 17:24:16
 * @Description: 拍照须知
 * @FilePath: \mobile\mhealth\src\views\smartSport\picture\PhotographNotice.vue
-->
<template>
  <div class="photo">
    <div class="correct">
      <img src="@/assets/images/smartSport/picture/default_photo.png" class="correct_icon" />
      <ul class="correct_list">
        <li
          v-for="item, i of correctList"
          :key="i"
          class="correct_list_item"
        >
          <van-icon name="checked" color="#8CC152" size="20" />
          <span class="correct_list_item_tx">{{ item.text }}</span>
        </li>
      </ul>
    </div>
    <div class="error">
      <h3 class="label">错误示例</h3>
      <ul class="error_list">
        <li
          v-for="item, i of errorExampleList"
          :key="i" 
          class="error_list_item"
        >
          <img :src="item.icon" class="error_list_item_icon" />
          <span class="error_list_item_tx">{{ item.text }}</span>
        </li>
      </ul>
    </div>
    <div class="notice">
      <h3 class="label">注意事项</h3>
      <p class="notice_tx notice_strong">1、拍照前，先检查本手机使用后置摄像头拍摄照片的像素大小是否满足≤4096*4096，如果不满足，则需要换台手机进行拍照。</p>
      <p class="notice_tx">2、文件格式：jpg</p>
      <p class="notice_tx">3、人脸部分：<span class="notice_strong">人脸高度约占整张照片一半</span>，人脸不可占满整张照片。</p>
      <p class="notice_tx">4、光照和遮挡：对焦，室内光线明亮，室外注意强光、逆光，人脸阴阳脸问题，<span class="notice_strong">人脸五官均清晰可见、额头、眉毛、耳朵无遮挡</span>。</p>
      <p class="notice_tx">5、背景色：最好白色，其他纯色也行，不干扰人脸即可</p>
      <p class="notice_tx">6、姿态：<span class="notice_strong">正面照（参考身份证证件照）</span>。</p>
      <p class="notice_tx">7、其他要求：近期照片、无翻拍、无口罩、无化妆、无美颜、无夸张表情。</p>
    </div>
    <div class="photo_footer">
      <div 
        class="photo_footer_btn" 
        :class="{ shade: countDown }"
        @click="handleNext"
      >下一步（{{ countDown }}s）</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  components: {},
  data() {
    return {
      countDown: '',
      // 正确示例
      correctList: [
        { text: '正面照' },
        { text: '无遮挡' },
        { text: '清晰' }
      ],
      // 错误示例
      errorExampleList: [
        {
          text: '低头',
          icon: require('@/assets/images/smartSport/picture/dt_icon.png')
        },
        {
          text: '抬头',
          icon: require('@/assets/images/smartSport/picture/tt_icon.png')
        },
        {
          text: '侧头',
          icon: require('@/assets/images/smartSport/picture/ct_icon.png')
        },
        {
          text: '戴口罩',
          icon: require('@/assets/images/smartSport/picture/dkz_icon.png')
        },
        {
          text: '表情夸张',
          icon: require('@/assets/images/smartSport/picture/bqkz_icon.png')
        },
        {
          text: 'P图',
          icon: require('@/assets/images/smartSport/picture/pt_icon.png')
        },
        {
          text: '模糊',
          icon: require('@/assets/images/smartSport/picture/mh_icon.png')
        },
        {
          text: '黑白照',
          icon: require('@/assets/images/smartSport/picture/hbz_icon.png')
        },
      ]
    }
  },
  computed: {
    storeSchoolId() {
      return this.$store.state.schoolId
    }
  },
  created() {
    this.handleCountDown()
  },
  methods: {
    // 倒计时
    handleCountDown() {
      let countDown = 3
      this.countDown = countDown
      let timer = setInterval(() => {
        countDown--
        this.countDown = countDown
        if (countDown <= 0) {
          clearInterval(timer)
        }
      }, 1000)
    },

    // 跳转选择班级页面
    handleNext() {
      if (this.countDown) return
      const query = this.$route.query || {}
      if (!query.schoolId) query.schoolId = this.storeSchoolId
      this.$router.push({
        name: 'smartSport_selectClass',
        query
      })
    }
  },
}
</script>

<style scoped lang="less">
.photo {
  height: calc(~'100% - 60px');
  background: #fff;
  padding: 36px 16px;
  box-sizing: border-box;
  overflow: auto;
  .correct {
    display: flex;
    flex-direction: column;
    align-items: center;
    &_icon {
      width: 120px;
      height: 140px;
    }
    &_list {
      margin-top: 16px;
      display: flex;
      align-items: center;
      &_item {
        display: flex;
        align-items: center;
        &:not(:first-child) {
          margin-left: 24px;
        }
        &_tx {
          margin-left: 4px;
          color: #8CC152;
          font-size: 16px;
          font-weight: 600;
          line-height: 24px;
        }
      }
    }
  }
  .error {
    margin-top: 24px;
    &_list {
      display: flex;
      flex-wrap: wrap;
      &_item {
        margin: 12px 0 0 8px;
        width: calc(~'25% - 6px');
        display: flex;
        flex-direction: column;
        align-items: center;
        &:nth-child(4n + 1) {
          margin-left: 0;
        }
        &_icon {
          width: 48px;
          height: 48px;
        }
        &_tx {
          margin-top: 6px;
          color: #646566;
          font-size: 14px;
          line-height: 22px;
        }
      }
    }
  }
  .notice {
    margin-top: 24px;
    font-size: 14px;
    line-height: 22px;
    &_tx {
      color: #646566;
    }
    &_strong {
      color: #F76260;
      font-weight: 600;
    }
  }
  &_footer {
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
      opacity: 1;
      background: #8CC152;
      color: #fff;
      font-size: 14px;
      &.shade {
        opacity: 0.5;
      }
    }
  }
  .label {
    color: #323233;
    font-weight: 600;
    font-size: 14px;
    line-height: 22px;
  }
}
</style>