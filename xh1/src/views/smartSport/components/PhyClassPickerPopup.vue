<template>
  <div class="class-picker">
    <div class="class-picker-label" @click="showPopup">
      <span class="label">{{ placeholderText }}</span>
      <span class="icon icon-down"></span>
    </div>
    <van-popup
      v-model="popupVisible"
      round
      :close-on-click-overlay="false"
      position="bottom"
    >
      <div class="class-picker-header">
        <div class="text-cancel" @click="closePopup">取消</div>
        <div class="text-title">{{title}}</div>
        <div class="text-confirm" @click="confirmPopup">确认</div>
      </div>
      <van-picker
        ref="$picker"
        :show-toolbar="false"
        v-bind="$attrs"
      >
        <template #option=data>{{data[valuekey]}}</template>
      </van-picker>
    </van-popup>
  </div>
</template>
<script>
import { Picker , Popup } from "vant";
export default {
  name: "",
  components: {
    vanPicker: Picker ,
    vanPopup: Popup,
  },
  mixins: [],
  model: {
    prop: "value",
    event: "confirm",
  },
  props: {
    title: {
      type: String,
      default: "选择班级",
    },
    value: {
      type: [String, Array],
      default: "",
    },
    placeholder: {
      type: String,
      default: "请选择",
    },
    // 选项对象中，选项文字对应的键名
    valuekey: {
      type: String,
      default: "name",
    },
    // 是否初始化,初始化默认第一个选项
    needInit: {
      type: Boolean,
      default: true,
    },
    // 是否只显示最后一个值的label
    isOnlyShowLastValue: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      popupVisible: false,
      placeholderText: "请选择",
      resValue: ""
    };
  },
  computed: {
  },
  watch: {},
  created() {
  },
  mounted() {
  },
  methods: {
    showPopup() {
      this.popupVisible = true;
    },
    closePopup() {
      this.popupVisible = false;
    },
    // 初始化
    init() {
      // 初始化默认值
      if (this.needInit) {
        const defaultResValue = this.geInitDefault(this.$attrs.columns)
        this.resValue = defaultResValue
        this.$emit("confirm", this.resValue);
        // 更新提示文字
        this.updatePlaceholderText();
      }
    },
    // 确认弹窗
    confirmPopup(value) {
      this.resValue = this.$refs.$picker && this.$refs.$picker.getValues() || value || ''
      this.$emit("confirm", this.resValue);
      // 更新提示文字
      this.updatePlaceholderText();
      // 关闭弹窗
      this.closePopup();
      // 对外通知
      this.$emit('change', this.resValue)
    },
    updatePlaceholderText() {
      let bool = this.resValue && this.resValue.length
      if (!bool) return this.placeholderText = this.placeholder
      if (this.isOnlyShowLastValue) {
        this.placeholderText = this.resValue[this.resValue.length - 1][this.valuekey]
      } else {
        this.placeholderText = this.resValue.map(v => v[this.valuekey]).join('')
      }

    },
    // 获取默认的初始值,每列的第一个
    geInitDefault(list) {
      let resList = []
      const fn = (list) => {
        if (!list && !list.length) {
          return []
        }
        resList.push(list[0])
        // 递归处理子元素
        return list[0] && list[0].children && list[0].children.length ?
        fn(list[0].children) : resList
      }
      return fn(list)
    }
  },
};
</script>
<style lang="less" scoped>
.mixin-overflow-hidden {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.class-picker {
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
      margin-right: 8px;
    }
    .icon {
      display: inline-block;
      width: 0;
      height: 0;
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      border-top: 4px solid #dcdee0;
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
}
</style>
