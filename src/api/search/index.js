import config from '../../assets/js/conf/config';
import {request} from '../../assets/js/utils/request';

//热门搜索http://120.79.99.73:8081
export function getHotKeywordData(){
	return request(config.baseApi+"/category/categoryLevelTwoListByPage?hotFlag=2");
}

//搜索商品结果
export function getSearchData(data){
    let kwords=data.keyword?data.keyword:"";
	let pricepaixu=data.pricepaixu?data.pricepaixu:"";
	let xiaoliangpaixu=data.xiaoliangpaixu?data.xiaoliangpaixu:"";
    let page=data.page?data.page:1;
	let levelThreeCategoryID = data.levelThreeCategoryID?data.levelThreeCategoryID:"";
	
	let levelTwoCategoryID = data.levelTwoCategoryID?data.levelTwoCategoryID:"";
	
	// console.log(data.levelThreeCategoryID)
    let cid=data.cid?data.cid:"";
    let param=data.param && data.param!=='[]'?data.param:"";
	//product/productListByPage?pageSize=3&pageNo=1&productName=床垫
	
 //    let url=config.baseApi+"/home/goods/search?kwords="+
	// kwords+"&param="+param+"&page="+page+"&price1="+
	// price1+"&price2="+price2+"&otype="+otype+"&cid="
	// +cid+"&token="+config.token;
    // console.log(url);
	//pageNo=1&pageSize=20
	let url = config.baseApi + 
	"/product/productListByPage?productName="+
	kwords+"&state=1&priceFlag="+pricepaixu+"&browseNumFlag="+xiaoliangpaixu+"&pageNo="+page+"&pageSize="+"&levelThreeCategoryID="+levelThreeCategoryID

	let url2 = config.baseApi +
	"/product/productListByPage?"+"&state=1&priceFlag="+pricepaixu+"&browseNumFlag="+xiaoliangpaixu+"&pageNo="+page+"&pageSize="+
	"&levelTwoCategoryID="+levelTwoCategoryID
	
	if(data.levelTwoCategoryID){
		console.log(data.levelTwoCategoryID)
		return request(url2)
	}else{
		return request(url)
	}
    
}