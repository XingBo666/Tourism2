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
              <el-input v-model="form.user" clearable></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-radio-group v-model="form.gender">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="出发日期">
              <el-date-picker
                v-model="form.date"
                type="date"
                format="yyyy.MM.dd"
                value-format="yyyy.MM.dd"
                placeholder="选择日期">
              </el-date-picker>
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
  import Breadcrumb from '@/components/Breadcrumb'

    export default {
      name: "user-update",
      components:{
        Breadcrumb,
      },
      data() {
        return {
          form: {
            name: '',
            user: '',
            gender: '男',
            date: '',
          },
        }
      },
      methods: {
        submit() {
          if (this.form.name !== '') {
            if (this.form.user !== '') {
              if (this.form.gender !== '') {
                if (this.form.date !== '') {
                  this.$message.success('提交成功');
                } else {
                  this.$message.warning('时间不能为空！');
                }
              } else {
                this.$message.warning('性别不能为空！');
              }
            } else {
              this.$message.warning('用户名不能为空！');
            }
          } else {
            this.$message.warning('真实姓名不能为空！');
          }
        },

      }
    }
</script>

<style scoped>

</style>
