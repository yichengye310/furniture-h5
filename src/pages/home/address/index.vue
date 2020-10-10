<template>
    <div class="page">
        <SubHeader title="选择收货地址"></SubHeader>
        <div class='main'>
            <template v-show="address.length>0">
                <div class='address-list' 
				v-for="(item,index) in address" 
				:key="index">
                    <div class='address-info-wrap'
					@click="selectAddress(
					item.userAddressID,
					item.receiverName,
					item.province,
					item.county,
					item.city,
					item.address,
					item.mobilePhone)">
                        <div class='check-mark' v-if="item.usual==='1'?true:false">
							
						</div>
                        <div :class="{'address-info':true, 'default':item.usual==='1'?true:false}">
                            <div class='person'>
								<span>{{item.receiverName}}</span>
								<span>{{item.mobilePhone}}</span>
							</div>
                            <div class='address'>
                                <span class='default' v-if="item.usual==='1'?true:false">
									默认
								</span>
                                <span class='text'>
								{{item.province}}{{item.city}}{{item.county}}{{item.address}}
								</span>
                            </div>
                        </div>
                    </div>
                    <div class='handle-wrap'>
						
						<div class="ismoren" @click="isusual(index,item.userAddressID)">
							<div v-if="item.usual===0" style="
							display: flex;align-items: center;">
								<div style="position: relative;
								margin-right: 0.188rem;
								width: 0.34rem;height: 0.34rem;border-radius: 50%;border: 1px solid #CCCCCC;">
								</div>
								<div style="font-size:0.235rem;">
									设为默认地址
								</div>
							</div>
							
							<div v-else 
							style="display: flex;align-items: center;">
								<div style="
								margin-right: 0.188rem;
								position: relative;
								width: 0.4rem;height: 0.4rem;">
									<img 
									style="position: absolute;width: 100%;height: 100%;"
									src="../../../assets/images/home/cart/xuanzeheise.png"/>
								</div>
								
								<div style="font-size:0.235rem;">
									设为默认地址
								</div>
							</div>
						</div>
						
						
						<div class="button-address">
							<div class='edit' @click.stop="gotothexiugai(item)">修改</div>
							<div class='del' @click.stop="delAddress(item.userAddressID)">删除</div>
						</div>
                    </div>
                </div>
            </template>	
            <div class="no-data" v-show="address.length<=0">您还没有添加收货地址！</div>
        </div>
		<div class='address-nav-name-2' @click="$router.push('/address/add')">
		
			<div class="erer">
				<div>
					添加收货地址
				</div>
			</div>
		</div>
    </div>
</template>

<script>
    import {mapActions,mapState,mapMutations} from "vuex";
    import { Dialog , Toast} from 'vant';
    import SubHeader from "../../../components/sub_header";
	import axios from 'axios';
    export default {
        name: "my-address",
        components:{
            SubHeader
        },
		data(){
			return{
				usual:0,
			}
		},
        created(){
			this.$router.push("/address")
            this.$utils.safeUser(this);
            this.getAddress();
			
        },
        mounted(){
            document.title=this.$route.meta.title;
        },
        computed:{
          ...mapState({
              address:state=>state.address.address
          })
        },
        methods:{
            ...mapActions({
                getAddress:"address/getAddress",
                asyncDelAddress:"address/delAddress"
            }),
			...mapMutations({
				
			}),
			//是否为默认地址
			isusual(index,userAddressID){
				// console.log(userAddressID)
				// console.log(this.address)
				for(let i=0;i<this.address.length;i++){
					if(this.address[i].usual === 1){
						axios({
						method:"post",
						url:this.$config.baseApi+"/address/default",
						params:{
							userID:localStorage['uid'],//用户id
							oldAddressID:this.address[i].userAddressID,//原本默认地址ID
							newAddressID:userAddressID//新默认地址ID
						},
						headers: {
							"Content-Type": "application/json;"
						},
						
						}).then((res)=>{ 
							if(res.data.status === 0){
								this.getAddress();
								Toast(res.data.message)
							}else{
								Toast(res.data.message)
							}
						});
					}
				}
			},
			gotothexiugai(item){
				console.log(item)
				
				localStorage['receiverName'] = item.receiverName
				localStorage['mobilePhone'] = item.mobilePhone
				
				localStorage['province'] = item.province
				localStorage['provinceID'] = item.provinceID
				   
				localStorage['city'] = item.city
				localStorage['cityID'] = item.cityID
					
				localStorage['county'] = item.county
				localStorage['countyID'] = item.countyID
					 
				
				localStorage['address'] = item.address
				this.$router.push('/address/mod?userAddressID='+item.userAddressID)
			},
            //删除收货地址
            delAddress(userAddressID){
				
                Dialog.confirm({
                    title: '',
                    message: '确认要删除吗？'
                }).then(() => {
					axios({
					method:"post",
					url:this.$config.baseApi+"/address/delete",
					params:{
						userID:localStorage['uid'],
						addressID:userAddressID
					},
					headers: {
						"Content-Type": "application/json;"
					},
					
					}).then((res)=>{ 
						if(res.data.status === 0){
							this.getAddress();
							Toast(res.data.message)
						}else{
							Toast(res.data.message)
						}
					});
                }).catch(()=>{

                })
            },
            //选择收货地址
            selectAddress(userAddressID,receiverName,province,county,city,address,mobilePhone){
				// console.log(userAddressID)
                sessionStorage['userAddressID']=userAddressID;
				sessionStorage['receiverName']=receiverName;
				sessionStorage['province']=province;
				sessionStorage['county']=county;
				sessionStorage['city']=city;
				sessionStorage['address']=address;
				sessionStorage['mobilePhone']=mobilePhone;
                this.$router.go(-1);
            }
        }
    }
