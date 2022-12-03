<template>
    <div class="home" style="margin-top:10px;height: 99%">
        <div id="myChart1" ></div>
        <div id="myChart2" > </div>
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
            this.initData();
            this.drawLine1();
            this.drawLine2();
        },
        methods: {

            async initData() {
                const second45 = [];
                const delay45 = [];
                const count45 = [];
                const Adelay45 = [];


                var sum45 = 0;
                var sumsend = 0;
                var sumserver = 0;
                let formData = new FormData();
                formData.append("path", "result1.txt");
                await instance.post("/getData", formData).then(res => {
                    for (let re of res) {
                        second45.push(re.second);
                        delay45.push(re.delay);
                        count45.push(re.count);
                        sum45 += Number(re.delay);
                        // console.log(sum45 + "   " + delay45.length + "   " + re.delay)
                        Adelay45.push(sum45 / delay45.length)
                    }

                });
                const secondSend = [];
                const delaySend = [];
                const countSend = [];
                const AdelaySend = [];
                let formData1 = new FormData();
                formData1.append("path", "result2.txt");
                await instance.post("/getData", formData1).then(res => {
                    for (let re of res) {
                        secondSend.push(re.second);
                        delaySend.push(re.delay);
                        countSend.push(re.count);
                        sumsend += Number(re.delay);
                        AdelaySend.push(sumsend / delaySend.length)

                    }
                });
                function cusval(num){
                    return Math.round((num + Number.EPSILON) * 10000) / 10000;
                }
                const secondServer = [];
                const delayServer = [];
                const countServer = [];
                const AdelayServer = [];
                let formData2 = new FormData();
                formData2.append("path", "result3.txt");
                await instance.post("/getData", formData2).then(res => {
                    for (let re of res) {
                        secondServer.push(re.second);
                        delayServer.push(re.delay);
                        countServer.push(re.count);
                        sumserver += Number(re.delay);
                        AdelayServer.push(sumserver / delayServer.length)

                    }
                });
                console.log(sum45)
                console.log(sumsend)
                console.log(sumserver)
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
                this.chart2.setOption({

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
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: ['45', 'send', 'server'],
                            axisTick: {
                                alignWithLabel: true
                            },
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
                            },
                            name: '平均时延(秒)',
                        }
                    ],

                    series: [
                        {
                            name: 'Direct',
                            type: 'bar',
                            barWidth: '30%',
                            data: [cusval(sum45/Adelay45.length),cusval(sumsend/AdelaySend.length),cusval(sumserver/AdelayServer.length)],
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true, //开启显示数值
                                        position: 'bottom', //数值在上方显示
                                        textStyle: {  //数值样式
                                            color: '#f268ff',   //字体颜色
                                            fontSize: 14  //字体大小
                                        }
                                    },
                                    color: function (params) {
                                        var color=['#5af506', '#9303f8', '#db673a'];
                                        return color[params.dataIndex]
                                    }
                                }
                            },

                        },
                    ]
                    /*
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
                            data: Adelay45
                        },
                        {
                            name: '发送端',
                            type: 'line',
                            stack: 'Total',
                            data: AdelaySend
                        },
                        {
                            name: '服务端',
                            type: 'line',
                            stack: 'Total',
                            data: AdelayServer
                        },
                    ]*/
                });
            },
            drawLine1() {
                this.chart1 = $echarts.init(document.getElementById('myChart1'));
                let option = {
                    title: {
                        text: '段平均时延图',
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
                    animationDuration: 5000, // 动画时长  单位毫秒
                    series: []
                };
                this.chart1.setOption(option);
            },
            drawLine2() {
                this.chart2 = $echarts.init(document.getElementById('myChart2'));
                let option = {
                    title: {
                        text: '节点平均时延图',
                        textStyle: {
                            fontSize: 20,
                            color: '#009229',
                        },
                        left: 'right'
                    },

                    color: ['#5af506', '#9303f8', '#db673a'],
                    legend: {
                        data: ['45端口', '发送端', '服务端']
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: true,
                        data: []
                    },

                    yAxis: {
                        type: 'value'
                    },
                    animation: true,   // 开启动画
                    animationDuration: 5000, // 动画时长  单位毫秒

                };
                this.chart2.setOption(option);
            }
        }
    }
</script>

<style scoped>
/*    .div-inline{
        display: flex;
        border:1px solid red;
    }*/
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
    box-shadow: 0px 0px 5px 0PX white;
    margin-top: 4%;
    border-radius:5px;
    background-color: white;
}
</style>
