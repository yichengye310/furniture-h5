import Vue from 'vue';
import {getCartData} from "../../../api/goods/cart.js";
export default {
    namespaced:true,
    state:{
        cartData:localStorage['cartData']?JSON.parse(localStorage['cartData']):[],
		orderBuy:localStorage['orderBuy']?JSON.parse(localStorage['orderBuy']):[],
		cartsorderdata:[],
		cartsgoods:[],
		price:0,
        couponAmount: 0,
        couponID: undefined
    },
    mutations:{
		["GET_GOODSPRICE"](state,payload){
			let v = []
			let z = 0
			for(let i=0;i<state.orderBuy.length;i++){
				z = state.orderBuy[i].amount
				for(let j=0;j<state.orderBuy[i].attrs.length;j++){
					v.push( state.orderBuy[i].attrs[j].param[0].bandPrice*0.01 * z)
				}
			}
			var s = 0
			v.forEach(function(val, idx, v) {
					s += val;
			}, 0);
			return state.price = s


		},
		//查询购物车商品
		["GET_CART"](state,payload){
			state.cartsgoods=payload.cartsgoods;
		},
		["ADD_CARTPAGE"](state,payload){
			if(payload.cartsgoods.length>0){
				for (let i=0;i<payload.cartsgoods.length;i++) {
					state.cartsgoods.push(payload.cartsgoods[i])
				}
			}
		},

		//订单总价计算
		["SUM_TOORDER"](state,payload){
				state.price = payload.price
		},

		//直接购买商品
		 ["ADD_ORDER"](state,payload){
			 state.orderBuy=[payload.orderBuy]
		 },

		 ["ADD_CARTORDER_GOODSPRICE"](state,payload){
				let v = []
				let z = 0
				for(let i=0;i<state.cartsorderdata.length;i++){
					z = state.cartsorderdata[i].cartData.amount
					for(let j=0;j<state.cartsorderdata[i].cartData.attrs.length;j++){
						v.push(state.cartsorderdata[i].cartData.attrs[j].param[0].bandPrice * z)
					}
				}
				var s = 0
				v.forEach(function(val, idx, v) {
						s += val;
				}, 0);
				return state.price = s
		 },
		 //购物车直接购买
		 ["ADD_CARTORDER"](state,payload){
				state.cartsorderdata = payload.cartsorderdata
		 },
        //添加购物车商品
        ["ADD_ITEM"](state,payload){
			state.cartData=payload.cartData;
            let isSame=false;
            if(state.cartData.length>0){
                for(let i=0;i<state.cartData.length;i++){
                    if(state.cartData[i].gid===payload.cartData.gid && JSON.stringify(state.cartData[i].attrs)===JSON.stringify(payload.cartData.attrs)){
                        isSame=true;
                        state.cartData[i].amount=parseInt(state.cartData[i].amount)+parseInt(payload.cartData.amount)
                        break;
                    }
                }
            }
            if(!isSame){
                state.cartData.push(payload.cartData);
            }
            localStorage['cartData']=JSON.stringify(state.cartData);
        },
        //删除商品
        ["DEL_ITEM"](state,payload){
            state.cartData.splice(payload.index,1);
            localStorage['cartData']=JSON.stringify(state.cartData);
        },
        //更改数量
        ["SET_AMOUNT"](state,payload){
            state.cartData[payload.index].amount=payload.amount;
            state.cartData[payload.index].amount=parseInt(state.cartData[payload.index].amount.replace(/[^\d]/g,""))
            if(!state.cartData[payload.index].amount){
                state.cartData[payload.index].amount=1
            }
            localStorage['cartData']=JSON.stringify(state.cartData);
        },
        //增加数量
        ["INC_AMOUNT"](state,payload){
            state.cartData[payload.index].amount+=1;
            Vue.set(state.cartData,payload.index,state.cartData[payload.index]);
            localStorage['cartData']=JSON.stringify(state.cartData);
        },
        //减少数量
        ["DEC_AMOUNT"](state,payload){
            state.cartData[payload.index].amount=state.cartData[payload.index].amount>1?--state.cartData[payload.index].amount:1;
            Vue.set(state.cartData,payload.index,state.cartData[payload.index]);
            localStorage['cartData']=JSON.stringify(state.cartData);
        },
        //选择商品
        ["SELECT_ITEM"](state,payload){
            state.cartData[payload.index].checked=!state.cartData[payload.index].checked;
            Vue.set(state.cartData,payload.index,state.cartData[payload.index]);
            localStorage['cartData']=JSON.stringify(state.cartData);
        },
        //全选/反选
        ["ALL_SELECT_ITEM"](state,payload) {
            if (state.cartData.length > 0) {
                for (let i = 0; i < state.cartData.length; i++) {
                    state.cartData[i].checked = payload.checked;
                }
                localStorage['cartData'] = JSON.stringify(state.cartData);
            }
        },

        ["APPLY_COUPON"](state, payload) {
		    console.log(payload.couponAmount);
		    state.price -= payload.couponAmount;
		    state.price = Math.max(state.price, 0);
		    state.couponAmount = payload.couponAmount;
		    this.couponID = payload.couponID
        }
    },
	actions:{
		getCartGoods(conText,payload){
		    getCartData(conText.rootState.user.uid,payload.page).then(res=>{
		        if(res.status === 0){
					for(let i=0;i<res.data.list.length;i++){
						res.data.list[i].istochoose = true
						res.data.list[i].realPrice = res.data.list[i].realPrice * 0.01
					}
		            conText.commit("GET_CART",{cartsgoods:res.data.list});
					if(payload.success){
						payload.success(res);
					}
		        }
		    })
		},
		//购物车分页
		getCartGoodsPage(conText,payload){
		    getCartData(conText.rootState.user.uid,payload.page).then(res=>{
		        if(res.status === 0){
					for(let i=0;i<res.data.list.length;i++){
						res.data.list[i].istochoose = true
						res.data.list[i].realPrice = res.data.list[i].realPrice * 0.01
					}
		            conText.commit("ADD_CARTPAGE",{cartsgoods:res.data.list});
					if(payload.success){
						payload.success(res);
					}
		        }
		    })
		},



	},



    getters:{
        //计算总金额
        total(state) {
            if (state.cartsgoods.length>0) {
                let total=0;
                for(let i=0;i<state.cartsgoods.length;i++){
                    if(state.cartsgoods[i].istochoose){
                        total+=state.cartsgoods[i].realPrice*state.cartsgoods[i].addedNum;
                    }
                }

                return total.toFixed(2);
            }else {
                return 0.00;
            }
        },
        //运费
        freight(state){
            if(state.cartData.length>0){
                let freights=[];
                for(let i=0;i<state.cartData.length;i++){
                    if(state.cartData[i].checked) {
                        freights.push(state.cartData[i].freight);
                    }
                }
                return freights.length>0?Math.max.apply(null,freights):0;
            }else{
                return 0;
            }
        }
    }
}
