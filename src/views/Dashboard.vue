<template>
    <div style="height: 100% ;width: 100%;display: flex;flex-direction: column;background-color: #030827">
        <div class="top">
            <div class="top-1">
                <div class="top-1-left">
                    <span style="color: white;font-size: 18px;">数据包总数</span>
                    <span style="color: #DD4A68;font-size: 21px; font-weight:800">{{totalcounts}}</span>
                </div>
                <div class="top-1-right">
                    <span style="color: white;font-size: 18px;">新增数据包个数</span>
                    <span style="color: #d44710;font-size: 21px;font-weight:800">{{counts}}</span>
                </div>
            </div>
            <div class="top-2">
                <div class="top-2-left">
                    <div>
                        <span style="color: white;font-size: 18px;text-align: center;">平均时延：</span>
                    </div>
                    <div class="element1">
                        <span style="color: #E6A23C;font-size: 16px;font-weight:800">{{averdelay}}</span>
                    </div>
                </div>
                <div class="top-2-right">
                    <div>
                        <span style="color: white;font-size: 18px;text-align: center;">平均长度：</span>
                    </div>
                    <div class="element2">
                        <span style="color: #409EFF;font-size: 16px;font-weight:800;">{{averlength}}</span>
                    </div>
                </div>
            </div>
            <div class="top-3">
                <div class="top-3-left">
                    <span style="color: #ffffff;font-size: 15px;font-weight:800;">端口</span>
                    <span style="color: #409EFF;font-size: 12px;font-weight:800;">{{packetport}}</span>
                </div>
                <div class="top-3-mid">
                    <span style="color: #ffffff;font-size: 15px;font-weight:800;">协议</span>
                    <span style="color: #409EFF;font-size: 12px;font-weight:800;">{{packetpro}}</span>
                </div>
                <div class="top-3-right">
                    <span style="color: #ffffff;font-size: 15px;font-weight:800;">时间</span>
                    <span style="color: #409EFF;font-size: 12px;font-weight:800;">{{packettime}}</span>
                </div>
            </div>
        </div>
        <div class="mid">
            <div class="mid-left">
                <div class="mid-left-1" id="drawPie">
                </div>
                <div class="mid-left-2" id="drawBar">
                    <div class="title">
                        <span>网络节点故障概率</span>
                    </div>
                    <div class="node1" style="width: 50%;height: 20%">
                        <span style="background-color: #DD4A68;border-radius: 4px">Sender A</span>
                        <span>--------></span>
                        <span style="background-color: #990055;border-radius: 4px">ServerB</span>
                    </div>




                    <div class="context">
                        <div class="node" v-for="item in node" :key="item.id">
                            <span>{{item.node}}</span>
                            <span>{{item.probability}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mid-right">
                <div class="image" v-show="visionimg">
                    <img src="../assets/img/网络拓扑图1.jpg" alt="网络拓扑图"/>
                    <el-upload ref="upload" style="position: absolute;bottom: 12.3%;right: 8%" action="string" :limit="1"
                               :show-file-list="false" :http-request="handleimgUpload"
                               :on-exceed="handleExceed" >
                        <br />
                        <br />
                        <br />
                        <br />
                        <el-button  slot="trigger" size="small" type="primary">导入</el-button>
                    </el-upload>
                    <el-button slot="trigger" size="small" type="primary" class="qiehuan" @click="qiehuan" style="position: absolute;bottom: 12.3%;right: 4.5%">切换</el-button>
                </div>
                <div class="topo"  v-show="visiontopo">
                    <topo></topo>
                    <el-button slot="trigger" size="small" type="primary" class="qiehuan" @click="qiehuan" style="position: absolute;bottom: 12.3%;right: 4.5%">切换</el-button>
                </div>
                <div class="imageupload" v-show="visionupimg">
                    <img :src='upfileurl' alt="网络拓扑图"/>
                    <el-button slot="trigger" size="small" type="primary" class="qiehuan" @click="qiehuan" style="position: absolute;bottom: 12.3%;right: 4.5%">切换</el-button>
                </div>
            </div>
        </div>
        <div class="bottom">
            <div class="bottom-1">
                <div class="bottom-1-child">
                    <div class="text">
                        <el-input v-model="num1" placeholder="Please input" size="small" clearable />
                    </div>
                    <div class="btn">
                        <el-button type="primary" size="small" round @click="increase1('+')">增加</el-button>
                        <el-button type="warning" size="small" round @click="increase1('-')">减少</el-button>
                    </div>
                </div>
                <div class="bottom-1-child">
                    <div class="text">
                        <el-input v-model="num2" placeholder="Please input" size="small" clearable />
                    </div>
                    <div class="btn">
                        <el-button type="primary" size="small" round @click="increase2('*')">增加</el-button>
                        <el-button type="warning" size="small" round @click="increase2('/')">减少</el-button>
                    </div>
                </div>
                <div class="bottom-1-child">
                    <div class="text">
                        <el-input v-model="num3" placeholder="Please input" size="small" clearable />
                    </div>
                    <div class="btn">
                        <el-button type="primary" size="small" round @click="increase3('+')">增加</el-button>
                        <el-button type="warning" size="small" round @click="increase3('-')">减少</el-button>
                    </div>
                </div>
                <div class="bottom-1-child-1">
                    <el-radio v-model="radio" label="1" style="color: #FFFFFF">TCP</el-radio>
                    <el-radio v-model="radio" label="2" style="color: #FFFFFF">UDP</el-radio>
                </div>
                <dir class="bottom-1-child">
                    <el-button class="start-button" type="primary" plain @click="changeBtnText">{{text}}</el-button>
                </dir>
            </div>
            <div class="bottom-2">
                <div class="bottom-2-child">
                    <h2>故障定位：</h2>
                    <el-button type="primary" @click="faultLocation">开始定位</el-button>
                </div>
                <div class="bottom-2-child" >
                    <h2>时延预测：</h2>
                    <el-button type="primary" @click="delayPredict">开始预测</el-button>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
import instance from "../network";
import { ElLoading } from 'element-plus';
import * as $echarts from 'echarts';
import Topo from './Topo.vue';
import COS from 'cos-js-sdk-v5'
import { ref } from 'vue'

const radio = ref(3)
/*图片上传到云服务器*/
var cos = new COS({
    //写入密匙
    SecretId: 'AKIDKSKuDF1WkhNmulMgiTxB7mAH7gyQbV8U',
    SecretKey: '6vSihPqzsTnqc7KGvJQFn44nEOHtDG2X'
})
export default {
    name:'dashboard',
    components: {
        "topo":Topo ,
    },
    data() {
        return {
            fileList: [],
            file: [],
            filearr : [],
            sum : "暂无数据",
            send_num : "暂无数据",
            midnode_num : "暂无数据",
            server_num : "暂无数据",
            vision_tip:false,
            visionsend_tip:true,
            vision45_tip:true,
            visionserver_tip:true,
            chartPie :'',
            charBar : '',
            visionimg:true,
            visiontopo:false,
            visionupimg:false,
            imgdata:[],
            imgname:'网络拓扑图1.jpg',
            num1: 100,
            num2: 64,
            num3: 1000,
            text: '开始',
            click_count : 1,
            currentid : -1,
            totalcounts:100,
            upfilename:'',
            upfileurl:'https://lgd-1304243501.cos.ap-nanjing.myqcloud.com/',
            counts:0,
            averlength:12434,
            averdelay:45,
            packetport:12321,
            packetpro:'TCP',
            packettime:'2021/12/2/03:33:12',
            normalInterval:1000,
            flag:false,
            proto:'UDP',
            radio: '1',

            xtime:[],
            ypredict:[],

            // 存放网络状况的数据
            // 存放网络状况的数据
            node:[{
                id : 1,
                node : '接入网',
                probability : '0%'
            },{
                id : 2,
                node : '回传网',
                probability : '0%'
            },{
                id : 3,
                node : '核心网',
                probability : '0%'
            }]

        }
    },
    beforeRouteLeave(to,from,next){
        to.meta.keepAlive = true
        next(0)
    },
        mounted(){
            this.initData()
        },
        methods: {
            async initData() {
                let mins = 400000;
                document.getElementById("drawPie").removeAttribute('_echarts_instance_');
                let totalcount = 0;
                if (!this.flag){
                    this.normalInterval = 1000;
                    this.flag = true;
                }else {
                    this.normalInterval = 1000;
                }
                for (let i = 0; i < 30; i++) {
                    this.xtime.push(i)
                }
                const timer = setInterval(() => { //需要定时执行的代码

                    instance.post("/send/delay/"+ this.currentid).then((res) => {
                        console.log(res.data)
                        if (res.data.hasOwnProperty("nextId")){
                            this.currentid = res.data.nextId
                        }
                        // console.log(res.data)
                        totalcount = totalcount+res.data.count
                        this.totalcounts = totalcount
                        /*console.log(totalcount)*/
                        console.log("++++"+res.data.predict)
                        this.counts = res.data.count
                        this.averlength = Math.round(res.data.LengthAverage)
                        this.averdelay =  Math.round(res.data.AverageDelay)
                        if (res.data.DateFirst !== ""){
                            this.packettime = res.data.DateFirst;
                        }
                        this.packetpro = res.data.ProtocolType[0];



                        let tempredict = [];

                        tempredict.push(res.data.predict.v1);
                        tempredict.push(res.data.predict.v2);
                        tempredict.push(res.data.predict.v3);
                        tempredict.push(res.data.predict.v4);
                        tempredict.push(res.data.predict.v5);
                        tempredict.push(res.data.predict.v6);
                        tempredict.push(res.data.predict.v7);
                        tempredict.push(res.data.predict.v8);
                        tempredict.push(res.data.predict.v9);
                        tempredict.push(res.data.predict.v10);
                        tempredict.push(res.data.predict.v11);
                        tempredict.push(res.data.predict.v12);
                        tempredict.push(res.data.predict.v13);
                        tempredict.push(res.data.predict.v14);
                        tempredict.push(res.data.predict.v15);
                        tempredict.push(res.data.predict.v16);
                        tempredict.push(res.data.predict.v17);
                        tempredict.push(res.data.predict.v17);
                        tempredict.push(res.data.predict.v18);
                        tempredict.push(res.data.predict.v19);
                        tempredict.push(res.data.predict.v20);
                        tempredict.push(res.data.predict.v21);
                        tempredict.push(res.data.predict.v22);
                        tempredict.push(res.data.predict.v23);
                        tempredict.push(res.data.predict.v24);
                        tempredict.push(res.data.predict.v25);
                        tempredict.push(res.data.predict.v26);
                        tempredict.push(res.data.predict.v27);
                        tempredict.push(res.data.predict.v28);
                        tempredict.push(res.data.predict.v29);
                        tempredict.push(res.data.predict.v30);

                        console.log("========="+tempredict)
                        /*console.log(Array.from(this.ypredict))*/
                        tempredict.forEach(function (element) {
                            mins=Math.min(element,mins);
                        })

                       /* var cusSub = function (element,index,array) {
                            array[index]-=mins;
                        }*/
                        this.ypredict = tempredict
                        console.log(this.ypredict)

                    })

                    const chartDom = document.getElementById('drawPie');
                    const myChart = $echarts.init(chartDom);
                    // myChart.clear()
                    let option;
                    option = {
                        title: {
                            text: '>时延预测时间图',
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
                            name:'时延/毫秒',
                            nameTextStyle: {
                                color: '#a7aaaa',
                                fontSize: 15,
                            },
                            min:mins,
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
                                data: this.ypredict,
                                itemStyle: {
                                    color: '#ff7a1a',
                                }
                            }
                        ]
                    };
                    option && myChart.setOption(option, true);

                },this.normalInterval)
            },

            beforeUpload(file) {
                const extension = file.name.split(".")[1] === "pcap"; // 是否以txt为后缀
                if (!extension) {
                    this.$message.error("上传文件的格式只能是.pcap！！！");
                }
                return extension;  // 若为false则停止上传
            },

            // 选取文件
            handleUpload(raw) {
                this.filearr.push(raw.file);
                this.selectMessage()
            },
            selectMessage() {
                 if (this.filearr.length === 3){
                    this.$message.success("文件选取完成");
                 }
            },
            /** 提交按钮 */
            async submitForm(){
                const loading = ElLoading.service({
                    lock: true,
                    text: '处理文件中......',
                    background: 'rgba(0, 0, 0, 0.7)',
                })
                let formData = new FormData();
                this.filearr.forEach( (File) => {
                    formData.append("file", File);
                });
                await instance.post("/file/dealpcapfile", formData).then((res) => {
                    if (res.scode === 200) {
                        loading.close()
                        this.$message({
                            type:"success",
                            message:res.message
                        })
                        if (res.data.send ==null || res.data.midnode== null || res.data.server==null){
                            if (res.data.send ==null) res.data.send = 0;
                            if (res.data.midnode == null) res.data.midnode = 0;
                            if (res.data.server == null) res.data.server = 0;
                        }
                        this.sum = res.data.send+res.data.midnode+res.data.server
                        this.send_num = res.data.send;
                        this.midnode_num = res.data.midnode;
                        this.server_num = res.data.server
                        if (this.sum > 0){
                            this.vision_tip = true
                        }
                    } else {
                        loading.close()
                        this.$message.error("文件处理失败！！！");
                    }
                }).catch((error) => {
                    loading.close()
                });
                this.$refs.upload.submit();
            },

            // 文件超出个数限制
            handleExceed() {
                this.$message.warning("超出文件个数限制！！！");
            },

            // 计算
            async calculate() {
                const loading = ElLoading.service({
                    lock: true,
                    text: '解析数据中......',
                    background: 'rgba(0, 0, 0, 0.7)',
                })
                await instance.post("/calculate").then(res => {
                    if (res === "ok") {
                        loading.close()
                        this.$message.success("解析成功");
                    } else if (res === "no") {
                        loading.close()
                        this.$message.error("解析失败");
                    } else if (res === "error") {
                        loading.close()
                        this.$message.error("上传文件缺失");
                    }
                })
            },
            qiehuan(){
                console.log("==========="+this.visionimg)
                console.log(this.upfilename)
              if (this.visionimg){
                  this.visionimg = false;
                  this.visiontopo = true;
                  this.visionupimg = false;
              }else if(this.visiontopo){
                  if (this.upfilename !== ""){
                      this.visiontopo = false;
                      this.visionupimg = true;
                      this.visionimg = false;
                  }else {
                      this.visionimg = true;
                      this.visiontopo = false;
                  }
              }else {

                  this.visionupimg = false;
                  this.visionimg = true;
                  this.visiontopo = false;
              }

            },
            handleimgUpload(res){
                cos.putObject({
                    Bucket: 'lgd-1304243501', /* 必须:存储桶 */
                    Region: 'ap-nanjing', /* 存储桶所在地域，必须字段 */
                    Key: res.file.name, /* 必须 :文件名 */
                    StorageClass: 'STANDARD', // 上传模式
                    Body: res.file, // 上传文件对象
                    onProgress: function(progressData) { // 进度条
                        console.log(JSON.stringify(progressData))
                    }
                }, (err, data) => { // 注意用箭头函数,否则会出现this的指向问题
                    console.log(err || data)
                    if (data) { // 上传成功
                        this.imageUrl = `http://${data.Location}`
                        console.log(this.$refs.uploadImg)
                    }
                })
                    this.upfilename =  res.file.name
                    this.upfileurl  = this.upfileurl+this.upfilename
                    console.log(this.upfileurl)
                    this.visionimg = false;
                    this.visiontopo = false;
                    this.visionupimg = true;
            },

            // 改变提交按钮
            async changeBtnText(){
                this.click_count += 1
                if (this.click_count % 2 == 0){
                    this.text = '关闭'
                    await instance.post("/send/opt",{
                        "packet" : {
                            "message" : "OPEN"
                        },
                        "command" : "abc"
                    }).then((res) => {
                        console.log(res.data)
                    })
                }else{
                    await instance.post("/send/opt",{
                        "packet" : {
                            "message" : "SHUTDOWN"
                        },
                        "command" : "SHUTDOWN"
                    }).then((res) => {
                        console.log(res.data)
                    }).catch((err) => {
                        console.log(err)
                    })
                    this.text = '开始'
                }
            },
            // 改变第一个参数
            increase1(symbol){
                if (symbol == '+'){
                    if (this.num1 >=0 && this.num1 < 100){
                        this.num1 += 10
                    }else{
                        this.num1 += 100
                    }
                }else{
                    if (this.num1 > 100){
                        this.num1 -= 100
                    }else{
                        if (this.num1 - 10 < 0){
                            this.num1 = 0
                        }else[
                            this.num1 -= 10
                        ]
                    }
                }
                instance.post("/send/socket" , {
                    packet:{
                        "frequenceend" : String(this.num1),
                        "size" : String(this.num2),
                        "frequencesyn" : String(this.num3),
                    }
                }).then((res) => {
                    console.log(res.data)
                }).catch((err) => {
                    console.log(err)
                })

            },
            // 改变第二个参数
            increase2(symbol){
                if (symbol == '*'){
                    if (this.num2 * 2 <= 4096){
                        this.num2 *= 2
                    }else{
                        this.num2 = 4096
                    }
                }else{
                    if (this.num2 / 2 >= 8){
                        this.num2 /= 2
                    }else{
                        this.num2 = 8
                    }
                }
                instance.post("/send/socket" , {
                    packet:{
                        "frequenceend" : String(this.num1),
                        "size" : String(this.num2),
                        "frequencesyn" : String(this.num3),
                    }
                }).then((res) => {
                    console.log(res.data)
                }).catch((err) => {
                    console.log(err)
                })
            },
            // 改变第三个参数
            increase3(symbol){
                if (symbol == '+'){
                    this.num3 += 100
                }else{
                    if (this.num3 - 100 < 0){
                        this.num3 = 0
                    }else{
                        this.num3 -= 100
                    }
                }
                instance.post("/send/socket" , {
                    packet:{
                        "frequenceend" : String(this.num1),
                        "size" : String(this.num2),
                        "frequencesyn" : String(this.num3),

                    }
                }).then((res) => {
                    console.log(res.data)
                }).catch((err) => {
                    console.log(err)
                })
            },


            changeproto(){
                this.proto = 'TCP';
            },

            //预测
            delayPredict(){
                instance.post("/delayPredict").then(res =>{
                    //一个是真实 一个是预测 画折线图进行对比
                    console.log(res.data);
                })
            },

            //定位
            faultLocation(){

            },
        },
};
</script>

