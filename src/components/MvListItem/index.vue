<template>
  <li class="mvlist-item" @click="toPlayMV">
    <!-- MV图 -->
    <div class="wrapper">
      <div class="cover">
        <div class="image">
          <!-- 主页推荐mv的图片属性为picUrl，video组件列表中的为cover，search组件中的为coverUrl -->
          <el-image :src="mvInfo.picUrl || mvInfo.cover || mvInfo.coverUrl" alt='mvInfo.picUrl' lazy>
            <div slot="placeholder" class="image-slot">
              <img src="../../assets/img/default_cover.png" alt="">
              <div class="loading">
                <i class="el-icon-loading"></i>
                加载中<span class="dot">...</span>
              </div>
            </div>
          </el-image>
        </div>
        <!-- mask -->
        <div class="mask">
          <i class="el-icon-caret-right" ></i>          
        </div>
        <!-- 播放数量 -->
        <div class='play-count'>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconicon-play"></use>
          </svg>
          <!-- search组件中的播放次数属性为playTime -->
          <span>{{ mvInfo.playCount ? utils.transNumber(mvInfo.playCount) : utils.transNumber(mvInfo.playTime) }}</span>
        </div>    
        <!-- MV时长 -->
        <div class="duration" v-if='mvInfo.duration'> <!-- 最新mv中的duration值为0 -->
          {{ mvInfo.duration ? utils.durationFormat(mvInfo.duration) : utils.durationFormat(mvInfo.durationms)}}
        </div>
      </div>
    </div>
    <!-- MV信息 -->
    <div class="info">
      <h2 class="name ellipsis">
        <!-- search组件中的mv名属性为title -->
        {{ mvInfo.name || mvInfo.title}}
      </h2>
      <p class="artist ellipsis">
        <!-- main组件中推荐mv作者属性为artists，video组件中为creator -->
        by {{ mvInfo.artists ? utils.artistFormat(mvInfo.artists) : utils.artistFormat(mvInfo.creator) }}
      </p>
    </div>      

  </li>
</template>

<script>
export default {
  name:'MVListItem',
  data(){
    return {
      // src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
    }
  },
  props:{
    mvInfo:{
      type:Object,
      required:true,
    }
  },
  methods:{
    toPlayMV(){
      // search组件中展示的视频,属性名为vid
      let id = this.mvInfo.id || this.mvInfo.vid;
      this.$router.push({
        name:'PlayMV',
        params:{
          mvID:id
        }
      })
    }
  }

}
</script>

<style scoped lang='less'>
.mvlist-item{
  flex:0 0 25%;
  padding:0 10px 20px 0;
  overflow: hidden; //不加这个有的图片样式有问题？
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
      padding-top:61.8%;
      z-index:3;
      // mask样式
      .mask{
        display: none;
        position: absolute;
        left:50%;
        top:50%;
        transform: translate(-50% , -50%);
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background-color: #929292;
        opacity:0.8;
        i{
          font-size: 26px;
          color:red;
          margin:5px 0 0 5px;
        }
      }
      &:hover{
        .mask{
          display: block;
        }
      }
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
      //MV时长
      .duration{
        position:absolute;
        right:5px;
        bottom:5px;
        z-index: 100;
        font-size:14px;
        color:white;
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
  .artist{
    width:95%;
    font-size:12px;
    color:#5B5B5B;
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