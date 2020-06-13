<template>
  <div>
    <el-table :data="activityList" width="800px" style="margin-bottom: 20px">
      <el-table-column label="团队内容" prop="termName" width="200px"></el-table-column>
      <el-table-column label="活动内容" prop="activityname" width="200px"></el-table-column>
      <el-table-column label="活动状态" prop="status" width="200px">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 2">已完成</span>
          <span v-else>进行中</span>
        </template>
      </el-table-column>
      <el-table-column label="起始时间" width="200px">
        <template slot-scope="scope">{{ scope.row.startTime.substring(0,10)}}</template>
      </el-table-column>
      <el-table-column label="操作" prop="termName" width="200px">
        <template slot-scope="scope">
          <el-button
            type="warning"
            @click="endTerm(scope.row.termId)"
            :disabled="scope.row.status == 2"
          >结束行程</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-button
      style="float: right;margin-bottom: 30px;margin-top: 20px"
      type="success"
      @click="handleAdd()"
    >添加一个活动</el-button>
    <el-dialog :visible="visible" title="添加活动">
      <el-form label-width="120px">
        <el-form-item label="团队名">
          <el-select v-model="form.termId" @change="handleChange()" ref="select">
            <el-option
              v-for="item in myTermList"
              :key="item.id"
              :value="item.id"
              :label="item.content"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动内容">
          <el-input v-model="form.content" type="textarea" :rows="2" />
        </el-form-item>
        <el-form-item label="活动费用">
          <el-input-number :step="1000" :min="0" v-model="form.money" />
        </el-form-item>
        <el-form-item label="收款账户">
          <el-input v-model="form.account" />
        </el-form-item>
        <el-form-item label="添加组内成员">
          <el-select v-model="form.selectList" multiple placeholder="请选择">
            <el-option
              v-for="item in termRecordList"
              :key="item.id"
              :label="item.agencyName"
              :value="item.agencyId"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleOk()">确定</el-button>
        <el-button type="danger" @click="handleCancel()">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      form: {
        termId: null,
        content: "",
        money: null,
        account: "",
        selectList: []
      },
      myTermList: [],
      termRecordList: [],
      activityList: []
    };
  },
  methods: {
    endTerm(termId) {
      //    结束行程的方法
      this.$http
        .put("term/status/" + termId)
        .then(res => {
          if (res.data) {
            this.$message.success("结束行程成功");
            this.loadMyActivityList();
          } else {
            this.$message.error("结束行程失败，请联系开发人员");
          }
        })
        .catch(err => {
          if (err.response) {
            this.$message.error("结束行程失败，请联系开发人员");
          }
        });
    },
    handleCancel() {
      this.form = {
        termId: null,
        content: "",
        money: null,
        account: "",
        selectList: []
      };
      this.visible = false;
    },
    handleAdd() {
      this.visible = true;
      this.loadMyTerm();
    },
    loadMyActivityList() {
      this.$http
        .get("activity/" + JSON.parse(this.$cookie.getCookie("user")).id)
        .then(res => {
          this.activityList = res.data;
        })
        .catch(err => {
          if (err.response) {
            this.$messge.error("暂时没有数据");
            this.activityList = [];
          }
        });
    },
    loadMyTerm() {
      this.$http
        .get("term/myterm/" + JSON.parse(this.$cookie.getCookie("user")).id)
        .then(res => {
          this.myTermList = res.data;
        })
        .catch(err => {
          if (err.response) {
            this.$message.error("您当前没有创建团队，请先创建团队");
            this.visible = false;
            this.myTermList = [];
          }
        });
    },
    handleChange() {
      this.loadTermRecordList(this.form.termId);
    },
    loadTermRecordList(termId) {
      this.$http
        .get("termRecord/getByTerm/" + termId)
        .then(res => {
          this.termRecordList = res.data;
        })
        .catch(err => {
          this.termRecordList = [];
        });
    },
    handleOk() {
      if (
        this.form.termId == null ||
        this.form.content == "" ||
        this.form.money == null ||
        this.form.account == "" ||
        this.form.selectList == []
      ) {
        return this.$message.error("对不起，还有信息未填写，请重试");
      }
      this.$http
        .post("activity", this.form)
        .then(res => {
          if (res.data) {
            this.$message.success("添加成功");
            this.loadMyActivityList();
            this.visible = false;
            this.form = {
              termId: null,
              content: "",
              money: null,
              account: "",
              selectList: []
            };
          } else {
            this.$message.error("添加失败，请联系管理员");
          }
        })
        .catch(err => {
          if (err.response) {
            this.$message.error("添加失败，请检查参数");
          }
        });
    }
  },
  created() {
    this.loadMyActivityList();
  }
};
</script>