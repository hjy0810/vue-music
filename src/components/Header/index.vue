<template>
  <div class='header clearfix' >
    <!-- 左侧搜索框 -->
    <div class='left'>
      <div class='icon-box'>
        <span @click='back' class='icon el-icon-arrow-left'></span>
        <span @click='forward' class='icon el-icon-arrow-right'></span>  
      </div>
      <input type="text" placeholder="搜索音乐/歌单/歌手/MV" v-model='input' @keydown.enter='search'>
      <i class="el-icon-search"></i>
    </div>
    
    <!-- 右侧个人信息 -->
    <div class="right">
      <img class='user-avatar' :src="userInfo.avatarUrl" alt="用户头像">
      <span class='user-name'>{{ userInfo.nickname }}</span>
      <svg  class="icon" aria-hidden="true" @click="logout">
        <use xlink:href="#icontuichu"></use>
        <!-- svg标签title属性 -->
        <title>退出</title>
      </svg>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  name:'Header',
  data(){
    return {
      input:'',
    }
  },
  computed:{
      ...mapGetters(['userInfo']),
  },
  watch:{
    // 搜索防抖，最后一次input之后的 0.5s后执行search方法
    input(newValue,oldValue){
      if(this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() =>{
        this.search();
        clearTimeout(this.timer);
        this.timer = null;
      },500)
    }
  },
  methods:{
    search(){
      if(!this.input) return;
      this.$router.push({
        name:'Search',
        params:{
          keywords:this.input,
        }
      })
    },

    logout(){
      localStorage.removeItem('token');
      this.$router.push('/login');
    },
    back(){
      window.history.back();
    },
    forward(){
      window.history.forward();
    }
    //搜索防抖
    // debounceSearch(duration=2){
    //   console.log(this);
    //   // if(this.timer) return;
    //   // this.timer = setTimeout(() => {
    //   //   this.search();
    //   //   clearTimeout(this.timer)
    //   // },duration*1000)
    // }

  },
}
</script>

<style scoped lang='less'>
.header{
  .left{
    float:left;
    width:250px;
    position: relative;

    .icon-box{
      color:#AFAFAF;
      float:left;
      .icon{
        &:hover{
          color:red;
        }
      }
    }
  
    input{
      float:right;
      width:200px;
      height: 30px;
      margin-top:15px;
      outline: none;
      border:none;
      background-color: #474747;
      padding-left:30px;
      border-radius: 15px;
      color:white;

      &::placeholder{
        color:#AFAFAF;
      }
    }
    i.el-icon-search{
      position: absolute;
      right:177px;
      top:22px;
      z-index: 10;
      color:#AFAFAF;


    }
  }

  .right{
    float:right;
    .user-avatar{
      float:left;
      width: 30px;
      height: 30px;
      line-height: 30px;
      border-radius: 50%;
      margin-top:15px;
    }
    .user-name{
      margin-left:5px;
    }
    svg{
      margin-left:10px;
      color:lightseagreen;
    }
  }
}


</style>