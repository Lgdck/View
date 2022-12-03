<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 数据包
                </el-breadcrumb-item>
                <el-breadcrumb-item>折线图</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div id="myChart" :style="{width: '100%', height: '500px'}"></div>
    </div>
</template>

<script>
    import * as $echarts from 'echarts';
    //import { fetchDataT } from "../api/vision";
    import instance from "../network";
    export default {
        name: "vision",
        data() {
            return {
                chartPie: '',
            }
        },
        mounted() {
            this.drawLine();
            this.initData();
        },
        methods: {
            drawLine() {
                // 基于准备好的dom，初始化echarts实例
                this.chartPie = $echarts.init(document.getElementById('myChart'));
                // 绘制图表
                let option = {
                    xAxis: {
                        type: 'category',
                        data: [],
                        name: '时间(分钟)',
                        nameTextStyle: {
                            color: '#0e9e9e',
                            fontSize: 20,
                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#0e9e9e',
                                fontSize: 15,
                            }
                        }
                    },
                    yAxis: {
                        type: 'value',
                        name: '单位:个数',
                        nameTextStyle: {
                            color: '#0e9e9e',
                            fontSize: 20,
                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#0e9e9e',
                                fontSize: 15,
                            }
                        }
                    },
                    series: [
                        {
                            data: [],
                            type: 'line',
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
                        text: '以分钟为单位的数据包数量',
                        textStyle: {
                            fontSize: 40,
                            color: '#0a7878',
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
                this.chartPie.setOption(option);
            },
            async initData() {
                //时间 x轴
                const tdata = [];
                //数量 y轴
                const ldata = [];
                let name = "mtime"
                await instance.post("/dataPiechart", JSON.stringify(name)).then(res => {

                    for (let re of res) {
                        let obj = {};
                        obj.name = re.time
                        obj.value = re.num
                        tdata.push(re.time)
                        ldata.push(re.num)
                    }
                    console.log(tdata);
                    console.log(ldata);
                });
                this.chartPie.setOption({
                    xAxis: {
                        data: tdata,
                    },
                    series: [{
                        data: ldata,
                    }]
                });
            },
        }

    }
</script>

<style scoped>
    .demo-form-inline {
        /*    background-color: blue;*/
        text-align: center
    }
</style>
