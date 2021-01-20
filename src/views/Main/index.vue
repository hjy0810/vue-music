<template>
  <div class='main'>
    <!-- 轮播图 -->
    <el-carousel 
      class='carousel' 
      :interval="4000" 
      type="card" 
      height="200px"  
      indicator-position='outside' 
      v-if='banners.length !== 0'
      >
      <el-carousel-item v-for="item in banners" :key='item.targetId' >
        <img  class="h100 w100" :src='item.imageUrl' alt="banner" >
      </el-carousel-item>        
    </el-carousel>

    <!-- 推荐歌单 -->
    <div class='recommend' v-if='recommendPlaylist.length !== 0'>
      <p class="title">推荐歌单<span class='icon el-icon-arrow-right'></span></p>
      <ul class="recommend-box">
        <PlaylistItem  
          v-for='item in recommendPlaylist'
          :key='item.id'
          :playlist='item'
        />
      </ul> 
    </div>

    <!-- 推荐MV -->
    <div class='recommend' v-if='recommendMV.length !== 0'> 
      <p class="title">推荐MV<span class='icon el-icon-arrow-right'></span></p>
      <ul class="recommend-box">
        <MvListItem
          v-for='item in recommendMV'
          :key='item.id'
          :mvInfo='item'
        />
      </ul> 
    </div>

  </div>
</template>

<script>
import PlaylistItem from '../../components/PlaylistItem';
import MvListItem from '../../components/MvListItem';
export default {
  name:'Main',
  data(){
    return {
      banners:[],
      recommendPlaylist:[],
      recommendMV:[],
    }
  },
  components:{
    PlaylistItem,
    MvListItem
  },
  methods:{
    //获取轮播图数据
    getBanner(){
      this.$api.getBanner().then(res => {
        this.banners = res.banners;
      })
    },

    //获取推荐歌单
    getRecommendPlaylist(){
      this.$api.getRecommendPlaylist({limit:10}).then(res => {
        this.recommendPlaylist = res.result;
      })
    },

    //获取推荐MV
    getRecommendMV(){
      this.$api.getRecommendMV({limit:8}).then(res => {
        this.recommendMV = res.result;
      })
    }
  },
  created(){
    this.getBanner(); //轮播图
    this.getRecommendPlaylist(); //推荐歌单
    this.getRecommendMV(); //推荐MV
  },
}
</script>

<style scoped lang='less'>
.main{
  .recommend{
    margin: 20px 0 ;
    .title{
      height: 30px;
      line-height: 30px;

    }
    .recommend-box{
      min-width: 800px;
      box-sizing: border-box;
      // flex多行多列布局
      display: flex;
      flex-flow:row wrap;
      justify-content: space-between;
    }
  }
}
</style>



