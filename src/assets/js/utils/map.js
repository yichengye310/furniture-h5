export default {
    initOnly: function (){
        const AK = "9QnqhIcNUOZOg0kyDocfiL4L3KMBS4md";
        const BMap_URL = 'http://api.map.baidu.com/api?v=2.0&ak=' + AK + '&s=1&callback=onBMapCallback';
        return new Promise((resolve, reject) => {
            // 如果已加载直接返回
            if (typeof BMap !== "undefined") {
                //console.log(BMap)
                resolve(BMap);
                return true;
            }
            // 百度地图异步加载回调处理
            window.onBMapCallback = function () {
                resolve(BMap);
            };
        });
    },

    init: function () {
        const AK = "9QnqhIcNUOZOg0kyDocfiL4L3KMBS4md";
        const BMap_URL = 'http://api.map.baidu.com/api?v=2.0&ak=' + AK + '&s=1&callback=onBMapCallback';
        return new Promise((resolve, reject) => {
            // 如果已加载直接返回
            if (typeof BMap !== "undefined") {
                //console.log(BMap)
                resolve(BMap);
                return true;
            }
            // 百度地图异步加载回调处理
            window.onBMapCallback = function () {
                resolve(BMap);
            };
            let getCurrentCityName = function () {
                return new Promise(function (resolve, reject) {
                    let myCity = new BMap.LocalCity();
                    myCity.get((result) => {
                        resolve(result.name)
                    })
                })

            }
            // 插入script脚本
            let scriptNode = document.createElement('script');
            scriptNode.setAttribute('type', 'text/javascript');
            scriptNode.setAttribute('src', BMap_URL);
            document.body.appendChild(scriptNode);
        });
    }
}
// ————————————————
// 版权声明：本文为CSDN博主「徐扬____」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
// 原文链接：https://blog.csdn.net/gzc_17764536510/java/article/details/100738810
