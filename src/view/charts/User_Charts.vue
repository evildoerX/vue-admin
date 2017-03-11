<template>
  <section class="chart-container">
    <el-row>
      <el-col :span="24">
        <h3>用户数据统计</h3>
        <el-date-picker v-model="value7" type="daterange" align="right" placeholder="选择日期范围" :picker-options="pickerOptions2">
        </el-date-picker>
        <div id="chartLine1" style="width:100%; height:400px;"></div>
      </el-col>
      <el-col :span="24">
        <h3>用户与圈子统计</h3>
        <el-date-picker v-model="value2" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions1">
        </el-date-picker>
        <div id="chartBar1" style="width:100%; height:400px;"></div>
      </el-col>
    </el-row>
  </section>
</template>

<script>
  import echarts from 'echarts'

  export default {
    data() {
      return {
        chartBar1: null,
        chartLine1: null,
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value7: '',
        pickerOptions1: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        value2: ''
      }
    },
    mounted: function () {
      var _this = this;
      //基于准备好的dom，初始化echarts实例
      this.chartBar1 = echarts.init(document.getElementById('chartBar1'));
      this.chartLine1 = echarts.init(document.getElementById('chartLine1'));

      this.chartBar1.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['IP', 'PV']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: ['圈子1', '圈子2', '圈子3', '圈子4', '圈子5', '圈子6']
        },
        series: [
          {
            name: 'IP',
            type: 'bar',
            data: [18203, 23489, 29034, 104970, 131744, 630230]
          },
          {
            name: 'PV',
            type: 'bar',
            data: [19325, 23438, 31000, 121594, 134141, 681807]
          }
        ]
      });

      this.chartLine1.setOption({
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['IP', 'PV']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'IP',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: 'PV',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310]
          }
        ]
      });
    }

  }

</script>

<style scoped>
  .chart-container {
    width: 100%;
    float: left;
  }
  /*.chart div {
      height: 400px;
      float: left;
  }*/

  .el-col {
    padding: 30px 20px;
  }
</style>
