<template>
    <div class="containers">
        <div class="left">
            <div CLASS="upload-demo">
                <el-upload ref="upload" style="display: inline-block" action="string" :limit="3" :file-list="fileList"
                        :before-upload="beforeUpload" :show-file-list="true" :http-request="handleUpload"
                        :on-exceed="handleExceed" multiple>
                    <br />
                    <br />
                    <br />
                    <br />
                    <el-button slot="trigger" size="large" type="primary">选取文件</el-button>
                </el-upload>
            </div>
            <br>
            <br>
            <div class="btn">
                <el-button type="success" @click="submitForm">处理文件</el-button>
                <el-button type="success" @click="calculate">解析数据</el-button>
            </div>
        </div>
        <div class="right" v-show="vision_tip">
            <h1>本次解析数据包详情数据</h1>
            <br>
            <h2>共解析的数据包的数量 : {{sum}}</h2>
            <br>
            <h3 v-show="visionsend_tip">send节点数据包数量 : {{send_num}}</h3>
            <br>
            <h3 v-show="vision45_tip">45node节点数据包的数量 : {{midnode_num}}</h3>
            <br>
            <h3 v-show="visionserver_tip">server节点数据包的数量 : {{server_num}}</h3>
        </div>
    </div>
</template>

<script>
    import instance from "../network";
    import { ElLoading } from 'element-plus';
    export default {
        data() {
            return {
                fileList: [],
                file: [],
                sum : "暂无数据",
                send_num : "暂无数据",
                midnode_num : "暂无数据",
                server_num : "暂无数据",
                vision_tip:false,
                visionsend_tip:true,
                vision45_tip:true,
                visionserver_tip:true,
            }
        },
        methods: {
            // 上传文件之前
            beforeUpload(file) {
                const extension = file.name.split(".")[1] === "pcap"; // 是否以txt为后缀
                if (!extension) {
                    this.$message.error("上传文件的格式只能是.pcap！！！");
                }
                return extension;  // 若为false则停止上传
            },

            // 选取文件
            handleUpload(raw) {
                this.fileList.push(raw.file);
                this.selectMessage()
            },
            selectMessage() {
                 if (this.fileList.length === 3){
                    this.$message.success("文件选取完成");
                 }
            },
            /** 提交按钮 */
            async submitForm(){
                // const loading = ElLoading.service({
                //     lock: true,
                //     text: '处理文件中......',
                //     background: 'rgba(0, 0, 0, 0.7)',
                // })
                let formData = new FormData();
                this.fileList.forEach( (File) => {
                    formData.append("file", File);
                });
                await instance.post("/file/dealpcapfile", formData).then((res) => {
                    if (res.scode === 200) {
                        // loading.close()
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

                        /*if(res.data.send > 0){

                            this.visionsend_tip = true
                        }
                        if(res.data.midnode > 0){

                            this.vision45_tip = true
                        }
                        if(res.data.server > 0){

                            this.visionserver_tip = true
                        }*/

                    } else {
                        // loading.close()
                        this.$message.error("文件处理失败！！！");
                    }
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
            }

        },
/*        computed :{
            // 计算sum的值
            sum : function(){
                if (this.send_num == "暂无数据"){
                    return "暂无数据"
                }else{
                    var sum_num = parseInt(this.send_num) + parseInt(this.midnode_num) + parseInt(this.server_num)
                    return String(sum_num)
                }
            }
        },*/
        /*watch :{
            send_num : function (newVal , odlVal) {

            }
        }*/


    }
</script>

<style scoped>
    .containers{
        height: 89%;
        width: 95%;
        display: flex;
        flex-direction: row;
        /*border:1px solid blue;*/

    }
    .left{
        display: flex;
        width: 50%;
        height: 100%;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        box-shadow: 0px 0px 5px 0PX white;
        border-radius:5px;
        background-color: white;
    }
    .right{
        /* background-color: rgba(100, 100, 100, 1); */
        width: 50%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
       /* border:1px solid orangered;*/
        box-shadow: 0px 0px 5px 0PX white;
        border-radius:5px;
        background-color: white;
    }
    .btn{
        width: 40%;
        display: flex;
        justify-content: space-between ;
    }
</style>
