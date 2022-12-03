<template>
  <div class="containers">

    <div id="myChart1"></div>
    <div id="myChart2"></div>
  </div>
</template>

<script>
import * as $echarts from 'echarts';
import instance from "../network";
// import { ElLoading } from 'element-plus';

export default {
  name: "timeData",
  data() {
    return {
      chart1: '',
      chart2: '',
    }
  },
  mounted() {
    // 绘制左边的折线图
    this.drawLine1();
    // 绘制右侧的柱状图
    this.drawLine2();
    this.initData();
  },
  methods: {
    async initData() {
      // const loading = ElLoading.service({
      //               lock: true,
      //               text: '获取数据中......',
      //               background: 'rgba(0, 0, 0, 0.7)',
      // })
      const second45 = [];
      const delay45 = [];
      const count45 = [];
      let sum_45 = 0;
      let formData= new FormData();
      formData.append("path","result1.txt");
      await instance.post("/getData",formData).then(res => {
        for (let re of res){
          second45.push(re.second);
          delay45.push(re.delay);
          count45.push(re.count);
          sum_45 = sum_45 + parseInt(re.count)
        }
      });
      const secondSend = [];
      const delaySend = [];
      const countSend = [];
      let sum_send = 0;
      let formData1= new FormData();
      formData1.append("path","result2.txt");
      await instance.post("/getData",formData1).then(res => {
        for (let re of res){
          secondSend.push(re.second);
          delaySend.push(re.delay);
          countSend.push(re.count);
          sum_send = sum_send + parseInt(re.count)
        }
      });
      const secondServer = [];
      const delayServer = [];
      const countServer = [];
      let sum_server = 0;
      let formData2= new FormData();
      formData2.append("path","result3.txt");
      await instance.post("/getData",formData2).then(res => {
        for (let re of res){
          secondServer.push(re.second);
          delayServer.push(re.delay);
          countServer.push(re.count);
          sum_server = sum_server + parseInt(re.count)
        }
      });
      this.chart1.setOption({
        xAxis: {
          data: second45,
        },
        series: [        // Y轴的数据
          {
            name: '45端口',  // 每一个是一个Y轴的折线
            type: 'line',
            stack: 'Total',
            data: count45
          },
          {
            name: '发送端',
            type: 'line',
            stack: 'Total',
            data: countSend
          },
          {
            name: '服务端',
            type: 'line',
            stack: 'Total',
            data: countServer
          },
        ]
      });
      this.chart2.setOption({
          series: [
            {
              data: [
                {
                  value: sum_45,
                  itemStyle: {
                    color: '#5af506'
                  }
                },
                {
                  value: sum_send,
                  itemStyle: {
                    color: '#9303f8',
                  }
                },
                {
                  value: sum_server,
                  itemStyle: {
                    color: '#db673a'
                  }
                },

              ],
              type: 'bar',
              barWidth : 70,
              label: {
								show: true,
								position: 'top',
								color:'black',
                fontSize: 20,
							},
            }
          ]
        });
        // loading.close()
    },
    drawLine1() {
      this.chart1 = $echarts.init(document.getElementById('myChart1'));
      let option = {
        title: {
          text: '时间数据包图',
          textStyle: {
            fontSize: 20,
            color: '#009229',
          },
          left: 'right'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [],
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
          name: '数据包(个)',
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
        animation: true,
        animationDuration: 20000,
        series: [],
        tooltip: {
          trigger: 'axis'
        },
        color: ['#ff4141','#69fa20','#3358b3'],  // Y轴折线的颜色,与legend的data数据相匹配
        legend: {
          data: ['45端口', '发送端', '服务端'],
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
      };
      this.chart1.setOption(option);
    },
    drawLine2() {
        this.chart2 = $echarts.init(document.getElementById('myChart2'));
        let option = {
          title: {
            text: '节点平均数量图',
            textStyle: {
              fontSize: 20,
              color: 'blue',
            },
            left: 'right'
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: ['45端口', '发送端', '服务端']
          },
          yAxis: {
            type: 'value'
          },
          series: [],
          animation: true,   // 开启动画
          animationDuration: 20000, // 动画时长  单位毫秒
        };
        this.chart2.setOption(option);
      }
  }
}
</script>

<style scoped>
  .containers{
    /*padding: 0;*/
  /*  display: flex;*/
    margin-top:10px;
    height: 100%;
    /*border:1px solid red;*/
  }
  #myChart1{
    float:left;
    display:inline-block;
    width: 50% ;
    height: 83%;
   /* border:1px solid orange;*/
    box-shadow: 0px 0px 5px 0PX white;
    margin-top: 4%;
    border-radius:5px;
    background-color: white;
  }
  #myChart2{
    display:inline-block;
    float: right;
    width: 48% ;
    height: 83%;
   /* border:1px solid blue;*/
    margin-top: 4%;
    box-shadow: 0px 0px 5px 0PX white;
    border-radius:5px;
    background-color: white;
  }
</style>
