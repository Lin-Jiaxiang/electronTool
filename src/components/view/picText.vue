<template>
  <div class="uploadDiv">
    <div class="elUpload">
      <el-upload
        class="upload-demo"
        drag
        action="#"
        :before-upload="onBeforeUploadImage"
        :http-request="UploadImage"
        :on-change="handleChange"
        :file-list="fileList"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">只能上传txt文件，且不超过500kb</div>
      </el-upload>
    </div>
    <div>
      <el-button type="primary" @click="downFile">下载示例文件格式</el-button>
    </div>
  </div>
</template>

<style>
.uploadDiv{
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  height: 100%;
}
.el-message{
  left: 64%!important;
}
.elUpload{
  width: 100%;
}
</style>

<script>
const AipSpeech = window.AipSpeech;
const fs = window.fs;
// const compressing = window.compressing;
const pathMod = window.path;
const os = window.os;
// const remote = window.remote;
// const objectData = remote.getGlobal('sharedObject');

export default {
  name: "picToText",
  data() {
    return {
      fileList: [],
    };
  },
  created() {},
  mounted() {},
  methods: {
    downFile(){
      let _this = this
      let path = os.homedir().replace(/\\/g,'/') + '/Desktop/demo.txt' 
      fs.writeFile(path, '文件名1|||语音合成的内容\n文件名2|||语音合成的内容\n文件名3|||语音合成的内容','utf-8', function(err){
        if(err){
          console.log(err)
          _this.$message.error("写入失败");
          throw err;
        }
        _this.$message.success("成功下载至桌面：demo.txt");
      })
    },
    handleChange(){
      this.fileList = []
    },
    onBeforeUploadImage(file) {
      const isIMAGE = file.type === "text/plain";
      const isLt1M = file.size / 1024 / 1024 < 0.5;
      if (!isIMAGE) {
        this.$message({
          message: "上传文件只能是txt格式!",
          type: "error",
          // duration: 0
        });
      }
      if (!isLt1M) {
        this.$message.error("上传文件大小不能超过 1MB!");
      }
      return isIMAGE && isLt1M;
    },
    UploadImage(param) {
      let _this = this
      this.loading = true;
      let path = param.file.path;
      let createPath = os.homedir().replace(/\\/g,'/') + '/Desktop'

      fs.readFile(path, "utf-8", function(err, data) {
        if (err) {
          console.log(err)
          //_this.$message.error("读取文件发生错误!");
        } else {
          let client = new AipSpeech(
            0,
            "mWM1P4cHbCbMccV31MfXwyKp",
            "G1AZ0NB0LMYEMG33SO4K0S92PdRNGg68"
          );

          let resultData = data.split("\n");
          let number = resultData.length;
          let formTime = new Date().getTime();
          let mp3FileDir = pathMod.join(createPath + "/mp3_" + formTime);
          fs.mkdirSync(mp3FileDir);
          for (let i in resultData) {
            setTimeout(function() {
              if (resultData[i].indexOf("|||") != -1) {
                let text = resultData[i].split("|||")[1];
                // 语音合成，保存到本地文件
                client.text2audio(text, { spd: 4, per: 0 }).then(
                  function(result) {
                    if (result.data) {
                      let time = resultData[i].split("|||")[0] + "_voice";
                      let avatarName_mp3 = mp3FileDir + "/" + time + ".mp3";
                      fs.writeFileSync(avatarName_mp3, result.data);
                      // 取消压缩
                      number--;
                      if (number == 0) {
                        _this.$message.success("合成成功");
                        // let zipFileName = "zip/mp3_" + formTime + ".zip";
                        // compressing.zip
                        //   .compressDir(mp3FileDir, zipFileName)
                        //   .then(() => {
                        //     _this.$message.success("保存成功");
                        //   })
                        //   .catch(() => {
                        //     _this.$message.error("压缩失败!");
                        //   });
                      }
                    } else {
                      // 合成服务发生错误
                      _this.$message.error("合成服务发生错误!");
                    }
                  },
                  function() {
                    _this.$message.error("未知错误!");
                  }
                );
              } else {
                _this.$message.error("文件格式错误");
              }
            }, i * 20);
          }
        }
      });
    }
  }
};
</script>
