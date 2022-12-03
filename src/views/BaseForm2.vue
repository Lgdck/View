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
                    <el-form-item label="发送时间" prop="resource">
                        <el-radio-group v-model="form.resource">
                            <el-radio @change="radio_change0" label="立即发送"></el-radio>
                            <el-radio @change="radio_change1" label="定时发送"></el-radio>
                        </el-radio-group>
                    </el-form-item>
					<el-form-item label="定时时间">
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
					<el-form-item label="发送次数" prop="name">
					    <el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="发送频率" prop="resource">
					    <el-radio-group v-model="form.resource">
					        <el-radio label="恒定持续发送"></el-radio>
					        <el-radio label="频率函数输入"></el-radio>
							<el-radio label="根据函数发送"></el-radio>
					    </el-radio-group>
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
    name: "baseform2",
    setup() {
        const rules = {
            name: [
                { required: true, message: "请输入发送次数", trigger: "blur" },
            ],
        };
        const formRef = ref(null);
        const form = reactive({
            name: "",
            region: "",
            date1: "",
            date2: "",
            delivery: true,
            type: ["步步高"],
            resource: "小天才",
            desc: "",
            options: [],
        });
        // 提交
        const onSubmit = () => {
            console.log(this.date1);
            console.log(this.date2);
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
		const radio_change0 = () => {
			form.date1 = new Date()
			form.date2 = new Date()
		};
		const radio_change1 =() =>{
			form.date1 = null
			form.date2 = null
		};
        // 重置
        const onReset = () => {
            formRef.value.resetFields();
        };

        return {
            // options,
            rules,
            formRef,
            form,
            onSubmit,
            onReset,
			radio_change0,
			radio_change1,
        };
    },
};
</script>