import config from "../../assets/js/conf/config";
import {request} from '../../assets/js/utils/request';


export function getCartData(uid,page){
	
	let Page2 = page?page:1;
	//let url ="http://192.168.0.13:8081/shoppingCart/shoppingCartListByPage?userID="+uid+"&pageNo="+Page2+"&pageSize=6";
	let url =config.baseApi+"/shoppingCart/shoppingCartListByPage?userID="+uid+"&pageNo="+Page2+"&pageSize=";
	return request(url);
	
}