<template>
  <li class="singer-item">
    <!-- 歌手图 -->
    <div class="wrapper">
      <div class="cover">
        <div class="image" @click='toSingerDetail'>
          <el-image :src="singer.img1v1Url" alt='歌手图片' lazy>
            <div slot="placeholder" class="image-slot">
              <img src="../../assets/img/default_cover.png" alt="">
              <div class="loading">
                <i class="el-icon-loading"></i>
                加载中<span class="dot">...</span>
              </div>
            </div>
          </el-image>
        </div>
      </div>
    </div>
    <!-- 歌手信息 -->
    <div class="info">
      <h2 class="name ellipsis2">
        {{ singer.name }}
      </h2>
    </div>    
  </li>
</template>

<script>
export default {
  data() {
    return {
      // src: '../../assets/img/default-singer-cover.png',
      src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
    }
  },
  props:{
    singer:{
      type:Object,
      required:true
    }
  },
  methods:{
    toSingerDetail(){
      this.$router.push({
        name:'SingerDetail',
        params:{
          sid:this.singer.id,
        }
      })
    }
  }
}
</script>

<style scoped lang='less'>
.singer-item{
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


  // .el-image{
  //   border-radius: 5px;
  //   .image-slot{
  //     position: relative;
  //     width:100%;
  //     height: 100%;

  //     img{
  //       width:100%;
  //       height: 100%;
  //     }

  //     .loading{
  //       position:absolute;
  //       left:50%;
  //       top:50%;
  //       transform: translate(-50%,-50%);
  //       color:darkcyan;
  //       text-align:center;
  //       width:100%;
  //     }
  //   }
  // }
  // .name{
  //   margin:5px 0;
  // }
}


</style>