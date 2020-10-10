<template>
    <!--地图容器-->
	<div>
		
		<div id="fli" class="fli"></div>
		<mainbottom></mainbottom>
	</div>
    
	
</template>
<script>
	import BMap from 'BMap'
	import mainbottom from '../../home/main/index.vue'
  export default {
    name:'maps',
	components:{
		mainbottom
	},
    data () {
      return {

      }
    },
    mounted(){
        var map = new BMap.Map("fli");
        var point = new BMap.Point(120,30);
        map.centerAndZoom(point,6);
        var marker = new BMap.Marker(point);
        var mapPoints = [
               {x:34.699809,y:116.620077,
               title:"爱慕米思",
               con:"江苏省徐州丰县财富城（招商场东）三楼爱慕米思",branch:"江苏省徐州丰县财富城（招商场东）三楼爱慕米思",
               },
                {x:34.699809,y:116.620077,
                title:"爱慕米思",
                con:"江苏省徐州丰县财富城（招商场东）三楼爱慕米思",branch:"江苏省徐州丰县财富城（招商场东）三楼爱慕米思",
                },
                {x:33.912792,y:117.952418,
                title:"爱慕米思",
                con:"江苏省睢宁县红叶北路古汉画院综合楼掌上明珠家具馆负一楼爱慕米思",branch:"江苏省睢宁县红叶北路古汉画院综合楼掌上明珠家具馆负一楼爱慕米思",
                },
                {x:31.779627,y:117.227397,
                title:"爱慕米思",
                con:"安徽省合肥市蜀山区金寨南路1024号（金寨南路明珠广场南300米）瑶海壹品建材家具城一楼爱慕米思店",
                branch:"安徽省合肥市蜀山区金寨南路1024号（金寨南路明珠广场南300米）瑶海壹品建材家具城一楼爱慕米思店",
                },
                {x:31.807336,y:117.298506,
                title:"爱慕米思",
                con:"安徽省合肥市包河区龙川路与仙人路交叉口瑶海壹品屋达丰家具茂二楼爱慕米思旗舰店",
				branch:"安徽省合肥市包河区龙川路与仙人路交叉口瑶海壹品屋达丰家具茂二楼爱慕米思旗舰店",
                },
                {x:32.435584,y:119.606852,
                title:"爱慕米思",
                con:"江苏省扬州市江都区长江东路269号，家得福建材市场二楼",
				branch:"江苏省扬州市江都区长江东路269号，家得福建材市场二楼",
                },
                {x:31.85817,y:117.243049,
                title:"爱慕米思",
                con:"江苏省南京市雨花台区板桥弘阳装饰城B8区1栋2楼109-爱慕米思",
				branch:"江苏省南京市雨花台区板桥弘阳装饰城B8区1栋2楼109-爱慕米思",
                },
                {x:31.887924,y:120.538062,
                title:"爱慕米思",
                con:"江苏省苏州市张家港市杨舍镇长兴路19号金田家居建材爱慕米思 ",
				branch:"江苏省苏州市张家港市杨舍镇长兴路19号金田家居建材爱慕米思",
                },
                {x:33.606506,y:119.112935,
                title:"爱慕米思",
                con:"江苏省淮安市清江浦区深圳路3号大长江家居广场二楼 爱慕米思 ",
				branch:"江苏省淮安市清江浦区深圳路3号大长江家居广场二楼 爱慕米思",
                },
                {x:32.66048,y:117.030847,
                title:"爱慕米思",
                con:"安徽省淮南市田家庵区东安家具大市场圣派克家私-爱慕米思专区 ",
				branch:"安徽省淮南市田家庵区东安家具大市场圣派克家私-爱慕米思专区",
                },
                {x:31.730743,y:116.488132,
                title:"爱慕米思",
                con:"安徽省六安市红星美凯龙B馆5楼夏日晨光天马家具.油画-爱慕米思 1",
				branch:"安徽省六安市红星美凯龙B馆5楼夏日晨光天马家具.油画-爱慕米思",
                },
                {x:32.23459,y: 119.84415,
                title:"爱慕米思",
                con:"江苏省镇江市扬中市月星家居广场D416展位-爱慕米思专区",
				branch:"江苏省镇江市扬中市月星家居广场D416展位-爱慕米思专区",
                },
                {x:31.669379,y: 120.307194,
                title:"爱慕米思",
                con:"江苏省无锡市惠山区新澄南路301号好得家三楼C区 爱慕米思 ",
				branch:"江苏省无锡市惠山区新澄南路301号好得家三楼C区 爱慕米思",
                },
                {x:31.42324,y: 120.99805,
                title:"爱慕米思",
                con:"江苏省昆山市青阳路港龙喜临门 爱慕米思 ",
				branch:"江苏省昆山市青阳路港龙喜临门 爱慕米思",
                },
                {x:30.188323,y: 120.473104,
                title:"爱慕米思",
                con:"杭州市瓜沥镇友谊路745号 1 ",
				branch:"杭州市瓜沥镇友谊路745号",
                },
                {x:29.906186,y:121.573809,
                title:"爱慕米思",
                con:"浙江龙泉市百川家具市场巨桑店  ",
				branch:"浙江龙泉市百川家具市场巨桑店",
                },
                {x:31.89007,y:121.132075,
                title:"爱慕米思",
                con:"江苏海门人民西路1688号 三和汽车广场 ",
				branch:"江苏海门人民西路1688号 三和汽车广场",
                },
                {x:32.536357,y:120.568072,
                title:"爱慕米思",
                con:"江苏南通市海安市东部全球家具博览中心A馆",
				branch:"江苏南通市海安市东部全球家具博览中心A馆",
                },
                {x:31.422967,y:121.007,
                title:"爱慕米思",
                con:"昆山红星美凯龙1楼",
				branch:"昆山红星美凯龙1楼",
                },
                {x:32.029533,y:120.907537,
                title:"爱慕米思",
                con:" 南通红星美凯龙一楼迪欧空间 ",
				branch:"南通红星美凯龙一楼迪欧空间",
                },
                {x:30.876012,y:120.383036,
                title:"爱慕米思",
                con:"南浔国际建材城C区一幢杰森家具",branch:"南浔国际建材城C区一幢杰森家具",
                },
                {x:31.961145,y:120.928998,
                title:"爱慕米思",
                con:"南通开发区通富南路59号红星家居广场",
				branch:"南通开发区通富南路59号红星家居广场",
                },

        ];
        var i = 0;
        map.addOverlay(marker);
        map.enableScrollWheelZoom(true);
        // 函数 创建多个标注
        function markerFun (points,label,infoWindows) {
            var markers = new BMap.Marker(points);
            map.addOverlay(markers);
            markers.setLabel(label);
            markers.addEventListener("click",event =>{
                console.log("0001");
                map.openInfoWindow(infoWindows,points);//参数：窗口、点  根据点击的点出现对应的窗口
            });
        }
        for (i=0;i<mapPoints.length;i++) {
            var points = new BMap.Point(mapPoints[i].y,mapPoints[i].x);//创建坐标点
            var opts = {
                width:250,
                height: 100,
                title:mapPoints[i].title
            };
            var label = new BMap.Label(mapPoints[i].branch,{
                offset:new BMap.Size(25,5)
            });
            var infoWindows = new BMap.InfoWindow(mapPoints[i].con,opts);
            markerFun(points,label,infoWindows);
        }
    },
}
</script>
<style scoped>
  .fli{
    width: 100%;
    height: 100vh;
    overflow: hidden;
    margin: 0;
  }
</style>
