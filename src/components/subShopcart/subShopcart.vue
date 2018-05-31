<template>
    <div>
        <div @click="subtract" class="left">-</div>
        <div class="center">{{count}}</div>
        <div @click="plus" class="right">+</div>
    </div>
</template>
<style scoped>
    div>div{
       display: inline-block;
       width:30px;
       height:30px;
       border:1px solid #ddd ;
       text-align: center;
        line-height:30px;
    }
</style>

<script>
    export default{
        props:["goodsCount","goodsId"],
        data(){
            return {
                count:1
            }
        },
        created(){
            this.count = this.goodsCount
        },
        methods:{
            plus(){
                this.count++
                this.notify()
            },
            subtract(){
                if(this.count>1){
                    this.count--
                }
                this.notify()
            },
            notify(){
                const goods= {
                    id : this.goodsId,
                    count:this.count,
                }
                this.$emit("goodsCountchange",goods);
            }
        }
    }
</script>
