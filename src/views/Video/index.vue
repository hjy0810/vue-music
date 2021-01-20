<template>
  <div class="video">
    <!-- 最新MV -->
    <div class="latest-mv" v-if='latestMV.length !== 0'>
      <div class="title clearfix">
        <p class="left head" @click="toAllMV('最新',params.area)">
          <span >最新MV</span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconright"></use>
          </svg>
        </p>
        <ul class="area clearfix right">
          <li class="area-list left" 
            v-for="item in area"
            :key='item'
            :class="{'active':params.area === item}" 
            @click="changeArea(item)"
          >
            {{ item }}
          </li>
        </ul>
      </div>

      <ul class="latest-mv-box">
        <MvListItem
          v-for='item in latestMV'
          :key='item.id'
          :mvInfo='item'
        />        
      </ul>      
    </div>

    <!-- 最热MV -->
    <div class="hot-mv"  v-if='hotMV.length !== 0'>
      <div class="title">
        <p @click="toAllMV('最热')">
          <span class="head">最热MV</span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconright"></use>
          </svg>
        </p>
      </div>
      <ul class="hot-mv-box">
        <MvListItem
          v-for='item in hotMV'
          :key='item.id'
          :mvInfo='item'
        />        
      </ul>      
    </div>

  </div>
</template>

<script>
import MvListItem from '../../components/MvListItem';
export default {
  name:'Video',
  data(){
    return {
      area:['内地','港台','欧美','韩国','日本'],
      params:{
        limit:8,
        area:'内地'
      },
      latestMV:[],
      hotMV:[]

    }
  },
  components:{
    MvListItem,
  },
  methods:{
    //获取最新mv
    getLatestMV(){
      this.$api.getLatestMV(this.params).then(res => {
        this.latestMV = res.data;
      })
    },
    //获取最热mv
    getHotMV(){
      this.$api.getAllMV({limit:8,order:'最热'}).then(res => {
        this.hotMV = res.data;
      })      
    },
    //
    changeArea(area){
      this.params.area = area;
      this.getLatestMV();
    },
    //跳转到 AllMV 路由页面
    toAllMV(order,area){
      let params = area ? { order,area } : { order };
      this.$router.push({
        name:'AllMV',
        params,
      })
    }
  },
  created(){
    this.getLatestMV();
    this.getHotMV();
  }

}
</script>

<style scoped lang='less'>
.latest-mv,
.hot-mv{
  .title{
    height: 40px;
    line-height: 40px;
    .head:hover{
      color: #DDD;
    }
    .area{
      .area-list{
        border-right:1px solid #353535;
        width:50px;
        text-align: center;
        font-size:14px;
        color:#949494;   
        &:hover{
          color:#f9fafc;          
        }
        &.active{
          color:darkcyan;
        }
      }
    }
  }
  .latest-mv-box,
  .hot-mv-box{
    min-width: 800px;
    box-sizing: border-box;
    // flex多行多列布局
    display: flex;
    flex-flow:row wrap;
    justify-content: space-between;
  }
}
</style>