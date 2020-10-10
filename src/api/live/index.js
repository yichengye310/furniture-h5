import config from "../../assets/js/conf/config";
import {request, doRequest} from "../../assets/js/utils/request";
import axios from 'axios';

//直播中频道
export function getpushlive(page) {
    let Page = page ? page : 1
    return request(config.baseApi + "/live/liveList?status=1&pageNo=" + Page + "&pageSize=10&sort=1");
}

//直播请求
export function getMessage(roomName, userName, msg, pushType, userType, productID, productLimitedTimeID, couponID) {

    let params = {
        roomName,
        userName,
        msg,
        pushType,
        userType,
        productID,
        productLimitedTimeID,
        couponID
    };
    return request(config.baseApi + "/socket/push", "post", {}, {}, {}, params)

}
