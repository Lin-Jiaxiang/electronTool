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
// let pdf = window.PDFDocument;
// const fs = window.fs;
// import { PDFDocument } from 'pdf-lib'
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
      console.log(this.fileList)

      // const pdfDoc = await PDFDocument.create()

      // const uint8Array = fs.readFileSync(file.path)
      // const pdfDoc3 = await PDFDocument.load(uint8Array)

      // const copiedPages = await pdfDoc.copyPages(pdfDoc3, [0])
      // const [firstPage] = copiedPages;

      // pdfDoc.addPage(firstPage)

      // const pdfBytes = await pdfDoc.save()
      // fs.writeFileSync('./test.pdf', pdfBytes);
    },
    handleChange(){
      console.log(this.fileList)
    }
  }
};
</script>
