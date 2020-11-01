<template>
  <div>
    <Header></Header>
    <div class="mblog">
      <h2>{{blog.title}}</h2>
      <el-divider></el-divider>
      <div v-html="blog.content"></div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
export default {
  name: "BlogDetail.vue",
  components: {Header},
  data(){
    return {
      blog: {
        title: "moren",
        content: "neirong"
      }
    }
  }
}
</script>

<style scoped>
  .mblog {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    widows: 100%;
    min-height: 700px
  }

</style>