<template>
  <div>
    <Header></Header>

    <div class="block">
      <el-timeline>
        <el-timeline-item timestamp="2020/11/01" placement="top">
          <el-card>
            <h4>
              <router-link :to="{name: 'BlogDetail', params: {}}">
                更新 Github 模板
              </router-link>
            </h4>
            <p>Flash 提交于 2020/11/01 14:30</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
    <el-pagination class="mpage"
        background
        layout="prev, pager, next"
                   :current-page="currentPage"
                   :page-size="pageSize"
                   :total="total"
                   @current-change = page
    >
    </el-pagination>
  </div>
</template>

<script>
  import Header from "../components/Header";
  export default {
    name: "Blogs.vue",
    components: {Header},
    methods: {
      page(currentPage) {
        const _this = this
      }
    },
    created() {

    }
  }
</script>

<style scoped>
  .mpage {
    margin: 0 auto;
    text-align: center;
  }
</style>