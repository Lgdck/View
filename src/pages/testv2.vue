<template>
    <div>
        <el-button type="primary" size="large" @click="readPython()">点击测试</el-button>
    </div>
</template>

<script>
    import instance from "../network";
    export default {
        name: "testv2",
        data() {
            return{

            }
        },
        methods: {
            readPython(){
               instance.get("/predifct/readPython").then(res =>{
                   console.log(res.message)
               })
            }
        }


    }
</script>

<style scoped>

</style>
