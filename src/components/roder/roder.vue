<template>
    <div>
         <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li class="active">
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <div class="cart-box">
                        <h2 class="slide-tit">
                            <span>1、收货地址</span>
                        </h2>
                        <div id="orderForm" name="orderForm" url="">
                            <el-form status-icon :rules="rules" ref="ruleForm" label-width="150px" :model="order">
                               <div class="form-box address-info">
                                <el-form-item label="收货人姓名：" prop="accept_name">
                                    <el-input style="width:600px;" v-model="order.accept_name"></el-input>
                                </el-form-item>
                                <el-form-item label="所属地区：" prop="area">
                                    <v-distpicker @selected="onSelected" :province="order.area.province.code" :city="order.area.city.value" :area="order.area.area.code"></v-distpicker>
                                </el-form-item>
                                <el-form-item label="详细地址：" prop="address">
                                    <el-input style="width:600px;" v-model="order.address"></el-input>
                                </el-form-item>
                                <el-form-item label="手机号码：" prop="mobile">
                                    <el-input style="width:600px;" v-model="order.mobile"></el-input>
                                </el-form-item>
                                <el-form-item label="电子邮箱：">
                                    <el-input style="width:600px;" v-model="order.email"></el-input>
                                </el-form-item>
                                <el-form-item label="邮政编码：">
                                    <el-input style="width:250px;" v-model="order.post_code"></el-input>
                                </el-form-item>
                            </div>
                            </el-form>
                            <h2 class="slide-tit">
                                <span>2、支付方式</span>
                            </h2>
                            <ul class="item-box clearfix">
                                <!--取得一个DataTable-->
                                <el-radio v-model="order.payment_id" label="6">在线支付</el-radio>
                            </ul>
                            <h2 class="slide-tit">
                                <span>3、配送方式</span>
                            </h2>
                            <ul class="item-box clearfix">
                                <!--取得一个DataTable-->
                                <el-radio-group @change = "getExpress" v-model="order.express_id">
                                    <el-radio label="1">顺丰快递(20元)</el-radio>
                                    <el-radio label="2">圆通快递(10元)</el-radio>
                                    <el-radio label="3">韵达快递(8元)</el-radio>
                                </el-radio-group>
                            </ul>
                            <h2 class="slide-tit">
                                <span>4、商品清单</span>
                            </h2>
                            <div class="line15"></div>
                            <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                                <tbody>
                                    <tr>
                                        <th colspan="2" align="left">商品信息</th>
                                        <th width="84" align="left">单价</th>
                                        <th width="84" align="center">购买数量</th>
                                        <th width="104" align="left">金额(元)</th>
                                    </tr>
                                    <tr v-for="item in roderDataList" :key="item.id">
                                        <td width="68">
                                            <a target="_blank" href="/goods/show-89.html">
                                                <img :src="item.img_url" class="img">
                                            </a>
                                        </td>
                                        <td>
                                            <a target="_blank" href="/goods/show-89.html">{{item.title}}</a>
                                        </td>
                                        <td>
                                            <span class="red">
                                                ￥{{item.sell_price}}
                                            </span>
                                        </td>
                                        <td align="center">{{item.buycount}}</td>
                                        <td>
                                            <span class="red">
                                                ￥{{item.sell_price * item.buycount}}
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="line15"></div>
                            <h2 class="slide-tit">
                                <span>5、结算信息</span>
                            </h2>
                            <div class="buy-foot clearfix">
                                <div class="left-box">
                                    <dl>
                                        <dt>订单备注(100字符以内)</dt>
                                        <dd>
                                            <textarea v-model="order.message" name="message" class="input" style="height:35px;"></textarea>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="right-box">
                                    <p>
                                        商品
                                        <label class="price">{{goodsBuycount}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                        <label id="goodsAmount" class="price">{{order.goodsAmount}}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                                    </p>
                                    <p>
                                        运费：￥
                                        <label id="expressFee"  class="price">{{order.expressMoment}}</label> 元
                                    </p>
                                    <p class="txt-box">
                                        应付总金额：￥
                                        <label id="totalAmount" class="price">{{getSum}}</label>
                                    </p>
                                    <p class="btn-box">
                                        <a class="btn button" href="/cart.html">返回购物车</a>
                                        <a id="btnSubmit" @click="goToOrder" class="btn submit">确认提交</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import VDistpicker from 'v-distpicker'

import { getLocaGoodsObj } from '../../common/localStorageHelper.js'

    export default{
        components: { VDistpicker },
        
        data(){
            var checkMobile = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('手机号不能为空'));
                }
                //使用正则表达式校验手机号
                var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
                if (!myreg.test(value)) {
                    callback(new Error('手机号非法'))
                } else {
                    callback()
                }
            } 
            return {
                roderDataList:[],
                goodsBuycount:0,
                order:{
                    accept_name:"啊信",
                    area: {
                        province: { code: 440000, value: '广东省' },
                        city: { code: 440300, value: '深圳市' },
                        area: { code: 440306, value: '宝安区' }
                    },
                     address: '中粮商务公园3栋1301',
                     mobile: '13812345678', //手机号
                     payment_id:"6",
                     express_id:"1",
                     cargoodsobj:{},
                     goodsids:this.$route.params.goodsIds,
                     post_code: '518000',//邮政编码
                     expressMoment: 20,//快递费
                     message: '请快点发货',//留言
                     goodsAmount:0,
                     email: 'hejie@163.com',
                },
                rules:{
                   accept_name: [
                        { required: true, message: '请输入收货人姓名', trigger: 'blur' }
                    ],
                    area: [
                        { required: true, message: '请选择所属地区', trigger: 'blur' }
                    ],
                    address: [
                        { required: true, message: '请输入详细地址', trigger: 'blur' }
                    ],
                    mobile: [
                        { required: true, validator: checkMobile, trigger: 'blur' }
                    ]
                }
            }
        },
        computed:{
            
            getSum(){
                return this.order.goodsAmount +this.order.expressMoment;
            }
        },
        created(){
            this.getRoderData()
        },
        methods:{
            goToOrder(){
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        const url = `site/validate/order/setorder`;
                        console.log(this.order);
                        axios.post(url,this.order).then(response=>{
                           this.$router.push({path:`/site/accounts/${response.data.message.orderid}`})
                            console.log( response.data);
                        })
                        
                    } else {
                        console.log('下单错误');
                        return false;
                    }
                });
            },
            getExpress(label){
                switch(label){
                    case "1":
                        this.order.expressMoment =20;
                        break;
                    case "2":
                        this.order.expressMoment =10;
                        break; 
                    case "3":
                        this.order.expressMoment =8;
                        break;       
                }
            },
            onSelected(area) {
                this.order.area = area
            },
            getRoderData(){
                const goodsObj = getLocaGoodsObj();
                let goodsTltal = 0;
                let goodsBuycount = 0
                this.order.cargoodsobj = goodsObj
                const url = `site/validate/order/getgoodslist/${this.$route.params.goodsIds}`;
                axios.get(url).then(response=>{
        
                    response.data.message.forEach(item => {
                        item.buycount = goodsObj[item.id];
                        goodsTltal+=item.buycount*item.sell_price
                        goodsBuycount+=item.buycount;
                        this.order.cargoodsobj[item.id]=item.buycount;
                    });
                    this.roderDataList = response.data.message;
                    this.order.goodsAmount = goodsTltal;
                    this.goodsBuycount = goodsBuycount;
                })
            }
        }
    }
</script>