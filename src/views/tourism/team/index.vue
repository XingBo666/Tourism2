<template>
  <div>
    <Breadcrumb />
    <el-card shadow="never">
      <div style="float: left;">
        <img
          src="https://s1.ax1x.com/2020/06/07/tgemIf.jpg"
          alt
          style="width: 50px; height: 50px; border-radius: 50%;"
        />
        <span style="color: #909399;">团长</span>
        <!--功能按钮-->
        <div style="margin-top: 20px;margin-bottom: 20px;">
          <el-button @click = "$router.push('/tourism/team/index/join')">我参与的活动</el-button>
          <el-button @click = "$router.push('/tourism/team/index/create')">我创建的活动</el-button>
        </div>
        <router-view />
      </div>
    </el-card>
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
    return {};
  }
};
</script>

<style scoped>
</style>
