<template>
  <div class="search">

     <!-- 搜索结果信息 -->
    <div class="info">
      <span class="keyword">{{ keywords }}</span>
      <span class="total" v-if='type === 1'>找到{{ total }}首歌曲</span>
      <span class="total" v-if='type === 1000'>找到{{ total }}个歌单</span>
      <span class="total" v-if='type === 100'>找到{{ total }}位歌手</span>
      <span class="total" v-if='type === 1014'>找到{{ total }}个视频</span>
    </div>

    <!-- Tags -->
    <ul class="tags clearfix">
      <li class="item" :class="type === 1 ? 'active' : ''" @click="changeType(1)">单曲</li>
      <li class="item" :class="type === 1000 ? 'active' : ''" @click="changeType(1000)">歌单</li>
      <li class="item" :class="type === 100 ? 'active' : ''" @click="changeType(100)">歌手</li>
      <li class="item" :class="type === 1014 ? 'active' : ''" @click="changeType(1014)">视频</li>
    </ul>
    <!-- 线 -->
    <div class="line"></div>

    <div class="content" ref="content">
      <PlaylistSheet :songs='songs' v-if='type === 1'/>

      <ul class="playlist"  v-if='type === 1000'>
        <PlaylistItem  
          v-for='item in playlists'
          :key='item.id'
          :playlist='item'
        />
      </ul>       

      <ul class="singer-list" v-if='type === 100'>
          <SingerItem
            v-for="item in artists"
            :key='item.id'
            :singer='item'
          />     
      </ul>  

      <ul class="mv-list" v-if='type === 1014'>
        <MvListItem
          v-for='item in videos'
          :key='item.id'
          :mvInfo='item'
        />  
      </ul> 
    </div>
    <!-- 分页器 -->
    <!-- <div class="pagination" v-if='show'>
      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="30"
        :total="300"
        :background='true'
        :hide-on-single-page='true'>
      </el-pagination>
    </div> -->
  </div>
</template>

<script>
import PlaylistSheet from '../../components/PlaylistSheet';
import PlaylistItem from '../../components/PlaylistItem';
import SingerItem from '../../components/SingerItem';
import MvListItem from '../../components/MvListItem';
export default {
  name:'Search',
  data(){
    return {
      keywords:'',
      songs:[],     //单曲列表
      playlists:[],  //歌单列表
      artists:[],   //歌手列表
      videos:[],    //mv列表
      type:1,       //默认展示单曲
      params:{
        limit:40,
        offset:0,
        type:1
      },
      total:0, //总数 
      // page:1, //当前页码
      // show:false,
    }
  },
  watch:{
    keywords(){
      this.search();
    } 
  },
  components:{
    PlaylistSheet,
    PlaylistItem,
    SingerItem,
    MvListItem
  },
  methods:{
    changeType(type){
      this.type = type;
      this.params.type = type;
      this.search();
    },
    search(){
      this.$api.search({
        keywords:this.keywords,
        ...this.params,
      }).then(res => {
        switch(this.type){
          case 1:
            this.total = res.result.songCount;
            if(this.total){
              this.songs = res.result.songs;
            }
            break;
          case 1000:
            this.playlists = res.result.playlists;
            this.total = res.result.playlistCount;
            break;
          case 100:
            this.artists = res.result.artists;
            this.total = res.result.artistCount;
            break;
          case 1014:
            this.videos = res.result.videos;
            this.total = res.result.videoCount;
            break;
          default:
             this.songs = res.result.songs;
            this.total = res.result.songCount;
             break;
        }
      }).catch(err => console.log(err))
    },
    //分页器页码改变事件
    // handleCurrentChange(currentPage){
    //   console.log(currentPage);
    // }    

  },
  created(){
    this.keywords = this.$route.params.keywords;
  },
  mounted(){
    // this.$nextTick(() => {
    //   this.show = true; //显示分页器
    // })
  }
}
</script>

<style scoped lang='less'>
.search{
  .info{
    .keyword{
      color:#BEBEBE;
      font-size: 22px;
      font-weight: bold;
    }
    .total{
      color:#666666;
      font-size: 14px;
      margin-left:10px;
    }    
  }
  // tags
  .tags{
    margin-top:20px;
    .item{
      float:left;
      width:80px;
      font-size:14px;
      &:hover{
        color:#EEE;
      }
      &.active{
        color: darkcyan;
      }      
    }
  }
  .line{
    height: 1px;
    margin-top:10px;
    background-color: gray;
    transform: scaleY(0.5);
  }
  .content{
    .playlist,
    .singer-list,
    .mv-list{
      display: flex;
      flex-flow:row wrap;
      justify-content: space-between;
    }
  }
}

</style>