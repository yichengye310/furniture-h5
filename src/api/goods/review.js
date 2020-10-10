import config from "../../assets/js/conf/config";
import {request} from '../../assets/js/utils/request';

//获取商品评价
export function getReviewsData(gid,page) {
	let Page2 = page?page:1;
    return request(config.baseApi+"/comment/listByPage?pageNo="+Page2+"&pageSize=6&productID="+gid)
}
