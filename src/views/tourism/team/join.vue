<template>
  <div>
    <el-table :data="recordList" width="800px" style="margin-bottom: 20px">
      <el-table-column label="活动id" prop="id" width="150px"></el-table-column>
      <el-table-column label="活动内容" prop="termContent" width="130px"></el-table-column>
      <el-table-column label="出发日期" prop="startTime" width="130px">
        <template slot-scope="scope">{{ scope.row.startTime.substring(0,10) }}</template>
      </el-table-column>
      <el-table-column label="创建者" prop="createName" width="130px"></el-table-column>
      <el-table-column label="状态" width="200px">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 0">被邀请</span>
          <span v-if="scope.row.status == 1">已接受</span>
          <span v-if="scope.row.status == 2">已缴费</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300px">
        <template slot-scope="scope">
          <el-button v-show="scope.row.status == 0">接受邀请</el-button>
          <el-button v-show="scope.row.status == 2" @click="print(scope.row.termId)">打印此次账单</el-button>
          <span v-show="scope.row.status == 1">无可用操作</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      recordList: [],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      excelData: []
    };
  },
  methods: {
    exportTable() {
      //导出excel
      require.ensure([], () => {
        const { export_json_to_excel } = require("@/assets/js/Export2Excel"); //引入js文件
        const tHeader = ["日期", "姓名", "地址"]; //table的表头数据，导出后为excel第一行
        const filterVal = ["date", "name", "address"]; //table数据的prop关键字，后面循环要用到
        const list = this.tableData; //this.tableData是我的初始填入数据，这里以element-ui的表格为例
        const data = this.formatJson(filterVal, list); //循环重组数据
        export_json_to_excel(tHeader, data, "excel文件名");
      });
    },
    formatJson(filterVal, jsonData) {
      //循环重组数据
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    loadMyJoinList() {
      this.$http
        .get("termRecord/" + JSON.parse(this.$cookie.getCookie("user")).id)
        .then(res => {
          this.recordList = res.data;
        })
        .catch(err => {
          if (err.response) {
            this.$messge.error("暂时没有数据");
            this.recordList = [];
          }
        });
    },
    print(id) {
      //导出excel
      require.ensure([], () => {
        this.$http
          .get("activityCost/excel/" + id)
          .then(res => {
            const {
              export_json_to_excel
            } = require("@/assets/js/Export2Excel"); //引入js文件
            const tHeader = ["活动内容", "昵称", "开始时间", "金额"]; //table的表头数据，导出后为excel第一行
            const filterVal = [
              "activityname",
              "nickName",
              "startTime",
              "money"
            ]; //table数据的prop关键字，后面循环要用到
            const list = res.data; //this.tableData是我的初始填入数据，这里以element-ui的表格为例
            const data = this.formatJson(filterVal, list); //循环重组数据
            export_json_to_excel(tHeader, data, "账单记录");
          })
          .catch(err => {
            this.excelData = [];
            this.$message.error("下载失败，请稍后再试");
          });
      });
    },
    loadExceldata(id) {
      this.$http
        .get("activityCost/excel/" + id)
        .then(res => {
          this.excelData = res.data;
        })
        .catch(err => {
          this.excelData = [];
          this.$message.error("下载失败，请稍后再试");
        });
    }
  },
  created() {
    this.loadMyJoinList();
  }
};
</script>