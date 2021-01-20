import * as types from './mutation-type'
const mutations = {
  //设置用户信息
  [types.SET_USERINFO](state,userInfo){
    state.userInfo = userInfo;
  },

  //设置token
  [types.SET_TOKEN](state,token){
    state.token = token;
  },

  //设置我喜欢的音乐列表
  [types.SET_LOVELIST](state,song){
    //如果是数组，表示设置我喜欢列表
    let isArray = Object.prototype.toString.call(song) === "[object Array]";
    if(isArray){
      if(song.length === 0) return ;
      state.loveList = song;
      return ;
    }
    //不是数组，传进来的就是当前song的信息，有song就移除，没有就添加
    let index = state.loveList.findIndex(item => item.id === song.id);
    if(index === -1){
      state.loveList.unshift(song);
      return ;
    }else{
      state.loveList.splice(index,1);
      return ;
    }
  },

  //设置播放列表
  [types.SET_PLAYLIST](state,playlist){
    state.playlist = playlist;
  },

  //设置播放索引
  [types.SET_INDEX](state,index){
    state.index = index;
  },

  // //设置main元素
  // [types.SET_MAINELEMENT](state,el){
  //   state.mainElement = el;
  // }


  // //设置播放状态
  // [types.SET_PLAYING](state,flag){
  //   state.playing = flag;
  // },




}
export default mutations;