<template>
    <div class="page">
        <SubHeader title="修改收货地址"></SubHeader>
        <div class='main'>
            <ul>
                <li>收货人</li>
                <li><input type="text" placeholder="收货人姓名" v-model="name" /></li>
            </ul>
            <ul>
                <li>联系方式</li>
                <li><input type="text" placeholder="联系人手机号" v-model="phoneNumber" /></li>
            </ul>
            <ul>
                <li>所在地区</li>
                <li>
                    <input type="text" placeholder="请选择所在地区" class='area' 
					readOnly 
					:value="showArea"
					@click="isArea=true" />
                </li>
            </ul>
            <ul>
                <li>详细地址</li>
                <li><input type="text" placeholder="街道详细地址" v-model="address" /></li>
            </ul>
            <button type="button" class='submit-save' @click="submit($event)">修改</button>
        </div>
        <van-popup  v-model="isArea" position="bottom">
			
			<van-picker v-if="pageShow" 
			show-toolbar 
			:columns="columns"
			@cancel="onCancel"
			@change="onChange"
			@confirm="confirm"
			@onCancel="onCancel"/>
			
        </van-popup>
    </div>
</template>

<script>
    import Vue from "vue";
	import axios from "axios"
    import {Toast,Area,Popup,Switch,Picker} from "vant";
	import {mapActions,mapState,mapMutations} from "vuex";
	Vue.use(Picker);
	Vue.use(Toast);
	Vue.use(Switch);
    import SubHeader from "../../../components/sub_header";
    // import areaData from '../../../assets/data/area';
    Vue.use(Area);
    Vue.use(Popup);
    export default {
		
        name: "address-add",
        data(){

            return {
					// columns 为三个，即渲染出来的就是三级联动。
					columns: [
						{
							values:[],
							className: 'column1'
						},
						{
							values:[],
							className: 'column2',
							defaultIndex: 0
						},
						{
							values:[],
							className: 'column3',
							defaultIndex: 0
						}
					],
					pageShow:true, //省市区三级联动是否显示
					cityDates:'', //安联当前选中市的所有区所有数据
					data:'',//接口返回所有省市区数据
					showPicker:false, //vant Popup弹出框显示隐藏
				checkCity: '',
                name:"",
                phoneNumber:"",
				value0:"",
				value1:"",
				value2:"",
				value0id:"",
				value1id:"",
				value2id:"",
                showArea:"",
                address:"",
                isDefault:false,
                // areaList:"",
                isArea:false,
				
            }
        },
        created(){
			this.name = localStorage['receiverName']
			this.phoneNumber = localStorage['mobilePhone']
			this.showArea = localStorage['province'] + localStorage['city'] + localStorage['county']
			this.address = localStorage['address']
			
			this.value0 = localStorage['province']
			this.value1 = localStorage['city']
			this.value2 = localStorage['county']
			this.value0id = localStorage['provinceID']
			this.value1id = localStorage['cityID']
			this.value2id = localStorage['countyID']
			
			this.userAddressID=this.$route.query.userAddressID?this.$route.query.userAddressID:"";
            this.$utils.safeUser(this);
            this.isSubmit=true;
			
			axios({
			method:"get",
			url:this.$config.baseApi+"/address/getAllProvince",
			}).then( res =>{
				this.columns[0].values = Object.values(res.data.data).map(function(e){
					return {text:e.provinceName,code:e.provinceID,choose:true}
				})
				//市级调用
				axios({
					method:"get",
					url:this.$config.baseApi+"/address/getCityByProvinceID",
					params:{
						provinceID:this.columns[0].values[0].code
					} 
					}).then( res =>{
					this.columns[1].values = Object.values(res.data.data).map(function(e){
						return {text:e.cityName,code:e.cityID}
					})
					// console.log(this.columns[1].values[0].code)
					//区级调用
					axios({
						method:"get",
						url:this.$config.baseApi+"/address/getDistrictsByCityID",
						params:{
							cityID:this.columns[1].values[0].code
						} 
						}).then(res =>{
							
						this.columns[2].values = Object.values(res.data.data).map(function(e){
							return {text:e.districtName,code:e.locationDistrictID}
						})
					});
				});
			})
			
			
        },
        mounted(){
            document.title=this.$route.meta.title;
        },
		computed:{
		  ...mapState({
		      address:state=>state.address.address
		  })
		},
        components:{
            SubHeader
        },
		
        methods:{
			onChange(picker, values,index){

					//市级调用
					if(index == 0){
						axios({
							method:"get",
							url:this.$config.baseApi+"/address/getCityByProvinceID",
							params:{
								provinceID:values[0].code || this.columns[0].values[index].code
							} 
							}).then( res =>{
							this.columns[1].values = Object.values(res.data.data).map(function(e){
								return {text:e.cityName,code:e.cityID}
							})
							picker.setColumnValues(1,this.columns[1].values,values[0]);
							// this.columns[1].values = Object.values([])
						});
					}
					if(index == 1){
						axios({
							method:"get",
							url:this.$config.baseApi+"/address/getDistrictsByCityID",
							params:{
								cityID:values[1].code
							}
							}).then( res =>{
							this.columns[2].values = Object.values(res.data.data).map(function(e){
								return {text:e.districtName,code:e.locationDistrictID}
							})
							picker.setColumnValues(2,this.columns[2].values,values[0]);
						});
						
					}
					if(index == 2){
						//console.log(values[2].code,values[2].text)
					}
					
			},
			onCancel(){
				this.isArea = false
				//console.log('取消')
			},
			confirm(values){
				this.isArea = false;
				this.showArea = values[0].text + values[1].text + values[2].text;
				this.value0 = values[0].text;
				this.value1 = values[1].text;
				this.value2 = values[2].text;
				this.value0id = values[0].code;
				this.value1id = values[1].code;
				this.value2id = values[2].code;
			},
            submit(){
                if(this.name.match(/^\s*$/)){
                    Toast("请输入收货人姓名");
                    return;
                }
				if(this.name.length > 5){
				    Toast("姓名还请不要超过五位");
				    return;
				}
                if(this.phoneNumber.match(/^\s*$/)){
                    Toast("请输入联系人手机号");
                    return;
                }
                if(!this.phoneNumber.match(/^1[0-9][0-9]\d{8}$/)){
                    Toast("您输入的手机号格式不正确");
                    return;
                }
                if(this.showArea.match(/^\s*$/)){
                    Toast("请选择所在地区");
                    return;
                }
                if(this.address.match(/^\s*$/)){
                    Toast("请输入详细地址");
                    return;
                }
				if(this.address.length > 60){
				    Toast("详细地址最好不要超过六十位");
				    return;
				}
				
                if(this.isSubmit){
                    this.isSubmit=false;
					
                }
				//console.log(this.userAddressID)
				let dataress = {
					address:this.address,
					city: this.value1,
					cityID:this.value1id,
					county: this.value2,
					countyID: this.value2id,
					mobilePhone:this.phoneNumber,
					province: this.value0,
					provinceID:this.value0id,
					receiverName: this.name,
					userAddressID: this.userAddressID,
					userID:localStorage['uid'],
					usual: 0,
				}
				axios({
				method:"post",
				url:this.$config.baseApi+"/address/modify",
				headers: {
					"Content-Type": "application/json;"
				},
				data:JSON.stringify(dataress) ,
				}).then((res)=>{ 
					if(res.data.status === 0){
						this.$router.go(-1)
						Toast(res.data.message)
					}else{
						Toast(res.data.message)
					}
				});
				
				
            },

        }
    }
