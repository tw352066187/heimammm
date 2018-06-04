import Vue from "vue";//相当于引入Vue模块

Vue.use(VueRouter);

import VueRouter from "vue-router";//导入路由模块

// import goodslist from "../components/goods/goodslist.vue";//导入商品页面的组件

// import goodsinfo from "../components/goods/goodsinfo.vue";//导入商品页面的组件

// import shopcart from "../components/shopcart/shopcart.vue";

// import order from "../components/roder/roder.vue";

// import login from "../components/login/login.vue";

// import accounts from "../components/accounts/accounts.vue"

// import paySuccess from "../components/accounts/paySuccess.vue"

// import vipCenter from "../components/vip/vipCenter.vue"

// import myOrders from '../components/vip/myOrders'

// import orderInfo from '../components/vip/orderInfo'

const goodslist = () => import("../components/goods/goodslist")
const shopcart = () => import("../components/shopcart/shopcart")
const goodsinfo = () => import("../components/goods/goodsinfo")
const order = () => import("../components/roder/roder")
const login = () => import("../components/login/login")
const paySuccess = () => import("../components/accounts/paySuccess")
const accounts = () => import("../components/accounts/accounts")
const vipCenter = () => import("../components/vip/vipCenter")
const myOrders = () => import("../components/vip/myOrders")
const orderInfo = () => import("../components/vip/orderInfo")

const router = new VueRouter({//创建路由并设置路由规则
    routes:[
        {path:'/',redirect:'/site/goodslist'},
        {path:'/site/goodslist',component:goodslist},
        {path:"/site/goodsinfo/:goodsID",component:goodsinfo},
        {path:'/site/shopcart',component:shopcart},
        {path:"/site/order/:goodsIds",component:order,meta:{needLogin:true}},
        {path:'/site/login',component:login},
        {path:'/site/accounts/:id',component: accounts},
        {path:'/site/paySuccess',component: paySuccess},
        {path:'/site/vipCenter',component:vipCenter,meta:{needLogin:true}},
        {path:'/site/myOrders',component:myOrders,meta:{needLogin:true}},
        {path:'/site/orderInfo/:orderId',component:orderInfo,meta:{needLogin:true}}
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

export default router