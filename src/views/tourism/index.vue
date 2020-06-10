<template>
  <el-container class="home_container">

    <!-- 首页左边导航模块 -->
    <el-aside :width="aside_width" class="gdt" style="transition: 0.5s;">
      <Left_menu ref="Left_menu"></Left_menu>
    </el-aside>

    <!-- 首页右边主要模块 -->
    <el-container>
      <!-- 头部模块 -->
      <el-header class="p-0">
        <el-card shadow="never" class="text-right">
          <i :class="icon" style="float: left; font-size: 22px;" @click="collapse()"></i>
          <el-dropdown class="mr-5" @command="handleCommand">
            <span class="el-dropdown-link">
              {{user.name}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item divided command="退出登录">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-card>
      </el-header>
      <!-- 主要导航显示模块 -->
      <el-main class="p-0 pt-1" style="background-color: #f1f2f9;"><router-view/></el-main>
    </el-container>

  </el-container>
</template>

<script>
  import Left_menu from '@/components/Left-menu'

  export default {
    name: "index",
    components:{
      Left_menu,
    },
    data() {
      return {
        user: '',
        aside_width: '202px',
        icon: 'el-icon-s-fold',
      };
    },
    mounted() {
      if (this.$cookie.getCookie('user') === '') {
        this.$router.push({path:'/'});
      } else {
        this.user = JSON.parse(this.$cookie.getCookie('user'));
      }
    },
    methods: {
      /*
      * 退出登录
      * */
      exitLogin() {
        this.$cookie.delCookie('user');
        this.$router.push({path:'/'});
      },
      /*
      * 设置左边导航栏宽度
      * */
      collapse() {
        if (this.$refs.Left_menu.isCollapse === false) {
          this.$refs.Left_menu.isCollapse = true;
          this.aside_width = '66px';
          this.icon = 'el-icon-s-unfold';
        } else {
          this.$refs.Left_menu.isCollapse = false;
          this.aside_width = '202px';
          this.icon = 'el-icon-s-fold';
        }
        // this.isCollapse === false? this.isCollapse = true : this.isCollapse = false;
      },
      /*
      * 右边顶部退出登陆
      * */
      handleCommand(command) {
        if (command === '退出登录') {this.exitLogin();}
      }
    },
  }
</script>

<style scoped>
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .gdt::-webkit-scrollbar {
    /* 这里的宽是指竖向滚动条的宽，高是指横向滚动条的高*/
    width: 0;
    height: 0;
  }
</style>
