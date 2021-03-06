import Vue from "vue";//相当于引入Vue模块

import App from "./App.vue";//导入App.vue


import moment from "moment";//导入时间插件

// import Element from 'element-ui';//导入轮播图插件   

import VueLazyload from 'vue-lazyload';//导入懒加载插件

//按需导入我们的element-ui
import {
    Button,
    Pagination,
    Input,
    InputNumber,
    Switch,
    Form,
    FormItem,
    Radio,
    RadioGroup,
    MessageBox,
    Message,
    Carousel,
    CarouselItem,
    Row,
    Col
} from 'element-ui'

Vue.use(Button) //自动导入element-ui/lib/theme-chalk/button.css
Vue.use(Pagination)
Vue.use(InputNumber)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Input)
Vue.use(Switch)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Row)
Vue.use(Col)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm



axios.defaults.baseURL = "http://47.106.148.205:8899/";
axios.defaults.withCredentials = true
 

//集成基于Vue的中间件
// Vue.use(Element)


Vue.use(VueLazyload, {
    preLoad: 1.3,
    loading: '../src/statics/site/images/01.gif',
    attempt: 3
  })

import "./statics/site/css/style.css";//引入头部导航插件样式
// import 'element-ui/lib/theme-chalk/index.css';//引入轮播图样式

import router from "./router/index.js"

import {store} from "./store/index.js"



//创建全局时间过滤器
Vue.filter('dateFmt',(input,formatStr="YYYY-MM-DD")=>{
    return moment(input).format(formatStr)
})




new Vue({//创建根实例
    el:"#app",
    render:function(createElement){
        return createElement(App);
    },
    router,//把创建的路由放入根实例
    store

})