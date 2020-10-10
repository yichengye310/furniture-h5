import config from "../../assets/js/conf/config";
import {request} from "../../assets/js/utils/request";

//会员登录http://120.79.99.73:8081
export function loginData(data) {
	return request(config.baseApi+"/user/userLogin?phoneNumber="+data.phoneNumber+"&password="+data.password,"get",data)
	
    // return request(config.baseApi+"/home/user/pwdlogin?token="+config.token,"post",data)
}

//会员安全认证http://120.79.99.73:8081
export function safeUserData(data) {
   return request(config.baseApi+"/user/userLogin?phoneNumber="+data.phoneNumber+"&password="+data.password,"get",data)
}

//安全退出http://120.79.99.73:8081
export function safeOutLoginData(data) {
	console.log(data)
    return request(config.baseApi+"/user/userLogout?userID="+data.uid)
}

//检测图文验证码是否正确
export function checkVCodeData(vcode){
    return request(config.baseApi+"/home/user/checkvcode?token="+config.token,"post",{vcode:vcode})
}
//获取短信验证码http://120.79.99.73:8081
export function getduanxinyanzhengma(phoneNumber="") {
	return request(config.baseApi+"/user/vaildCode?phoneNumber="+phoneNumber,"get")
}
//是否注册过会员
export function isRegData(username){
    return request(config.baseApi+"/home/user/isreg?token="+config.token,"post",{username:username});
}

//会员注册http://120.79.99.73:8081
export function regUserData(phoneNumber=""){
	// console.log(phoneNumber)
	return request(config.baseApi+"/user/register?phoneNumber="+phoneNumber.phoneNumber+"&password="+phoneNumber.password+"&validCode="+phoneNumber.validCode)
	// return request("http://120.79.99.73:8081/user/register?phoneNumber="+JSON.stringify(data.phoneNumber)+"&password="+JSON.stringify(data.password)+"&validCode="+JSON.stringify(data.validCode),"get",data)
}

//获取会员信息
export function getUserInfoData(uid){
    return request(config.baseApi+"/user/myinfo/userinfo/uid/"+uid+"?token="+config.token)
}

//上传头像
export function uploadHeadData(data){
    return request(config.baseApi+"/user/myinfo/formdatahead?token="+config.token,"file",data);
}

//修改会员信息
export function updateUserInfoData(data){
    return request(config.baseApi+"/user/myinfo/updateuser?token="+config.token,"post",data);
}

//修改手机号
export function updateCellphoneData(data){
    return request(config.baseApi+"/user/myinfo/updatecellphone?token="+config.token,"post",data);
}
//修改密码
export function updatePasswordData(data){
    return request(config.baseApi+"/user/myinfo/modpwd?token="+config.token,"post",data);
}

//我的收藏
export function getFavData(uid,page){
	let Page2 = page?page:1;
    return request(config.baseApi+"/product/collectionListByPage?pageNo="+Page2+"&pageSize=5&userID="+uid);
	// http://120.79.99.73:8081/product/collectionListByPage?pageNo=1&pageSize=20&userID=3a666084-58ae-4a96-a0b8-29304b10e980
}

//删除收藏
export function delFavData(data){
    // return request(config.baseApi+"/user/fav/del?uid="+data.uid+"&fid="+data.fid+"&token="+config.token);
	
}
