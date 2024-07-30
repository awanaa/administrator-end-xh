<!--
 * @Author: xiejh 1415413020@qq.com
 * @Date: 2024-04-15 15:36:49
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-05-28 09:53:34
 * @FilePath: \mobile\mhealth\src\views\smartSport\PhysicalReview.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="review">
    <div class="review_content">
      <!-- 视频回放 -->
      <template v-if="activeTab === 'video' && videoList.length">
        <div class="review_content_video">
          <video
            v-if="curVideoUrl"
            controls
            :key="videoKey"
            class="review_content_video_video"
          >
            <source
              :src="curVideoUrl"
              type="video/mp4"
            />
            您的浏览器不支持 video 标签。
          </video>
          <div v-else class="uploading">
            <span class="uploading_tx">视频上传中</span>
            <van-button icon="replay" round size="small" @click="handleRetry" class="mt16 uploading_btn">重试</van-button>
          </div>
          <ul class="review_content_video_list">
            <li 
              v-for="item, i of videoList"
              :key="i"
              class="review_content_video_list_item"
              :class="{ active: activeVideo.id === item.id }"
              @click="handleVideoClick(item)"
            ></li>
          </ul>
        </div>
      </template>
      <!-- 图片回放 -->
      <template v-if="activeTab === 'image'">
        <div class="review_content_image">
          <van-swipe
            :loop="false"
            indicator-color="#8CC152"
          >
            <van-swipe-item
              v-for="(image, index) in images"
              :key="index"
              @click.stop="handleImgPreview(index, image)"
            >
              <img v-if="image" :src="image" />
              <div v-else class="uploading img">
                <span class="uploading_tx">图片上传中</span>
                <van-button icon="replay" round size="small" @click.stop="handleRetry(index)" class="mt16 uploading_btn">重试</van-button>
              </div>
            </van-swipe-item>
          </van-swipe>
        </div>
      </template>
    </div>
    <!-- 底部tabs -->
    <div class="review_footer" v-show="showBtnGroup">
      <ul class="review_footer_tabs">
        <li
          v-for="item, i of tabList"
          :key="i"
          class="review_footer_tabs_tab"
          :class="{ active: activeTab === item.value }"
          @click="handleTabClick(item)"
        >
          {{ item.label }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ImagePreview } from "vant";
