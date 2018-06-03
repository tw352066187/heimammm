import Vue from "vue";//相当于引入Vue模块

import App from "./App.vue";//导入App.vue

import VueRouter from "vue-router";//导入路由模块

import moment from "moment";//导入时间插件

import Element from 'element-ui';//导入轮播图插件   

import VueLazyload from 'vue-lazyload';//导入懒加载插件

import Vuex from "vuex";

axios.defaults.baseURL = "http://47.106.148.205:8899/";
axios.defaults.withCredentials = true
 

//集成基于Vue的中间件
Vue.use(Element)
Vue.use(VueRouter);
Vue.use(Vuex)
Vue.use(VueLazyload, {
    preLoad: 1.3,
    loading: '../src/statics/site/images/01.gif',
    attempt: 3
  })

import "./statics/site/css/style.css";//引入头部导航插件样式
import 'element-ui/lib/theme-chalk/index.css';//引入轮播图样式

import goodslist from "./components/goods/goodslist.vue";//导入商品页面的组件

import goodsinfo from "./components/goods/goodsinfo.vue";//导入商品页面的组件

import shopcart from "./components/shopcart/shopcart.vue";

import order from "./components/roder/roder.vue";

import login from "./components/login/login.vue";

import accounts from "./components/accounts/accounts.vue"

import paySuccess from "./components/accounts/paySuccess.vue"

import {addLocaGoods,getLocaCount,updateLocaCount,deleteLocaGoods} from "./common/localStorageHelper.js"

const router = new VueRouter({//创建路由并设置路由规则
    routes:[
        {path:'/',redirect:'/site/goodslist'},
        {path:'/site/goodslist',component:goodslist},
        {path:"/site/goodsinfo/:goodsID",component:goodsinfo},
        {path:'/site/shopcart',component:shopcart},
        {path:"/site/order/:goodsIds",component:order,meta:{needLogin:true}},
        {path:'/site/login',component:login},
        {path:'/site/accounts/:id',component: accounts},
        {path:'/site/paySuccess',component: paySuccess}
    ]
})

router.beforeEach((to, from, next) =>{
    
    // next();
    // console.log(to);
    console.log(from);
    if(!to.path.includes("login")){
        localStorage.setItem("path",to.path)
    }
    if(to.meta.needLogin){
        axios.get("site/account/islogin").then(response=>{
           if(response.data.code=="nologin"){
                router.push({path:"/site/login"})
           }else{
               next();
           }
        })
    }else{

        next()
    }
   
})

//创建全局时间过滤器
Vue.filter('dateFmt',(input,formatStr="YYYY-MM-DD")=>{
    return moment(input).format(formatStr)
})


const store = new Vuex.Store({
    state:{
        buyCount:0,
    },
    getters:{
        getCount(state){
            if(state.buyCount>0){
                return state.buyCount;
            }else
            return getLocaCount()
        }
    },
    mutations:{
        addGoods(state,goods){
            console.log(111);
            
            state.buyCount = addLocaGoods(goods);
        },
        updateCount(state,goods){
            state.buyCount = updateLocaCount(goods)
        },
        deletaGooods(state,goodsId){
            state.buyCount= deleteLocaGoods(goodsId)
        }
    }
})

new Vue({//创建根实例
    el:"#app",
    render:function(createElement){
        return createElement(App);
    },
    router,//把创建的路由放入根实例
    store

})