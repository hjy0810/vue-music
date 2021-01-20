<template>
  <li class="playlist-item" >
    <!-- 歌单图 -->
    <div class="wrapper">
      <div class="cover" @click="toPlaylist">
        <div class="image">
          <!-- 搜索页面后端返回的图片属性为coverImgUrl -->
          <el-image :src="playlist.picUrl || playlist.coverImgUrl" alt='图片' lazy>
            <div slot="placeholder" class="image-slot">
              <img src="../../assets/img/default_cover.png" alt="">
              <div class="loading">
                <i class="el-icon-loading"></i>
                加载中<span class="dot">...</span>
              </div>
            </div>
          </el-image>
        </div>
        <!-- 播放数量 -->
        <div class='play-count'>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconicon-play"></use>
          </svg>
          <span>{{ utils.transNumber(playlist.playCount) }}</span>
        </div>        
      </div>
    </div>
    <!-- 歌单信息 -->
    <div class="info">
      <h2 class="name ellipsis2">
        {{ playlist.name }}
      </h2>
    </div>    
  </li>
</template>

<script>
export default {
  name:'PlaylistItem',
  data(){
    return {
      // src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
    }
  },
  props:{
    playlist:{
      type:Object,
      required:true
    }
  },
  methods:{
    toPlaylist(){
      this.$router.push({
        name:'Playlist',
        params:{
          id:this.playlist.id
        }
      })      
    }
  },
  created(){

  }

}
</script>

<style scoped lang='less'>
.playlist-item{
  flex:0 0 20%;
  padding:0 10px 20px 0;
  overflow: hidden;
  // 图片样式
  .wrapper{
    padding-right:10px;
    position:relative;
    &::before, &::after {
      content: "";
      width: 100%;
      height: 100%;
      background-color: #4b4a4a;
      position: absolute;
      top: 0;
      transition: all 0.4s;
    }
    &::before {
      right: 6px;
      transform: scale(.85);
      transform-origin: 100% 50%;
      z-index: 2;
      border-radius: 2px;
    }
    &::after {
      right: 4px;
      transform: scale(.73);
      transform-origin: 100% 50%;
      z-index: 1;
      border-radius: 2px;
      opacity: .5;
    }
    .cover{
      position:relative;
      padding-top:100%;
      z-index:3;
      .image{
        position: absolute;
        left:0;
        top:0;
        width:100%;
        height: 100%;
        border-radius:5px;
        overflow: hidden;
        .el-image{
          width: 100%;
          height: 100%;
          .image-slot{
            width: 100%;
            height: 100%;
            img{
              width: 100%;
              height: 100%;
            }
            .loading{
              position:absolute;
              left:50%;
              top:50%;
              transform: translate(-50%,-50%);
              color:darkcyan;
              text-align:center;
              width:100%;
            }  
          }
        }
      }
      // 播放量
      .play-count{
        position: absolute;
        right: 5px;
        top:2px;
        z-index:100;
        display: flex;
        align-items: center;
        font-size:14px;
        color:white;
        svg{
          font-size: 16px;
        }
      }         
    }
  }
  // 底部信息样式
  .info {
    margin-top: 5px;
    .name {
      width:95%;
      font-size: 14px;
    }
  }
  &:hover{
    .wrapper{
      &:before, &:after {
        background: rgba(2, 177, 177, 0.1);
      }
      &:before {
        right: 4px;
      }
      &:after {
        right: 0px;
      }
    }
  }
}

</style>