import Vue from 'vue'
import Vuex from 'vuex';
import user from "./modules/user";
import index from "./modules/index";
import goods from "./modules/goods";
import search from "./modules/search";
import goodsReview from "./modules/goods/review";
import cart from "./modules/cart";
import address from "./modules/address";
import order from "./modules/order";
import live from "./modules/live";
import coupon from "./modules/coupon";
Vue.use(Vuex);

let store=new Vuex.Store({
    modules:{
        user,
        index,
        goods,
        search,
        goodsReview,
        cart,
        address,
        order,
		live,
		coupon
    }
});

export default store;