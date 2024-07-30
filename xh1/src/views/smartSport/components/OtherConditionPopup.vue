<template>
  <div class="picker">
    <div class="picker-label" @click="showPopup">
      <span class="label">其他条件</span>
      <span class="icon icon-down"></span>
    </div>
    <van-popup
      v-model="popupVisible"
      round
      :close-on-click-overlay="false"
      position="bottom"
      @opened="opened"
    >
      <div class="picker-header">
        <div class="text-cancel" @click="closePopup">取消</div>
        <div class="text-title">其他条件</div>
        <div class="text-confirm" @click="confirmPopup">确认</div>
      </div>
      <div class="picker-condition">
        <div
          v-for="item in conditionList"
          :key="item.code"
          class="condition-item"
        >
          <div class="condition-item_title">{{ item.name }}</div>
          <van-radio-group v-model="item.value" :disabled="item.disabled">
            <van-radio
              :name="data.value"
              v-for="data in item.dataList"
              :key="data.value"
              :class="{'radio_active': data.value === item.value}"
            >
              {{ data.label }}
            </van-radio>
          </van-radio-group>
        </div>
      </div>
    </van-popup>
  </div>

</template>
<script>
import { RadioGroup, Radio } from "vant";

import { cloneDeep } from "lodash";
export default {
  name: "",
  components: {
    vanRadioGroup: RadioGroup,
    vanRadio: Radio,
  },
  mixins: [],
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    // 用于展示的数据列表
    dataList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      popupVisible: false,
      conditionList: []
    };
  },
  computed: {

  },
  watch: {
  },
  created() {
  },
  mounted() {
    // init()
  },
  methods: {
    init() {
      const defaultConditionList = cloneDeep(this.dataList)
      this.emitData(defaultConditionList)
    },
    showPopup() {
      this.popupVisible = true;
    },
    closePopup() {
      this.popupVisible = false
    },
    confirmPopup() {
      this.popupVisible = false
      this.emitData();
      this.$emit('change')
    },
    opened() {
      this.conditionList = cloneDeep(this.dataList)
    },
    // 对外更新值
    emitData(list) {
      const resList = list || this.conditionList
      this.$emit("update:dataList", resList);
    },
  },
};
</script>
<style lang="less" scoped>

.mixin-overflow-hidden {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.picker {
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
  &-condition {
    min-height: 480px;
    padding: 12px 16px;
    .condition-item {
      &_title {
        color: #323233;
        font-family: "PingFang SC";
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 8px;
      }
      /deep/.van-radio-group {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 8px;
      }
      /deep/.van-radio {
        display: flex;
        justify-content: center;
        padding: 6px 0;
        border-radius: 4px;
        background: #f6f7f9;
        color: #646566;
        font-family: "PingFang SC";
        font-size: 14px;
        &.radio_active {
          position: relative;
          font-family: "PingFang SC";
          font-size: 14px;
          font-weight: 600;
          border-radius: 4px;
          background: rgba(140, 193, 82, 0.10);
          &::after {
            content: "";
            position: absolute;
            box-sizing: border-box;
            border-radius: 4px;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: 1px solid  @button-primary-active-bg-color
          }
          .van-radio__label {
            color:  @button-primary-active-bg-color
          }
        }
        .van-radio__icon {
          display: none;
        }
        .van-radio__label {
          margin-left: 0;
        }
      }
    }
    .condition-item + .condition-item {
      margin-top: 16px;
    }
  }
}
</style>
