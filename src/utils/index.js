 const utils = {
  //转换播放量单位 如10000 -> 10万
  transNumber(num){
    if(!num) return ;
    if(num < 10000) return num; 
    if(num >= 100000000) return (num/100000000).toFixed(1) + '亿';
    return (num/10000).toFixed(1) + '万';
  },
  //处理日期
  dateFormat(str,type='YYYY-MM-DD'){
    if(!str) return; //如果str未传值，直接返回
    let date = new Date(str);
    let year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate();
    type = type.replace('YYYY',year).replace('MM',this.addZero(month)).replace('DD',this.addZero(day));
    return type;
  },
  //补零
  addZero(num){
    if(num >= 10) return num;
    return '0' + num;
  },
  //处理时长 ms
  durationFormat(num){
    if(!num) return '00:00';
    let duration = parseInt(num/1000),
        minute = parseInt(duration/60),
        second = duration - minute*60,
        res = `${this.addZero(minute)}:${this.addZero(second)}`;
    return res;
  },
  //处理播放时间 s
  timeFormat(num){
    if(!num) return '00:00';
    let duration = parseInt(num),
        minute = parseInt(duration/60),
        second = duration - minute*60,
        res = `${this.addZero(minute)}:${this.addZero(second)}`;
    return res;
  },
  //处理歌手有多个的情况
  artistFormat(artistArr){
    // search组件中歌手名的属性为userName
    if(!artistArr) return ;  //如果数组不存在，直接返回
    if(artistArr.length === 1){
      return artistArr[0].name ? artistArr[0].name : artistArr[0].userName;
    } 
    return artistArr.reduce((pre,cur) => {
      return pre.name ? (pre.name + ' / ' + cur.name) : (pre.userName + ' / ' + cur.userName)
    })
  },



}

export default utils;