<template>
  <div class="home_container">
    <div style="margin-top: 100px;">
      <el-row type="flex" justify="center">
        <el-col :md="7">
          <!-- 登录模块 -->
          <div style="padding: 20px 30px;" v-show="show_login">
            <h2 class="text-center">会员登录</h2>
            <el-tabs v-model="activeName">
              <el-tab-pane label="账号密码登录" name="账号密码登录">
                <el-form ref="form" :model="form" class="mt-4">
                  <el-form-item>
                    <el-input v-model="form.user" prefix-icon="el-icon-user" clearable></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-input
                      v-model="form.password"
                      prefix-icon="el-icon-lock"
                      clearable
                      @keyup.enter.native="login()"
                      show-password
                    ></el-input>
                  </el-form-item>
                  <el-form-item>
                    <!-- `checked` 为 true 或 false -->
                    <el-checkbox v-model="checked1">自动登录</el-checkbox>
                    <el-link type="primary" :underline="false" style="float: right;">忘记密码？</el-link>
                  </el-form-item>
                  <el-form-item class="text-center">
                    <el-button type="primary" style="width: 100%" @click="login()">登录</el-button>
                  </el-form-item>
                </el-form>
              </el-tab-pane>
            </el-tabs>
            <div>
              <span style="float: left;">其它登录方式</span>
              <div class="ml-3" style="float: left;">
                <img
                  src="https://s1.ax1x.com/2020/06/06/t6TeoD.png"
                  alt
                  class="ml-1 mr-1"
                  style="width: 20px; height: 20px;"
                />
                <img
                  src="https://s1.ax1x.com/2020/06/06/t6TZdO.png"
                  alt
                  class="ml-1 mr-1"
                  style="width: 20px; height: 20px;"
                />
                <img
                  src="https://s1.ax1x.com/2020/06/06/t6TVeK.png"
                  alt
                  class="ml-1 mr-1"
                  style="width: 20px; height: 20px;"
                />
              </div>
              <el-link
                type="primary"
                :underline="false"
                style="float: right;"
                @click="show_login = false"
              >注册账号</el-link>
            </div>
          </div>

          <!-- 登录模块 -->
          <div style="padding: 20px 30px;" v-show="!show_login">
            <h2 class="text-center">会员注册</h2>
            <el-form ref="form" :model="form3" class="mt-4" label-width="80px">
              <el-form-item label="邮箱">
                <el-input v-model="form3.email" placeholder="邮箱" type="email" clearable></el-input>
              </el-form-item>
              <el-form-item label="手机号">
                <el-input v-model="form3.phone" placeholder="手机号" type="phone" clearable></el-input>
              </el-form-item>
              <el-form-item label="昵称">
                <el-input v-model="form3.nickName" placeholder="昵称" type="nickName" clearable></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input
                  v-model="form3.password"
                  placeholder="6~16位密码，区分大小写"
                  clearable
                  show-password
                ></el-input>
              </el-form-item>
              <el-form-item label="确认密码">
                <el-input v-model="repass" placeholder="确认密码" clearable show-password></el-input>
              </el-form-item>
              <el-form-item>
                <el-checkbox v-model="checked1">自动登录</el-checkbox>
                <el-link type="primary" :underline="false" style="float: right;">忘记密码？</el-link>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" style="width: 50%" @click="registered()">注册</el-button>
                <el-link
                  type="primary"
                  :underline="false"
                  style="float: right;"
                  @click="show_login = true"
                >使用已有账号登录</el-link>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="mt-5" style="padding:50px 0; color: #666;">
      <div class="text-center">
        <span>©2020 Chenbz. All rights reserved</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      form: {
        user: "root",
        password: "root"
      },
      form2: {
        phone: "",
        verification: ""
      },
      activeName: "账号密码登录",
      checked1: "",
      checked2: "",
      form3: {
        nickName: "",
        password: "",
        email: "",
        phone: ""
      },
      repass: "",
      show_login: true
    };
  },
  methods: {
    /*
     * 登陆
     * */
    login() {
      // if ((this.form.user === 'root') && (this.form.password === 'root')) {
      //   let userInfo = {
      //     'name': '管理员',
      //   };
      //   this.$cookie.setCookie('user', JSON.stringify(userInfo));
      //   this.$router.push({path:'/tourism'});
      // } else {
      //   this.warning('账号或密码错误！');
      // }
      if (this.form.user == "" || this.form.password == "") {
        return this.$message.error("用户名或者密码不能空");
      }
      this.$http
        .post("agency/login", {
          nickName: this.form.user,
          password: this.form.password
        })
        .then(res => {
          if (res.data) {
            this.$cookie.setCookie("user", JSON.stringify(res.data));
            this.$router.push({ path: "/tourism/user/user-list" });
          } else {
            this.warning("账号或密码错误！");
          }
        })
        .catch(err => {
          if (err.response) {
            this.warning("账号或密码错误！");
          }
        });
    },
    registered() {
      if (
        this.form3.nickName == "" ||
        this.form3.password == "" ||
        this.form3.email == "" ||
        this.form3.phone == ""
      ) {
        return this.$message.error("您还有信息没有输入，请再试");
      }
      if (this.form3.password.length < 5) {
        return this.$message.error("密码的长度在5位以上");
      }
      if (this.form3.password != this.repass) {
        return this.$message.error("两次密码不一致");
      }

      this.$http
        .post("agency/registry", this.form3)
        .then(res => {
          if (res.data) {
            this.$message.success("注册成功");
            setTimeout(() => {
              this.form.user = this.form3.nickName;
              this.form.password = this.form3.password;
              this.login();
            });
          } else {
            this.$message.error("注册失败，请联系开发人员");
          }
        })
        .catch(err => {
          if (err.response) {
            this.$message.error("注册失败，请检查参数");
          }
        });

      console.log(this.form3);
    },
    warning(text) {
      this.$notify({
        title: "警告",
        message: text,
        type: "warning"
      });
    }
  }
};
</script>

<style scoped>
</style>
