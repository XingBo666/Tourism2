<template>
  <div>
    <Breadcrumb />
    <el-card shadow="never">
      <h2 class="mb-0">组团</h2>
      <el-row :gutter="50">
        <el-col :span="6" class="mt-5">
          <router-link :to="{ name: '创建队伍'}">
            <el-card shadow="always">
              <div class="text-center" style="line-height: 160.8px;">
                <el-button type="text" icon="el-icon-plus">创建队伍</el-button>
              </div>
            </el-card>
          </router-link>
        </el-col>
        <el-col :span="6" v-for="item in termList" :key="item.id" class="mt-5">
          <el-card shadow="always">
            <div
              style="background-color: #343a40; width: 30px; height: 30px; border-radius: 50%; padding: 10px; float: left;"
            >
              <i class="el-icon-s-promotion" style="font-size: 30px; color: white;"></i>
            </div>
            <div style="margin-left: 60px;">
              <p class="mt-0 mb-2">发起人：{{item.createName}}</p>
              <p class="mt-0 mb-2">活动内容：{{item.content}}</p>
              <p class="mt-0 mb-2">起始时间：{{item.startTime.substring(0,10)}}</p>
              <p class="mt-0 mb-2">个人预算：{{item.personBudget}}</p>
            </div>
            <div style="border: .5px solid #E4E7ED; margin-top: 20px; margin-bottom: 10px;"></div>
            <div class="text-center">
              <el-link
                v-show="MyTerm( item.createId)"
                type="primary"
                size="medium"
                @click="addTeam(item.id)"
                plain
              >加入</el-link>
              <span style="color: red" v-show="MyTerm(item.id)">您是创建者</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
    <el-dialog title="创建队伍" :visible.sync="dialogVisible" width="30%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="发起人">
          <el-input v-model="form.user" size="medium" placeholder></el-input>
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
            placeholder="选择日期时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="预算">
          <el-input v-model="form.money" size="medium" placeholder></el-input>
        </el-form-item>

        <el-form-item class="text-right">
          <el-button type="primary" size="medium" style="width: 200px;" @click="submit()">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
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
      data: [],
      form: {
        user: "",
        date: "",
        desc: "",
        money: ""
      },
      dialogVisible: false,
      termList: []
    };
  },
  methods: {
    MyTerm(id) {
      if (JSON.parse(this.$cookie.getCookie("user")).id == id) {
        return false;
      }
      return true;
    },
    addTeam(index) {
      let id;
      for (let i = 0; i < this.termList.length; i++) {
        if (this.termList[i].id === index) {
          id = i;
          break;
        }
      }

      let groupInfo = {
        id: this.termList[id].id,
        user: this.termList[id].createName,
        date: this.termList[id].startTime,
        desc: this.termList[id].content,
        money: this.termList[id].personBudget
      };

      this.$cookie.setCookie("groupInfo", JSON.stringify(groupInfo));
      this.$router.push({ path: "/tourism/group/group-add" });
    },
    loadTermList() {
      this.$http
        .get("term/list")
        .then(res => {
          this.termList = res.data;
        })
        .catch(err => {
          if (err.response) {
            this.$message.error("暂时还没有未开始的活动");
            this.termList = [];
          }
        });
    }
  },
  created() {
    this.loadTermList();
  }
};
</script>

<style scoped>
</style>
