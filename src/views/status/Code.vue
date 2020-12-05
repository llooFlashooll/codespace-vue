<template>
  <div class="code_container">
    <el-card>
      <pre>{{ code }}</pre>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Code',
  data() {
    return {
      submissionId: 1,
      code: ''
    }
  },
  created() {
    if (this.$route.query) {
      this.submissionId = this.$route.query.submissionId
      this.getCode()
    }
  },
  methods: {
    getCode: function() {
      // const url='http://localhost:8081/';
      const url = 'http://106.15.234.251:8081/'
      this.$axios.get(url + 'getStatusById',
        { params: { submissionId: this.submissionId }})
        .then((response) => {
          // console.log(response);
          console.log('代码获取成功')
          const data = response.data
          if (data.code === 200) {
            this.code = data.data.submissionCode
          } else {
            console.log(data.msg)
            alert(data.msg)
          }
        })
    }
  }
}
</script>

<style scoped>
.code_container {
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 10px;
}
</style>
