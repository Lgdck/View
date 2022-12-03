<template>
  <div>
    <div id="myChart1" :style="{width:'100%',height:'600px'}"> </div>
  </div>
</template>

<script>
  import * as $echarts from 'echarts';
  import instance from "../network";
  export default {
    name: "allData",
    data() {
      return {
        chart1: '',
        chart2: ''
      }
    },
    mounted() {
      this.drawLine1();
      this.initData();
    },
    methods: {
      async initData() {
        const second45 = [];
        const delay45 = [];
        const count45 = [];
        let formData = new FormData();
        formData.append("path", "result1.txt");
        await instance.post("/getData", formData).then(res => {
          for (let re of res) {
            second45.push(re.second);
            delay45.push(re.delay);
            count45.push(re.count);
          }
        });
        const secondSend = [];
        const delaySend = [];
        const countSend = [];
        let formData1 = new FormData();
        formData1.append("path", "result2.txt");
        await instance.post("/getData", formData1).then(res => {
          for (let re of res) {
            secondSend.push(re.second);
            delaySend.push(re.delay);
            countSend.push(re.count);
          }
        });
        const secondServer = [];
        const delayServer = [];
        const countServer = [];
        let formData2 = new FormData();
        formData2.append("path", "result3.txt");
        await instance.post("/getData", formData2).then(res => {
          for (let re of res) {
            secondServer.push(re.second);
            delayServer.push(re.delay);
            countServer.push(re.count);
          }
        });
        this.chart1.setOption({
          xAxis: {
            data: second45,
            name: '时间(秒)',
            nameTextStyle: {
              color: '#0e9e9e',
              fontSize: 10,
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#0e9e9e',
                fontSize: 15,
              },
              //解决横坐标自动隐藏问题
              // interval: 0
            }
          },
          yAxis: {
            type: 'value',
            name: '时延(秒)',
            nameTextStyle: {
              color: '#0e9e9e',
              fontSize: 15,
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#0e9e9e',
                fontSize: 15,
              },
            }
          },
          series: [
            {
              name: '45端口',
              type: 'line',
              stack: 'Total',
              data: delay45
            },
            {
              name: '发送端',
              type: 'line',
              stack: 'Total',
              data: delaySend
            },
            {
              name: '服务端',
              type: 'line',
              stack: 'Total',
              data: delayServer
            },
          ]
        });
      },
      drawLine1() {
        this.chart1 = $echarts.init(document.getElementById('myChart1'));
        let option = {
          title: {
            text: '时间时延图',
            textStyle: {
              fontSize: 20,
              color: '#009229',
            },
            left: 'right'
          },
          tooltip: {
            trigger: 'axis'
          },
          color: ['#5af506', '#9303f8', '#db673a'],
          legend: {
            data: ['45端口', '发送端', '服务端']
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
            data: []
          },
          yAxis: {
            type: 'value'
          },
          animation: true,   // 开启动画
          animationDuration: 20000, // 动画时长  单位毫秒
          series: []
        };
        this.chart1.setOption(option);
      },
    }
  }
</script>

<style scoped>

</style>