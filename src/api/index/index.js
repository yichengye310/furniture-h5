import config from "../../assets/js/conf/config";
import {request} from "../../assets/js/utils/request";

//检查版本
export function versionID() {
    return request(config.baseApi+"/checkVersion?versionID=4");
}

//首页导航
export function getNavsData() {
    return request(config.baseApi+"/home/index/nav?token="+config.token);
}


//现时抢购商品
export function getProductLimitedTimeData(){
    return request(config.baseApi+"/productLimitedTime/productLimitedTimeListByPage");
}
//现时抢购商品详情
export function getTimeShopData(productLimitedTimeID=""){
	return request(config.baseApi+"/productLimitedTime/productLimitedTimeDetail?productLimitedTimeID="+productLimitedTimeID);
}
//聊天消息请求接口
// export function sendMessage(roomName,userName,pushType,userType,productID,msg){
// 	return request(config.baseApi+"/socket/push?roomName="+roomName+"userName="+userName+"pushType="+pushType+"userType="+userType+"productID="+productID+"productLimitedTimeID="+productLimitedTimeID+"msg="+msg);
// }




//首页幻灯片
export function getSwiperData() {
    return request(config.baseApi+"/product/commonImageListByPage?flag=2");
}
//首页核心商品
export function getShopData(){
	return request(config.baseApi+"/product/productListByPage?state=1&pageNo=1&pageSize=3");
}
//热门推荐
export function getSwipersrecomData(){
	return request(config.baseApi+"/product/commonImageListByPage?flag=4");
}
//首页推荐商品
export function getRecomGoodsData(page){
	// console.log(page)
	let Page2 = page?page:1
	//console.log(Page2)
	// let url2 = config.baseApi+"/product/productListByPage";
	let url = config.baseApi+"/product/productListByPage?pageNo="+Page2+"&pageSize=20&state=1";
	// console.log(url)
	return request(url);
	// if(Page2>=1){
	// 	// console.log(Page2)
	// 	return request(url);
	// }else{
	// 	return request(url2);
	// }




}
