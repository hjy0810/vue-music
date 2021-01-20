<template>
  <div class='footer'>
    <div class="progress">
      <div class="current" ref='progress'></div>
    </div>

    <div class="player">
      <audio 
        ref='audio'
        :src="songUrl"
        @timeupdate="getCurrentTime"
      >
      </audio> 
    </div>

    <div class="play">
      <div class="song-info">
        <div class="image" >
          <img :src="currentSong.al.picUrl" alt="">
          <div class="mask"></div>
          <div>
            <svg class="icon top" aria-hidden="true">
              <use xlink:href="#iconarrow-top"></use>
            </svg>    
            <svg class="icon bottom" aria-hidden="true">
              <use xlink:href="#iconarrow-down"></use>
            </svg>                
          </div>
        </div>
        <div class="info">
          <p class="song-name">{{ currentSong.name }} - {{ utils.artistFormat(currentSong.ar) }} </p>
          <p class="duration"> {{ utils.timeFormat(currentTime) }} / {{ utils.durationFormat(currentSong.dt) }} </p>
        </div>
      </div>

      <div class="controls">
        <svg class="icon" aria-hidden="true" @click="prev">
          <use xlink:href="#iconprev-music"></use>
        </svg>     

        <svg v-if='playing' class="icon" aria-hidden="true" @click="handlePlay">
          <use xlink:href="#iconplay-music"></use>
        </svg>        
         
        <svg v-else class="icon" aria-hidden="true" @click="handlePlay">
          <use xlink:href="#iconsuspend-music"></use>
        </svg>      

        <svg class="icon" aria-hidden="true" @click="next">
          <use xlink:href="#iconnext-music"></use>
        </svg>    
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
  name:'Footer',
  data(){
    return {
      songUrl:'',
      playing:false,
      currentTime:'',
    }
  },
  computed:{
    ...mapGetters(['playlist','index','currentSong']),
  },
  watch:{
    currentSong(newSong){
      this.getSongUrl();
    }
  },
  methods:{
    ...mapMutations({
      // setPlaying:'SET_PLAYING',
      setIndex:'SET_INDEX'
    }),
    //获取当前song的URL
    getSongUrl(){
      const id = this.currentSong.id;
      this.$api.getSongUrl({id}).then(res => {
        this.songUrl = res.data[0].url;
        const audio = this.$refs.audio;
        this.$nextTick(() => {
          audio.play();
        })
      })
    },
    //获取当前song的播放进度
    getCurrentTime(e){
      this.currentTime = e.target.currentTime; 
      const progress = this.$refs.progress;
      let rate = (this.currentTime*1000/(this.currentSong.dt)).toFixed(3);
      progress.style.width = `${rate*100}%`;
    },

    //控制播放状态
    handlePlay(){
      if(this.playing){
        this.$refs.audio.pause();
      }else{
        this.$refs.audio.play();
      }
      this.playing = !this.playing;
    },

    //上一首
    prev(){
      let length = this.playlist.length;
      //获取并设置上一首的索引
      let index = this.index === 0 ? length -1 : this.index - 1;
      this.setIndex(index);
      this.getSongUrl()
    },

    //下一首
    next(){
      let length = this.playlist.length;
      //获取并设置下一首的索引
      let index = this.index === length - 1 ? 0 : this.index + 1;
      this.setIndex(index);
      this.getSongUrl()
    }
  },
  created(){
    this.getSongUrl();
  },
  mounted(){
    this.$refs.audio.addEventListener('playing',() => {
      this.playing = true;
    })
  }

}
</script>

<style scoped lang='less'>
.footer{
  padding:0 10px;
  height: 60px;
  color:#C7C7C7;
  position: relative;
  .progress{
    width:100%;
    height: 2px;
    background-color:#878787;
    position: absolute;
    left:0;
    top:0;
    .current{
      width: 0;
      height: 100%;
      background-color:#1DCC94;
    }
  }
  .play{
    position: relative;
    .song-info{
      width:300px;
      display: flex;
      .image{
        position:relative;
        width:50px;
        height: 50px;
        margin-top:5px;
        border-radius: 5px;
        overflow: hidden;
        img{
          width: 100%;
          height: 100%;

        }
        .mask{
          position: absolute;
          left:0;
          top:0;
          opacity: 0;
          width: 100%;
          height: 100%; 
          background-color: gray;   
        }
        .icon{
          position: absolute;
          left:50%;
          color:white;
          transform: translateX(-50%);
          opacity:0;
        }
        .top{
          top:8px;
        }
        .bottom{
          bottom:8px;
        }
        &:hover{
          .mask{
            opacity: 0.3;
          }
          .icon{
            opacity:1;
          }
        }
      }
      .info{
        flex:1;
        margin-left:10px;
        width:240px;
        p{
          height:30px;
          line-height: 30px;
          font-size:14px;
          text-align:left;
          color:#C6C6C6;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
    .controls{
      position:absolute;
      left:50%;
      top:50%;
      transform: translateX(-50%);
      transform: translateY(-50%);
      width:100px;
      height:60px;
      svg{
        width:30px;
        color:darkcyan;
        font-size:20px;
        &:hover{
          color:#1DCE9B;
        }
      }
    }
  }
}
</style>