</script>

<style scoped>
    .page {
        width: 100%;
        height: 100vh;
        overflow: hidden;
        background-color: #FFFFFF;
    }

    .main {
        width: 100%;
        margin-top: 1rem;
    }

    .main ul {
        width: 100%;
        height: 1.02rem;
        border-bottom: #EFEFEF 1px solid;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        -webkit-align-items: center;
    }

    .main ul li {
        font-size: 0.32rem;
        margin-left: 0.3rem;
    }

    .main ul li:nth-child(2) {
        width: 62%;
        height: 100%;
    }

    .main ul li input[type='text'] {
        width: 100%;
        height: 95%;
        font-size: 0.28rem 
    }

    .main ul li .area {
        font-size: 0.28rem !important;
    }

    .main ul li input[type='checkbox'] {
        width: 0.4rem;
        height: 0.4rem;
        margin-top: 0.3rem;
    }
	.main ul .caixukun{
		display: flex;align-items: center;
		font-size:0.28rem;
		}
    .main .submit-save {
		position: absolute;
		bottom: 0;
		right: 0;
		left: 0;
        width: 100%;
        height: 0.8rem;
        background-color: #000000;
        border-radius: 4px;
        margin: 0 auto;
        display: block;
        border: 0 none;
        outline: none;
        font-size: 0.32rem;
        color: #FFFFFF;
        margin-top: 0.4rem;
    }
</style>