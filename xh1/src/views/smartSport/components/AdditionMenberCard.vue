<template>
  <div class="menber-card">
    <div class="menber-card_left">
      <img :src="detailData.avatarUrl || avatar" alt="" />
    </div>
    <div class="menber-card_center">
      <div class="title">{{detailData.userName}}</div>
      <div class="content">{{detailData.className}}</div>
    </div>
    <div class="menber-card_right">
      <slot>
        <div class="btn-edit" @click="handleAddition">
          <img :src="iconEdit" alt="" />
          <span>补录</span>
        </div>
      </slot>
    </div>
    <div class="menber-card_tag">{{tagText}}</div>
    <div v-if="badgeSrc" class="menber-card_badge">
      <img :src="badgeSrc" alt="" />
    </div>
  </div>
</template>

<script>
import Avatar from '@/assets/images/smartSport/avatar_default.png'
import IconEdit from '@/assets/images/smartSport/icon_edit.png'
export default {
  components: {
  },
  filters: {},
  props: {
    // 右上角标签文字
    tagText: {
      type: String,
      default: ''
    },
    // 左上角徽标
    badgeSrc: {
      type: String,
      default: ''
    },
    detailData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  watch: {},
  computed: {
  },
  data() {
    return {
      avatar: Avatar,
      iconEdit: IconEdit,
    };
  },
  mounted() {},
  methods: {
    /**
     * 添加补录
     */
    handleAddition() {
      this.$emit('additionEdit')
    }
  },
};
</script>

<style lang="less" scoped>
.menber-card {
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  height: 80px;
  box-sizing: border-box;
  padding: 16px;
  &_left {
    display: flex;
    align-items: center;
    img {
      width: 48px;
      height: 48px;
      border-radius: 100%;
    }
  }
  &_center {
    flex: 1;
    margin-left: 12px;
    .title {
      color: #323233;
      font-family: "PingFang SC";
      font-size: 16px;
      font-weight: 600;
    }
    .content {
      color: #969799;
      font-family: "PingFang SC";
      font-size: 14px;
    }
  }
  &_right {
    height: 100%;
    display: flex;
    align-items: center;
    .btn-edit {
      display: flex;
      align-items: center;
      height: 26px;
      box-sizing: border-box;
      padding: 2px 12px;
      color:  @button-primary-active-bg-color;
      font-size: 14px;
      font-weight: 600;
      border-radius: 28px;
      border: 0.5px solid  @button-primary-active-bg-color;
    }
  }
  &_tag {
    position: absolute;
    top: 0;
    right: 0;
    color: #FFF;
    padding: 0 4px;
    font-size: 12px;
    border-radius: 0px 8px;
    background: #969799;
  }
  &_badge {
    position: absolute;
    top: 0;
    left: 2px;
    img {
      width: 24px;
      height: 24px;
    }
  }
}
</style>
