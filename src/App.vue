<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name:'App',
  data(){
    return {}
  },
  //在页面刷新时，页面会重新加载vue实例，store里面的数据就会被重新赋值，这样就会出现页面刷新vuex中的数据丢失的问题。
  mounted(){
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store") ) {
      this.$store.replaceState(Object.assign({},this.$store.state,JSON.parse(sessionStorage.getItem("store"))))     
    } 
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload",()=>{
      sessionStorage.setItem("store",JSON.stringify(this.$store.state))
    })
  }
}
</script>

<style lang="less">

</style>
