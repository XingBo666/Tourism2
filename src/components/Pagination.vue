<template>
  <!-- 分页模块 -->
  <el-card shadow="never">
    <el-pagination
      background
      :current-page="currentPage"
      :page-sizes="[10, 20, 30]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </el-card>
</template>

<script>
    export default {
      name: "Pagination",
      data() {
        return {
          currentPage: 1,  // （分页）默认前往第一页
          pageNum: 1,  // （分页）默认显示第一页
          pageSize: 10,  // （分页）默认每页显示10条数据
          total: 10,  // （分页）一共有多少条数据
        }
      },
      methods: {

      }
    }
</script>

<style scoped>

</style>
