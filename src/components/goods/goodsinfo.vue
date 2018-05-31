<template>
   <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div class="pic-box magnifier" id="magnifier1">
                                <!--  -->
                                <div class="magnifier-container">
                                <div class="images-cover"></div>
                                <!--当前图片显示容器-->
                                <div class="move-view"></div>
                                <!--跟随鼠标移动的盒子-->
                            </div>
                            <div class="magnifier-assembly">
                                <div class="magnifier-btn">
                                    <span class="magnifier-btn-left">&lt;</span>
                                    <span class="magnifier-btn-right">&gt;</span>
                                </div>
                                <!--按钮组-->
                                <div class="magnifier-line">
                                    <ul class="clearfix animation03">
                                        <li v-for="item in goodsInfo.imglist" :key="item.id">
                                            <div class="small-img">
                                                <img :src="item.thumb_path" />
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <!--缩略图-->
                            </div>
                                <div class="magnifier-view"></div>
                            </div>
                            <div v-if = "goodsInfo.goodsinfo" class="goods-spec">
                                <h1>{{goodsInfo.goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsInfo.goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsInfo.goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">{{goodsInfo.goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">{{goodsInfo.goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <el-input-number size="small"  v-model="num3" :step="1"></el-input-number>
                                                <!-- <div class="el-input-number el-input-number--small">
                                                    <span role="button" class="el-input-number__decrease is-disabled">
                                                        <i class="el-icon-minus"></i>
                                                    </span>
                                                    <span role="button" class="el-input-number__increase">
                                                        <i class="el-icon-plus"></i>
                                                    </span>
                                                    <div class="el-input el-input--small">
                                                        
                                                        <input autocomplete="off" size="small" type="text" rows="2" max="60"
                                                            min="1" validateevent="true" class="el-input__inner" role="spinbutton"
                                                            aria-valuemax="60" aria-valuemin="1" aria-valuenow="1" aria-disabled="false">
                                                    </div>
                                                </div> -->
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsInfo.goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button  class="buy">立即购买</button>
                                                <button ref="addToShopCartRef" @click='addToShopCar' class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                <ul> 
                                    <Affix>
                                    <li>
                                        <a @click="goodsisShow=false" href="javascript:;" :class="{selected:!goodsisShow}">商品介绍</a>
                                    </li>
                                    <li>
                                        <a @click="goodsisShow=true" href="javascript:;" :class="{selected:goodsisShow}">商品评论</a>
                                    </li>
                                    </Affix>
                                </ul>
                            </div>
                            <div v-show="!goodsisShow" class="tab-content entry" v-if="goodsInfo.goodsinfo" v-html="goodsInfo.goodsinfo.content" style="display: block;">
                                内容
                            </div>
                            <div v-show="goodsisShow" class="tab-content" style="display: block;">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm"
                                        class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea ref="commentTextRef" id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" @click="submit" name="submit" type="submit" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <!--  -->
                                        <li v-for="item in goods.message" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time|dateFmt('YYYY-MM-DD HH:mm:ss')}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <div id="pagination" class="digg">
                                            <el-pagination
                                            @size-change="handleSizeChange"
                                            @current-change="handleCurrentChange"
                                            :current-page="pageIndex"
                                            :page-sizes="[1, 2, 5, 10]"
                                            :page-size="pageSize"
                                            layout="total, sizes, prev, pager, next, jumper"
                                            :total="goods.totalcount">
                                            </el-pagination>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for ="item in goodsInfo.hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <a href="#/site/goodsinfo/90" class="">
                                                <img :src="item.img_url">
                                            </a>
                                        </div>
                                        <div class="txt-box">
                                            <router-link :to="'/site/goodsinfo/'+item.id" class="">{{item.title}}</router-link>
                                            <span>{{item.add_time|dateFmt}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <transition
        v-on:before-enter="beforeEnter"
        v-on:enter="enter"
        v-on:after-enter="afterEnter">
            <img v-show="transitionImg" v-if="goodsInfo.imglist" :src="goodsInfo.imglist[0].thumb_path" id="img" alt="">
        </transition>
    </div>
</template>

<style scoped>
    @import "../../statics/site/js/jqimgzoom/css/magnifier.css";
    #img{
        width:50px;
        height:50px;
        position:absolute;
        top:0;
        left:0;
        transition: all 0.5s;
    }
</style>


<script>
import "../../statics/site/js/jqimgzoom/js/magnifier.js"

import {Affix} from "iview";

export default {
  data() {
    return {
      goodsInfo: {},
      goods:{},
      goodsisShow:false,
      num3:1,
      pageIndex:1,
      pageSize:2,
      transitionImg:false,
      addToShopCartOffset:null,
      carOffset:null
    };
  },
  watch:{
      $route(){
           this.getgoodsInfo();
      }
  },
  created() {
    this.getgoodsInfo();
    this.getgoods();
  },
  updated(){
    $('#magnifier1').imgzoon({ magnifier: '#magnifier1' });
    
  },
  components: {
    Affix
  },
  methods: {
      addToShopCar(){
          this.transitionImg=true;
          const goods = {
              id:this.$route.params.goodsID,
              count:this.num3
          }
          this.$store.commit("addGoods",goods)
          
      },
      beforeEnter(el){
        el.style.top=this.addToShopCartOffset.top+"px";
        el.style.left=this.addToShopCartOffset.left+"px";
        el.style.transform = "scale(1)"
        // 
      },
      enter(el,done){
            // el.style.transition = "all 0.5s"
            el.offsetWidth;
            el.style.top=this.carOffset.top+'px';
            el.style.left=this.carOffset.left+'px';
            el.style.transform = "scale(0.5)";
            done()
      },
      afterEnter(){
          this.transitionImg=false;
      },
      submit(){
     
        //获取用户提交内容
        const commenttxt = this.$refs.commentTextRef.value

        if (commenttxt.trim().length == 0) {
            this.$message({
                message: '请输入评论内容',
                type: 'warning'
            });
            return
        }
            const url = `site/validate/comment/post/goods/${this.$route.params.goodsID}`

                axios.post(url, { commenttxt }).then(response => {
                    if (response.data.status != 0) {
                        this.$message.error('评论失败!');
                    }

                    //清空内容
                    this.$refs.commentTextRef.value = ''

                    //给用户提示
                    this.$message({
                        message: '评论成功!',
                        type: 'success'
                    });

                    //获取第一页的评论数据
                    this.pageIndex = 1
                    this.getCommentListData()
                })
      },
    getgoodsInfo() {
      const url = `site/goods/getgoodsinfo/${this.$route.params.goodsID}`;
      axios.get(url).then(response => {
          this.goodsInfo = response.data.message;
            setTimeout(()=>{
                this.addToShopCartOffset = $(this.$refs.addToShopCartRef).offset();
                this.carOffset=$(".shopCar").offset();
                // console.log(this.carOffset);
                // console.log(this.addToShopCartOffset);
                // $("#img").css({
                //     top:this.addToShopCartOffset.top,
                //     left:this.addToShopCartOffset.left,
                // })
            },100)
        }).catch(err => {
          console.log(err);
        });
    },
    getgoods(){
        const url =`site/comment/getbypage/goods/${this.$route.params.goodsID}?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`;
        axios.get(url).then(response=>{
            this.goods = response.data;
        }).catch(err=>{
            console.log(err);
        })
    },
    handleSizeChange(pageSize){
        this.pageIndex = 1;
        this.pageSize = pageSize;
        this.getgoods();
    },
    handleCurrentChange(pageIndex){
        this.pageIndex = 1;
        this.pageIndex = pageIndex;
        this.getgoods();
    }
  }
};
console.log();
</script>