</script>

<style scoped>
    .page {
        width: 100%;
        min-height: 100vh;
        background-color: #ffffff;
        overflow: hidden;
    }


    .main {
        width: 100%;
        margin-top: 1rem;
		margin-bottom: 1rem;
    }

    .main .address-nav {
        width: 100%;
        height: 0.8rem;
        background-color: #D3C6BE;
        font-size: 0.32rem;
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        -webkit-justify-content: space-between;
        align-items: center;
        -webkit-align-items: center;
    }

    .address-nav-name-2 {
        width:100%;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		height:0.893rem ;
		
    }
	.address-nav-name-2 .erer{
		background: #000000;
		color: #FFFFFF;
		width: 90%;
		line-height:0.893rem;
		display: flex;
		justify-content: center;
		/* background-image: url('../../../assets/images/addshouhuoicon.png');
		background-position: left;
		background-size:6%;
		background-repeat: no-repeat; */
	}
	.address-nav-name-2 .erer div{

		width:50%;
		height: auto;
		background-image: url('../../../assets/images/addshouhuoicon.png');
		background-position: left;
		background-size:10%;
		background-repeat: no-repeat;
	
	}
    .main .address-list {
        width: 100%;
        height: 2.78rem;
        border-bottom: 0.141rem solid #F6F5FA;
    }

    .main .address-list .address-info-wrap {
        width: 100%;
        height: 1.42rem;
        border-bottom: #E5E5E5 1px solid;
        padding: 0 0.376rem;
		box-sizing: border-box;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        -webkit-align-items: center;
    }

    .main .address-list .address-info-wrap .address-info.default {
        width: 90%;
    }

    .main .address-list .address-info-wrap .address-info {
        width: 100%;
        height: auto;
		margin-top:0.141rem;
    }

    .main .address-list .person {
        width: 100%;
        height: 0.5rem;
		font-size: 0.24rem;
        overflow: hidden;
		align-items: center;
		display: flex;
		justify-content: space-between;
    }

    .main .address-list .person span:nth-child(1) {
        margin-right: 0.2rem;
    }

    .main .address-list .address {
        width: 100%;
        height: 0.6rem;
        overflow: hidden;
        line-height: 0.6rem;
        margin-top: 0.1rem;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .main .address-list .address .text {
        font-size: 0.32rem;
    }

    .main .address-list .address .default {
        padding: 0.05rem 0.1rem;
        background-color: #FDB709;
        color: #FFFFFF;
         font-size: 0.28rem;
        border-radius: 4px;
        margin-right: 0.2rem;
    }

    .main .address-list .handle-wrap {
        height: 1.2rem;
        display: flex;
        display: -webkit-flex;
        align-items: center;
		justify-content: space-between;
		width: 90%;
		margin: 0 auto;
    }
	.main .address-list .handle-wrap .ismoren{
		/* height:0.6rem; */
		
	/* 	border-radius:4px;
		line-height: 0.6rem;
		text-align: center; */
		
	}
	.main .address-list .handle-wrap .button-address{
		display: flex;
		align-items: center;
		justify-content:center;
	}
    .main .address-list .handle-wrap .button-address .edit {

		border:1px solid rgba(195,195,195,1);
		border-radius:4px;
		padding: 0.1175rem 0.3525rem;
		text-align: center;
		margin-right: 0.14rem;
		font-size:0.282rem;
    }

    .main .address-list .handle-wrap .button-address .del {
		padding: 0.1175rem 0.3525rem;
		border:1px solid #C3C3C3;
		border-radius:4px;
		
		text-align: center;
		font-size:0.282rem;
    }
</style>