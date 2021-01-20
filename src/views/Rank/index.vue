<template>
  <div class="rank">
    <p class="title">排行榜</p>
    <ul class="rank-list">
      <RankItem
        v-for='item in toplist'
        :key='item.id'
        :toplistItem='item'
      />
    </ul>
  </div>
</template>

<script>
import RankItem from '../../components/RankItem';
export default {
  name:'Rank',
  data(){
    return {
      toplist:[]

    }
  },
  components:{
    RankItem,
  },
  methods:{
    //获取排行榜
    getToplist(){
      this.$api.getToplist().then(res => {
        this.toplist = res.list;
      })
    },



  },
  created(){
    this.getToplist()
  }

}
</script>

<style scoped lang='less'>
.title{
  color:#BEBEBE;
  font-size:18px;
  height: 40px;
  line-height: 40px;
}
.rank-list{
  display: flex;
  flex-flow:row wrap;
  justify-content: space-between;
}
</style>