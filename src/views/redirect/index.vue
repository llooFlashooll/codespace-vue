<script>
// 页面路由重定位
// 重定向地址，在面包屑中点击会重定向去的地址
export default {
  created() {
    const { params, query } = this.$route
    const { path } = params
    this.$router.replace({ path: '/' + path, query })
  },
  render: function(h) {
    return h() // avoid warning message
  }
}
</script>
