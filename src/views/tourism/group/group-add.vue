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
                <el-form-item label="活动内容">
                  <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
                <el-form-item label="出发日期">
                  <el-date-picker v-model="form.date" type="datetime" placeholder="选择日期时间"></el-date-picker>
                </el-form-item>
                <el-form-item label="总预算">
                  <el-input v-model="form.money" :maxlength="9" size="medium" placeholder></el-input>
                </el-form-item>
                <el-form-item label="个人预算">
                  <el-input v-model="form.money2" :maxlength="9" size="medium" placeholder></el-input>
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
                <el-form-item label="待邀请成员">
                  <el-select v-model="invitedList" multiple placeholder="请选择">
                    <el-option
                      v-for="item in agencyList"
                      :key="item.id"
                      :label="item.nickName"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item class="mt-5">
                  <el-button type="primary" size="medium" style="width: 200px;" @click="next2()">下一步</el-button>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>

          <el-row type="flex" class="row-bg" justify="center" v-show="active === 3">
            <el-col :span="16">
              <el-alert title="确认转账后，资金将直接汇入对方账户，无法退回！" type="warning" show-icon></el-alert>
              <p class="mt-4">付款账户：AntDesign@example.com</p>
              <p>收款账户：工商银行储蓄卡</p>
              <p>收款人姓名：{{form.user}}</p>
              <p>
                转账金额：
                <span style="font-size: 24px;">{{form.money}}</span>
                <span style="font-size: 26px;margin-left: 10px;">元</span>
              </p>
              <el-divider></el-divider>
              <el-form ref="form" :model="form3" label-width="70px">
                <el-form-item>
                  <!--放置一个二维码-->
                  <img src="@/assets/1.png" />
                </el-form-item>

                <el-form-item class="mt-5">
                  <el-button
                    type="primary"
                    size="medium"
                    style="width: 200px;"
                    @click="submit()"
                  >我已支付，下一步</el-button>
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
              <p>
                转账金额：
                <span style="font-size: 24px; margin-right: 5px;">{{form.money}}</span>
                <span style="font-size: 26px;margin-left: 10px;"></span>
              </p>
              <el-button
                type="primary"
                size="medium"
                class="mt-5 mb-5"
                style="width: 200px;"
                @click="returnSuccess()"
              >返回</el-button>
            </el-col>
          </el-row>
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
      termId: null,
      form: {
        user: "",
        date: "",
        desc: "",
        money: "",
        money2: ""
      },
      form2: {
        email: ""
      },
      form3: {
        password: ""
      },
      active: 1,
      isSuccess: false,
      agencyList: [],
      invitedList: [],
      iList: []
    };
  },
  mounted() {
    if (this.$cookie.getCookie("groupInfo") !== "") {
      let data = JSON.parse(this.$cookie.getCookie("groupInfo"));
      this.form.user = data.user;
      this.form.date = data.date;
      this.form.desc = data.desc;
      this.form.money = data.money;
      this.form.money2 = data.money2;
      this.active = 3;
    }
  },
  methods: {
    loadAgencyList() {
      this.$http
        .get("agency/all")
        .then(res => {
          this.agencyList = res.data;
        })
        .catch(err => {
          if (err.response) {
            this.agencyList = [];
          }
        });
    },
    submit() {
      //  发送请求，添加一条记录
      console.log(JSON.parse(this.$cookie.getCookie("user")).id);
      console.log(JSON.parse(this.$cookie.getCookie("groupInfo")));
      this.$http
        .post("term/join", {
          agencyId: JSON.parse(this.$cookie.getCookie("user")).id,
          termId: JSON.parse(this.$cookie.getCookie("groupInfo")).id
        })
        .then(res => {
          if (res.data) {
            this.isSuccess = true;
          } else {
            this.$message.error("加入队伍失败，请联系开发人员");
            this.isSuccess = true;
          }
        })
        .catch(err => {
          if (err.response) {
            this.$message.error("加入队伍失败，请联系开发人员");
            this.isSuccess = true;
          }
        });
    },
    next() {
      if (
        this.form.money == "" ||
        this.form.money2 == "" ||
        this.form.date == null ||
        this.form.desc == ""
      ) {
        return this.$message.warning("有信息未填写，请重新输入");
      }
      //  向后端发请求，创建队伍
      this.$http
        .post("term", {
          content: this.form.desc,
          startTime: this.form.date,
          totalBudget: this.form.money,
          personBudget: this.form.money2,
          createId: JSON.parse(this.$cookie.getCookie("user")).id
        })
        .then(res => {
          if (res.data != 0 && res.data != null) {
            this.termId = res.data;
            this.active = 2;
          } else {
            this.$message.error("团队创建失败，请联系开发人员");
          }
        })
        .catch(err => {
          if (err.response) {
            this.$message.error("团队创建失败，请检查输入的参数");
          }
        });
    },
    next2() {
      if (this.invitedList == []) {
        return (this.active = 3);
      }
      for (let i = 0; i < this.invitedList.length; i++) {
        console.log(this.invitedList[i]);

        this.iList[i] = this.invitedList[i];
      }

      setTimeout(() => {
        this.$http
          .post("termRecord/invite", {
            termId: this.termId,
            agencies: this.iList
          })
          .then(res => {
            if (res.data) {
              this.$message.success("邀请成功");
              setTimeout(() => {
                this.active = 3;
              }, 500);
            }
          })
          .catch(err => {
            if (err.response) {
              this.$message("邀请失败，请联系管理员");
              setTimeout(() => {
                this.active = 3;
              }, 500);
            }
          });
      }, 500);
    },
    returnSuccess() {
      this.active = 1;
      this.form.user = "";
      this.form.date = "";
      this.form.desc = "";
      this.form.money = "";
      this.form.money2 = "";
      this.isSuccess = false;
      this.$cookie.delCookie("groupInfo");
      this.$router.push("/tourism/team/index/join");
    }
  },
  created() {
    this.loadAgencyList();
  }
};
</script>

<style scoped>
</style>
