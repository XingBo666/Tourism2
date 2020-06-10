<template>
  <div>
    <Breadcrumb />
    <el-card shadow="never">
      <h2>创建队伍</h2>
      <el-row type="flex" class="row-bg" justify="center" v-show="!isSuccess">
        <el-col :span="14">
          <div class="mb-5">
            <el-steps :active="active" finish-status="success">
              <el-step title="创建团队"></el-step>
              <el-step title="邀请会员入会"></el-step>
              <el-step title="缴纳团费"></el-step>
            </el-steps>
          </div>

          <el-row type="flex" justify="center" v-show="active === 1">
            <el-col :span="16">
              <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="发起人">
                  <el-input v-model="form.user" size="medium" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="活动内容">
                  <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
                <el-form-item label="出发日期">
                  <el-date-picker
                    v-model="form.date"
                    type="datetime"
                    format="yyyy.MM.dd"
                    value-format="yyyy.MM.dd"
                    placeholder="选择日期时间">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="总预算">
                  <el-input v-model="form.money" size="medium" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="个人预算">
                  <el-input v-model="form.money2" size="medium" placeholder=""></el-input>
                </el-form-item>

                <el-form-item class="mt-5">
                  <el-button type="primary" size="medium" style="width: 200px;" @click="next()">下一步</el-button>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>

          <el-row type="flex" class="row-bg" justify="center" v-show="active === 2">
            <el-col :span="16">
              <el-form ref="form" :model="form2" label-width="150px">
                <el-form-item label="待邀请成员邮箱">
                  <el-input v-model="form2.email" size="medium" placeholder=""></el-input>
                </el-form-item>

                <el-form-item class="mt-5">
                  <el-button type="primary" size="medium" style="width: 200px;" @click="next2()">下一步</el-button>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>

          <el-row type="flex" class="row-bg" justify="center" v-show="active === 3">
            <el-col :span="16">
              <el-alert
                title="确认转账后，资金将直接汇入对方账户，无法退回！"
                type="warning"
                show-icon>
              </el-alert>
              <p class="mt-4">付款账户：AntDesign@example.com</p>
              <p>收款账户：工商银行储蓄卡</p>
              <p>收款人姓名：{{form.user}}</p>
              <p>转账金额：<span style="font-size: 24px;">{{form.money}}</span>(五万元整)</p>
              <el-divider></el-divider>
              <el-form ref="form" :model="form3" label-width="70px">
                <el-form-item label="支付密码">
                  <el-input v-model="form3.password" size="medium" placeholder=""></el-input>
                </el-form-item>

                <el-form-item class="mt-5">
                  <el-button type="primary" size="medium" style="width: 200px;" @click="submit()">提交</el-button>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>

        </el-col>
      </el-row>

      <el-row type="flex" class="row-bg" justify="center" v-show="isSuccess">
        <el-col :span="14">

          <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="16" class="text-center">

              <i class="el-icon-success" style="font-size: 80px; color: #2196f3;"></i>

              <p class="mt-4">付款账户：AntDesign@example.com</p>
              <p>收款账户：工商银行储蓄卡</p>
              <p>收款人姓名：{{form.user}}</p>
              <p>转账金额：<span style="font-size: 24px; margin-right: 5px;">{{form.money}}</span>(五万元整)</p>

              <el-button type="primary" size="medium" class="mt-5 mb-5" style="width: 200px;" @click="returnSuccess()">返回</el-button>
            </el-col>
          </el-row>

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
          user: '',
          date: '',
          desc: '',
          money: '',
          money2: '',
        },
        form2: {
          email: '',
        },
        form3: {
          password: ''
        },
        active: 1,
        isSuccess: false,
      }
    },
    mounted() {
      if (this.$cookie.getCookie('groupInfo') !== '') {
        let data = JSON.parse(this.$cookie.getCookie('groupInfo'));
        this.form.user = data.user;
        this.form.date = data.date;
        this.form.desc = data.desc;
        this.form.money = data.money;
        this.form.money2 = data.money2;
        this.active = 3;
      }
    },
    methods: {
      submit() {
        if (this.form3.password !== '') {
          this.$message.success('提交成功');
          this.isSuccess = true;
        } else {
          this.$message.warning('支付密码不能为空！');
        }
      },
      next() {
        if (this.form.user !== '') {
          if (this.form.date !== '') {
            if (this.form.desc !== '') {
              if (this.form.money !== '') {
                if (this.form.money2 !== '') {
                  this.active = 2;
                } else {
                  this.$message.warning('个人预算不能为空！');
                }
              } else {
                this.$message.warning('总预算不能为空！');
              }
            } else {
              this.$message.warning('活动内容不能为空！');
            }
          } else {
            this.$message.warning('日期时间不能为空！');
          }
        } else {
          this.$message.warning('发起人不能为空！');
        }
      },
      next2() {
        if (this.form2.email !== '') {
          this.active = 3;
        } else {
          this.$message.warning('待邀请成员邮箱不能为空！');
        }
      },
      returnSuccess() {
        this.active = 1;
        this.form.user = '';
        this.form.date = '';
        this.form.desc = '';
        this.form.money = '';
        this.form.money2 = '';
        this.isSuccess = false;
        this.$cookie.delCookie('groupInfo');
      }
    },
  }
</script>

<style scoped>

</style>
