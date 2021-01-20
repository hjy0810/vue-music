<template>
  <div class="play-mv h100">
    <!-- mv播放和推荐 -->
    <div class="play-recommend">
      <!-- 左侧播放 -->
      <div class="mv-play main">
        <p>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconleft"></use>
          </svg>
          MV详情
        </p>
        <video :src="mvUrl" controls></video>
        <div class="user-info">
          <img src="../../assets/img/default_cover.png" alt="">
          <span>{{ utils.artistFormat(mvInfo.artists) }}</span>
        </div>
      </div>

      <!-- 右侧推荐MV -->
      <div class="mv-recommend">
        <p>相关推荐</p>
        <ul class="mv-list">
          <li class="mv-item clearfix" v-for="item in recommendList" :key='item.id'>
            <div class="left">
              <img :src="item.coverUrl"  alt="">
              <div class='play-count'>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#iconicon-play"></use>
                </svg>
                <span>{{ utils.transNumber(item.playTime) }}</span>
              </div>
              <span class='duration'>{{ utils.durationFormat(item.durationms) }}</span>
            </div>
            <div class="right">
              <span class="mv-name">{{ item.title }}</span>
              <span class="artist">by {{ item.creator[0].userName }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- mv信息 -->
    <div class="mv-info main">
      <div class="mv-name">{{ mvInfo.name }}</div>
      <div class="play-info">
        <span>发布：{{ mvInfo.publishTime }}  </span>
        <span class="count">播放：{{ utils.transNumber(mvInfo.playCount) }}次</span>
      </div>
    </div>

    <!-- 评论 -->
    <div class="mv-comment main">
      <p>精彩评论（{{ totalComment }}条）</p>
      <ul class="won-comment">
        <li class="clearfix" v-for="item in commentList" :key='item.commentId'>
          <img :src="item.user.avatarUrl" alt="">
          <div class="content">
            <span class="user-name">{{ item.user.nickname }}：</span>
            <span class="com-content">{{ item.content }}</span>
            <div class="clearfix">
              <span class="com-time">{{ utils.dateFormat(item.time) }}</span>
              <div class="icon-box">
                <svg  class="icon thumb-up" aria-hidden="true">
                  <use xlink:href="#iconzan1"></use>
                </svg>
                 {{ utils.transNumber(item.likedCount) }} 
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#iconshare1"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#iconcomment"></use>
                </svg>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import defaultCover from '../../assets/img/default_cover.png;
export default {
  name:'PlayMV',
  data(){
    return {
      mvID:'',
      mvUrl:'',
      mvInfo:{},
      // artistCover:'',
      recommendList:[],
      commentList:[],
      totalComment:null,
    }
  },
  methods:{
    getMVUrl(){
      this.$api.getMVUrl({id:this.mvID}).then(res => {
        this.mvUrl = res.data.url;
      })
    },
    getMVInfo(){
      this.$api.getMVInfo({mvid:this.mvID}).then(res => {
        this.mvInfo = res.data;
      })
    },

    getRelatedMV(){
      this.$api.getRelatedMV({id:this.mvID}).then(res => {
        this.recommendList = res.data.filter((item,index) => index < 4);
      })
    },

    getMVComment(){
      this.$api.getMVComment({id:this.mvID}).then(res => {
        this.commentList = res.comments;
        this.totalComment = res.total;
      })
    },
  },
  created(){
    this.mvID = this.$route.params.mvID;
    this.getMVUrl()
    this.getMVInfo()
    this.getRelatedMV()
    this.getMVComment()
  }
}
</script>

<style scoped lang='less'>
// 整体布局
.main{
  width: 600px;
}
.play-mv{
  padding-left:20px;
  width:860px;
  margin:0 auto;
  color:white;
  // mv播放和推荐 
  .play-recommend{
    position: relative;
    .mv-play{
      p{
        height: 40px;
        line-height: 40px;
        color:#BEBEBE;
        font-weight: bolder;
        svg{
          color:#666666;
          font-size:18px;
        }
      }
      video{
        width: 600px;
        height: 315px;
      }
      .user-info{
        height: 60px;
        overflow: hidden;
        img{
          width: 40px;
          height: 40px;
          border-radius: 50%;
          vertical-align: middle;
        }
        span{
          font-size: 18px;
          line-height: 60px;
          margin-left: 10px;
          color:#949494;
        }
      }
    }
    .mv-recommend{
      width:300px;
      position:absolute;
      left:620px;
      top:0;
      p{
        height: 40px;
        line-height: 40px;
        color:#BEBEBE;
        font-weight: bolder;
      }
      .mv-list{
        margin-top:10px;
        .mv-item{
          margin-bottom:10px;
          .left{
            float:left;
            position:relative;
            width: 150px;
            height: 80px;
            color:white;
            img{
              width: 150px;
              height: 80px;
              border-radius: 3px;
            }
            .play-count{
              position: absolute;
              top:0;
              right:0;
              svg{
                font-size:18px;
                margin-right:2px;
              }
            }
            .duration{
              position: absolute;
              bottom:0;
              right:3px;
            }
          }
          .right{
            float:left;
            margin-left:10px;
            color:#BEBEBE;
            font-size:14px;
            width:140px;
            .mv-name{
              display: -webkit-box; /* 弹性盒模型*/
              -webkit-box-orient: vertical; /*文字垂直排列 */
              -webkit-line-clamp:2; /*文字显示的行数*/
              overflow: hidden; /*超出部分溢出隐藏*/
              color:#B5B5B5;
              margin-bottom:10px;
            }
            .artist{
              color:#5B5B5B;
              font-size:12px;
              white-space: nowrap;/*禁止文字内容折行*/
              overflow: hidden;/*超出部分溢出隐 藏*/
              text-overflow: ellipsis; /*文字以省 略号的方式隐藏*/
            }
          }
        }
      }
    }
  }
  //mv信息
  .mv-info{
    .mv-name{
      font-size:20px;
      color:#BEBEBE;
      font-weight: bolder;
      height: 50px;
      line-height: 50px;
    }
    .play-info{
      color:#5B5B5B;
      font-size:14px;
      height: 30px;
      line-height: 30px;
      .count{
        margin-left:20px;
      }
    }
  }
  //评论
  .mv-comment{
    margin-top:20px;
    p{
      font-size:18px;
      color:#BEBEBE;
      height:40px;
      vertical-align: top;
    }
    ul{
      li{
        // overflow: hidden;
        img{
          float:left;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          margin-right:10px;
        }
        .content{
          float:left;
          width:560px;
          font-size:14px;
          // border-bottom:1px solid gray;
          &::after{
            // 宽度为0.3px的线
            content:'';
            height:1px;
            display: block;
            width:100%;
            background-color: gray;
            transform: scaleY(0.3);
            margin:10px 0;
          }
          .user-name{
            height: 30px;
            // line-height: 30px;
            vertical-align: top;;
            color:#85B9E6;
          }
          .com-content{
            color:#AFAFAF;
          }
          .clearfix{
            margin-top:5px;
            color:#5B5B5B;
            .com-time{
              float: left;
            }
            .icon-box{
              float:right;
              svg{
                margin:0 20px;
              }
              svg.thumb-up{
                margin-right:0;
              }
            }
          }
        }
      }
    }
  }
}
</style>