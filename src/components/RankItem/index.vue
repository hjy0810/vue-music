<template>
  <li class="rank-item">
    <!-- 榜单图 -->
    <div class="wrapper">
      <div class="cover" @click="toPlaylist">
        <div class="image">
          <el-image :src="toplistItem.coverImgUrl" alt='图片' lazy>
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
          <span>{{ utils.transNumber(toplistItem.playCount) }}</span>
        </div>
      </div>
    </div>
    <!-- 榜单信息 -->
    <div class="info">
      <h2 class="name ellipsis2">
        {{ toplistItem.name }}
      </h2>
    </div>
  </li>
</template>

<script>
export default {
  data(){
    return {
      // src:require('../../assets/img/default-singer-cover.png'),
      // src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'

    }
  },
  props:{
    toplistItem:{
      type:Object,
      required:true
    }
  },
  methods:{
    //跳转到歌单路由
    toPlaylist(){
      this.$router.push({
        name:'Playlist',
        params:{
          id:this.toplistItem.id
        }
      })
    }
  }

}
</script>

<style scoped lang='less'>
.rank-item{
  flex:0 0 20%;
  padding:0 10px 20px 0;
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