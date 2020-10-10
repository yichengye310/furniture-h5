import axios from 'axios';
let load=document.querySelector(".load");
export function request(url,method="get",headers={},data={},config={},params = {}){
    load.style.display="block";
	// headers: {
	// 	"token":localStorage['token'];
	// 	"Content-Type": "application/json";
    // };

    if (Object.keys(params).length > 0){
        config['params'] = params;
    }

    return axiosRequest(url, method,headers,data, config)
}

export function doRequest(url,method="get",headers={},data={},config={},params = {}){

    return axios.request(
        {
            url,
            method,
            headers,
            data,
            params
        }
    );
}

function axiosRequest(url,method,headers,data,config) {

    if (method.toLowerCase()==='post'){
        if (data instanceof Object){
            let params=new URLSearchParams();
            for (let key in data){
                params.append(key, data[key]);
            }
            data = params;
        }
    }else if (method.toLowerCase()==='file'){
        method="post";
        if (data instanceof Object){
            let params=new FormData();
            for (let key in data){
                params.append(key, data[key]);
            }
            data = params;
        }
    }
    let axiosConfig={
        url:url,
        method:method.toLowerCase(),
        data:data,
    };


    if (config instanceof Object){
        for (let key in config){
            axiosConfig[key]=config[key];
        }
    }
    return axios(axiosConfig).then(res=>{
        load.style.display="none";
        return res.data
    });
}