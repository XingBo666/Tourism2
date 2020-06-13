<template>
  <div>
    <Breadcrumb />
    <el-card>
      <!--放置搜索框-->
      <div>
        <el-row>
          <el-col :span="6">
            <span>姓名:</span>
            <el-input style="width: 70%" v-model="queryParam.name" />
          </el-col>
          <el-col :span="6">
            <span>邮箱:</span>
            <el-input style="width: 70%" v-model="queryParam.email" />
          </el-col>
          <el-col :span="6">
            <span>手机号:</span>
            <el-input style="width: 70%" v-model="queryParam.phone" />
          </el-col>
          <el-col :span="6">
            <span>性别:</span>
            <el-select v-model="queryParam.sex">
              <el-option :label="'男'" :value="'1'"></el-option>
              <el-option :label="'女'" :value="'0'"></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row style="margin-left: 40px;margin-top: 20px">
          <el-col :span="12">
            <el-button type="primary" @click="search()">搜索</el-button>
            <el-button type="primary" @click="reset()">重置</el-button>
            <el-button type="success" @click="show()" v-show="admin()">添加</el-button>
          </el-col>
        </el-row>
      </div>
      <!--放置表格-->
      <el-table :data="agencyList">
        <el-table-column label="编号" prop="id"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="手机号" prop="phone"></el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="性别" prop="sex">
          <template slot-scope="scope">{{ scope.row.sex == 0 ? '女': '男'}}</template>
        </el-table-column>
        <el-table-column label="出生日期">
          <template slot-scope="scope">{{ scope.row.brithday | dateformat}}</template>
        </el-table-column>
        <el-table-column  label="操作">
          <template slot-scope="scope">
            <span v-show="admin()">
              <el-button size="mini" type="primary" @click="show(scope.row.id)">修改</el-button>
              <el-button size="mini" type="danger" @click="handleDel(scope.row.id)">删除</el-button>
            </span>
          </template>
        </el-table-column>
      </el-table>
      <!--分页条区域-->
      <el-pagination
        style="margin-top: 20px"
        background
        layout="prev, pager, next"
        ref="page"
        :total="pageInfo.total"
        :pageSize="pageInfo.pageSize"
        :current-page="pageInfo.pageNo"
        @current-change="changePage()"
      ></el-pagination>
    </el-card>
    <el-dialog :visible="visible" :title="isNew? '添加会员':'修改会员'" width="35%" @close="closeAdd()">
      <el-form label-width="80px" :model="agency">
        <el-form-item label="姓名">
          <el-input v-model="agency.name" />
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="agency.nickName" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="agency.email" />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="agency.phone" />
        </el-form-item>
        <el-form-item label="出生日期">
          <el-date-picker align="right" v-model="agency.brithday"></el-date-picker>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="agency.sex">
            <el-option :label="'男'" :value="1"></el-option>
            <el-option :label="'女'" :value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeAdd()">取 消</el-button>
        <el-button type="primary" @click="handleSubmit()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Breadcrumb from "@/components/Breadcrumb";
export default {
  data() {
    return {
      queryParam: {
        pageNo: 1,
        pageSize: 5,
        name: "",
        email: "",
        phone: "",
        sex: null
      },
      isNew: false,
      agencyList: [],
      pageInfo: {},
      visible: false,
      agency: {
        name: "",
        nickName: "",
        email: "",
        phone: "",
        brithday: null,
        sex: null
      }
    };
  },
  methods: {
    admin() {
      if (JSON.parse(this.$cookie.getCookie("user")).level == 1) {
        return true;
      } else {
        return false;
      }
    },
    handleDel(id) {
      this.$http.delete("agency/" + id).then(res => {
        if (res.data) {
          this.$message.success("删除成功");
          this.loadAgencyList();
        }
      });
    },
    handleSubmit() {
      //  首先判断参数
      if (
        this.agency.name == "" ||
        this.agency.nickName == "" ||
        this.agency.email == "" ||
        this.agency.phone == "" ||
        this.agency.brithday == null ||
        this.agency.sex == null
      ) {
        return this.$message.error("还有未填写的信息，请确认");
      }
      if (this.isNew) {
        //  如果是新增
        this.$http
          .post("agency", this.agency)
          .then(res => {
            if (res.data) {
              this.$message.success("添加成功");
              this.closeAdd();
              this.loadAgencyList();
            } else {
              this.$message.error("添加失败，请联系开发人员");
            }
          })
          .catch(err => {
            if (err.response) {
              this.$message.error("添加失败，请检查参数");
            }
          });
      } else {
        this.$http
          .put("agency", this.agency)
          .then(res => {
            if (res.data) {
              this.$message.success("修改成功");
              this.closeAdd();
              this.loadAgencyList();
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
    show(id) {
      if (!id) {
        //  新增
        this.isNew = true;
      } else {
        //  请求后端，拿到数据，进行渲染
        this.$http.get("agency/" + id).then(res => {
          this.agency = res.data;
        });
        this.isNew = false;
      }
      this.visible = true;
    },
    changePage(page) {
      console.log(this.$refs.page);
      this.queryParam.pageNo = this.$refs.page.internalCurrentPage;
      this.loadData();
    },
    loadAgencyList() {
      this.$http
        .post("agency/list", this.queryParam)
        .then(res => {
          this.agencyList = res.data.list;
          this.pageInfo = res.data;
        })
        .catch(err => {
          if (err.response) {
            this.$message.error("对不起，暂时没有会员");
            this.agencyList = [];
          }
        });
    },
    search() {
      this.queryParam.pageNo = 1;
      this.loadAgencyList();
    },
    reset() {
      this.queryParam = {
        pageNo: 1,
        pageSize: 5,
        name: "",
        email: "",
        phone: "",
        sex: null
      };
    },
    closeAdd() {
      this.agency = {
        name: "",
        nickName: "",
        email: "",
        phone: "",
        brithday: "",
        sex: null
      };
      this.visible = false;
    }
  },
  created() {
    this.loadAgencyList();
  },

  filters: {
    dateformat(date1) {
      var date = new Date(date1);
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var hour = date.getHours();
      if (hour < 10) {
        hour = "0" + hour;
      }
      var minte = date.getMinutes();
      if (minte < 10) {
        minte = "0" + minte;
      }
      var second = date.getSeconds();
      if (second < 10) {
        second = "0" + second;
      }
      return (
        "" +
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hour +
        ":" +
        minte +
        ":" +
        second
      );
    }
  },
  components: {
    Breadcrumb
  }
};
</script>