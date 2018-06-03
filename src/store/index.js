import Vue from "vue";//相当于引入Vue模块

import Vuex from "vuex";

Vue.use(Vuex)

import {addLocaGoods,getLocaCount,updateLocaCount,deleteLocaGoods} from "../common/localStorageHelper.js"

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

export {store}