<template>
  <div class="userbloglist_container">
    <div>
      <el-button type="primary" @click="newBlog()">新建博客</el-button>
      <br>
      <br>
      <el-timeline>
        <el-timeline-item v-for="blog in blogList" :key="blog.blogId" :timestamp="blog.submitDate" placement="top">
          <el-card>
            <h4>
              <router-link :to="{path: '/blog/blogDetail', query:{blogId:blog.blogId}}">
                {{ blog.blogTitle }}
              </router-link>
            </h4>
          </el-card>
        </el-timeline-item>
      </el-timeline>

    </div>

    <!--分页-->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="pagesize"
      :current-page="pagenum"
      @current-change="handleCurrentChange"
    />

  </div>
</template>

<script>
export default {
  name: 'UserBlogList',
  data() {
    return {
      blogList: [],
      total: 0,
      pagenum: 1,
      pagesize: 2,
      userId: '3'
    }
  },
  created() {
    this.userId = sessionStorage.getItem('userid')
    this.getBlogList()
  },
  methods: {
    getBlogList: function() {
      // const url='http://localhost:8081/';
      const url = 'http://106.15.234.251:8081/'
      this.$axios.get(url + 'blog/getByUserId',
        { params: { pagenum: this.pagenum,
          pagesize: this.pagesize,
          userId: this.userId }})
        .then((response) => {
          // console.log(response);
          const data = response.data
          if (data.code === 200) {
            this.blogList = data.data.blogList
            this.total = data.data.total

            // console.log(this.problemList);
          } else {
            console.log(data.msg)
            alert(data.msg)
          }
        })
    },

    handleCurrentChange: function(newnum) {
      this.pagenum = newnum
      console.log(this.pagenum)
      this.getBlogList()
    },

    newBlog: function() {
      this.$router.push({
        path: '/blog/edit',
        query: {
          blogId: 0
        }
      })
    }
  }
}
</script>

<style scoped>
.userbloglist_container {
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 10px;
}
</style>
