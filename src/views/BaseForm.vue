<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 发包
                </el-breadcrumb-item>
                <el-breadcrumb-item>包信息设置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="formRef" :rules="rules" :model="form" label-width="90px">
                    <el-form-item label="目的地址" prop="packet.destip">
                        <el-input v-model="form.packet.destip" placeholder="lgdck.info" class="handle-input mr10"></el-input>
                    </el-form-item>

                    <el-form-item label="目的端口" prop="packet.destport">
                        <el-input v-model="form.packet.destport" placeholder="12321" class="handle-short mr10"></el-input>
                    </el-form-item>

                    <el-form-item label="协议设置" prop="packet.protocol">
                        <el-select v-model="form.packet.protocol" placeholder="协议" class="handle-select mr10">
                            <el-option key="1" label="TCP" value="tcp"></el-option>
                            <el-option key="2" label="UDP" value="udp"></el-option>
                            <el-option key="3" label="ICMP" value="icmp"></el-option>
                            <el-option key="4" label="FTP" value="ftp"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="发包个数" prop="packet.count">
                        <el-input v-model="form.packet.count" placeholder="10" class="handle-short mr10"></el-input>
                    </el-form-item>

                    <el-form-item label="发包频率" prop="packet.frequent">
                        <el-input v-model="form.packet.frequent" placeholder="单位/秒" class="handle-short mr10"></el-input>
                    </el-form-item>

                    <!--<el-form-item label="选择器" prop="region">-->
                        <!--<el-select v-model="form.region" placeholder="请选择">-->
                            <!--<el-option key="bbk" label="步步高" value="bbk"></el-option>-->
                            <!--<el-option key="xtc" label="小天才" value="xtc"></el-option>-->
                            <!--<el-option key="imoo" label="imoo" value="imoo"></el-option>-->
                        <!--</el-select>-->
                    <!--</el-form-item>-->
                    <!--<el-form-item label="日期时间">-->
                        <!--<el-col :span="11">-->
                            <!--<el-form-item prop="date1">-->
                                <!--<el-date-picker type="date" placeholder="选择日期" v-model="form.date1"-->
                                    <!--style="width: 100%;"></el-date-picker>-->
                            <!--</el-form-item>-->
                        <!--</el-col>-->
                        <!--<el-col class="line" :span="2">-</el-col>-->
                        <!--<el-col :span="11">-->
                            <!--<el-form-item prop="date2">-->
                                <!--<el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;">-->
                                <!--</el-time-picker>-->
                            <!--</el-form-item>-->
                        <!--</el-col>-->
                    <!--</el-form-item>-->
                    <!--<el-form-item label="城市级联" prop="options">-->
                        <!--<el-cascader :options="options" v-model="form.options"></el-cascader>-->
                    <!--</el-form-item>-->
                    <!--<el-form-item label="选择开关" prop="delivery">-->
                        <!--<el-switch v-model="form.delivery"></el-switch>-->
                    <!--</el-form-item>-->
                    <!--<el-form-item label="多选框" prop="type">-->
                        <!--<el-checkbox-group v-model="form.type">-->
                            <!--<el-checkbox label="步步高" name="type"></el-checkbox>-->
                            <!--<el-checkbox label="小天才" name="type"></el-checkbox>-->
                            <!--<el-checkbox label="imoo" name="type"></el-checkbox>-->
                        <!--</el-checkbox-group>-->
                    <!--</el-form-item>-->
                    <!--<el-form-item label="单选框" prop="resource">-->
                        <!--<el-radio-group v-model="form.resource">-->
                            <!--<el-radio label="步步高"></el-radio>-->
                            <!--<el-radio label="小天才"></el-radio>-->
                            <!--<el-radio label="imoo"></el-radio>-->
                        <!--</el-radio-group>-->
                    <!--</el-form-item>-->
                    <el-form-item label="包携带内容" prop="packet.message">
                        <el-input type="textarea" rows="5" v-model="form.packet.message"></el-input>
                    </el-form-item>

                    <el-form-item label="私钥上传" >


                            <el-upload class="upload-demo" name="keyfile" action="http://lgdck.info/send/upload" multiple>
                                <i class="el-icon-upload"></i>
                                <div class="el-upload__text">
                                    将文件拖到此处，或
                                    <em>点击上传</em>
                                </div>
                            </el-upload>

                    </el-form-item>



                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">提交</el-button>
                        <el-button @click="onReset">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import { fetchForm} from "../api/index";
export default {
    name: "baseform",
    setup() {

        const rules = {
            protocol: [
                { required: true, message: "请输入表单名称", trigger: "blur" },
            ],
        };
        const formRef = ref(null);
        const form = reactive({
            packet:{
                protocol: "",
                destip:"",
                destport:"",
                count:"",
                frequent:"",
                message:"",},
            command:"123"

            // name: "",
            // region: "",
            // date1: "",
            // date2: "",
            // delivery: true,
            // type: ["步步高"],
            // resource: "小天才",
            // desc: "",
        });
        // 提交
        const onSubmit = () => {
            // 表单校验
            formRef.value.validate((valid) => {
                if (valid) {
                    // console.log(form);
                    console.log(JSON.stringify(form));
                    // const getData = () => {
                        fetchForm(JSON.stringify(form)).then((res) => {
                            // alert("hhhhh");
                            // tableData.value = res.list;
                            // pageTotal.value = res.pageTotal || 50;
                        });
                    // };
                    // getData();
                    ElMessage.success("提交成功！");
                } else {
                    return false;
                }
            });
        };

        // 重置
        const onReset = () => {
            formRef.value.resetFields();
        };

        return {
            rules,
            formRef,
            form,
            onSubmit,
            onReset,
        };
    },
};
</script>
<style scoped>
    .upload-form {
        background-color: #fff;
        border: 1px;
        border-radius: 6px;
        box-sizing: border-box;
        width: 200px;
        height: 40px;
        text-align: center;
        cursor: pointer;
        overflow: hidden;
    }
    .handle-box {
        margin-bottom: 20px;
    }
    .handle-short{
        width:120px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .table {
        width: 100%;
        font-size: 14px;
    }
    .red {
        color: #ff0000;
    }
    .mr10 {
        margin-right: 10px;
    }
    .table-td-thumb {
        display: block;
        margin: auto;
        width: 40px;
        height: 40px;
    }
</style>
