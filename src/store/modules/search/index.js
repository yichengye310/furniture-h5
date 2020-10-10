import Vue from 'vue';
import {getHotKeywordData,getSearchData,getAttrsData} from "../../../api/search";

export default {
    namespaced:true,
    state:{
        historyKeywords:localStorage['historyKeywords']?JSON.parse(localStorage['historyKeywords']):[],
        hotKeywords:[],
       
        minPrice:"",
        maxPrice:"",
        attrs:[],
        searchData:[],
        cid:"",
        params:[],
        total:0
    },
    mutations:{
        //设置历史记录关键词
        ["SET_KEYWORDS"](state,payload){
            state.historyKeywords=payload.historyKeywords;
			console.log(payload.historyKeywords)
            localStorage['historyKeywords']=JSON.stringify(state.historyKeywords);
        },
        //清除搜索历史记录
        ["CLEAR_KEYWORDS"](state,payload){
            state.historyKeywords=[];
            localStorage.removeItem("historyKeywords");
        },
        //设置热门关键词
        ["SET_HOTKEYWORD"](state,payload){
            state.hotKeywords=payload.hotKeywords;
        },
       
        //设置搜索结果
        ["SET_SEARCH_DATA"](state,payload){
            state.searchData=payload.searchData;
        },
        //增加分页数据
        ["SET_SEARCH_DATA_PAGE"](state,payload){
			//console.log(payload.searchData)
			if(payload.searchData.length>0){
				for (let i=0;i<payload.searchData.length;i++) {
					state.searchData.push(payload.searchData[i])
				}
				
			}

        },
       
        
       
    },
    actions:{
        getHotKeyword(conText,payload){
            getHotKeywordData().then(res=>{
				//console.log(res.data.list)
                if(res.status===1){
                    conText.commit("SET_HOTKEYWORD",{hotKeywords:res.data.list});
                }
            })
        },

        //获取商品搜索结果
        getSearch(conText,payload){
            getSearchData(payload).then(res=>{
                if(res.status===1){
					for(let i=0;i<res.data.list.length;i++){
						res.data.list[i].istochoose = false
					}
                    conText.commit("SET_SEARCH_DATA",{searchData:res.data.list});
                }else{
                    conText.commit("SET_SEARCH_DATA",{searchData:[]});
                }
                if(payload.success){
                    payload.success(res);
                }
            })
        },
        getSearchPage(conText,payload){
            getSearchData(payload).then(res=>{
                if(res.status===1){
					for(let i=0;i<res.data.list.length;i++){
						res.data.list[i].istochoose = false
					}
                    conText.commit("SET_SEARCH_DATA_PAGE",{searchData:res.data.list});
					if(payload.success){
					    payload.success(res);
					}
                }
				
            })
        },
       

    }
}