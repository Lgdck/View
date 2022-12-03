<template>
    <div>
        <div class="crumbs">
            <!-- 面包屑导航 -->
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i>数据包
                </el-breadcrumb-item>
                <el-breadcrumb-item>饼状图</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div id="myChart" :style="{width: '100%', height: '450px'}"></div>
        <div>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="开始时间">
                    <el-input type="datetime-local" required="required" step="1" v-model="formInline.start"
                        placeholder="开始时间"></el-input>
                </el-form-item>
                <el-form-item label="结束时间">
                    <el-input type="datetime-local" required="required" step="1" v-model="formInline.stop"
                        placeholder="结束时间"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import * as $echarts from 'echarts';
    //import { fetchDataT } from '../api'
    import instance from "../network";

    export default {
        name: "vision",
        data() {
            return {
                chartPie: '',
                formInline: {
                    start: '',
                    stop: ''
                }
            }
        },
        // 在模板渲染成html后调用,通常是初始化页面完成后,再对html的dom节点进行一些需要的操作。
        mounted() {
            this.drawLine();
            this.initData();
        },

        methods: {
            onSubmit() {
                this.drawLine();
                this.initData();
                /*   console.log('submit!');*/
            },
            drawLine() {
                // 基于准备好的dom，初始化echarts实例
                this.chartPie = $echarts.init(document.getElementById('myChart'));
                // 绘制图表
                let option = {
                    title: {
                        text: '数据包所用协议及数量',
                        left: 'center',
                        textStyle: {
                            fontSize: 25,
                            color: '#0a7878',
                        },
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        right: 80,
                        orient: 'vertical',
                        data: []
                    },
                    series: [
                        {
                            name: 'Access From',
                            type: 'pie',
                            radius: '60%',
                            center: ['50%', '60%'],
                            data: [],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                },
                                normal: {
                                    label: {
                                        show: true,
                                        formatter: '{b} :{c}({d}%)'
                                    },
                                    labelLine:{
                                        show:true,
                                    }
                                }
                            }
                        }
                    ]
                };
                this.chartPie.setOption(option);
            },

            async initData() {
                const starttime = this.$data.formInline.start
                const stoptime = this.$data.formInline.stop
                console.log(starttime, stoptime);
                //存放协议类型和数量
                const tdata = [];
                //存放协议类型
                const ldata = [];
                //sql语句不区分大小写
                let name = "protocol";
                let select ={"name":name,"starttime": starttime,"stoptime": stoptime};
                console.log(select);
                await instance.post("/dataPiechart", JSON.stringify(name,starttime,stoptime)).then(res => {
                    for (let re of res) {
                        let obj = {};
                        obj.value = re.num
                        obj.name = re.protocol
                        tdata.push(obj)
                        ldata.push(re.protocol)
                    }
                });
                this.chartPie.setOption({
                    //右侧协议类型栏
                    legend: {
                        data: ldata,
                    },
                    series: [{
                        data: tdata,
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
