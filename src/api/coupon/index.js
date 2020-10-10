import config from "../../assets/js/conf/config";
import {request} from '../../assets/js/utils/request';

//收货地址列表
export function getcoupon(data){
	let uid = data.uid;
	let	couponState = data.param;
	return request(config.baseApi+"/coupon/queryCouponListByUserID?userID="+uid+"&couponState="+couponState);
}

export function getAcceptedableCouponList(data){
	let uid = data.uid;
	let	userType = data.userType;
	let couponReleaseWindow = data.couponReleaseWindow;
	return request(config.baseApi+"/coupon/getAcceptedableCouponList?userID="+uid+"&userType="+userType+"&couponReleaseWindow=" + couponReleaseWindow);
}
