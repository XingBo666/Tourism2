<template>
  <div>
    <Breadcrumb />
    <el-card shadow="never">
      <!-- 头部模块 -->
      <div class="mb-2">
        <el-form :inline="true" :model="form2" class="demo-form-inline">
          <el-form-item style="width: 100px;">
            <el-select v-model="form2.value" placeholder="请选择" size="small">
              <el-option label="邮箱" value="邮箱"></el-option>
              <el-option label="姓名" value="姓名"></el-option>
              <el-option label="电话号码" value="电话号码"></el-option>
              <el-option label="出生年月" value="出生年月"></el-option>
              <el-option label="性别" value="性别"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form2.input" size="small" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="onSubmit()">查询</el-button>
            <el-button type="primary" size="small" @click="onSubmit()">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-button type="primary" size="small" icon="el-icon-plus" @click="prepare_add()">新增</el-button>
        <el-button type="primary" size="small">提交修改</el-button>
      </div>
      <el-divider></el-divider>
      <el-table
        v-loading="loading"
        element-loading-text="永远相信,美好的事情即将发生."
        :data="data"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="id"
          label="id"
          width="60">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="电话号码">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="gender"
          label="性别">
        </el-table-column>
        <el-table-column
          prop="date"
          label="出生年月">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <el-link
              type="primary"
              size="medium"
              @click="query(scope.row.id)"
              class="mr-2"
              plain>修改</el-link>
            <el-link
              type="primary"
              size="medium"
              @click="deleted(scope.row.id)"
              plain>删除</el-link>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card shadow="never">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="35%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="邮箱">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="form.gender"></el-input>
        </el-form-item>
        <el-form-item label="出生年月">
          <el-date-picker
            v-model="form.date"
            type="date"
            format="yyyy.MM.dd"
            value-format="yyyy.MM.dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="add_update()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import Breadcrumb from '@/components/Breadcrumb'

  export default {
    name: "",
    components:{
      Breadcrumb,
    },
    data() {
      return {
        data: [],  // 数据源
        currentPage: 1,  // （分页）默认前往第一页
        pageNum: 1,  // （分页）默认显示第一页
        pageSize: 10,  // （分页）默认每页显示10条数据
        total: 0,  // （分页）一共有多少条数据
        loading: false,  // 默认显示加载状态
        dialogVisible: false,  // 默认不打开模拟窗
        title: '',  // 模拟窗默认标题
        /*
        * form表单
        * */
        form: {
          id: '',
          email: '',
          phone: '',
          name: '',
          gender: '',
          date: ''
        },
        form2: {
          value: '邮箱',
          input: '',
        },
        index: 0,
      }
    },
    mounted() {
      this.list();
    },
    methods: {
      add() {
        let postData = {
          'id': this.data.length,
          'email': this.form.email,
          'phone': this.form.phone,
          'name': this.form.name,
          'gender': this.form.gender,
          'date': this.form.date
        };

        this.dialogVisible = false;
        this.data.splice(0, 0, postData);
      },
      update() {
        let postData = {
          'id': this.form.id,
          'email': this.form.email,
          'phone': this.form.phone,
          'name': this.form.name,
          'gender': this.form.gender,
          'date': this.form.date
        };

        this.dialogVisible = false;
        this.data.splice(this.index, 1, postData);
        this.$message.success('修改成功');
      },
      deleted(index) {
        let id;
        for (let i=0; i<this.data.length; i++) {
          if (this.data[i].id === index) {
            id = i;
            this.index = i;
            break;
          }
        }
        this.data.splice(id, 1);
        this.$message.success('删除成功');
      },
      query(index) {
        this.title = '编辑';
        let id;
        for (let i=0; i<this.data.length; i++) {
          if (this.data[i].id === index) {
            id = i;
            this.index = i;
            break;
          }
        }
        this.form.id = this.data[id].id;
        this.form.email = this.data[id].email;
        this.form.phone = this.data[id].phone;
        this.form.name = this.data[id].name;
        this.form.gender = this.data[id].gender;
        this.form.date = this.data[id].date;

        this.dialogVisible = true;
      },
      list() {
        let postData = {
          'id': 0,
          'email': '10086@qq.com',
          'phone': '10086',
          'name': '中国移动',
          'gender': '男',
          'date': '2020.08.05',
        };
        let postData2 = {
          'id': 1,
          'email': '10010@qq.com',
          'phone': '10010',
          'name': '中国联通',
          'gender': '男',
          'date': '2020.08.05',
        };
        let postData3 = {
          'id': 2,
          'email': '10000@qq.com',
          'phone': '10000',
          'name': '中国电信',
          'gender': '男',
          'date': '2020.08.05',
        };

        this.data.splice(0, 0, postData);
        this.data.splice(0, 0, postData2);
        this.data.splice(0, 0, postData3);
      },
      /*
      * 准备新增
      * 修改模拟窗标题为新增
      * 清空所有form表单
      * */
      prepare_add() {
        this.title = '新增';
        this.dialogVisible = true;
        this.form.id = '';
        this.form.email = '';
        this.form.phone = '';
        this.form.name = '';
        this.form.gender = '';
        this.form.date = '';
      },
      /*
      * 判断是新增还是修改
      * 根据摸模拟窗标题来判断
      * */
      add_update() {
        this.title === '新增' ? this.add() : this.update();
      },
      /*
      * 每页显示数据大小
      * */
      handleSizeChange(pageSize) {
        this.pageSize = pageSize;
        this.list();
      },
      /*
      * 查看第几页
      * */
      handleCurrentChange(pageNum) {
        this.pageNum = pageNum;
        this.list();
      },
      onSubmit() {

      }
    },
  }
</script>

<style scoped>

</style>
