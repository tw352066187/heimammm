export const getLocaGoodsObj = () =>{
    return JSON.parse(localStorage.getItem("goods")||"{}")
}


export const addLocaGoods = (goods) =>{
    const locaGoodsObj = getLocaGoodsObj();

    if(locaGoodsObj[goods.id]){
        locaGoodsObj[goods.id]+=goods.count;
    }else{
        locaGoodsObj[goods.id]=goods.count;
    }

    localStorage.setItem("goods",JSON.stringify(locaGoodsObj))
    return getLocaCount();
}

export const getLocaCount = () =>{
    const locaGoodsObj = getLocaGoodsObj();
    let goodsCount = 0;
    for(var key in locaGoodsObj){
        goodsCount+=locaGoodsObj[key]
    }

    return goodsCount;
}

export const updateLocaCount = (goods) =>{
    const locaGoodsObj = getLocaGoodsObj();
    locaGoodsObj[goods.id] = goods.count;
    localStorage.setItem("goods",JSON.stringify(locaGoodsObj));
    return getLocaCount();
}
export const deleteLocaGoods= (goodsId) =>{
    const locaGoodsObj = getLocaGoodsObj();
    delete locaGoodsObj[goodsId];
    localStorage.setItem("goods",JSON.stringify(locaGoodsObj));
    return getLocaCount();
}