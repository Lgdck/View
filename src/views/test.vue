<template>
    <div>测试页面</div>
    <button @click="test">点击测试</button>
</template>

<script>
    import service from "../utils/request";
    export default {
        name:"test.vue",
        methods:{
            async test(){
                 await service.post("/index", JSON.stringify(name)).then(res => {
                    alert(res);
                 })
            }
        }
    }
</script>

<style scoped>

</style>