<template>
  <div class='playlist' >
    <div class="top clearfix">
      <img class="playlist-img" :src='detail.coverImgUrl' alt="">
      <!-- 歌单信息 -->
      <div class="info">
        <p>{{ detail.name }}</p>
        <div class="avatar clrarfix"> 
          <img :src='creator.avatarUrl' alt="">
          <div>
            <span>{{ creator.nickname }}</span>
            <span>{{ utils.dateFormat(detail.createTime) }}创建</span>
          </div>
        </div>
        <div class="count">
          <span>歌曲数：<span>{{ detail.trackCount }}</span></span>
          <span>播放数：<span>{{ utils.transNumber(detail.playCount) }}</span></span>
        </div>
      </div>
    </div>
    <!-- 歌曲列表 -->
    <div class="playlist-box">
      <p class="title">歌曲列表</p>
      <PlaylistSheet @fresh='fresh' :songs='playlist'/>
    </div>

  </div>
</template>

<script>
import PlaylistSheet from '../../components/PlaylistSheet';
export default {
  name:'Playlist',
  data() {
    return {
      detail:{},  //歌单详情
      creator:{}, //歌单创建者信息
      playlist:[],//歌单歌曲列表
    };
  },
  components:{
    PlaylistSheet
  },
  methods:{
    //获取歌单详情
    getPlaylistDetails(){
      const id = this.$route.params.id;//歌单id
      this.$api.getPlaylistDetails({id}).then(res => {
        this.detail = res.playlist; 
        this.creator = this.detail.creator;
        this.playlist = this.detail.tracks;  
      })
    },

    //子组件 收藏/取消收藏歌曲，重新获取当前歌单详情
    fresh(){
      this.getPlaylistDetails();
    }
  },
  created(){
    //获取歌单详情
    this.getPlaylistDetails()
  },
}
</script>

<style scoped lang='less'>
.playlist{
  //歌单信息样式
  .top{
    .playlist-img{
      float: left;
      display: block;
      border-radius: 5px;
      width: 200px;
      height: 200px;
    }
    .info{
      float:left;
      margin-left:10px;
      p{
        font-size:20px;
        color:#BEBEBE;
      }
      .avatar{
        margin-top:10px;
        height: 30px;
        line-height: 30px;
        img{
          float:left;
          display: block;
          border-radius: 50%;
          width: 30px;
          height: 30px; 
        }
        div{
          float:left;
          span{
            font-size:15px;
            color:#949494;
            margin:0 5px;
          }
        }
      }
      .count{
        margin-top:10px;
        color:#BEBEBE;
        span{
          font-size: 14px;
          margin-right:5px;
          span{
            color:#949494;
          }
        }
      }
    }
  }
  .playlist-box{
    .title{
      margin-top:20px; 
      padding-bottom:10px;
      border-bottom: 1px solid #353535;
      color:#BEBEBE;
      font-size:18px;      
    }
  }
}
</style>