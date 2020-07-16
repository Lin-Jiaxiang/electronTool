<template>
  <div id="app" :style="styleObject">
    <el-container>
      <!-- <el-header style="background:#409eff;"></el-header> -->
      <el-container>
        <el-aside>
          <leftNav />
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import leftNav from './components/layout/leftNav'

export default {
  name: 'App',
  components: {
    leftNav
  },
  data() {
    return{
      styleObject:{
        width: '100vw',
        height: '100vh'
      }
    }
  },
  created(){
    
  },
  mounted(){

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.el-aside{
  width: 202px!important;
}
body{
  margin: 0;
  padding: 0;
}
.el-container{
  width: 100%;
  height: 100%;
}
</style>
