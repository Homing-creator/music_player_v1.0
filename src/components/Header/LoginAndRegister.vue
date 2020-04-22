<template>
    <div id="login-register-container">
      <el-dialog
        :title="title"
        :visible.sync="$store.state.loginAndRegisterDialogVisible"
        width="30%"
        :before-close="handleClose"
        center>
        <section id="login" v-show="title === '登录'">
            <el-form
              id="login-form"
              :model="loginForm"
              ref="loginForm"
              label-width="100px"
              class="demo-ruleForm"
              label-position="left"
              status-icon>
              <el-form-item label="邮 箱：">
                <el-input v-model="loginForm.userEmail" clearable placeholder="请输入邮箱"/>
              </el-form-item>
              <el-form-item label="密 码：">
                <el-input type="password" v-model="loginForm.userPassword" autocomplete="new-password" show-password @keyup.native="loginKeyDown" clearable placeholder="请输入密码"/>
                <div style="height:15px">
                  <el-tag v-show="bigChar" style="margin-left:20px">
                    大写锁定已打开
                  </el-tag>
                </div>
              </el-form-item>
            </el-form>
            <el-switch v-model="remember" active-text="记住密码"/>
            <div>
              还没有账号？
              <el-link type="success" @click="setTitle('注册')">马上注册</el-link>
              忘记密码？
              <el-link type="success">找回密码</el-link>
            </div>
          </section>
        <section id="register" v-show="title === '注册'">
          <el-form
            id="register-form"
            :model="registerForm"
            :rules="rules"
            ref="registerForm"
            label-width="100px"
            class="demo-ruleForm"
            label-position="left"
            status-icon>
            <el-form-item label="邮 箱：" prop="userEmail">
              <el-input v-model="registerForm.userEmail" placeholder="请输入邮箱"/>
            </el-form-item>
            <el-form-item label="昵 称：" prop="userName">
              <el-input v-model="registerForm.userName" placeholder="请输入用户名"/>
            </el-form-item>
            <el-form-item label="密 码：" prop="userPassword">
              <el-input type="password" v-model="registerForm.userPassword" autocomplete="new-password" show-password @keyup.native="loginKeyDown" clearable  placeholder="请输入密码"/>
              <div style="height:15px">
                &nbsp;
                <el-tag v-show="bigChar" style="margin-left:20px">
                  大写锁定已打开
                </el-tag>
              </div>
            </el-form-item>
          </el-form>
          <div>
            已有账号？
            <el-link type="success" @click="setTitle('登录')">点击登录</el-link>
          </div>
        </section>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="handleLogin('loginForm')" v-show="title === '登录'">{{ title }}</el-button>
            <el-button type="primary" @click="handleRegister('registerForm')" v-show="title === '注册'">{{ title }}</el-button>
            <el-button @click="$store.commit('setLoginAndRegisterDialogVisible', false)">取消</el-button>
          </span>
      </el-dialog>
    </div>
</template>

<script>
import { Message } from 'element-ui'
import register from '../../plugins/net/register'
import login from '../../plugins/net/login'
import tokenlogin from '../../plugins/net/tokenlogin'
import { aesDecrypt } from '../../plugins/api/encrypt'
import baseurl from '../../plugins/api/baseurl'

export default {
  name: 'Login',
  data () {
    return {
      // dialogVisible: false,
      title: '登录',
      loginForm: {
        userEmail: '',
        userPassword: ''
      },
      registerForm: {
        userEmail: '',
        userName: '',
        userPassword: ''
      },
      rules: {
        userEmail: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        userPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      remember: false,
      firstTochar: false,
      bigChar: false
    }
  },
  methods: {
    setTitle (string) {
      this.title = string
    },
    handleClose (done) {
      // this.$confirm('确认关闭？')
      //   .then(_ => {
      //     done()
      //   })
      //   .catch(_ => {})
      done()
    },
    handleLogin (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          login(this.loginForm)
            .then(resolve => {
            // 登录成功之后，得到返回的 用户头像 用户名
            // 将用户头像 用户名 保存到 vuex 中的 user 中
              const userInfo = JSON.parse(aesDecrypt(resolve.userInfo))
              userInfo.avatar = baseurl.local + userInfo.avatar
              this.$store.commit('setUser', userInfo)

              // 保存 token 到 sessionstorage
              sessionStorage.setItem('token', resolve.token)

              // vuex 读取 sessionstorage 中的 token
              this.$store.commit('setToken', sessionStorage.getItem('token'))

              // 处理记住密码
              // 如果勾选的记住密码，则把返回的 token 保存到 localstorage 中
              if (this.remember) {
                // 保存 token 到 localstorage
                localStorage.setItem('token', resolve.token)
              }
            })
        } else {
          return false
        }
      })
      this.$store.commit('setLoginAndRegisterDialogVisible', false)
    },
    handleRegister (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          register(this.registerForm)
        } else {
          Message.error('请完善表单...')
          return false
        }
      })
    },
    // 检测键盘大小写
    loginKeyDown (event) {
      const _that = this
      // 是否输入过字母键，且判断是否按键为caps lock
      if (_that.firstTochar) {
        if (event.keyCode === 20) {
          _that.bigChar = !_that.bigChar
          return
        }
      }
      // 未输入过字母键，或按键不是caps lock，判断每次最后输入的字符的大小写
      const e = event || window.event
      const keyvalue = e.keyCode ? e.keyCode : e.which
      const shifKey = e.shiftKey ? e.shiftKey : (keyvalue === 16)
      if (typeof (_that.loginForm.password) === 'undefined') {
        return
      }
      const strlen = _that.loginForm.password.length
      const password = _that.loginForm.password

      if (strlen) {
        const uniCode = password.charCodeAt(strlen - 1)
        if (keyvalue >= 65 && keyvalue <= 90) {
          // 如果是字母键
          _that.firstTochar = true
          _that.bigChar = ((uniCode >= 65 && uniCode <= 90) && !shifKey) || ((uniCode >= 97 && uniCode <= 122) && shifKey)
        }
      }
    }
  },
  mounted () {
    // 登录状态保持
    // 判断 session 中有没有 token
    let token = sessionStorage.getItem('token')
    // 如果没有，则判断 localstorage 中有没有 token
    if (token === null) {
      token = localStorage.getItem('token')
    }

    if (token !== null) {
      // 如果有，则发送 tokenlogin 请求
      tokenlogin(token)
        .then(response => {
          // 保存 token 到 sessionstorage
          sessionStorage.setItem('token', token)

          // vuex 读取 sessionstorage 中的 token
          this.$store.commit('setToken', token)

          // 得到用户头像、用户名，设置到 vuex 的 user 中
          const userInfo = JSON.parse(aesDecrypt(response.data.userInfo))
          userInfo.avatar = baseurl.local + userInfo.avatar
          this.$store.commit('setUser', userInfo)
        })
        .catch(error => {
          let message = null
          if (error.status === 403) {
            message = '密码过期，请重新登录'
          } else {
            message = error
          }
          Message.error({
            message
          })
        })
    }
  }
}
</script>

<style scoped lang="scss">
#login-register-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 70px;
}
</style>
