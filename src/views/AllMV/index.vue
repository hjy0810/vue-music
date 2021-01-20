<template>
  <div class="allMV" ref='allmv'>
    <!-- mv标签列表 -->
    <div class="all-tags">
      <ul class="tags clearfix">
        <!-- 地区 -->
        <li class="item area" 
          v-for='item in area'
          :key='item'
          :class="{'active':item === params.area}" 
          @click="changeType('area',item)"
        >
          {{item}}
        </li>
      </ul>
      <ul class="tags clearfix">
        <!-- 类型 -->
        <li class="item type" 
          v-for='item in type'
          :key='item'
          :class="{'active':item === params.type}"
          @click="changeType('type',item)"
        >
          {{item}}
        </li>
      </ul>
      <ul class="tags clearfix">
        <!-- 排序 -->
        <li class="item order" 
          v-for='item in order'
          :key='item'
          :class="{'active':item === params.order}"
          @click="changeType('order',item)"
        >
          {{item}}
        </li>
      </ul>
    </div>

    <!-- mv列表 -->
    <ul class="mv-list">
      <MvListItem 
        v-for='item in mvList'
        :key='item.id'
        :mvInfo='item'      
      />
    </ul>
  </div>
</template>

<script>
import MvListItem from '../../components/MvListItem';
export default {
  name:'AllMV',
  data(){
    return {
      area:['全部','内地','港台','欧美','韩国','日本'],
      type:['全部','官方版','原声','现场版','网易出品'],
      order:['上升最快','最热','最新'],
      params:{
        limit:40,
        offset:0,
        area:'全部',
        type:'全部',
        order:'上升最快'
      },
      mvList:[],
    }
  },
  components:{
    MvListItem,
  },
  methods:{
    changeType(tag,value){
      this.params[tag] = value;
      this.getAllMV();
    },
    getAllMV(){
      this.$api.getAllMV(this.params).then(res => {
        this.mvList = res.data;
      })
    }
  },
  created(){
    this.params = {...this.params,...this.$route.params};
    this.getAllMV();
  },
}
</script>

<style scoped lang='less'>
.allMV{
  font-size:14px;
  //标签列表
  .all-tags{
    margin-bottom:10px;
    .tags{
      height: 30px;
      line-height: 30px;
      .item{
        float:left;
        width:60px;
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
  }
  //mv列表
  .mv-list{
    display: flex;
    flex-flow:row wrap;
    justify-content: space-between;
  }
}
</style>