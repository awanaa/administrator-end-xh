<template>
  <van-popup
    v-model="showPopup"
    round
    :close-on-click-overlay="false"
    position="bottom"
  >
    <div class="date-picker-header">
      <div class="text-cancel" @click="closePopup">取消</div>
      <div class="text-title">选择日期</div>
      <div class="text-confirm" @click="confirmPopup">确认</div>
    </div>
    <div class="date-picker-tab">
      <div
        class="date-picker-tab_item"
        :class="{ 'date-picker-tab_item_active': index === tabIndex }"
        v-for="(item, index) in tabList"
        :key="index"
        @click="handleTabClick(index)"
      >
        {{ item.label }}
      </div>
    </div>
    <transition name="fade">
      <van-datetime-picker
        v-if="showDate"
        ref="$datePicker"
        :show-toolbar="false"
        v-bind="{
          ...attrsProps,
        }"
      >
      </van-datetime-picker>
    </transition>

  </van-popup>
</template>
<script>
import { DatetimePicker, Popup } from "vant";
import { DATE_TAB_LIST } from "@/constants/smartSport/common.js";
export default {
  name: "",
  components: {
    vanDatetimePicker: DatetimePicker,
    vanPopup: Popup,
  },
  mixins: [],
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    attrsProps: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      tabList: DATE_TAB_LIST,
      tabIndex: 0,
      dateValue: '',
    };
  },
  computed: {
    showPopup: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", val);
      },
    },
    // 是否展示选择日期
    showDate() {
      return this.tabIndex === 1
    },
    dateResValue() {
      // 最终结果
      return this.tabIndex === 1 ? this.dateValue : '';
    }
  },
  watch: {},
  mounted() {},
  methods: {
    closePopup() {
      this.$emit("update:visible", false);
    },
    confirmPopup() {
      this.closePopup();
      // 获取时间并根据格式进行转化抛出
      const dateValue = this.getResultArr()
      this.dateValue = dateValue &&  dateValue.join('-') || ''
      this.emitData()
    },
    handleTabClick(index) {
      // 重置已选的日期
      this.tabIndex = index
    },
    // 获取选择的日期
    getResultArr() {
      return this.$refs.$datePicker && this.$refs.$datePicker.getPicker().getValues()
    },
     // 对外更新值
     emitData() {
      this.$emit("confirm", this.dateResValue);
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
.date-picker-header {
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
.date-picker-tab {
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
      border: 1px solid @button-primary-active-bg-color;
      background: rgba(140, 193, 82, 0.10);
      color: @button-primary-active-bg-color;
      font-family: "PingFang SC";
      font-size: 14px;
      font-weight: 600;
    }
  }
  &_item + &_item {
    margin-left: 8px;
  }
}
</style>
