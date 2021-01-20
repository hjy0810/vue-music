<template>
  <div class="playlist-sheet">
    <el-row class="table-header">
      <el-col :span="2"><div class="grid-content ">序号</div></el-col>
      <el-col :span="9"><div class="grid-content ">音乐标题</div></el-col>
      <el-col :span="5"><div class="grid-content ">歌手</div></el-col>
      <el-col :span="6"><div class="grid-content ">专辑</div></el-col>
      <el-col :span="2"><div class="grid-content ">时长</div></el-col>
    </el-row>
    <el-row
      v-for='(item,index) in songs'
      :key='item.id'
      @dblclick.native="play(index)"
    >
      <el-col :span="2" >
        <div class="grid-content order">
          <span>{{ utils.addZero(index + 1) }}</span>
          <!-- 是否是喜欢歌曲 -->
          <svg v-if='isLike(item)' @click="like(item)" class="icon" aria-hidden="true">
            <use xlink:href="#iconlike"></use>
          </svg>
          <svg v-else class="icon" @click="like(item)" aria-hidden="true">
            <use xlink:href="#iconlike2"></use>
          </svg>
        </div>
      </el-col>
      <el-col class="music-name"  :span="9">
        <div class="grid-content" :class="{'active':index === currentIndex }">
          {{ item.name }}
        </div>
      </el-col>
      <el-col :span="5">
        <div class="grid-content">
        {{ utils.artistFormat(item.ar) }}
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content">
        {{ item.al.name }}
        </div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content time">
        {{ utils.durationFormat(item.dt) }}
        </div>
      </el-col>            
    </el-row>
  </div>

</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
  name:'PlaylistSheet',
  data(){
    return {
      currentIndex:-1,
    }
  },
  computed:{
    ...mapGetters(['loveList','userInfo']),
  },
  props:{
    songs:{
      type:Array,
      required:true
    }
  },
  methods:{
    ...mapMutations({
      setLoveList:'SET_LOVELIST',
      setPlaylist:'SET_PLAYLIST',
      setIndex:'SET_INDEX',
      setPlaying:'SET_PLAYING'
    }),
    isLike(song){
      if(!this.loveList.length) return false;
      return this.loveList.some(item => item.id === song.id);
    },
    like(song){
      //判断当前音乐是否是 已收藏的音乐
      let isLike = this.isLike(song);
      let id = song.id;
      // 收藏 / 取消收藏
      this.$api.like({
        id,
        like:!isLike,
      }).then(res => {
        this.setLoveList(song);
        //收藏状态已改变，父组件重新请求歌单详情
        this.$emit('fresh');
      })
    },
    //双击播放
    play(index){
      this.setPlaylist(this.songs);
      this.setIndex(index);
      this.currentIndex = index;
    }
  }
}
</script>

<style scoped lang='less'>
.el-row:nth-child(even){
  background-color:#2B2B2B;
}
.el-row:hover{
  background-color: #363636;
}
.el-col {
  border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

// 歌曲列表样式
.playlist-sheet{
  .table-header{
    color:#828282;
  }
  .el-col{
    line-height: 36px;
    font-size: 14px;
    .order{
      display:flex;
      flex-flow:row nowrap;
      justify-content:space-between;
      align-items: center;
      span{
        flex:1;
        color:#606060;
      }
      svg{
        flex:1;
        // margin-left:10px;

        font-size: 18px;
      }      
    }    
    .grid-content{
      padding-left: 5px;
      white-space: nowrap;/*禁止文字内容折行*/
      overflow: hidden;/*超出部分溢出隐 藏*/
      text-overflow: ellipsis; /*文字以省 略号的方式隐藏*/
      color:#949494;
    }


  }
  .music-name{
    .grid-content{
      color:#C1C1C1;
      &.active{
        color:#cf352d;
      }
    }

  }
}

</style>