<template>
    <div  class="home" style="margin-top:10px;height: 99%">
        <div id="myChart1"> </div>
        <div id="myChart2"> </div>
    </div>
</template>

<script>
    import * as $echarts from 'echarts';
    import instance from "../network";
    // import {ElLoading} from "element-plus";
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
            this.drawLine2();
        },
        methods: {

            async initData() {
                // const loading = ElLoading.service({
                //     lock: true,
                //     text: '读取数据中......',
                //     background: 'rgba(0, 0, 0, 0.7)',
                // })
                const second45 = [];
                const count45 = [];
                let totalnum45 = 0;
                let name = "stime_45"
                await instance.post("/datacount_time", JSON.stringify(name)).then(res => {
                    for (let re of res) {
                        second45.push(re.time);
                        count45.push(re.num);
                        totalnum45+=re.num;
                    }

                });
                const secondSend = [];
                const countSend = [];
                let totalnumsend = 0;
                let name1 = "stime_send"
                await instance.post("/datacount_time", JSON.stringify(name1)).then(res => {
                    for (let re of res) {
                        secondSend.push(re.time);
                        countSend.push(re.num);
                        totalnumsend+=re.num;
                    }
                });
                const secondServer = [];
                const countServer = [];
                let totalnumserver = 0;
                let name2 = "stime_server"
                await instance.post("/datacount_time", name2).then(res => {
                    for (let re of res) {
                        secondServer.push(re.time);
                        countServer.push(re.num);
                        totalnumserver+=re.num;
                    }
                });
                this.chart1.setOption({
                    xAxis: {
                        data: secondSend,
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
                        name: '数量(个)',
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
                            data: count45
                        },
                        {
                            name: '发送端',
                            type: 'line',
                            // stack: 'Total',
                            data: countSend
                        },
                        {
                            name: '服务端',
                            type: 'line',
                            data: countServer
                        },
                    ]
                });
                this.chart2.setOption({

                    yAxis: {
                        type: 'value',
                        name: '数量(个)',
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
                            name: '平均每秒数据包(个)',
                        }
                    ],

                    series: [
                        {
                            name: 'Direct',
                            type: 'bar',
                            barWidth: '30%',
                            data: [totalnum45/100,totalnumsend/100,totalnumserver/100],
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true, //开启显示数值
                                        position: 'top', //数值在上方显示
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
                });
                // loading.close();
            },
            drawLine1() {

                this.chart1 = $echarts.init(document.getElementById('myChart1'));
                let option = {
                    title: {
                        text: '数据包/时间',
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
                        text: '节点平均数据包',
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
            },
        }
    }
</script>

<style scoped>
    #myChart1{
        float:left;
        display:inline-block;
        width: 55% ;
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
        width: 44% ;
        height: 83%;
        /* border:1px solid blue;*/
        margin-top: 4%;
        box-shadow: 0px 0px 5px 0PX white;
        border-radius:5px;
        background-color: white;
    }
</style>
