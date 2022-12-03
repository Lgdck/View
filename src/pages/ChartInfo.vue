<template>
    <div class="container">
        <div class="top">
            <div id="chart1"></div>
            <div id="chart2"></div>
            <div id="chart3" style="color: #FFFFFF">
                <div style="text-align: center;margin-top: 8%">
                    <h2>误差比率：</h2>
                </div>
                <div style="text-align: center;margin-top: 10%;font-size: 20px;color: #DD4A68">
                    <h3>{{probabilitys}}%</h3>
                </div>

            </div>
        </div>
        <div class="bottom">
            <div class="bottom-left" >
                <div id="chart4"></div>
                <div id="chart5"></div>
            </div>
            <div class="bottom-right">
                <div id="chart6" style="width: 93%"></div>
            </div>
        </div>
    </div >
</template>
<script>

    import * as $echarts from 'echarts';
    import instance from "../network";
    import element from "../plugins/element";
    export default {
        name:'chartinfo',
        data(){
            return{
                currentid : -1,
                xtime:[],
                ydelay:[],
                ydelay1:[],
                ydelay2:[],
                ydelayZs:[],
                ydelay2Zs:[],
                ycountpacket:[],
                packetlength:[],
                timer:"",
                fangcha:[],
                biaozhuncha:[],
                averlength:[],
                maxvalue:[],
                minvalue:[],
                delayerror:[],
                probabilitys:0.0,
                calmin:0,

            }
        },
        mounted(){
            this.initData()
        },
        beforeRouteLeave(to,from,next){
            to.meta.keepAlive = true
            next(0)
        },
        methods: {
            async initData() {
                document.getElementById("chart6").removeAttribute('_echarts_instance_');
                document.getElementById("chart5").removeAttribute('_echarts_instance_');
                document.getElementById("chart4").removeAttribute('_echarts_instance_');
                document.getElementById("chart1").removeAttribute('_echarts_instance_');
                document.getElementById("chart2").removeAttribute('_echarts_instance_');
                document.getElementById("chart3").removeAttribute('_echarts_instance_');
                this.dataid = new Date();
                this.timer = setInterval(() => { //需要定时执行的代码
                    instance.post("/send/delay/" + this.currentid).then((res) => {
                        if (res.data.hasOwnProperty("nextId")) {
                            this.currentid = res.data.nextId
                            if (this.xtime.length > 20) {
                              /*  this.ydelay.shift();*/
                                this.packetlength.shift();
                                this.fangcha.shift();
                                this.biaozhuncha.shift();
                                this.averlength.shift();
                                this.ycountpacket.shift();
                                this.xtime.shift();
                                this.maxvalue.shift();
                                this.minvalue.shift();
                            }
                            if (res.data.count !== 0){

                                //标准的平均时延
                                /*if (res.data.AverageDelay> 0){
                                    if (res.data.AverageDelay -22000 > 0){
                                        this.ydelay.push(res.data.AverageDelay -22000 )
                                    }
                                }else{
                                    this.ydelay.push(res.data.AverageDelay)
                                }*/
                                this.ycountpacket.push(res.data.count)
                                this.packetlength.push(res.data.AllLength)
                                this.fangcha.push(res.data.Fangcha)
                                this.biaozhuncha.push(res.data.Biaozhun)
                                this.averlength.push(res.data.LengthAverage)


                                var split = res.data.DateFirst;
                                /* temp = splitElement * 1;*/
                                if(split !== ""){
                                    this.xtime.push(split);

                                }
                                 this.maxvalue.push(res.data.maxGroupDelay);
                                 this.minvalue.push(res.data.minGroupDelay);
                                console.log(this.maxvalue)
                            }
                        }

                    })
                    instance.post("/send/delayRda",this.dataid).then((res) => {
                        if (this.ydelay2.length > 20){
                            this.ydelay2.shift()
                            this.ydelay2Zs.shift()
                            this.ydelayZs.shift()
                            this.delayerror.shift()
                            this.ydelay.shift();
                        }
                           console.log(res.data)
                           //  console.log(res.data[0].avg2)
                           //  minvalue = Math.min(minvalue,res.data[0].avg1)
                           //  minvalue = Math.min(minvalue,res.data[0].avg2)
                           //
                           //  maxvalue = Math.max(maxvalue,res.data[0].avg1)
                           //  maxvalue = Math.max(maxvalue,res.data[0].avg2)
                            this.ydelay.push(res.data[0].avg1)
                            this.ydelayZs=this.ydelay;
                            //测量的平均时延avg2
                            this.ydelay2.push(res.data[0].avg2)
                            this.ydelay2Zs=this.ydelay2;
                            var curMin=400000;
                            this.ydelay.forEach(function (element) {
                                curMin=Math.min(curMin,element);
                            })
                            this.ydelay2.forEach(function (element) {
                                curMin=Math.min(curMin,element);
                            })
                            this.calmin = curMin
                           /* var curSub=function(element,index,array){
                                array[index]-=curMin;
                            }*/
                           /* this.ydelayZs.forEach(curSub);
                            this.ydelay2Zs.forEach(curSub);*/
                            console.log(this.ydelayZs)
                            console.log(this.ydelay2Zs)
                            //测量的与标准的时延  误差
                            let delayerror1 = Math.abs(res.data[0].avg1-res.data[0].avg2)
                            this.delayerror.push(delayerror1)

                            //误差小于10%的数据包数量的占比
                            this.probabilitys = delayerror1/res.data[0].avg1 * 100




                    })

                    const chartDom6 = document.getElementById('chart6');
                    const myChart6 = $echarts.init(chartDom6);
                    // myChart.clear()
                    let option6;
                    option6 = {
                        title: {
                            text: '>时延时间图',
                            textStyle: {
                                fontSize: 18,
                                color: 'white',
                                border:1
                            },
                            left: 'left'
                        },
                        xAxis: {
                            name: '时间/秒',
                            type: 'category',
                            data: this.xtime,
                            nameTextStyle: {
                                color: '#a7aaaa',
                                fontSize: 15,
                            },
                            axisLabel: {
                                textStyle: {
                                    color:  '#fff' , //坐标值得具体的颜色
                                }
                            },
                            axisLine: {
                                lineStyle: {
                                    type:  'solid' ,
                                    color:  '#fff' , //左边线的颜色
                                    width: '2' //坐标线的宽度
                                }
                            },
                        },
                        yAxis: {
                            name: '时延/微秒',
                            type: 'value',
                            min:this.calmin,
                            splitLine:{ // 去除网格线
                              show: false
                            },
                            nameTextStyle: {
                                color: '#aaa7a7',
                                fontSize: 15,
                            },
                            axisLine: {
                                lineStyle: {
                                    type:  'solid' ,
                                    color:  '#fff' , //左边线的颜色
                                    width: '2' //坐标线的宽度
                                }
                            },
                            axisLabel: {
                                textStyle: {
                                    color:  '#fff' , //坐标值得具体的颜色
                                }
                            },
                        },
                        animation: false,
                        series: [
                            {
                                name:'平均标准时延',
                                type: 'line',
                                smooth: true,
                                data: this.ydelayZs,
                                itemStyle: {
                                    color: '#e816ba',
                                }
                            },
                            {
                                name:'平均测量时延',
                                type: 'line',
                                smooth: true,
                                data: this.ydelay2Zs,
                                itemStyle: {
                                    color: '#00ccff',
                                }
                            },
                           /* {
                                name:'最大时延',
                                type: 'line',
                                smooth: true,
                                data: this.maxvalue,
                                itemStyle: {
                                    color: '#f1eeee',
                                }
                            },
                            {
                                name:'最小时延',
                                type: 'line',
                                smooth: true,
                                data: this.minvalue,
                                itemStyle: {
                                    color: '#18ffa9',
                                }
                            },*/

                        ],
                        legend: {
                            textStyle: {
                                color:  '#fff' , //坐标值得具体的颜色
                            },
                            data: ['平均标准时延','平均测量时延'],
                        },
                    };
                    option6 && myChart6.setOption(option6, true);


                    const chartDom1 = document.getElementById('chart1');
                    const myChart1 = $echarts.init(chartDom1);
                    // myChart.clear()
                    let option1;
                    option1 = {
                        title: {
                            text: '>数据包数量时间图',
                            textStyle: {
                                fontSize: 18,
                                color: 'white',
                                border:1
                            },
                            left: 'left'
                        },
                        xAxis: {

                            type: 'category',
                            data: this.xtime,
                            name:'秒',
                            nameTextStyle: {
                                color: '#a7aaaa',
                                fontSize: 15,
                            },
                            axisLabel: {
                                textStyle: {
                                    color:  '#fff' , //坐标值得具体的颜色

                                }
                            },
                            axisLine: {
                                lineStyle: {
                                    type:  'solid' ,
                                    color:  '#fff' , //左边线的颜色
                                    width: '2' //坐标线的宽度
                                }
                            },
                        },
                        yAxis: {

                            type: 'value',
                            name:'数据包/个',
                            nameTextStyle: {
                                color: '#a7aaaa',
                                fontSize: 15,
                            },
                            splitLine:{ // 去除网格线
                                show: false
                            },
                            axisLine: {
                                lineStyle: {
                                    type:  'solid' ,
                                    color:  '#fff' , //左边线的颜色
                                    width: '2' //坐标线的宽度
                                }
                            },
                            axisLabel: {
                                textStyle: {
                                    color:  '#fff' , //坐标值得具体的颜色

                                }
                            },
                        },
                        series: [
                            {
                                type: 'line',
                                smooth: true,
                                data: this.ycountpacket,
                                itemStyle: {
                                    color: '#ff00da',
                                }
                            }
                        ]
                    };
                    option1 && myChart1.setOption(option1, true);

                    const chartDom2 = document.getElementById('chart2');
                    const myChart2 = $echarts.init(chartDom2);
                    // myChart.clear()
                    let option2;
                    option2 = {
                        title: {
                            text: '>时延误差时间图',
                            textStyle: {
                                fontSize: 18,
                                color: 'white',
                                border:1
                            },
                            left: 'left'
                        },
                        xAxis: {
                            type: 'category',
                            data: this.xtime,
                            name:'秒',
                            nameTextStyle: {
                                color: '#a7aaaa',
                                fontSize: 15,
                            },
                            axisLabel: {
                                textStyle: {
                                    color:  '#fff' , //坐标值得具体的颜色

                                }
                            },
                            axisLine: {
                                lineStyle: {
                                    type:  'solid' ,
                                    color:  '#fff' , //左边线的颜色
                                    width: '2' //坐标线的宽度
                                }
                            },
                        },
                        yAxis: {
                            type: 'value',
                            name:'时延/微秒',
                            nameTextStyle: {
                                color: '#a7aaaa',
                                fontSize: 15,
                            },
                            splitLine:{ // 去除网格线
                                show: false
                            },
                            axisLine: {
                                lineStyle: {
                                    type:  'solid' ,
                                    color:  '#fff' , //左边线的颜色
                                    width: '2' //坐标线的宽度
                                }
                            },
                            axisLabel: {
                                textStyle: {
                                    color:  '#fff' , //坐标值得具体的颜色

                                }
                            },
                        },
                        series: [
                            {
                                type: 'line',
                                smooth: true,
                                data: this.delayerror,
                                itemStyle: {
                                    color: '#ff7a1a',
                                }
                            }
                        ]
                    };
                    option2 && myChart2.setOption(option2, true);

                    const chartDom4 = document.getElementById('chart4');
                    const myChart4 = $echarts.init(chartDom4);
                    // myChart.clear()
                    let option4;
                    option4 = {
                        title: {
                            text: '>时延方差时间图',
                            textStyle: {
                                fontSize: 18,
                                color: 'white',
                                border:1
                            },
                            left: 'left'
                        },
                        xAxis: {
                            type: 'category',
                            data: this.xtime,
                            name:'秒',
                            nameTextStyle: {
                                color: '#a7aaaa',
                                fontSize: 15,
                            },
                            axisLabel: {
                                textStyle: {
                                    color:  '#fff' , //坐标值得具体的颜色

                                }
                            },
                            axisLine: {
                                lineStyle: {
                                    type:  'solid' ,
                                    color:  '#fff' , //左边线的颜色
                                    width: '2' //坐标线的宽度
                                }
                            },
                        },
                        yAxis: {
                            type: 'value',
                            name:'方差/微秒方',
                            nameTextStyle: {
                                color: '#a7aaaa',
                                fontSize: 15,
                            },
                            splitLine:{ // 去除网格线
                                show: false
                            },
                            axisLine: {
                                lineStyle: {
                                    type:  'solid' ,
                                    color:  '#fff' , //左边线的颜色
                                    width: '2' //坐标线的宽度
                                }
                            },
                            axisLabel: {
                                textStyle: {
                                    color:  '#fff' , //坐标值得具体的颜色

                                }
                            },
                        },
                        series: [
                            {
                                type: 'line',
                                smooth: true,
                                data: this.fangcha,
                                itemStyle: {
                                    color: '#4f98ff',
                                }
                            }
                        ]
                    };
                    option4 && myChart4.setOption(option4, true);


                    const chartDom5 = document.getElementById('chart5');
                    const myChart5 = $echarts.init(chartDom5);
                    // myChart.clear()
                    let option5;
                    option5 = {
                        title: {
                            text: '>时延标准差时间图',
                            textStyle: {
                                fontSize: 18,
                                color: 'white',
                                border:1
                            },
                            left: 'left'
                        },
                        xAxis: {
                            type: 'category',
                            data: this.xtime,
                            name:'秒',
                            nameTextStyle: {
                                color: '#a7aaaa',
                                fontSize: 15,
                            },
                            axisLabel: {
                                textStyle: {
                                    color:  '#fff' , //坐标值得具体的颜色

                                }
                            },
                            axisLine: {
                                lineStyle: {
                                    type:  'solid' ,
                                    color:  '#fff' , //左边线的颜色
                                    width: '2' //坐标线的宽度
                                }
                            },
                        },
                        yAxis: {
                            type: 'value',
                            name:'标准差/微秒',
                            nameTextStyle: {
                                color: '#a7aaaa',
                                fontSize: 15,
                            },
                            splitLine:{ // 去除网格线
                                show: false
                            },
                            axisLine: {
                                lineStyle: {
                                    type:  'solid' ,
                                    color:  '#fff' , //左边线的颜色
                                    width: '2' //坐标线的宽度
                                }
                            },
                            axisLabel: {
                                textStyle: {
                                    color:  '#fff' , //坐标值得具体的颜色

                                }
                            },
                        },
                        series: [
                            {
                                type: 'line',
                                smooth: true,
                                data: this.biaozhuncha,
                                itemStyle: {
                                    color: '#47fced',
                                }
                            }
                        ]
                    };
                    option5 && myChart5.setOption(option5, true);


/*                    const chartDom3 = document.getElementById('chart3');
                    const myChart3 = $echarts.init(chartDom3);
                    // myChart.clear()
                    let option3;
                    option3 = {
                        title: {
                            text: '>传输',
                            textStyle: {
                                fontSize: 18,
                                color: 'white',
                                border:1
                            },
                            left: 'left'
                        },

                        tooltip: {
                            trigger: 'item'
                        },
                        legend: {
                            top: '5%',
                            left: 'center',
                            textStyle: {
                                color:  '#fff' , //坐标值得具体的颜色
                            },
                        },
                        color:['#ffb000','#17dec9'],
                        series: [
                            {
                                name: 'Access From',
                                type: 'pie',
                                radius: ['1%', '65%'],
                                avoidLabelOverlap: false,
                                itemStyle: {
                                    borderRadius: 10,
                                    borderColor: '#030827',
                                    borderWidth: 2
                                },

                                label: {
                                    show: true,
                                    position: 'left',
                                    formatter: '{b} :{c}({d}%)'
                                },
                                emphasis: {
                                    label: {
                                        show: false,
                                        fontSize: '30',
                                        fontWeight: 'bold'
                                    }
                                },
                                labelLine: {
                                    show: false
                                },
                                data: [
                                    { value: this.wuchacount, name: '误差大于10%' },
                                    { value: this.normalcount, name: '误差小于10%' },
                                ],
                            }
                        ]
                    };
                    option3 && myChart3.setOption(option3, true);*/

                }, 1000)
            },


        }

    }
