<template>
  <div class="problemList_container">

    <el-card>
      <el-input v-model="query" placeholder="请输入要查找的题号">
        <el-button slot="append" icon="el-icon-search" @click="getProblemList" />
      </el-input>
    </el-card>

    <el-row>
      <el-table :data="problemList">
        <el-table-column label="题目序号" prop="problemId" />

        <el-table-column label="题目名称" prop="problemName" />

        <el-table-column label="题目链接">
          <template slot-scope="scope">
            <el-button type="primary" @click="toProblem(scope.row)">查看题目</el-button>
          </template>
        </el-table-column>

        <el-table-column label="通过率">
          <template slot-scope="scope">
            <p>{{ scope.row.problemAcceptCnt }}/{{ scope.row.problemSubmitCnt }}</p>
          </template>
        </el-table-column>

      </el-table>

      <!--分页-->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="pagesize"
        :current-page="pagenum"
        @current-change="handleCurrentChange"
      />
    </el-row>
  </div>
</template>

<script>

export default {
  name: 'ProblemList',
  data() {
    return {
      problemList: [],
      total: 0,
      pagenum: 1,
      pagesize: 5,
      query: ''
    }
  },
  created() {
    this.getProblemList()
  },
  methods: {
    getProblemList: function() {
      // const url='http://localhost:8081/';
      const url = 'http://106.15.234.251:8081/'
      this.$axios.get(url + 'problemList',
        { params: { pagenum: this.pagenum, pagesize: this.pagesize, query: this.query }})
        .then((response) => {
        // console.log(response);
          const data = response.data
          if (data.code === 200) {
            this.problemList = data.data.problemList
            this.total = data.data.total
          } else {
            console.log(data.msg)
            alert(data.msg)
          }
        })
    },

    toProblem: function(problemInfo) {
      console.log(problemInfo.problemId)
      this.$router.push({
        path: '/problem/problem',
        query: {
          problemId: problemInfo.problemId
        }
      })
    },

    handleCurrentChange: function(newnum) {
      this.pagenum = newnum
      console.log(this.pagenum)
      this.getProblemList()
    }
  }
}
</script>

<style scoped>
.problemList_container {
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
}
</style>
