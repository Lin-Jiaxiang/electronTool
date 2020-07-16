<template>
  <el-menu
    class="el-menu-vertical-demo"
    router
    :default-active="this.$route.path"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    unique-opened
    :collapse="isCollapse"
  >
    <el-menu-item index="/">
      <i class="el-icon-menu"></i>
      <span slot="title">文字转语音</span>
    </el-menu-item>
    <el-menu-item index="/pdf">
      <i class="el-icon-menu"></i>
      <span slot="title">PDF处理</span>
    </el-menu-item>
  </el-menu>
</template>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200rpx;
  height: 100%;
}
</style>

<script>

export default {
  data() {
    return {
      isCollapse: false
    };
  },
  created() {
    
  },
  methods: {
  }
};
</script>