</script>
<style scoped>


    .container{
        height:100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        background-color:#030827
    }
    .top{
       width: 100%;
       height: 30%;
        display: flex;
      /* background-color: antiquewhite;*/
       justify-content: space-around;
       align-items: center;
    }
    .top > div{
        width: 31.8%;
        height: 93%;
       /* background-color: peru;*/
        border-radius: 1%;
        box-shadow: 0px 0px 5px 5px #044d6b;
    }
    .bottom{
        width: 100%;
        height: 70%;
        display: flex;
      /*  background-color: aqua;*/
    }
    .bottom-left{
        width: 43%;
        height: 98%;
       /* background-color: blue;*/
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
    }
    .bottom-left > div{
        width: 100%;
        height: 45%;
     /*   background-color: aqua;*/
        border-radius: 1%;
        box-shadow: 0px 0px 5px 5px #044d6b;
        margin-left: 3%;
    }
    .bottom-right{
        width: 82%;
        height: 100%;
       /* background-color: brown;*/
        display: flex;
        justify-content: space-around;
        align-items: center;

    }
    .bottom-right > div{
        width: 100%;
        height: 93%;
       /* background-color: aquamarine;*/
        border-radius: 1%;
        box-shadow: 0px 0px 5px 5px #044d6b;

    }
</style>
