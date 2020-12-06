<template>
  <div class="login-container">

    <el-form
      ref="loginForm"
      :model="loginForm"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >

      <div class="title-container">
        <h3 class="title">欢迎使用 codespace</h3>
      </div>

      <div id="loginForm">

        <el-form-item v-if="loginType==='email'||loginType==='forget'" prop="email">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="email"
            v-model="loginForm.email"
            placeholder="邮箱"
            name="email"
            type="text"
            tabindex="1"
            autocomplete="on"
          />
        </el-form-item>

        <el-form-item v-if="loginType==='email'||loginType==='forget'" prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="密码"
            name="password"
            tabindex="2"
            autocomplete="on"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>

        <el-form-item v-if="loginType==='register'" prop="nickname">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="nickname"
            v-model="loginForm.nickname"
            placeholder="昵称"
            name="nickname"
            type="text"
            tabindex="1"
            autocomplete="off"
          />
        </el-form-item>

        <el-form-item v-if="loginType==='register'" prop="newPassword">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="newPassword"
            v-model="loginForm.newPassword"
            :type="passwordType"
            placeholder="密码"
            name="newPassword"
            tabindex="2"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>

        <el-form-item v-if="loginType==='register'" prop="confirmPassword">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="confirmPassword"
            v-model="loginForm.confirmPassword"
            :type="passwordType"
            placeholder="确认密码"
            name="confirmPassword"
            tabindex="3"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>

        <el-form-item v-if="loginType==='register'" prop="">
          <span class="svg-container">
            <svg-icon icon-class="mobile" />
          </span>
          <el-input
            ref="email"
            v-model="loginForm.email"
            placeholder="邮箱"
            name="email"
            type="text"
            tabindex="4"
            style="width: 150px"
          />
          <el-button style="float: right;height: 29px;margin: 9px 2px" :disabled="leftTime>0" size="mini" @click="getVerifyCode">获取验证码<span v-if="leftTime>0">({{ leftTime }}S)</span></el-button>
        </el-form-item>

        <el-form-item v-if="loginType==='register'" prop="vcode">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            ref="vcode"
            v-model="loginForm.vcode"
            type="text"
            placeholder="验证码"
            name="vcode"
            tabindex="5"
          />
        </el-form-item>

        <el-button
          :loading="loading"
          type="primary"
          style="width:100%;margin-bottom:30px;"
          @click="handleLogin"
        >
          <span v-if="loginType==='forget'">邮箱获取密码</span>
          <span v-else-if="loginType==='register'">注册</span>
          <span v-else-if="loginType==='email'">登录</span>
        </el-button>
      </div>

      <div style="color: gray">
        <span v-if="loginType!=='forget'">
          <el-link @click="loginType='forget'">忘记密码</el-link> |
        </span>
        <span v-if="loginType!=='email'">
          <el-link @click="loginType='email'">邮箱登录</el-link> |
        </span>
        <span v-if="loginType!=='register'">
          <el-link @click="loginType='register'">注册</el-link> |
        </span>
        <span id="public-about">
          <el-link href="#">关于</el-link>
        </span>
      </div>
    </el-form>

    <div id="copyright" style="position: fixed;bottom: 20px;width: 100%">
      <div style="margin: 0 auto;width: 520px;max-width: 100%;text-align: center;color: white;font-size: 12px">
        <p>COPYRIGHT © 2020 <a href="" target="_blank">Tongji Codespace</a>. ALL RIGHTS RESERVED.</p>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        email: '',
        password: '',
        vcode: '',
        newPassword: '',
        confirmPassword: '',
        nickname: ''
      },
      passwordType: 'password',
      loading: false,
      redirect: undefined,
      otherQuery: {},
      loginType: 'email',
      leftTime: 0
    }
  },
  watch: {
  },
  created() {
  },
  mounted() {
    this.checkLeftTime()
  },
  destroyed() {
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },

    handleLogin() {
      if (this.loginType === 'email') {
        console.log('请求登录')
        // const url='http://localhost:8081/';
        const url = 'http://106.15.234.251:8081/'
        this.$axios.post(url + 'login',
          { email: this.loginForm.email, password: this.loginForm.password })
          .then(function(response) {
            const Data = response.data
            const data = Data.data
            if (response.status === 200 && Data.msg === 'success') {
              const uid = data.userid
              const username = data.username
              console.log('Login Success!')

              sessionStorage.setItem('isLogin', true)
              sessionStorage.setItem('userid', uid)

              alert('登录成功！欢迎你，' + username + '！')
              location = '/dashboard'
            } else {
              console.log('Login Fail!')
              var message = data.msg
              alert('登录失败！' + message)
            }
          })
          .catch(function(error) { // 请求失败处理
            console.log(error)
          })
      } else if (this.loginType === 'register') {
        if (sessionStorage.getItem('verifyCode') === this.loginForm.vcode) {
          if (this.loginForm.newPassword === this.loginForm.confirmPassword) {
            // const url='http://localhost:8081/';
            const url = 'http://106.15.234.251:8081/'
            this.$axios.post(url + 'register',
              { 'username': this.loginForm.nickname,
                'password': this.loginForm.newPassword,
                'email': this.loginForm.email })

              .then(function(response) {
                const Data = response.data
                // const data=Data.data;
                if (response.status === 200 && Data.code === 200) {
                  alert('注册成功!')
                  sessionStorage.removeItem('verifyCode')
                  location = '/user/login'
                } else {
                  console.log('注册失败')
                  const msg = Data.msg
                  alert('注册失败' + msg)
                }
              })

              .catch(function(error) { // 请求失败处理
                console.log(error)
              })
          } else {
            console.log('两次密码不一致!')
            alert('两次密码不一致!')
          }
        } else {
          console.log('验证码错误!')
          alert('验证码错误!')
        }
      } else if (this.loginType === 'forget') {
        const url = 'http://106.15.234.251:8081/'
        this.$axios.get(url + 'getPasswordByEmail',
          { params: { email: this.loginForm.email }})
          .then((response) => {
            const data = response.data
            console.log(data.msg)
            alert(data.msg)
          })
      }
    },
    getVerifyCode: function() {
      console.log('申请邮箱验证码')

      // const url='http://localhost:8081/';
      const url = 'http://106.15.234.251:8081/'
      this.$axios.post(url + 'getVerifyCode',
        { email: this.loginForm.email })
        .then(function(response) {
          const Data = response.data
          const data = Data.data
          if (response.status === 200 && Data.code === 200) {
            sessionStorage.setItem('verifyCode', data.verifyCode)
            console.log('验证邮箱已发送!')
          } else {
            console.log('Get Fail!')
            var msg = data.msg
            alert('验证码获取失败！' + msg)
          }
        })
        .catch(function(error) { // 请求失败处理
          console.log(error)
        })
    },
    checkLeftTime() {
      if (this.leftTime > 1) {
        this.leftTime -= 1
      } else {
        this.leftTime = 0
      }
      setTimeout(this.checkLeftTime, 1000)
    }
  }
}
</script>

<style lang="scss">

  $bg: #283443;
  $light_gray: #fff;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      color: $cursor;
    }
  }

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
</style>

<style lang="scss" scoped>
  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;

  .login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

    .login-form {
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 160px 35px 0;
      margin: 0 auto;
      overflow: hidden;
    }

    .el-link {
      color: white;
    }

    .el-link:hover {
      color: deepskyblue;
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title-container {
      position: relative;

      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }

    .thirdparty-button {
      position: absolute;
      right: 0;
      bottom: 6px;
    }

    @media only screen and (max-width: 470px) {
      .thirdparty-button {
        display: none;
      }
      #copyright{
        display: none;
      }
    }
  }
</style>
