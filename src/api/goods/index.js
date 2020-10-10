import config from "../../assets/js/conf/config";
import {request} from '../../assets/js/utils/request';


//左侧分类
export function getClassifyData() {
    return request(config.baseApi + "/category/categoryLevelTwoListByPage");
}

//右侧商品
export function getGoodsData() {
    return request(config.baseApi + "/category/categoryLevelTwoListByPage");
}

//商品详情
export function getDetailsData(productID) {
    return request(config.baseApi + "/product/productDetail?productID=" + productID);
}

//获取商品规格
export function getSpecData(productID = "") {
    return request(config.baseApi + "/product/productDetail?productID=" + productID);
    // return request(config.baseApi+"/home/goods/info?gid=704407997"+"&type=spec&token="+config.token);
}

//加入收藏
export function addFavData(data) {
    return request(config.baseApi + "/goods/fav?uid=" + data.uid + "&gid=" + data.gid + "&token=" + config.token + "");
}

//取消收藏
export function cancelFavData(data) {
    return request(config.baseApi + "/goods/fav?uid=" + data.uid + "&gid=" + data.gid + "&token=" + config.token + "");
}

//----------------------------------------------------------
//限时商品详情
export function getLimitDetailsData(productID) {
    return request(config.baseApi + "/productLimitedTime/productLimitedTimeDetail?productLimitedTimeID=" + productID);
}

export function getVipProducts(page) {
    let page2 = page ? page : 1;
    return request(config.baseApi + "/product/productListByPage?state=1&isSpecialGoods=1&vipProductType=1&pageNo=" + page2)
}

export function getVipProducts99(page) {
    let page2 = page ? page : 1;
    return request(config.baseApi + "/product/productListByPage?state=1&isSpecialGoods=1&vipProductType=2&pageNo=" + page2)
}
