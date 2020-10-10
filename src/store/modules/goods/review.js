import {getReviewsData} from "../../../api/goods/review";
export default {
    namespaced:true,
    state:{
        reviews:[],
        total:0
    },
    mutations:{
        ["SET_REVIEWS"](state,payload){
            state.reviews=payload.reviews;
            state.total=payload.total;
        },
        ["SET_REVIEWS_PAGE"](state,payload){
            state.reviews.push(...payload.reviews);
        }
    },
    actions:{
        getReviews(conText,payload){
            getReviewsData(payload.productID).then(res=>{
                if(res.status===1){
					// console.log(res)
                    conText.commit("SET_REVIEWS",{reviews:res.data.list});
                }else{
                    conText.commit("SET_REVIEWS",{reviews:[]});
                }
                if(payload.success){
                    payload.success(res);
                }
            })
        },
        getReviewsPage(conText,payload){
			// console.log(payload)
            getReviewsData(payload.productID,payload.page).then(res=>{
                if(res.status===1){
                    conText.commit("SET_REVIEWS_PAGE",{reviews:res.data.list});
                }
				if(payload.success){
				    payload.success(res);
				}
            })

        }
    }
}