import BaseEmpty from "@/components/base/BaseEmpty";
import { postByCode } from "@/api/common";
let pictureUrlList = []
export default {
  components: {
    BaseEmpty,
  },
  data() {
    return {
      activeTab: "video", // 当前选中的tab
      tabList: [
        {
          label: "视频回放",
          value: "video",
        },
        {
          label: "图片回放",
          value: "image",
        },
      ],
      images: [], // 图片列表
      videoList: [], // 视频列表
      activeVideo: {}, // 当前选中的视频
      // 轮播图下标指引
      swipeIndexTip: "",
      videoKey: new Date().getTime()
    };
  },
  computed: {
    schoolId() {
      return this.$store.state.schoolId
    },
    showBtnGroup() {
      return this.$route.query.hasBtnGroup
    },
    // 当前视频播放地址
    curVideoUrl() {
      let item = this.activeVideo
      console.log('item: 当前视频', item);
      if (item.extranetParams && item.extranetParams.downloadUrl) return item.extranetParams.downloadUrl
      if (item.showType === 1 && item.publicPlayback) return item.publicPlayback
      return false
    }
  },
  mounted() {
    this.getUrlInfo()
  },
  methods: {
    // 重试
    handleRetry(index) {
      const toast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true
      });
      const picObj = pictureUrlList.find((v, i) => {
        if (i === index) return true
      }) || {};
      let isVideo = this.activeTab === 'video'
      this.postByCode('I_DATA_KS_SPORTS_SYNCKSMEDIA', {
        schoolId: this.schoolId,
        scoreId: this.activeVideo.scoreId,
        operateType: isVideo ? 1 : 2, // 操作类型: 1. 操作视频, 2. 操作图片, 3. 操作视频和图片
        fileUrls: [isVideo ? this.activeVideo.publicPlayback : picObj.pictureUrl]
      }).then(res => {
        if (!res.status) return this.$toast.fail(res.resmsg)
        this.$toast(res.resmsg)
      }).finally(() => {
        toast.clear()
      })
    },

    // 点击tab
    handleTabClick(data) {
      if (this.activeTab === data.value) return
      this.activeTab = data.value
    },

    // 切换视频
    handleVideoClick(data) {
      this.activeVideo = data
      this.videoKey = new Date().getTime()
    },

    // 图片预览
    handleImgPreview(index, imgUrl) {
      if (!imgUrl) return
      let images = this.images.map(v => {
        return v || require('@/assets/images/smartSport/placeholder_img_bg.png')
      })
      ImagePreview({
        images: images,
        startPosition: index,
        swipeDuration: 300,
        closeable: true
      });
    },
    // 获取抓拍图片,视频回放列表
    async getUrlInfo() {
      const toast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true
      });
      let { resmsg, status, data } = await postByCode(
        "I_DATA_KS_SPORTS_SCORE_GETPLAYBACKANDPICTURE",
        {
          schoolId: this.schoolId,
          scoreId: this.$route.query.id || ''
        }
      );
      if (!status) {
        this.$vux.alert.show({
          title: "错误",
          content: resmsg,
        });
        return;
      }
      toast.clear();
      const { pictureDtos, playbackDtos } = data;
      pictureUrlList = pictureDtos || [];
      // 抓拍图片
      (pictureDtos || []).forEach(v => {
        if (v.extranetPlayback) {
          this.images.push(v.extranetPlayback)
        } else if (v.showType === 1 && v.pictureUrl) {
          this.images.push(v.pictureUrl)
        } else {
          this.images.push('')
        }
      });
      // 视频地址
      // (playbackDtos || []).forEach(v => {
      //   let url = ''
      //   // showType 1使用内网方式 2使用公网方式
      //   if (v.showType === 1) {
      //     url = this.addRandom(v.publicPlayback)
      //   } else if (v.showType === 2 && v.extranetParams) {
      //     url = this.addRandom(v.extranetParams.downloadUrl)
      //   }
      //   url && this.videoList.push(url)
      // });
      // 视频列表
      this.videoList = playbackDtos || []
      this.activeVideo = this.videoList && this.videoList[0] || {}
    },

    // 添加随机数
    addRandom(url) {
      if (!url) return false
      let random = new Date().getTime() + '' + Math.ceil(Math.random() * 1000)
      if (url.includes('?')) {
        url += `&${random}`
      } else {
        url += `?${random}`
      }
      return url
    }
  },
};
</script>

<style lang="less" scoped>
.review {
  height: inherit;
  background-color: #575859;
  &_content {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: calc(~"100vh - 64px");
    overflow: auto;
    &_video {
      width: 100%;
      height: 330px;
      &_video {
        width: 100%;
        height: 100%;
      }
      &_list {
        margin-top: 48px;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        &_item {
          width: 80px;
          height: 100%;
          background: url('~@/assets/images/smartSport/bg_video_play.png') no-repeat;
          background-size: 100% 100%;
          border-radius: 4px;
          opacity: 0.5;
          &.active {
            opacity: 1;
          }
          &:not(:first-child) {
            margin-left: 12px;
          }
        }
      }
    }

    &_image {
      width: 100%;
      height: 280px;
      /deep/ .van-swipe {
        height: 100%;
      }
      /deep/ .van-swipe-item {
        height: unset;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: fill;
      }
    }
  }

  &_footer {
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 16px;
    padding: 0 16px;
    box-sizing: border-box;
    &_tabs {
      width: 100%;
      height: 32px;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      border: 1px solid #8CC152;
      border-radius: 2px;
      &_tab {
        flex: 1;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #fff;
        color: #8CC152;
        font-size: 14px;
        line-height: 22px;
        &.active {
          background: #8CC152;
          color: #fff;
        }
      }
    }
  }

  .mt16 {
    margin-top: 16px;
  }
  .uploading {
    width: 100%;
    height: 210px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: url('~@/assets/images/smartSport/placeholder_video_bg.png') no-repeat;
    background-size: 100% 100%;
    &.img {
      height: 100%;
      background-image: url('~@/assets/images/smartSport/placeholder_img_bg.png');
    }
    &_tx {
      color: #fff;
      font-size: 20px;
      font-weight: 600;
      line-height: 28px;
    }
    &_btn {
      width: 100px;
    }
  }
}

</style>
