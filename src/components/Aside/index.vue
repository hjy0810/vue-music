<template>
  <div class="aside">
    <!-- logo -->
    <div class='logo'>
      <img src="@/assets/logo.png" alt="">
      <span class="title">Vue-music</span>
    </div>

    <!-- 左侧导航部分 -->
    <AsideNav/>
  </div>
</template>

<script>
import AsideNav from '../AsideNav'
export default {
  name:'Aside',
  components:{
    AsideNav,
  },
}
</script>

<style lang="less" scoped>
.aside{
  .logo{
    height: 60px;
    text-align: center;
    img{
      width:20px;
      height:20px;
      vertical-align:middle;
    }
    .title{
      line-height: 60px;
      margin-left:10px;

    }

  }

}


</style>