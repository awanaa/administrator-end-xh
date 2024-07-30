<template>
  <div class="date-picker">
    <div class="date-picker-label" @click="showPopup">
      <span class="label">{{placeholderText}}</span>
      <span class="icon icon-down"></span>
    </div>
    <van-popup
      v-model="popupVisible"
      round
      :close-on-click-overlay="false"
      position="bottom"
      @opened="opened"
    >
      <div class="date-picker-header">
        <div class="text-cancel" @click="closePopup">取消</div>
        <div class="text-title">选择日期</div>
        <div class="text-confirm" @click="confirmPopup">确认</div>
      </div>
      <div class="date-picker-tab">
        <div
          class="date-picker-tab_item"
          :class="{ 'date-picker-tab_item_active': index === activeTabIndex }"
          v-for="(item, index) in tabList"
          :key="index"
          @click="handleTabClick(index)"
        >
          {{ item }}
        </div>
      </div>
      <transition name="fade">
        <van-datetime-picker
          ref="$dateTimePicker"
          v-if="showDate"
          v-model="dateResValue"
          :show-toolbar="false"
          v-bind="$attrs"
        >
        </van-datetime-picker>
      </transition>

    </van-popup>
  </div>

</template>
<script>
import { DatetimePicker, Popup } from "vant";
const dayjs = require("dayjs");
export default {
  name: "",
  components: {
    vanDatetimePicker: DatetimePicker,
    vanPopup: Popup,
  },
  mixins: [],
  model: {
    prop: "value",
    event: "confirm",
  },
  props: {
    value: {
      type: String,
      default: "",
    },
    // 指定输入框的显示格式
    format: {
      type: String,
      default: ' YYYY-MM-DD',
    },
  },
  data() {
    return {
      tabList: ['全部日期', '选择某天'],
      activeTabIndex: 0,
      popupVisible: false,
      // 内部与日期绑定值, 同时作为组件最终结果值
      dateResValue: '',
      placeholderText: '全部日期'
    };
  },
  computed: {
    // 是否展示选择日期
    showDate() {
      return this.activeTabIndex === 1
    },
  },
  watch: {
    value: {
      handler: function (newVal) {
        this.dateResValue = newVal && new Date(newVal) || ''
        this.updatePlaceholderText()
      },
      immediate: false
    }
  },
  created() {
    // 初始化
    this.dateResValue = this.value && new Date(this.value) || ''
  },
  mounted() {
  },
  methods: {
    /**
     * 打开弹窗
     */
    opened() {
      this.$nextTick(() => {
        this.activeTabIndex = this.value ? 1 : 0
        // 待优化: 如果传入回显的日期不在最小-最大日期之间则为无效日期, 此时应有提示或者默认回显到当前日期
        this.dateResValue = this.value && new Date(this.value) || ''
      })
    },
    showPopup() {
      this.popupVisible = true
    },
    closePopup() {
      this.activeTabIndex = 0
      this.popupVisible = false
    },
    /**
     * 确认日期
     */
    confirmPopup() {
      if (this.activeTabIndex === 1 && !this.dateResValue) {
        this.dateResValue = this.$refs.$dateTimePicker.getPicker().getValues()
      }
      // 对外更新
      const formatDateResValue = this.dateResValue && dayjs(this.dateResValue).format(this.format) || ''
      this.$emit("confirm", formatDateResValue);
      // 关闭弹窗
      this.closePopup();
      this.$emit('change', formatDateResValue)
    },
    /**
     * 切换日期类型
     */
    handleTabClick(index) {
      // 重置已选的日期
      this.activeTabIndex = index
      if (index === 0) {
        // 全部日期
        this.dateResValue = ''
      }
    },
    /**
     * 提示文字
     */
    updatePlaceholderText() {
      this.placeholderText = this.dateResValue && dayjs(this.dateResValue).format(this.format) || '全部日期'
    }
  },
};
</script>
<style lang="less" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.mixin-overflow-hidden {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.date-picker {
  background-color: #fff;
  &-label {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 12px;
    color: #323233;
    font-family: "PingFang SC";
    font-size: 14px;
    box-sizing: border-box;
    .mixin-overflow-hidden;
    .label {
      .mixin-overflow-hidden;
      text-align: center;
      margin-right: 8px;
    }
    .icon {
      display: inline-block;
      width: 0;
      height: 0;
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      border-top: 4px solid #DCDEE0;
    }
  }
  &-header {
    display: flex;
    justify-content: space-between;
    padding: 16px;
    .text-cancel {
      color: #646566;
    }
    .text-title {
      color: #323233;
      font-weight: 600;
      font-size: 16px;
    }
    .text-confirm {
      color: @button-primary-active-bg-color;
    }
  }
  &-tab {
    display: flex;
    padding: 12px 16px;
    &_item {
      flex: 1;
      padding: 6px 12px;
      border-radius: 4px;
      text-align: center;
      color: #646566;
      background: #f6f7f9;
      &_active {
        border-radius: 4px;
        border: 1px solid  @button-primary-active-bg-color;
        background: rgba(140, 193, 82, 0.10);
        color:  @button-primary-active-bg-color;
        font-family: "PingFang SC";
        font-size: 14px;
        font-weight: 600;
      }
    }
    &_item + &_item {
      margin-left: 8px;
    }
  }
}

</style>