<style scoped>
    .top{
        width: 100%;
        height: 10%;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .top-1{
        width: 30%;
        height: 90%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        border-radius: 2%;
        box-shadow: 0px 0px 5px 5px #044d6b;
    }
    .top-1 > div{
        width: 40%;
        height: 80%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }
    .top-2{
        width: 30%;
        height: 90%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        border-radius: 2%;
        box-shadow: 0px 0px 5px 5px #044d6b;
    }
    .top-3{
        width: 30%;
        height: 90%;
        display: flex;
        border-radius: 2%;
        box-shadow: 0px 0px 5px 5px #044d6b;
    }
    .top-1-left{
        height: 100%;
        width: 100%;
    }
    .top-1-right{
        height: 100%;
        width: 100%;
    }
    .top-2-left , .top-2-right{
        width: 40%;
        height: 90%;
        display: flex;
        align-items: center;
    }
    .element1{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30%;
        height: 54%;
        border: #409EFF 10px solid;
        border-radius: 100%;
    }
    .element2{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30%;
        height:54%;
        border: #E6A23C 10px solid;
        border-radius: 100%;
    }
    .top-3 > div{
        width: 33%;
        height: 90%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
    }
    .mid{
        width: 100%;
        height: 80%;
        display: flex;
    }
    .mid-left{
        width: 25%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }
    .mid-left-1{
        width: 96%;
        height: 45%;
        border-radius: 2%;
        box-shadow: 0px 0px 5px 5px #044d6b;
        margin-left: 7%;
    }
    .mid-left-2{
        color: #FFFFFF;
        width: 96%;
        height: 45%;
        border-radius: 2%;
        box-shadow: 0px 0px 5px 5px #044d6b;
        margin-left: 7%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }
    .title{
        width: 50%;
        height: 15%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .title > span{
        color: #FFFFFF;
        font-size: 18px;
    }
    .context{
        width: 95%;
        height: 80%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .node{
        margin: 5px;
        width: 50%;
        height: 15%;
        color: #FFFFFF;
        background-color: rgb(35, 103, 61);
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size: 15px;
        border-radius: 5px;
    }
    .node1{
        margin: 5px;
        width: 50%;
        height: 15%;
        color: #FFFFFF;
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size: 15px;
        border-radius: 5px;
    }

    .mid-right{
        width: 75%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;

    }
    .mid-right > div{
        width: 95%;
        height: 95%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        box-shadow: 0px 0px 5px 5px #044d6b;

    }
    .bottom{
        width: 100%;
        height: 10%;
        display: flex;
        justify-content: space-around ;
    }
    .bottom-1{
        width:65%;
        height: 90%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 2%;
        box-shadow: 0px 0px 5px 5px #044d6b;
    }
    .bottom-2{
        width: 30%;
        height: 90%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 2%;
        box-shadow: 0px 0px 5px 5px #044d6b;
    }
    .bottom-1-child{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }
    .bottom-1-child > div{
        width: 90%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .bottom-1-child-1{
        width: 20%;
    }
    .bottom-2{
        /*width: 100%;*/
        color: #FFFFFF;
        height: 90%;
        /*background-color: #DD4A68;*/
    }
    .bottom-2 > div{
         width: 50%;
         height: 100%;
       /*  background-color: #ffffff;*/
         display: flex;
         justify-content: space-around;
         align-items: center;
     }
    .text > .el-input{
        width: 90%;
    }
    .btn > .el-button{
        width: 35%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .upload-demo{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .image{
        width: 100%;
        height: 100%;
    }
    img{
        width: 100%;
        height: 100%;
    }
    .start-button{
        width: 100%;
        height:100%;
        background-color: #70a1c1;
        color: #FFFFFF;
    }
</style>
