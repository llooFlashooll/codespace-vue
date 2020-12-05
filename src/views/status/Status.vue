<template>
  <div class="status_container">

    <el-card>
      <el-input v-model="query" placeholder="请输入要查找的题号">
        <el-button slot="append" icon="el-icon-search" @click="getStatusList" />
      </el-input>
    </el-card>

    <el-row>
      <el-table :data="statusList">
        <el-table-column label="提交编号" prop="submissionId" />

        <el-table-column label="用户编号" prop="uid" />

        <el-table-column label="语言" prop="languageId" />

        <el-table-column label="题目编号" prop="problemId" />

        <el-table-column label="评测结果" prop="submissionJudgeResult" />

        <el-table-column label="提交时间" prop="submissionSubmitTime" />

        <el-table-column label="消耗内存" prop="submissionUsedMemory" />

        <el-table-column label="消耗时间" prop="submissionUsedTime" />

        <el-table-column label="查看代码">
          <template slot-scope="scope">
            <el-button type="primary" @click="showCode(scope.row)">代码</el-button>
          </template>
        </el-table-column>

        <el-table-column label="查看完整代码">
          <template slot-scope="scope">
            <el-button type="primary" @click="showAllCode(scope.row)">完整代码</el-button>
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
  name: 'Status',
  data() {
    return {
      statusList: [],
      total: 0,
      pagenum: 1,
      pagesize: 5,
      query: ''
    }
  },
  created() {
    this.getStatusList()
  },
  methods: {
    getStatusList: function() {
      // const url='http://localhost:8081/';
      const url = 'http://106.15.234.251:8081/'
      this.$axios.get(url + 'statusList',
        { params: { pagenum: this.pagenum, pagesize: this.pagesize, query: this.query }})
        .then((response) => {
          console.log(response)
          const data = response.data
          if (data.code === 200) {
            this.statusList = data.data.statusList
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
      this.getStatusList()
    },

    showCode: function(statusInfo) {
      this.$alert('<pre>' + statusInfo.submissionCode + '</pre>', '代码', {
        dangerouslyUseHTMLString: true
      })
    },

    showAllCode: function(statusInfo) {
      // console.log(statusInfo.submissionCode);
      this.$router.push({
        path: '/status/code',
        query: {
          submissionId: statusInfo.submissionId
        }
      })
    //   location='/code?submissionId='+statusInfo.submissionId;
    }
  }
}
</script>

<style scoped>
.status_container {
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 10px;
}
</style>
