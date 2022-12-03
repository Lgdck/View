<template>
  <div>
    <div CLASS="upload-demo">
      <el-upload ref="upload" style="display: inline-block" action="string" :limit="3" :file-list="fileList"
        :on-error="loadFileError" :before-upload="beforeUpload" :show-file-list="true" :http-request="uploadFile"
        :on-remove="handleRemove" :on-exceed="handleExceed" multiple>
        <br />
        <br />
        <br />
        <br />
        <el-button type="success">上传文件</el-button>
      </el-upload>
    </div>
    <br/>
    <br />
    <br />
    <div class="btn">
      <el-button type="primary" @click="calculate">解析数据</el-button>
    </div>
  </div>
</template>

<script>
  // import qs from 'Qs'
  import axios from "axios";
  import instance from "../network";
  export default {
    data() {
      return {
        fileList: [],
        file: []
      }
    },
    methods: {
      // 文件上传失败
      loadFileError() {
        this.$message.error("文件上传失败！！！");
      },
      // 上传文件之前
      beforeUpload(file) {
        const extension = file.name.split(".")[1] === "pcap"; // 是否以txt为后缀
        if (!extension) {
          this.$message.error("上传文件的格式只能是.txt！！！");
        }
        return extension;  // 若为false则停止上传
      },
      // 上传文件
      uploadFile(param) {
        const File = param.file;
        let formDataInfo = new FormData();
        this.file.push(File.name);  // 将文件名保存一下
        formDataInfo.append("file", File); // 将文件传向后端
        instance.post("/pcaptotxt", formDataInfo).then((res) => {
          console.log(res);
          if (res == "ok") {
            this.$message.success("文件上传成功！！！");
          } else {
            this.$message.error("文件上传失败！！！");
          }
        });
      },
      // 删除文件
      handleRemove(file, fileList) {
        if (file != "") {
          let data = new FormData();
          data.append("fileName", file.name); // 将文件名传向后端
          let index = this.file.indexOf(file.name);
          this.file.splice(index, 1); // 根据索引将该文件名移除数组
          instance.post("/delete", data).then(res => {
            if (res == "ok") {
              this.$message.success("删除成功！！！");
            } else {
              this.$message.error("删除失败！！！");
            }
          })
        }
      },
      // 文件超出个数限制
      handleExceed() {
        this.$message.warning("超出文件个数限制！！！");
      },
      // 计算
      calculate() {
        let param = { fileList: this.file }
        instance.post("/calculate", qs.stringify(param, { arrayFormat: 'repeat' })).then(res => {
          if (res == "ok") {
            this.$message.success("解析成功");
          } else if (res == "no") {
            this.$message.error("解析失败");
          } else if (res == "error") {
            this.$message.error("上传文件缺失");
          }
        })
      }

    }
  }
</script>

<style scoped>
  .upload-demo {
    width: 620px;
    height: 150px;
  }

  .btn {
    margin-left: 500px;
  }
</style>
