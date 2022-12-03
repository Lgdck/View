<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 时延
                </el-breadcrumb-item>
                <el-breadcrumb-item>节点二</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div id="myChart" :style="{width:'100%',height:'500px'}"> </div>
    </div>

</template>

<script>
    import * as $echarts from 'echarts';
    //import { fetchDataT } from "../api/vision";
    import instance from "../network";

    export default {
        data() {
            return {
                chart: '',
            }
        },
        mounted() {
            this.drawLine();
            this.initData();
        },
        methods: {
            async initData() {
                const xdata = [];
                const ydata = [];
                let name = "Node2";
                await instance.post("/dataPiechart", JSON.stringify(name)).then(res => {
                    for (let re of res) {
                        xdata.push(re.time);
                        ydata.push(re.timedelay);
                    }
                    console.log(xdata, ydata);
                });
                this.chart.setOption({
                    xAxis: {
                        data: xdata,
                    },
                    series: [{
                        data: ydata,
                    }]
                });
            },
            drawLine() {
                // 基于准备好的dom，初始化echarts实例
                this.chart = $echarts.init(document.getElementById('myChart'));
                // 绘制图表
                let option = {
                    xAxis: {
                        type: 'category',
                        data: [],
                        name: '时间',
                        nameTextStyle: {
                            color: '#0e9e9e',
                            fontSize: 20,
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
                        name: '单位:微秒',
                        nameTextStyle: {
                            color: '#0e9e9e',
                            fontSize: 20,
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
                            data: [],
                            type: 'line',
                            // barWidth: '25%',
                            itemStyle: {
                                normal: {
                                    color: "#97de9a",//折线点的颜色
                                    lineStyle: {
                                        color: "#053f5c"//折线的颜色
                                    },
                                }
                            }
                        }
                    ],
                    title: {
                        text: '节点二每秒的平均时延',
                        textStyle: {
                            fontSize: 32,
                            color: '#0e9e9e',
                        },
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    }
                };
                this.chart.setOption(option);
            },
        }
    }
</script>

<style scoped>

</style>
