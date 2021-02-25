<template>
    <el-container>
    <el-aside width="200px">
      <Aside />
    </el-aside>
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-main>
        <!-- <Main/> -->
        <!-- 强制不复用，让通过params传不同参数的同一路由也可以刷新路由 -->
        <router-view :key='$route.path'></router-view>
      </el-main>
      <el-footer v-if='Object.keys(currentSong).length !== 0 '>
        <Footer/>
      </el-footer>
    </el-container>
  </el-container>
</template>

<script>
import { mapGetters } from 'vuex';
import Header from '../Header';
import Aside from '../Aside';
import Footer from '../Footer';

export default {
  name:'Home',
  computed:{
    ...mapGetters(['currentSong'])
  },
  components:{
    Header,
    Aside,
    Footer,
  },
}
</script>

<style scoped lang='less'>
.el-header, .el-footer {
  height: 60px;
  line-height: 60px;
  background-color: #2B2B2B;
}
.el-footer{
  width:100%;
  padding-left:0;
  padding-right:0;
}

.el-aside {
  padding:0 20px;
  background-color: #202020;

}
.el-main {
  // height:100%;
  background-color: #252525;
}
</style>