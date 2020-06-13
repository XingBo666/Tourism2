<template>
  <div>
    <Breadcrumb />
    <el-card shadow="never">
      <h2>个人资料</h2>
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="10">
          <el-form ref="form" :model="form" label-width="80px" class="pt-5 pb-5">
            <el-form-item label="真实姓名">
              <el-input v-model="form.name" clearable></el-input>
            </el-form-item>
            <el-form-item label="用户名">
              <el-input v-model="form.nickName" clearable></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-select v-model="form.sex">
                <el-option :label="'男'" :value="1"></el-option>
                <el-option :label="'女'" :value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="form.password" type="password" />
            </el-form-item>
            <el-form-item label="确认密码">
              <el-input v-model="repass" type="password" />
            </el-form-item>
            <el-form-item label="出生日期">
              <el-date-picker v-model="form.brithday" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>

            <el-form-item class="text-center mt-5">
              <el-button type="primary" size="small" style="width: 100px;" @click="submit()">提交</el-button>
              <el-button size="small" style="width: 100px;" @click="submit()">保存</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb";

export default {
  name: "user-update",
  components: {
    Breadcrumb
  },
  data() {
    return {
      form: {
        name: "",
        nickName: "",
        sex: null,
        brithday: null,
        password: ""
      },
      repass: ""
    };
  },
  methods: {
    loadUserData() {
      console.log(JSON.parse(this.$cookie.getCookie("user")).id);
      this.$http
        .get("agency/" + JSON.parse(this.$cookie.getCookie("user")).id)
        .then(res => {
          this.form = res.data;
          console.log(this.form);
        });
    },
    submit() {
      if (
        this.form.name == "" ||
        this.form.nickName == "" ||
        this.form.sex == null ||
        this.form.brithday == null ||
        this.form.password == null
      ) {
        return this.$message.error("还有信息未填写");
      }

      if (this.form.password !== this.repass) {
        return this.$message.error("两次输入的密码不一致");
      }
      this.$http
        .put("agency", this.form)
        .then(res => {
          if (res.data) {
            this.$message.success("修改成功");
            this.loadUserData();
          } else {
            this.$message.error("修改失败，请联系开发人员");
          }
        })
        .catch(err => {
          if (err.response) {
            this.$message.error("修改失败，请检查参数");
          }
        });
    }
  },
  created() {
    console.log(1);
    this.loadUserData();
  }
};
</script>

<style scoped>
</style>
