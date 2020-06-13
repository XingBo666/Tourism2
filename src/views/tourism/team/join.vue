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
          <el-button v-show="scope.row.status == 2">打印账单</el-button>
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
      recordList: []
    };
  },
  methods: {
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
    }
  },
  created() {
    this.loadMyJoinList();
  }
};
</script>