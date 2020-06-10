<template>
  <div class="home_container bg-info">
    <div class="card">
      <div class="card__header" style="display: flex;">
        <div style="display: flex;">
          <span style="background-color: #f98077;"></span>
          <span style="background-color: #fdce52;"></span>
          <span style="background-color: #61d56d;"></span>
        </div>
        <div style="display: inline-block; background-color: white; border-radius: 5px; padding: 5px; width: 400px; margin-left: 115px;">
          <p class="m-0 text-center">{{url}}</p>
        </div>
      </div>
      <div class="text-center">
        <h1 class="mb-0" style="font-size: 100px; margin-top: 100px;">404</h1>
        <h2 class="m-0">页面不见了</h2>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "my404",
    data() {
      return {
        url: '',
      }
    },
    mounted() {
      this.url = window.location.href;
    }
  }
</script>

<style scoped>
  .card {
    width: 800px;
    height: 500px;
    border-radius: 10px;
    background-color: white;
    border: 1px solid #E4E7ED;
    margin: 0 auto;
    margin-top: 100px;
  }
  .card__header {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background-color: #eff0f3;
    padding: 10px;
  }
  .card__header span {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    display: inline-block;
    margin-right: 10px;
  }
</style>
