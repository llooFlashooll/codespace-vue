<template>

  <div class="problem_container">

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h1>{{ problemId }}.{{ problemName }}</h1>
        <el-button style="display: flex " type="primary" @click="submit">提交</el-button>
      </div>

      <el-row>
        <h2>题目描述</h2>
        <el-scrollbar :native="false" wrap-style="" wrap-class="" view-class="" view-style="" noresize="true" tag="section">
          <pre>{{ problemDescription }}</pre>
        </el-scrollbar>
      </el-row>
      <el-row>
        <h2>输入格式</h2>
        <el-scrollbar :native="false" wrap-style="" wrap-class="" view-class="" view-style="" noresize="true" tag="section">
          <pre>{{ problemInputFormat }}</pre>
        </el-scrollbar>
      </el-row>
      <el-row>
        <h2>输出格式</h2>
        <el-scrollbar :native="false" wrap-style="" wrap-class="" view-class="" view-style="" noresize="true" tag="section">
          <pre>{{ problemOutputFormat }}</pre>
        </el-scrollbar>
      </el-row>
      <el-row>
        <h2>输入样例</h2>
        <el-scrollbar :native="false" wrap-style="" wrap-class="" view-class="" view-style="" noresize="true" tag="section">
          <pre>{{ problemSampleInput }}</pre>
        </el-scrollbar>
      </el-row>
      <el-row>
        <h2>输出样例</h2>
        <el-scrollbar :native="false" wrap-style="" wrap-class="" view-class="" view-style="" noresize="true" tag="section">
          <pre>{{ problemSampleOutput }}</pre>
        </el-scrollbar>
      </el-row>
      <el-row>
        <h2>时间空内存限制</h2>
        <el-scrollbar :native="false" wrap-style="" wrap-class="" view-class="" view-style="" noresize="true" tag="section">
          <pre>时间限制:{{ problemTimeLimit }}s</pre>
          <pre>内存限制:{{ problemMemoryLimit }}KB</pre>
        </el-scrollbar>
      </el-row>
      <el-row>
        <h2>提示</h2>
        <el-scrollbar :native="false" wrap-style="" wrap-class="" view-class="" view-style="" noresize="true" tag="section">
          <pre class="hint">{{ problemHint }}</pre>
        </el-scrollbar>

      </el-row>
    </el-card>

  </div>
</template>

<script>
export default {
  name: 'Problem',
  data() {
    return {
      problemId: 1000,
      problemDescription: '',
      problemHint: '',
      problemInputFormat: '',
      problemMemoryLimit: 65536,
      problemName: '',
      problemOutputFormat: '',
      problemSampleInput: '',
      problemSampleOutput: '',
      problemTimeLimit: 1000
    }
  },
  created() {
    if (this.$route.query) {
      this.problemId = this.$route.query.problemId
      this.getProblem()
    }
  },
  methods: {
    getProblem: function() {
      // const url='http://localhost:8081/';
      const url = 'http://106.15.234.251:8081/'
      this.$axios.get(url + 'problem',
        { params: { problemId: this.problemId }})
        .then((response) => {
          // console.log(response);
          console.log('题目获取成功')
          const data = response.data
          if (data.code === 200) {
            this.problemDescription = data.data.problemDescription
            this.problemHint = data.data.problemHint
            this.problemInputFormat = data.data.problemInputFormat
            this.problemOutputFormat = data.data.problemOutputFormat
            this.problemMemoryLimit = data.data.problemMemoryLimit
            this.problemName = data.data.problemName
            this.problemSampleInput = data.data.problemSampleInput
            this.problemSampleOutput = data.data.problemSampleOutput
            this.problemTimeLimit = data.data.problemTimeLimit
            console.log(data.data)
          } else {
            console.log(data.msg)
            alert(data.msg)
          }
        })
    },

    submit: function() {
      this.$router.push({
        path: '/problem/submit',
        query: {
          problemId: this.problemId
        }
      })
      // location='/submit?problemId='+this.problemId;
      // location='/problem?problemId=1001';
    }
  }
}
</script>

<style scoped>
.hint{
  border-style:solid;
  border-color: aliceblue;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

pre{
  font-weight: bold;
  font-size: large;
}

.problem_container {
    margin-top: 10px;
    margin-left: 10px;
    margin-right: 10px;
}
</style>
