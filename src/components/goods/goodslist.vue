<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="#/" class="router-link-active">首页</a> &gt;
                <a href="#/site/goodslist" class="router-link-exact-active router-link-active">购物商城</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <div class="left-220" style="margin: 0px;">
                        <div class="banner-nav">
                            <ul>
                                <li v-for="item in goods.catelist" :key="item.id">
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{item.title}}</span>
                                        <p>
                                            <span v-for="items in item.subcates" :key="items.id">
                                                {{items.title}}&nbsp;
                                            </span>
                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <dl>
                                            <dt>
                                                <a href="/goods/40.html">{{item.title}}</a>
                                            </dt>
                                            <dd>
                                                <a href="/goods/43.html" v-for="items in item.subcates" :key="items.id">{{items.title}}</a>
                                            </dd>
                                        </dl>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!-- 幻灯片-->
                    <div class="left-705">
                        <div class="banner-img">
                            <el-carousel height ="341px" :interval="3000" arrow="hover">
                                <el-carousel-item v-for="item in goods.sliderlist" :key="item.id">
                                    <img :src="item.img_url" alt="">
                                </el-carousel-item>
                            </el-carousel>
                        </div>
                    </div>
                    <!--/幻灯片 -->
                    <div class="left-220">
                        <ul class="side-img-list">
                            <li v-for = "(item,index) in goods.toplist" :key="item.id">
                                <div class="img-box">
                                    <label>{{index+1}}</label>
                                    <img :src="item.img_url">
                                </div>
                                <div class="txt-box">
                                    <a href="/goods/show-98.html">{{item.title}}</a>
                                    <span>{{item.add_time|dateFmt}}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="section" v-for ="item in goodsgroup" :key="item.level1cateid">
            <div class="main-tit">
                <h2>{{item.catetitle}}</h2>
                <p>
                    <a href="/goods/43.html" v-for="items in item.level2catelist" :key="items.subcateid">{{items.subcatetitle}}</a>
                    
                    <a href="/goods/40.html">更多
                        <i>+</i>
                    </a>
                </p>
            </div>
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">
                        <li v-for="items in item.datas" :key="items.artID">
                            <router-link :to="'/site/goodsinfo/'+items.artID" class="">
                                <div class="img-box">
                                    <img v-lazy="items.img_url">
                                </div>
                                <div class="info">
                                    <h3>{{items.artTitle}}</h3>
                                    <p class="price">
                                        <b>{{items.market_price}}</b>元</p>
                                    <p>
                                        <strong>库存 {{items.stock_quantity}}</strong>
                                        <span>市场价：
                                            <s>{{items.sell_price}}</s>
                                        </span>
                                    </p>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import axios from "axios";

export default {
  data() {
    return {
      goods: {},
      goodsgroup:{}
    };
  },
  created() {
    this.getListData();
    this.getGoodsDroup()
  },
  methods: {
    getListData() {
      const url = "site/goods/gettopdata/goods";
      axios.get(url).then(response => {
        //   console.log(response.data);
          this.goods = response.data.message;
        }).catch(err=> {
          console.log(err);
        });
    },
    getGoodsDroup(){
        const url ="site/goods/getgoodsgroup"

        axios.get(url).then(response=>{
            this.goodsgroup = response.data.message;
        }).catch(err=>{
            console.log(err);
        })
    }
  }
};
</script>
<style scoped>
    .el-carousel__item img{
        width: 100%;
        height: 100%;
    }
</style>