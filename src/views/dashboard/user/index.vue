<template>
  <div class="dashboard-editor-container">

    <!-- 走马灯用于播放图片 -->
    <el-carousel :interval="4000" type="card" height="300px">
      <el-carousel-item v-for="item in list_img" :key="item">
        <img ref="imgHeight" :src="item.url" width="100%" height="100%" object-fit="cover">
      </el-carousel-item>
    </el-carousel>

    <panel-group @handleSetLineChartData="handleSetLineChartData" />

    <el-row class="dashboard-chart-container">
      <line-chart :chart-data="lineChartData" />
    </el-row>

    <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <todo-list />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <box-card />
      </el-col>
    </el-row>

    <!-- 添加卡片记录状态 -->
    <el-card v-for="(item,index) in news" :key="index" class="box-card" style="margin-bottom: 20px">
      <div slot="header" class="clearfix">
        <span>{{ item.title }} - {{ item.username }}</span>
        <span style="float: right">{{ item.time }}</span>
      </div>
      <div v-html="item.content" />
    </el-card>
  </div>
</template>

<script>
import GithubCorner from '@/components/GithubCorner'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import TodoList from './components/TodoList'
import BoxCard from './components/BoxCard'

// 可以添加后端获取访问数据api，用于显示

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'DashboardUser',
  components: {
    PanelGroup,
    LineChart,
    TodoList,
    BoxCard
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis,

      list_img: [
        { url: require('../../../assets/imagebox/carousel1.jpg')},
        { url: require('../../../assets/imagebox/carousel2.png')},
        { url: require('../../../assets/imagebox/carousel3.png')},
        { url: require('../../../assets/imagebox/carousel4.png')},
        { url: require('../../../assets/imagebox/carousel5.jpg')},
        { url: require('../../../assets/imagebox/carousel6.jpg')},
        { url: require('../../../assets/imagebox/carousel7.png')}
      ]
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-chart-container {
  background:#fff;
  padding:16px 16px 0;
  margin-bottom:32px;
}
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>
