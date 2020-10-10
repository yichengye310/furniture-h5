import config from '../../assets/js/conf/config';
import {request} from '../../assets/js/utils/request';


//我的订单http://120.79.99.73:8081
export function getMyOrderData(data) {
    return request(config.baseApi + "/order/getOrderList?userID=" + data.uid)
}

//取消订单
export function cancelOrderData(orderID) {
    return request(config.baseApi + "/order/cancelOrder?orderID=" + orderID);
}

//确认收获
export function sureOrderData(orderID) {
    return request(config.baseApi + "/order/confirmForAccepted?orderID=" + orderID);

}

//待评价订单
export function getReviewOrderData(data) {
    return request(config.baseApi + "/user/myorder/reviewOrder?uid=" + data.uid + "&page=" + data.page + "&token=" + config.token);
}

//评价项目选项
export function getReviewServiceData() {
    return request(config.baseApi + "/home/reviews/service?token=" + config.token);
}


//申请售后/order/applyAfterSale?orderID=140
export function getshouhou(orderID) {
    return request(config.baseApi + "/order/applyAfterSale?orderID=" + orderID);
}

//订单详情
export function getOrderInfoData(data) {
    return request(config.baseApi + "/order/getOrderDetail", 'post', data);
}

export function getBestCouponForOrder(data) {
    return request(config.baseApi + "/order/getCouponInfo", 'post', data);
}
