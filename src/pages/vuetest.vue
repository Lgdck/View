<template>
    <div class="container">
        <div class="top">
            <div id="myChart1"> </div>
            <div id="myChart2"> </div>
            <div id="myChart3"> </div>
        </div>
        <div class="bottom">
            <div class="bottom-left">
                <div id="myChart4"> </div>
                <div id="myChart5"> </div>
            </div>
            <div class="bottom-right" id="myChart6"> </div>
        </div>
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
                const count45 = [];
                let name = "stime_45"
                await instance.post("/datacount_time", JSON.stringify(name)).then(res => {
                    for (let re of res) {
                        second45.push(re.time);
                        count45.push(re.num);
                    }
                    console.log(count45)
                });
                const secondSend = [];
                const countSend = [];
                let name1 = "stime_send"
                await instance.post("/datacount_time", JSON.stringify(name1)).then(res => {
                    for (let re of res) {
                        secondSend.push(re.time);
                        countSend.push(re.num);
                    }
                    console.log(countSend)
                });
                const secondServer = [];
                const countServer = [];
                let name2 = "stime_server"
                await instance.post("/datacount_time", name2).then(res => {
                    for (let re of res) {
                        secondServer.push(re.time);
                        countServer.push(re.num);
                    }
                    console.log(countServer)
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
            },
            drawLine1() {
                this.chart1 = $echarts.init(document.getElementById('myChart1'));
                let option = {
                    title: {
                        text: '时间数据包数量图',
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
        }
    }
</script>

<style scoped>
    .container{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    .top{
        width: 100%;
        height: 30%;
        display: flex;
        background-color: antiquewhite;
    }
    .top > div{
        width: 33.333%;
        height: 100%;
    }
/*    .bottom{
        width: 100%;
        height: 70%;
        display: flex;
        background-color: aqua;
    }
    .bottom-left{
        width: 35%;
        height: 100%;
        background-color: blue;
        display: flex;
        flex-direction: column;
    }
    .bottom-left > div{
        width: 100%;
        height: 50%;
    }
    .bottom-right{
        width: 75%;
        height: 100%;
        background-color: brown;
    }*/
</style>
