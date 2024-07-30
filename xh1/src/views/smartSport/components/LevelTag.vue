<!--
 * @Author: caiyf
 * @Date: 2024-04-18 11:03:32
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-04-22 10:02:00
 * @Description:
 * @FilePath: \mobile\mhealth\src\views\smartSport\components\LevelTag.vue
-->
<template>
  <div :class="[
    'level-tag',
    type, !plain ? 'solid' : '',
    hasBorder ? 'border' : ''
  ]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: ''
    },
    // 是否空心
    plain: {
      type: Boolean,
      default: true
    },
    hasBorder: Boolean
  },
  computed: {},
  data() {
    return {

    };
  },
};
</script>

<style lang="less" scoped>
.level-tag {
  & ~ .level-tag {
    margin-left: 4px;
  }
  display: inline-block;
  color: #646566;
  padding: 0 4px;
  text-align: center;
  font-size: 12px;
  line-height: 20px;
  border-radius: 4px;
  background: #F7F8FA;
  &.success {
    color: #8CC152;
    background: #F3F9EE;
    &.border {
      border: 1px solid #8CC152;
    }
    &.solid {
      background: #8CC152;
    }
  }
  &.primary {
    color: #10AEFF;
    background: #E7F7FF;
    &.border {
      border: 1px solid #10AEFF;
    }
    &.solid {
      background: #10AEFF;
    }
  }
  &.warning {
    color: #A163C7;
    background: #F6EFF9;
    &.border {
      border: 1px solid #A163C7;
    }
    &.solid {
      background: #A163C7;
    }
  }
  &.danger {
    color: #F76260;
    background: #FEEFEF;
    &.border {
      border: 1px solid #F76260;
    }
    &.solid {
      background: #F76260;
    }
  }
  &.solid {
    color: #fff;
  }
  &.border {
    background: #fff;
    border: 1px solid #646566;
  }
}
</style>
