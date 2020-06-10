<template>
  <el-card shadow="never">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="data in matchedName" :key="data.path">{{data.name}}</el-breadcrumb-item>
    </el-breadcrumb>
  </el-card>
</template>

<script>
    export default {
      name: "Breadcrumb",
      data() {
        return {
          matchedName: [],
        }
      },
      mounted() {
        this.matchedName = this.$route.matched;
      }
    }
</script>

<style scoped>

</style>
