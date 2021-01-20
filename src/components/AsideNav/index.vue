<template>
    <el-menu 
      :default-active='$route.path'
      :router=true 
      class="el-menu-vertical-demo" 
      background-color='#202020'
      active-text-color='#1DCE9B'>
      <!-- 音乐 -->
      <el-menu-item style="height:45px;line-height:45px" index="/main">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#iconfind-music"></use>
        </svg>
        <span slot="title">发现音乐</span>
      </el-menu-item>
      <!-- 视频 -->
      <el-menu-item style="height:45px;line-height:45px" index="/video">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#iconvideo"></use>
        </svg>        
        <span slot="title">视频</span>
      </el-menu-item>

      <!-- 歌手 -->
      <el-menu-item style="height:45px;line-height:45px" index="/singer">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#iconsinger"></use>
        </svg>        
        <span slot="title">歌手</span>
      </el-menu-item>

      <!-- 排行 -->
      <el-menu-item style="height:45px;line-height:45px" index="/rank">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#iconrank"></use>
        </svg>        
        <span slot="title">排行</span>
      </el-menu-item>

      <!-- 创建的歌单 -->
      <el-submenu index="1">
        <template slot="title">
          <span class="title">创建的歌单</span>
        </template>
        <el-menu-item-group >
          <!-- 通过动态路由传参的方式，把当前点击的歌单ID传给Playlist组件，Playlist组件中可以通过this.$route.params 找到参数 -->
          <el-menu-item  style="padding-left:40px" 
            v-for="item in createList"
            :key='item.id'
            :index="'/playlist/' + item.id"
          >  
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#iconplay-list"></use>
            </svg>                   
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <!-- 收藏的歌单 -->
      <el-submenu index="2">
        <template slot="title">
          <span class="title">收藏的歌单</span>
        </template>
        <el-menu-item-group>
          <el-menu-item style="padding-left:40px"
            v-for="item in collectList"
            :key='item.id'
            :index="'/playlist/' + item.id"          
          >  
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#iconplay-list"></use>
            </svg>                 
            <span slot="title"  class="ellipsis">{{ item.name }}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>      
    </el-menu>
</template>

<script>
import { mapGetters , mapMutations } from 'vuex'
export default {
  name:'AsideNav',
  data(){
    return {
      createList:[],
      collectList:[]
    }
  },
  computed:{
    ...mapGetters(['userInfo']),
  },
  methods:{
    ...mapMutations({
      setLoveList:'SET_LOVELIST',
    }),
    //获取用户歌单
    getMyPlaylist(){
      const uid = this.userInfo.userId;
      this.$api.getMyPlaylist({ uid }).then(res => {
        const playlist = res.playlist; //我的歌单
        this.createList = playlist.filter(item => item.userId === uid);
        this.collectList = playlist.filter(item => item.userId !== uid)
        this.getLoveList();
      })
    },
    //获取 我喜欢歌单 的音乐列表
    getLoveList(){
      const id = this.createList[0].id; 
      let loveList = [];  
      this.$api.getPlaylistDetails({id}).then(res => {
        loveList = res.playlist.tracks;
        this.setLoveList(loveList);
      })
    }
    
  },
  created(){
    this.getMyPlaylist();  //获取当前用户歌单
  }


}
</script>

<style scoped lang='less'>
.el-menu{
  border:none;
  .el-menu-item {
    color:#B0B0B1;
    overflow: hidden;
      svg{
        font-size:18px;
      }
      span{
        padding-left: 5px;
      }
      &:hover{
        color:#eee;
      }
  }
  .el-submenu {
    margin-left:-20px;
    .title{
      color:#888888;
      font-weight: normal;
    }
  }
}
</style>