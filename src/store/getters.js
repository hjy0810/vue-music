const getters = {
  //用户信息
  userInfo(state){
    return state.userInfo;
  }, 

  //喜欢的音乐列表
  loveList(state){
    return state.loveList;
  },

  //当前播放列表
  playlist(state){
    return state.playlist;
  },

  //当前播放歌曲在列表的索引
  index(state){
    return state.index;
  },

  //当前播放歌曲
  currentSong(state){
    return state.playlist[state.index] || {};
  },

  //是否正在播放
  // playing(state){
  //   return state.playing;
  // },

  // //main元素
  // mainElement(state){
  //   return state.mainElement;
  // }



}

export default getters;