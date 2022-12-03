<template>
    <div class="" style="display: flex;flex-direction: row;margin:15px 6%;">
        <p style="color: #666666;margin: 5px 10px">选择文件:</p>
        <input ref="input" type="file" multiple="multiple"  id="uploader" @change="handleFiles">
    </div>
</template>

<script>
    import instance from "../network";
    export default {
        //data数据
        data(){
            return{
                files:''
            }
        },

        methods:{
            handleFiles(event){
                this.files = event.target.files[0].name
                console.log(this.files)
                instance.get("/pcaptotxt?filename="+this.files).then(res =>{
                    console.log(res.data);
                })

            }
        }
    }
</script>


<style scoped>

</style>
