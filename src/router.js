import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

let router = new Router({

	// mode:"hash",//1、hash哈希：有#号。2、history历史：没有#号
	// mode:'history',
	base: process.env.BASE_URL, //自动获取根目录路径
	scrollBehavior: (to, from, position) => {
		if (position) {
			return position
		} else {
			return {
				x: 0,
				y: 0
			}
		}
	},
	routes: [{
			path: "/",
			name: "home",
			component: () => import("./pages/home/main"), //路由懒加载解决首屏加载慢，性能优化
			meta: {
				keepAlive: false
			},
			redirect: "/index",
			children: [{
					path: "index",
					name: "index",
					component: () => import("./pages/home/index"),
					meta: {
						keepAlive: false,
						title: "商品主页"
					}
				},

				{
					path: "/goods/classify",
					name: "goods-classify",
					component: () => import("./pages/home/goods/classify"),
					redirect: "/goods/classify/item", //页面重定向
					children: [{
						path: "item",
						name: "goods-classify-item",
						component: () => import("./pages/home/goods/classify_item"),
						meta: {
							title: "商品分类",
							keepAlive: false
						}
					}, ]
				},
				{
					path: "cart",
					name: "cart",
					component: () => import("./pages/home/cart"),
					meta: {
						keepAlive: false,
						title: "购物车"
					}
				},
				{
					path: "live",
					name: "live",
					component: () => import("./pages/home/Livestreaming"),
					meta: {
						keepAlive: false,
						title: "直播",
						auth: false
					}
				},
				{
					path: "my",
					name: "my",
					component: () => import("./pages/user/ucenter"),
					meta: {
						keepAlive: false,
						title: "我的"
					}
				}
			]
		},
		{
			path: "/vip",
			name: "vip",
			component: () => import("./pages/home/vip"),
			meta: {
				keepAlive: false,
				title: "会员中心"
			}
		},
		{
			path: "/login",
			name: "login",
			component: () => import("./pages/home/login"),
			meta: {
				keepAlive: false
			}
		},
		{
			path: "/reg",
			name: "reg",
			component: () => import("./pages/home/reg"),
			meta: {
				keepAlive: false
			}
		},
		{
			path: "/play",
			name: "play",
			component: () => import("./pages/home/Livestreaming/play"),
		},
		{
			path:"/playBack",
			name:"playBack",
			component: () => import("./pages/home/Livestreaming/playBack"),
		},
		{
			path: "/livezhibo",
			name: "livezhibo",
			component: () => import("./pages/home/Livestreaming/livezhibo"),
		},
		{
			path: "/livechooseshop",
			name: "livechooseshop",
			component: () => import("./pages/home/livechooseshop"),
			meta: {
				keepAlive: false
			}
		},
		{
			path: "/livechooseshoptime",
			name: "livechooseshoptime",
			component: () => import("./pages/home/livechooseshoptime"),
			meta: {
				keepAlive: false
			}
		},
		{
			//优惠券
			path: "/coupon",
			name: "coupon",
			component: () => import("./pages/user/coupon"),
			meta: {
				keepAlive: false
			}
		},
		{
			path: "/membercenter",
			name: "membercenter",
			component: () => import("./pages/user/membercenter"),
			meta: {
				keepAlive: false
			}
		},
		{
			path: "/ucenter",
			name: "ucenter",
			component: () => import("./pages/user/ucenter")
		},
		{
			path: "/itemshop",
			name: "itemshop",
			component: () => import("./pages/home/goods/classifyshop"),
			meta: {
				keepAlive: false
			}
		},
		{
			path: "/skip",
			name: "skip",
			component: () => import("./pages/skip")
		},
		{
			path: "/tworoom",
			name: "tworoom",
			component: () => import("./pages/home/tworoom/index")
		},
		{
			path: "/tworoomdetail",
			name: "tworoomdetail",
			component: () => import("./pages/home/tworoomdetail/index")
		},
		{
			path: "/dingzhi",
			name: "dingzhi",
			component: () => import("./pages/home/goods/dingzhi")
		},
		{
			path: "/goods/search",
			name: "goods-search",
			component: () => import("./pages/home/goods/search")
		},
		{
			path: "/goods/details",
			name: "goods-details",
			component: () => import("./pages/home/goods/details"),
			redirect: "/goods/details/item",
			meta: {
				title: "商品"
			},
			children: [{
				path: "item",
				name: "goods-item",
				component: () => import("./pages/home/goods/details_item")
			}, ]
		},
		{
			path: '/goods/details/coupons',
			name: "goods-details-coupons",
			component: () => import('./pages/home/goods/details_coupons'),
			meta: {
				title: "优惠券"
			}
		},
		{
			path: "/goods/details/review",
			name: "goods-review",
			component: () => import("./pages/home/goods/details_review"),
			meta: {
				keepAlive: false,
				title: "商品评价"
			}
		},
		{
			path: "/goods/timeshop",
			name: "timeshop-details",
			component: () => import("./pages/home/goods/timeshop/time_header"),
			redirect: "/goods/timeshop/item",
			children: [{
				path: "item",
				name: "goods-item",
				component: () => import("./pages/home/goods/timeshop/timedetail")
			}]
		},

		{
			path: "/order",
			name: "order",
			component: () => import("./pages/home/order/index"),
			meta: {
				// auth: false,
				title: "确认订单"
			}
		},
		{
			path: "/order/end",
			name: "order-end",
			component: () => import("./pages/home/order/end"),
			meta: {
				auth: false,
				title: "下单成功"
			}
		},
		{
			path: "/order/Paymentmethod",
			name: "order-Paymentmethod",
			component: () => import("./pages/home/order/Paymentmethod"),
			meta: {
				auth: false,
				title: "支付方式"
			}
		},
		{
			path: "/address",
			name: "address",
			component: () => import("./pages/home/address/index"),
			meta: {
				auth: false,
				title: "选择收货地址"
			}
		},
		{
			path: "/address/add",
			name: "address-add",
			component: () => import("./pages/home/address/add"),
			meta: {
				auth: false,
				title: "添加收货地址"
			}
		},
		{
			path: "/address/mod",
			name: "address-mod",
			component: () => import("./pages/home/address/mod"),
			meta: {
				auth: false,
				title: "修改收货地址"
			}
		},
		{
			path: "/user/order",
			name: "my-order",
			component: () => import("./pages/user/order"),
			redirect: "/user/order/list",
			meta: {
				auth: false
			},
			children: [{
					path: "list",
					name: "order-list",
					component: () => import("./pages/user/order/list"),
					meta: {
						auth: false
					}
				},
				{
					path: "review",
					name: "order-review",
					component: () => import("./pages/user/order/review"),
					meta: {
						auth: false
					}
				}
			]
		},
		{
			path: "/user/order/details",
			name: "order-details",
			component: () => import("./pages/user/order/details"),
			meta: {
				auth: false,
				title: "订单详情"
			}
		},
		{
			path: "/user/order/add_review",
			name: "order-add-review",
			component: () => import("./pages/user/order/add_review"),
			meta: {
				auth: false,
				title: "评价"
			}
		},
		{
			path: "/user/profile",
			name: "profile",
			component: () => import("./pages/user/profile"),
			meta: {
				auth: false,
				title: "个人资料"
			}
		},
		{
			path: "/user/address",
			name: "user-address",
			component: () => import("./pages/user/address"),
			meta: {
				auth: false,
				title: "收货地址管理"
			}
		},
		{
			path: "/user/address/add",
			name: "user-address-add",
			component: () => import("./pages/user/address/add"),
			meta: {
				auth: false,
				title: "添加收货地址"
			}
		},
		{
			path: "/user/address/mod",
			name: "user-address-mod",
			component: () => import("./pages/user/address/mod"),
			meta: {
				auth: false,
				title: "修改收货地址"
			}
		},
		{
			path: "/user/bind_cellphone",
			name: "bind-cellphone",
			component: () => import("./pages/user/bind_cellphone"),
			meta: {
				auth: false,
				title: "绑定手机号"
			}
		},
		{
			path: "/user/mod_password",
			name: "mod-password",
			component: () => import("./pages/user/mod_password"),
			meta: {
				auth: false,
				title: "修改密码"
			}
		},
		{
			path: "/user/fav",
			name: "fav",
			component: () => import("./pages/user/fav"),
			meta: {
				auth: false,
				title: "我的收藏"
			}
		},
		{
			path: "/user/change_name",
			name: "change_name",
			component: () => import("./pages/user/change_name"),
			meta: {
				auth: false,
				title: "修改昵称"
			}
		},
		{
			path: "/useragreement",
			name: "useragreement",
			component: () => import("./pages/home/useragreement"),
			keepAlive: false
		},
		{
			path: "/user/ucenter/maps",
			name: "maps",
			component: () => import("./pages/user/ucenter/Maps.vue"),
			meta: {
				auth: false,
				title: "我的收藏"
			}
		}
	],

});

router.beforeEach((to, from, next) => {
	if (to.meta.auth) {
		if (localStorage['isLogin']) {
			next();
		} else {
			next("/login");
		}
	} else {
		next();
	}
});
export default router;
