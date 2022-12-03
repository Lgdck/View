<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 表单
                </el-breadcrumb-item>
                <el-breadcrumb-item>基本表单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="formRef" :rules="rules" :model="form" label-width="80px">
                    <el-form-item label="特定端口" prop="port">
                        <el-input v-model="form.port"></el-input>
                    </el-form-item>
                    <el-form-item label="开始时间">
                        <el-col :span="11">
                            <el-form-item prop="date1">
                                <el-date-picker type="date" placeholder="选择日期" v-model="form.date1"
                                    style="width: 100%;"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="11">
                            <el-form-item prop="date2">
                                <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;">
                                </el-time-picker>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
					<el-form-item label="结束时间">
					    <el-col :span="11">
					        <el-form-item prop="date3">
					            <el-date-picker type="date" placeholder="选择日期" v-model="form.date3"
					                style="width: 100%;"></el-date-picker>
					        </el-form-item>
					    </el-col>
					    <el-col class="line" :span="2">-</el-col>
					    <el-col :span="11">
					        <el-form-item prop="date4">
					            <el-time-picker placeholder="选择时间" v-model="form.date4" style="width: 100%;">
					            </el-time-picker>
					        </el-form-item>
					    </el-col>
					</el-form-item>
					<el-form-item label="特定协议" prop="protocols">
					    <el-input v-model="form.protocols"></el-input>
					</el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">表单提交</el-button>
                        <el-button @click="onReset">重置表单</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
export default {
    port: "baseform3",
    setup() {
        const rules = {
            port: [
                { required: true, message: "请输入指定端口号", trigger: "blur" },
            ],
        };
        const formRef = ref(null);
        const form = reactive({
            port: "",
			protocols:"",
            region: "",
            date1: "",
            date2: "",
			date3: "",
			date4: "",
            delivery: true,
            type: ["步步高"],
            resource: "小天才",
            desc: "",
            options: [],
        });
        // 提交
        const onSubmit = () => {
            // 表单校验
            formRef.value.validate((valid) => {
                if (valid) {
                    console.log(form);
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