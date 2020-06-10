<template>
  <el-menu :default-active="$route.path"
           :router="true"
           :collapse="isCollapse"
           class="el-menu-vertical"
           background-color="#001529"
           text-color="#a5acb3"
           active-text-color="#fff"
           style="height: 100%;">
    <el-menu-item index="/" class="text-center">
      <p slot="title" class="m-0" style="font-weight: 600; color: #409EFF; font-size: 18px;">管理系统</p>
    </el-menu-item>

    <el-submenu index="/tourism/user">
      <template slot="title">
        <i class="el-icon-stopwatch"></i>
        <span slot="title">会员管理</span>
      </template>
      <el-menu-item index="/tourism/user/user-list">会员列表</el-menu-item>
      <el-menu-item index="/tourism/user/user-update">个人资料修改</el-menu-item>
<!--      <el-menu-item index="/tourism/user/members-update">会员资料修改</el-menu-item>-->
    </el-submenu>
    <el-submenu index="/tourism/group">
      <template slot="title">
        <i class="el-icon-stopwatch"></i>
        <span slot="title">组团</span>
      </template>
      <el-menu-item index="/tourism/group/index">队伍列表</el-menu-item>
      <el-menu-item index="/tourism/group/group-add">创建队伍</el-menu-item>
    </el-submenu>
    <el-menu-item index="/tourism/team/index">
      <i class="el-icon-s-order"></i>
      <span slot="title">团队活动</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
  export default {
    name: "Left-menu",
    data() {
      return {
        isCollapse: false,
      };
    },
    mounted() {
    },
    methods: {
    },
  }
</script>

<style scoped>
  .el-menu-vertical:not(.el-menu--collapse) {
    width: 200px;
  }
</style>
