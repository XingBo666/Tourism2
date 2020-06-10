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
        <el-col :span="6" v-for="index in data" :key="index.id" class="mt-5">
          <el-card shadow="always">
            <div style="background-color: #343a40; width: 30px; height: 30px; border-radius: 50%; padding: 10px; float: left;">
              <i class="el-icon-s-promotion" style="font-size: 30px; color: white;"></i>
            </div>
            <div style="margin-left: 60px;">
              <p class="mt-0 mb-2">发起人：{{index.user}}</p>
              <p class="mt-0 mb-2">活动内容：{{index.desc}}</p>
              <p class="mt-0 mb-2">起始时间：{{index.date}}</p>
              <p class="mt-0 mb-2">个人预算：{{index.money}}</p>
            </div>
            <div style="border: .5px solid #E4E7ED; margin-top: 20px; margin-bottom: 10px;"></div>
            <div class="text-center">
              <el-link
                type="primary"
                size="medium"
                @click="addTeam(index.id)"
                plain>加入</el-link>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
    <el-dialog
      title="创建队伍"
      :visible.sync="dialogVisible"
      width="30%">
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
        <el-form-item label="预算">
          <el-input v-model="form.money" size="medium" placeholder=""></el-input>
        </el-form-item>

        <el-form-item class="text-right">
          <el-button type="primary" size="medium" style="width: 200px;" @click="submit()">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
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
        data: [],
        form: {
          user: '',
          date: '',
          desc: '',
          money: '',
        },
        dialogVisible: false
      }
    },
    mounted() {
      this.list();
    },
    methods: {
      addTeam(index) {

        let id;
        for (let i=0; i<this.data.length; i++) {
          if (this.data[i].id === index) {
            id = i;
            break;
          }
        }

        let groupInfo = {
          'id': this.data[id].id,
          'user': this.data[id].user,
          'date': this.data[id].date,
          'desc': this.data[id].desc,
          'money': this.data[id].money,
        };

        this.$cookie.setCookie('groupInfo', JSON.stringify(groupInfo));
        this.$router.push({path:'/tourism/group/group-add'});
      },
      list() {
        let postData = {
          'id': 0,
          'user': '黄老师',
          'date': '2020.06.07',
          'desc': '北京',
          'money': '3000',
        };
        let postData2 = {
          'id': 1,
          'user': '何老师',
          'date': '2020.06.07',
          'desc': '湖南',
          'money': '6000',
        };
        let postData3 = {
          'id': 2,
          'user': '周老师',
          'date': '2020.06.07',
          'desc': '湖北',
          'money': '9000',
        };

        this.data.splice(0, 0, postData);
        this.data.splice(0, 0, postData2);
        this.data.splice(0, 0, postData3);
      }
    }
  }
</script>

<style scoped>

</style>
