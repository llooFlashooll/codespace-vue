<template>

  <el-card>
    <div slot="header">
      <span>提交</span>
    </div>
    <el-select v-model="language" placeholder="请选择语言" @change="selectLanguage">
      <el-option
        v-for="item in languages"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <br>
    <br>
    <el-input
      v-model="code"
      type="textarea"
      :rows="20"
      placeholder="请输入代码"
    />
    <br>
    <br>
    <el-button type="primary" @click="submit">提交</el-button>
  </el-card>
</template>

<script>
export default {
  name: 'Submit',
  data() {
    return {
      code: '',
      languages: [
        {
          value: '0',
          label: 'c++'
        }
      ],
      language: 'c++',
      languageId: 0,
      problemId: 1000,
      userId: 3
    }
  },

  created() {
    if (this.$route.query) {
      this.problemId = this.$route.query.problemId

      // 通过用户id绑定提交记录
      this.userId = sessionStorage.getItem('userid')
    }
  },
  methods: {
    submit: function() {
      // console.log(this.code);

      // const url='http://localhost:8081/';
      const url = 'http://106.15.234.251:8081/'
      this.$axios.post(url + 'problem/judge',
        { language: this.language,
          languageId: this.languageId,
          problem_id: this.problemId,
          uid: this.userId,
          submissionCode: this.code
        })
        .then((response) => {
          console.log(response)
          alert(response.data.data.submissionJudgeResult +
                '' +
                response.data.data.error)
          this.$router.push({
            path: '/status'
          }
          )
        })
    },

    selectLanguage: function(id) {
      console.log(this.languages[id])
      this.language = this.languages[id].label
      this.languageId = id
    }
  }
}
</script>

<style scoped>

</style>
