<template>
  <div class="uploadDiv">
    <div class="elUpload">
      <el-upload
        class="upload-demo"
        drag
        action="#"
        :multiple="true"
        :on-change="handleChange"
        :file-list="fileList"
        :auto-upload="false"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">只能上传pdf文件，且不超过1M</div>
      </el-upload>
    </div>
    <div>
      <el-button type="primary" @click="start">开始合成</el-button>
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

const fs = window.fs;
const pathMod = window.path;
const os = window.os;
import { PDFDocument, degrees } from 'pdf-lib'
export default {
  name: "pdfEdit",
  data() {
    return {
      fileList: [],
    };
  },
  created() {
    
  },
  mounted() {
    
  },
  methods: {
    async start(){
      
      let list = this.fileList
      if(list.length == 0){
        this.$message.warning("请上传pdf");
        return false
      }
      const pdfDoc = await PDFDocument.create()
      let index = parseInt(list.length / 6) + 1
      var result = [];
      for(let i=0, len=list.length; i<len; i+=6){
        result.push(list.slice(i,i+6));
      }
      for(let num = 0; num < index; num++){
        pdfDoc.addPage()
        for(let i in result[num]){
          let page = pdfDoc.getPage(num)
          const sourceBuffer = fs.readFileSync(result[num][i].raw.path).buffer
          const sourcePdfDoc = await PDFDocument.load(sourceBuffer)
          const sourcePdfPage = sourcePdfDoc.getPages()[0]
          const embeddedPage = await pdfDoc.embedPage(
            sourcePdfPage,

            // 页面截取区域大小
            { left: 120, right: 480, bottom: 540, top: 800 },

            // Translate all drawings of the embedded page by (10, 200) units
            [1, 0, 0, 1, 10, 200],
          )
          let x,y
          if(i % 2 == 0){
            x = -100
            y = -218 * parseInt(i / 2)
          }else{
            x = 188
            y = -218 * parseInt(i / 2)
          }
          page.drawPage(embeddedPage, {
            x: x,
            y: y,
            xScale: 0.8,
            yScale: 0.8,
            rotate: degrees(0),
          });
        }
      }
      
      const pdfBytes = await pdfDoc.save()
      let createPath = os.homedir().replace(/\\/g,'/') + '/Desktop'
      let formTime = new Date().getTime();
      let PDFFilePath = pathMod.join(createPath + '/' + formTime + '.pdf');
      fs.writeFileSync(PDFFilePath, pdfBytes);
      this.$message.success("合成成功");
      this.fileList = []
    },
    handleChange(fileList, list){
      this.fileList = list
    }
  }
};
</script>
