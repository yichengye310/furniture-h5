import config from "../../assets/js/conf/config";
import {request} from '../../assets/js/utils/request';

//收货地址列表
export function getAddresData(uid){
	return request(config.baseApi+"/address/query?userID="+uid);
}
//查询省份
export function getAllProvince(){
    return request(config.baseApi+"/address/getAllProvince");
}
//查询市级
export function getCityByProvinceID(provinceID){
	//console.log(provinceID.provinceID)
    return request(config.baseApi+"/address/getCityByProvinceID?provinceID="+provinceID.provinceID);
}
//查询县级
// export function getDistrictsByCityID(cityID){
//     // return request("http://120.79.99.73:8081/address/getDistrictsByCityID?cityID="+cityID.cityID);
// }

// //删除收货地址
// export function delAddressData(params){
//     // return request(config.baseApi+"/user/address/del?uid="+params.uid+"&aid="+params.aid+"&token="+config.token);
// }

// //添加收货地址
// export function addAddressData(params){
// 	// return request("http://192.168.0.13:8081/address/add","post",params);
// }

// //收货地址详情
// export function getAddressInfoData(params){
//     // return request(config.baseApi+"/user/address/info?uid="+params.uid+"&aid="+params.aid+"&token="+config.token);
// }

// //修改收货地址
// export function modAddressData(params){
//     // return request(config.baseApi+"/user/address/mod?token="+config.token,"post",params);
// }

