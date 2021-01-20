<template>
  <div class="singer" >
    <!-- 头部标签 -->
    <div class="singer-tags">
      <!-- 语种 -->
      <ul class="tag  clearfix">
        <li class="left" 
          v-for='item in lang' 
          :key='item.value'
          :class="{'active':item.value === params.area}"
          @click="changeType('lang',item.value)"
        >
          {{ item.label }}
        </li>
      </ul>
      <!-- 分类 -->
      <ul class="tag  clearfix">
        <li class="left" 
          v-for='item in classify' 
          :key='item.value' 
          :class="{'active':item.value === params.type}"
          @click="changeType('classify',item.value)"
        >
          {{ item.label }}
        </li>
      </ul>
      <!-- 筛选 -->
      <ul class="tag tag-filter clearfix">
        <li class="left" 
          v-for='item in filter' 
          :key='item.value' 
          :class="{'active':item.value === params.initial}"
          @click="changeType('filter',item.value)"
        >
          {{ item.label }}
        </li>
      </ul>
    </div>

    <!-- 歌手列表 -->
    <ul class="singer-list">
        <SingerItem
          v-for="item in singers"
          :key='item.id'
          :singer='item'
        />        
    </ul>
  </div>
</template>

<script>
import SingerItem from '../../components/SingerItem';
export default {
  name:'Singer',
  data(){
    return {
      // 语言
      lang:[
        {
          value:-1,
          label:'全部'
        },
        {
          value:7,
          label:'华语'
        },
        {
          value:96,
          label:'欧美'
        },
        {
          value:8,
          label:'日本'
        },
        {
          value:16,
          label:'韩国'
        },
        {
          value:0,
          label:'其他'
        },
      ],
      // 分类
      classify:[
        {
          value:-1,
          label:'全部'
        },
        {
          value:1,
          label:'男歌手'
        },
        {
          value:2,
          label:'女歌手'
        },
        {
          value:3,
          label:'乐队'
        },
      ],
      // 筛选
      filter:[],
      params:{
        limit:30,
        offset:0,
        area:-1, //语种 默认全部
        type:-1, //分类 默认全部
        initial:-1, //筛选 默认热门
      },
      singers:[], 
    }
  },
  components:{
    SingerItem,
  },
  methods:{
    // 设置标签信息
    getFilter(){
      let arr = [];
      for (let i = 0; i < 26; i++) {
        arr.push({
          value:String.fromCharCode(97 + i),
          label:String.fromCharCode(65 + i)
        });
      }
      arr.push({ value:0,label:'#' });
      arr.unshift({ value:-1,label:'热门' })
      this.filter = arr;
    },
    //修改分类列表
    changeType(type,value){
      // console.log(type,value);
      if(type === 'lang'){
        this.params.area = value;
      }else if(type === 'classify'){
        this.params.type = value;
      }else{
        this.params.initial = value;
      }
      this.getArtist();

    },
    //获取歌手分类列表
    getArtist(){
      this.$api.getArtist(this.params).then(res => {
        this.singers = res.artists;
      })
    },
  },
  created(){
    this.getFilter();
    this.getArtist();
  },
}
</script>

<style scoped lang='less'>
.singer{
  font-size:14px;
  // 歌手标签
  .singer-tags{
    margin-bottom:10px;
    .tag{
      height: 30px;
      line-height: 30px;
      li{
        width:50px;
        border-radius: 5px;
        text-align: center;
        color:#949494;
        &:hover{
          color:#BEBEBE;
        }
        &.active{
          color:darkcyan;
        }
      }
    }
    .tag-filter{
      height: 60px;
    }
  }
  //歌手列表
  .singer-list{
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
  }
}
</style>