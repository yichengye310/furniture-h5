<template>
    <div class="page">
        <SubHeader title="定制"></SubHeader>
        <div class='main'>
            <ul>
                <li>姓名</li>
                <li><input type="text" placeholder="收货人姓名" v-model="name" /></li>
            </ul>
            <ul>
                <li>联系电话</li>
                <li>
					<input type="text" placeholder="联系人手机号" v-model="phoneNumber" />
				</li>
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
			<div class='content-wrap'>
				<div style="text-align: left;font-size: 0.32rem;padding-left: 0.3rem;">备注</div>
				<textarea placeholder="您有什么要求请在这里留言，我们会有专人跟您联系" v-model="address2"></textarea>
			</div>
            <button type="button" class='submit-save' @click="submit($event)">提交</button>
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
    import {mapActions,mapState,mapMutations} from "vuex";
	import axios from "axios"
    import {Toast,Area,Popup,Switch,Picker} from "vant";
	Vue.use(Picker);
	Vue.use(Toast);
	Vue.use(Switch);
    import SubHeader from "../../../components/sub_header";
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
							values:[
								// {text:'anu',code:"45555"},
								// {text:'an2314',code:"45555"},
								],
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
				address2:"",
                isDefault:false,
                // areaList:"",
                isArea:false,
				
            }
        },
        created(){
			
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
				address123:state=>state.address.address
			})
		},
        components:{
            SubHeader
        },
		beforeCreate() {
			
		},
        methods:{
            ...mapActions({
                addAddress:"address/addAddress",
				getProvince:"address/getProvince",
				getCity:"address/getCity",
            }),
			...mapMutations({
				"All_PROVINCEID":"address/All_PROVINCEID",
			}),
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
						// console.log(this.columns[1].values.code,this.columns[1].values.text)
						//console.log(values[1].code,values[1].text)
		
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
						console.log(values[2].code,values[2].text)
					}
					
			},
			onCancel(){
				this.isArea = false
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
				//console.log(values[0].text,values[1].text,values[2].text)
			},
            submit(){
                if(this.name.match(/^\s*$/)){
                    Toast("请输入姓名");
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
				
                if(this.isSubmit){
                    this.isSubmit=false;
					
                }

				let dataress = {
					"address":this.address,
					"city":this.value1,
					"cityID":  this.value1id,
					"country":this.value2,
					"countryID":this.value2id,
					"name": this.name,
					"phoneNumber": this.phoneNumber,
					"province":this.value0,
					"provinceID":this.value0id,
					"userRemark":this.address2,
				}
				axios({
				method:"post",
				url:this.$config.baseApi+"/order/madeToOreder",
				headers: {
					"Content-Type": "application/json;"
				},
				data:JSON.stringify(dataress) ,
				}).then((res)=>{ 
					if(res.data.status === 0){
						Toast(res.data.message)
						this.$router.go(-1)
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
		margin-left: 0.3rem;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        -webkit-align-items: center;
    }

    .main ul li {
        font-size: 0.32rem;
		
        /* margin-left: 0.3rem; */
		font-weight: 500;
    }

    .main ul li:nth-child(2) {
        width: 62%;
        height: 100%;
    }

    .main ul li input[type='text'] {
        width: 100%;
        height: 95%;
		padding-left: 0.3rem;
        font-size: 0.28rem;
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
		
        width: 80%;
        height: 0.8rem;
        background-color: #000000;
        border-radius: 4px;
        margin: 0.4rem auto;
        display: block;
        border: 0 none;
        outline: none;
        font-size: 0.32rem;
        color: #FFFFFF;
        margin-top: 0.4rem;
    }
	
	.content-wrap {
	    width: 100%;
	    height: 4rem;
	    text-align: center;
	    overflow: hidden;
		
	}
	
	.content-wrap textarea {
		/* border-bottom: 1px solid rgb(154,154,154); */
	    width: 90%;
	    height: 70%;
	    font-size: 0.28rem;
	    margin-top: 0.3rem;
	    outline: none;
	    /* border: 0 none; */
	    resize: none;
		/* margin-left: 0.3rem; */
		box-sizing: border-box;
	}
</style>