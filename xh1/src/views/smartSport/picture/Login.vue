<!--
 * @Author: caiyf
 * @Date: 2024-05-06 17:56:53
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-05-14 10:49:12
 * @Description: 登录页面 
 * @FilePath: \mobile\mhealth\src\views\smartSport\picture\Login.vue
-->
<template>
  <div class="login">
    <img src="@/assets/images/smartSport/picture/logo.png" class="login_logo" />
    <div class="login_tx">登录账号</div>
    <div class="login_tx2">登录后进行学生人脸采集，将用于体测检录</div>
    <div class="login_form">
      <van-field 
        v-model="form.mobile"
        placeholder="请输入手机号"
      />
      <van-field 
        v-model="form.code"
        placeholder="请输入验证码"
        class="login_form_code"
      >
        <template #button>
          <span 
            class="login_form_code_tx" 
            :class="{ valid: isValid }"
            @click="getVerificationCode"
          >{{ codeTx }}</span>
        </template>
      </van-field>
      <div class="login_form_btn" @click="handleLogin">登录</div>
    </div>
  </div>
</template>

<script>
import { querystring } from 'vux'
import { postByUrl } from '@/api/common'
export default {
  props: {},
  components: {},
  data() {
    return {
      form: {
        mobile: '', // 账号
        code: '' // 验证码
      },
      codeTx: '获取验证码',
      isValid: false
    }
  },
  computed: {},
  created() {},
  methods: {
    handleLogin() {
      if (!this.isValidMobile(this.form.mobile)) return this.$toast.fail('请输入正确的手机号')
      if (!this.form.code) return this.$toast.fail('请输入验证码')
      let urlParams = querystring.parse();
      let params = {
        mobile: this.form.mobile,
        validateCode: this.form.code,
        type: 1,
        appid: urlParams.appid || urlParams.wxcid
      }
      const toast = this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
      })
      postByUrl("/oauth/validateSmsCodeAndBind", params).then((json) => {
        if (json.status === false || json.data !== true) return this.$toast.fail(json.resmsg)
        // 服务号绑定账号流程，验证用户并绑定，设置登录用户信息--返回跳转路径
        if (urlParams.return_url) {
          location.replace(urlParams.return_url);
        } else {
          location.replace(json.redirectUrl);
        }
      }).finally(() => {
        toast.clear()
      })
    },

    // 获取验证码
    async getVerificationCode() {
      if (this.isValid) return
      this.isValid = true
      let time = 60
      this.codeTx = `${time}s后重新获取`
      let timer = setInterval(() => {
        time--;
        this.codeTx = `${time}s后重新获取`
        if (time === 0) { // 倒计时结束
          clearInterval(timer)
          this.codeTx = '获取验证码'
          this.isValid = false
        }
      }, 1000)
      const bool = await this.getCode()
      if (!bool) {
        this.codeTx = '获取验证码'
        this.isValid = false
        clearInterval(timer)
        timer = null
      }
    },

    // 验证手机号
    isValidMobile(textval) {
      const urlregex = /^1\d{10}$/
      return urlregex.test(textval)
    },

    // 获取手机验证码
    getCode() {
      if (!this.isValidMobile(this.form.mobile)) return this.$toast.fail('手机号格式不正确')
      const toast = this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
      });
      return postByUrl("/bill/sendSmsCode", {
        mobile: this.form.mobile,
        type: 1
      }).then(res => {
        if (!res.data) {
          this.$toast.fail(res.resmsg)
          return false
        }
        this.$toast("验证码发送成功")
        return true
      }).finally(() => {
        toast.clear()
      })
    },
  },
}
</script>

<style scoped lang="less">
.login {
  height: inherit;
  background: #fff;
  padding: 36px 24px;
  box-sizing: border-box;
  &_logo {
    width: 48px;
    height: 48px;
  }
  &_tx {
    margin-top: 12px;
    color: #323233;
    font-size: 20px;
    font-weight: 600;
    line-height: 28px;
  }
  &_tx2{
    margin-top: 4px;
    color: #969799;
    font-size: 14px;
    line-height: 22px;
  }
  &_form {
    margin-top: 24px;
    /deep/ .van-cell {
      background: #F7F8FA;
    }
    &_code {
      margin-top: 12px;
      &_tx {
        color: #8CC152;
        font-size: 14px;
        line-height: 22px;
        &.valid {
          color: #969799;
        }
      }
    }
    &_btn {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 44px;
      border-radius: 4px;
      background: #8CC152;
      color: #fff;
      font-size: 14px;
      margin-top: 24px;
    }
  }
}
</style>