<template>
  <div>
    <Breadcrumb />
    <el-card shadow="never">
      <div style="float: left;">
        <img src="https://s1.ax1x.com/2020/06/07/tgemIf.jpg" alt="" style="width: 50px; height: 50px; border-radius: 50%;" />
        <span style="color: #909399;">团长</span>
      </div>
      <div style="display: flex; flex-direction: row-reverse;">
        <div class="ml-3 mr-3">
          <p class="m-0" style="font-size: 15px; color: #909399;">团队活动访问</p>
          <p class="mt-1" style="font-size: 25px;">2,223</p>
        </div>
        <div class="ml-3 mr-3">
          <p class="m-0" style="font-size: 15px; color: #909399;">团队内排名</p>
          <p class="mt-1" style="font-size: 25px;">8<span style="font-size: 15px; color: #909399;">/24</span></p>
        </div>
        <div class="ml-3 mr-3">
          <p class="m-0" style="font-size: 15px; color: #909399;">团队数</p>
          <p class="mt-1" style="font-size: 25px;">56</p>
        </div>
      </div>
      <el-row type="flex" class="mt-5" justify="center">
        <el-col :span="14">
          <div class="mb-5">
            <el-steps :active="active" finish-status="success">
              <el-step title="活动信息"></el-step>
              <el-step title="参加成员"></el-step>
              <el-step title="费用支付"></el-step>
            </el-steps>
          </div>

          <el-row type="flex" justify="center" v-show="active === 1">
            <el-col :span="16">
              <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="活动内容：">
                  <el-input type="textarea" v-model="form.desc" placeholder="多行输入"></el-input>
                </el-form-item>
                <el-form-item label="活动总费用：">
                  <el-input v-model="form.money" size="medium" placeholder="单行输入"></el-input>
                </el-form-item>
                <el-form-item label="收款账户：">
                  <el-form :inline="true" :model="form" class="demo-form-inline">
                    <el-form-item style="width: 100px;">
                      <el-select v-model="form.value" placeholder="请选择" size="medium">
                        <el-option label="支付宝" value="支付宝"></el-option>
                        <el-option label="微信" value="微信"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item>
                      <el-input v-model="form.user" size="medium" placeholder="请输入" style="width: 270px;"></el-input>
                    </el-form-item>
                  </el-form>
                </el-form-item>
                <el-form-item class="mt-5">
                  <el-button type="primary" size="medium" style="width: 200px;" @click="next()">下一步</el-button>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>

          <el-row type="flex" class="row-bg" justify="center" v-show="active === 2">
            <el-col :span="24">
              <el-table
                :data="data"
                style="width: 100%">
                <el-table-column
                  prop="name"
                  label="成员姓名">
                </el-table-column>
                <el-table-column
                  prop="work"
                  label="工号">
                </el-table-column>
                <el-table-column
                  prop="department"
                  label="所属部门">
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作">
                  <template slot-scope="scope">
                    <el-button
                      type="primary"
                      size="mini"
                      @click="query(scope.row.id)"
                      plain>编辑</el-button>
                    <el-button
                      size="mini"
                      type="danger"
                      @click="deleted(scope.row.id)"
                      plain>删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-dialog
                :title="title"
                :visible.sync="dialogVisible"
                width="35%">
                <el-form ref="form" :model="form2" label-width="80px">
                  <el-form-item label="成员姓名">
                    <el-input v-model="form2.name"></el-input>
                  </el-form-item>
                  <el-form-item label="工号">
                    <el-input v-model="form2.work"></el-input>
                  </el-form-item>
                  <el-form-item label="所属部门">
                    <el-input v-model="form2.department"></el-input>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="add_update()">确 定</el-button>
                </span>
              </el-dialog>
              <el-button type="primary" class="mt-3" style="width: 100%;" @click="prepare_add()">新增成员</el-button>

              <div class="text-center">
                <el-button type="primary" class="mt-5 mb-5" style="width: 200px;" @click="next2()">下一步</el-button>
              </div>
            </el-col>
          </el-row>

          <el-row type="flex" class="row-bg" justify="center" v-show="active === 3">
            <el-col :span="24">
              <el-table
                :data="data2"
                style="width: 100%">
                <el-table-column
                  prop="name"
                  label="Name">
                </el-table-column>
                <el-table-column
                  prop="country"
                  label="Country">
                </el-table-column>
                <el-table-column
                  prop="status"
                  label="Status">
                </el-table-column>
                <el-table-column
                  prop="birthday"
                  label="Birthday">
                </el-table-column>
                <el-table-column
                  prop="zip_code"
                  label="Zip Code">
                </el-table-column>
              </el-table>
              <div class="mt-5 mb-5 text-center">
                <el-button type="primary" class="mt-3 mr-3" style="width: 150px;" @click="prepare_add()">计算费用</el-button>
                <el-popover
                  placement="top-start"
                  title="悬浮信息"
                  width="200"
                  trigger="hover">
                  <div>
                    <p>点击按钮立刻导出 Excel</p>
                    <el-button type="success" size="medium" style="width: 150px;" icon="el-icon-download">导出 Excel</el-button>
                  </div>
                  <el-button slot="reference" class="mt-3 ml-3" style="width: 150px;">查看账单</el-button>
                </el-popover>
              </div>
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
          desc: '',
          money: '',
          user: '',
          value: '支付宝',
        },
        data: [],  // 数据源
        dialogVisible: false,  // 默认不打开模拟窗
        title: '',  // 模拟窗默认标题
        /*
        * form表单
        * */
        form2: {
          id: '',
          name: '',
          work: '',
          department: ''
        },
        active: 1,
        data2: [],  // 数据源
        index: 0,
      }
    },
    mounted() {
      this.list();
    },
    methods: {
      next() {
        if (this.form.desc !== '') {
          if (this.form.money !== '') {
            if (this.form.user !== '') {
              this.active = 2;
            } else {
              this.$message.warning('收款账户不能为空！');
            }
          } else {
            this.$message.warning('活动总费用不能为空！');
          }
        } else {
          this.$message.warning('活动内容不能为空！');
        }
      },
      next2() {
        this.active = 3;
      },
      returnSuccess() {
        this.active = 1;
        this.form.user = '';
        this.form.date = '';
        this.form.desc = '';
        this.form.money = '';
        this.form.money2 = '';
      },
      add() {
        let postData = {
          'id': this.data.length,
          'name': this.form2.name,
          'work': this.form2.work,
          'department': this.form2.department
        };

        this.data.splice(0, 0, postData);
        this.$message.success('添加成功');
        this.dialogVisible = false;
      },
      update() {
        let postData = {
          'id': this.form2.id,
          'name': this.form2.name,
          'work': this.form2.work,
          'department': this.form2.department
        };

        this.data.splice(this.index, 1, postData);
        this.$message.success('修改成功');
        this.dialogVisible = false;
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

        this.form2.id = this.data[id].id;
        this.form2.name = this.data[id].name;
        this.form2.work = this.data[id].work;
        this.form2.department = this.data[id].department;

        this.dialogVisible = true;
      },
      list() {
        let postData = {
          'id': 0,
          'name': '中国移动',
          'work': '10086',
          'department': '中国移动',
        };
        let postData2 = {
          'id': 1,
          'name': '中国联通',
          'work': '10010',
          'department': '中国联通',
        };
        let postData3 = {
          'id': 2,
          'name': '中国电信',
          'work': '10000',
          'department': '中国电信',
        };

        this.data.splice(0, 0, postData);
        this.data.splice(0, 0, postData2);
        this.data.splice(0, 0, postData3);

        let postData21 = {
          'id': 0,
          'name': 'Minnie Ford',
          'country': 'Ethiopia',
          'status': 'Transfering',
          'birthday': '11-03-2017',
          'zip_code': '91894-8699',
        };
        let postData22 = {
          'id': 1,
          'name': 'Marian Bryan',
          'country': 'Mauritania',
          'status': 'Success',
          'birthday': '08-15-2017',
          'zip_code': '45109-0193',
        };
        let postData23 = {
          'id': 2,
          'name': 'Nathaniel Arnold',
          'country': 'Dominican Republic',
          'status': 'Creaf ing',
          'birthday': '12-22-2017',
          'zip_code': '13177-4309',
        };
        let postData24 = {
          'id': 3,
          'name': 'Earl Harper',
          'country': 'Andorra',
          'status': 'Success',
          'birthday': '05-19-2017',
          'zip_code': '76562',
        };

        this.data2.splice(0, 0, postData21);
        this.data2.splice(0, 0, postData22);
        this.data2.splice(0, 0, postData23);
        this.data2.splice(0, 0, postData24);
      },
      /*
      * 准备新增
      * 修改模拟窗标题为新增
      * 清空所有form表单
      * */
      prepare_add() {
        this.title = '新增';
        this.dialogVisible = true;
        this.form2.id = '';
        this.form2.name = '';
        this.form2.work = '';
        this.form2.department = '';
      },
      /*
      * 判断是新增还是修改
      * 根据摸模拟窗标题来判断
      * */
      add_update() {
        this.title === '新增' ? this.add() : this.update();
      },

    }
  }
</script>

<style scoped>

</style>
