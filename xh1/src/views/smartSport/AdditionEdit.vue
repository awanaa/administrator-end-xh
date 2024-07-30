<!--
 * @Author: xiejh 1415413020@qq.com
 * @Date: 2024-04-12 14:11:03
 * @LastEditors: xiejh 1415413020@qq.com
 * @LastEditTime: 2024-04-23 09:46:11
 * @FilePath: \portal\mhealth\src\views\smartSport\AdditionDetail.vue
 * @Description: 补录编辑
-->
<template>
  <div class="addition">
    <div class="addition-edit">
      <div class="addition-edit_header">{{ title }}</div>
      <div v-if="!isShowResult" class="addition-edit_info">
        <div>{{ detailData.className || "-" }}</div>
        <div>{{ detailData.userName || "-" }}</div>
      </div>
      <div class="addition-edit_main" :class="{'no-pt': isShowResult}">
        <template v-if="!isShowResult">
          <van-field
            v-model="form.minuteNum"
            placeholder="请输入"
            type="digit"
            label="分"
            :formatter="(val) => formatter(val, 59)"
          />
          <van-field
            v-model="form.secondNum"
            placeholder="请输入"
            type="digit"
            label="秒"
            :formatter="(val) => formatter(val, 59)"
          />
          <van-field
            v-model="form.millisNum"
            placeholder="请输入"
            type="digit"
            label="毫秒"
            :formatter="(val) => formatter(val, 999)"
          />
        </template>
        <div v-else class="result-wrap">
          <div class="result-content">
            <div>{{ detailData.className || "-" }}</div>
            <div>{{ detailData.userName || "-" }}</div>
            <div>{{ detailData.sportName || "-" }}</div>
          </div>
          <div class="result-tips">提示：确定后，补录成绩不可修改</div>
        </div>
      </div>
      <div></div>
      <div class="addition-edit_footer">
        <van-button type="default" @click="handleCancel">取消</van-button
        >
        <van-button
          :loading="loading"
          :loading-text="loading ? '提交中' : ''"
          type="primary"
          @click="handleConfirm"
        >确定</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { Button, Field, Toast } from "vant";

export default {
  components: {
    vanButton: Button,
    vanField: Field,
  },
  filters: {},
  props: {
    // 补录详情
    detailData: {
      type: Object,
      default: () => ({}),
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  watch: {},
  computed: {
    title() {
      // 默认展示运动名称
      const defaultTitle =
        (this.detailData && this.detailData.sportName) || "-";

      return this.isShowResult
        ? `确定补录成绩为${this.form.minuteNum || 0}分${this.form.secondNum || 0}秒${this.form.millisNum || 0}毫秒？`
        : defaultTitle;
    },
  },
  data() {
    return {
      // 分,秒,毫秒
      form: {
        minuteNum: "",
        secondNum: "",
        millisNum: "",
      },
      // 展示二次确认结果
      isShowResult: false,
    };
  },
  mounted() {},
  methods: {
    // 输入格式，超过最大值，回显最大值
    formatter(val, max) {
      if (val > max) {
        return max;
      }
      return val;
    },
    // 校验表单
    validForm() {
      return (
        this.form.minuteNum + this.form.secondNum + this.form.millisNum > 0
      );
    },
    // 取消
    handleCancel() {
      if (!this.isShowResult) {
        this.$emit("cancel");
        return;
      }
      this.isShowResult = !this.isShowResult
    },
    handleConfirm() {
      // 已经确认, 提交数据
      const { minuteNum, secondNum, millisNum} = this.form
      const resObj = {
        minuteNum: minuteNum || 0,
        secondNum: secondNum || 0,
        millisNum: millisNum || 0,
      }
      if (this.isShowResult) {
        this.$emit("confirm", resObj, this.detailData);
        return;
      }
      // 未确认, 展示待确认结果
      if (!this.isShowResult && !this.validForm()) {
        Toast("成绩必须大于0");
        return;
      }
      this.isShowResult = true;
    },
  },
};
</script>

<style lang="less" scoped>
.addition {
  width: calc(~"100vw - 48px");
  height: auto;
  &-edit {
    margin: 0 24px;
    border-radius: 8px;
    background-color: #fff;
    &_header {
      padding: 12px 0;
      color: var(--NeutralColor-G9-, #323233);
      text-align: center;
      font-family: "PingFang SC";
      font-size: 16px;
      font-weight: 600;
    }
    &_info {
      display: flex;
      padding: 8px 0;
      justify-content: space-around;
      background: #f3f9ee;
      color: @button-primary-active-bg-color;
      font-family: "PingFang SC";
      font-size: 16px;
      font-weight: 600;
    }
    &_main {
      padding: 16px 24px;
      /deep/.van-cell {
        padding: 0 24px;
        height: 48px;
        line-height: 48px;
        border-radius: 8px;
        background: #f7f8fa;
        .van-field__label {
          width: 48px;
          color: #323233;
        }
      }
      .van-cell + .van-cell {
        margin-top: 12px;
      }
      &.no-pt {
        padding-top: 0;
      }
      .result-wrap {
        .result-content {
          display: flex;
          justify-content: space-between;
          color: var(--NeutralColor-G8-, #646566);
          font-family: "PingFang SC";
          font-size: 14px;
        }
        .result-tips {
          margin-top: 8px;
          color: #f60;
          text-align: center;
          font-family: "PingFang SC";
          font-size: 14px;
          border-radius: 4px;
          padding: 4px 0;
          background: #fff0e5;
        }
      }
    }
    &_footer {
      padding: 8px 24px 24px;
      display: flex;
      /deep/.van-button {
        flex: 1;
        border-radius: 1000px;
      }
      /deep/.van-button--primary {
        background: @button-primary-active-bg-color;
        border-color: @button-primary-active-bg-color;
      }
      .van-button + .van-button {
        margin-left: 8px;
      }
    }
  }
}
</style>
