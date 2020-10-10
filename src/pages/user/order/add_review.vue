<template>
    <div class="page">
        <SubHeader title="评价"></SubHeader>
        <div class='main'>

			<div class='uinfo'>
				<div class='head'>
					<img :src="reviewServices.productTitleImage">
				</div>
				<div class='head2'>
					<div class='nickname'>{{reviewServices.productName}}</div>
					<div class='reviews-date'>
					{{reviewServices.productStandard}}{{reviewServices.productColour}}
					</div>
				</div>
			</div>
			<div 
			style="border-bottom: #E5E5E5 1px solid;
			font-size: 0.28rem; padding: 0.24rem 0.3rem;" >
				描述相符<van-rate v-model="value1" :size="14"/>
			</div>
			<div class='content-wrap'>
				<textarea placeholder="宝贝满足您的期待吗？说说你的使用心得,分享给想买的他们看吧" v-model="content"></textarea>
			</div>
			<div class="icontotheprice"
			style="border-bottom:0.16rem #F6F5F8 solid;padding: 0 0.3rem;">
				
				<van-uploader 
				v-model="file"
				upload-icon="photograph"
				preview-full-image
				multiple 
				:max-count="3"
				:before-read="beforeRead"/>
			</div>
			<div style="font-size: 0.28rem;padding: 0.24rem 0.3rem;" >
				综合评价
			</div>
			<div style="font-size: 0.28rem;padding: 0.24rem 0.3rem;" >
				物流服务<van-rate v-model="value2" :size="14"/>
			</div>
			<div style="font-size: 0.28rem;padding: 0.24rem 0.3rem;" >
				服务态度<van-rate v-model="value3" :size="14"/>
			</div>
            <button class='submit' type="button" @click="submit()">提交</button>
        </div>
    </div>
</template>

<script>
    import {mapActions,mapState,mapMutations} from "vuex";
    import {Toast,Rate,Uploader } from "vant";
	import Vue from 'vue';
	Vue.use(Rate);
	Vue.use(Uploader);
	import axios from 'axios'
    import SubHeader from "../../../components/sub_header";
    export default {
        name: "add-review",
        data(){
            return {
				value1:0,
				value2:0,
				value3:0,
                content:"",
				file:[],
            }
        },
        components:{
            SubHeader
        },
        created(){
            this.$utils.safeUser(this);
            this.gid=this.$route.query.gid?this.$route.query.gid:"";
            this.ordernum=this.$route.query.ordernum?this.$route.query.ordernum:'';
            this.isSubmit=true;
            
        },
        mounted(){
            document.title=this.$route.meta.title
        },
        computed:{
            ...mapState({
                reviewServices:state=>state.order.reviewServices,
                uid:state=>state.user.uid
            })
        },
        methods:{
			...mapActions({
				addReview:"order/addReview"
            }),
			...mapMutations({
				
			}),
		// 返回布尔值
		beforeRead(file) {
			if (file.type !== 'image/jpeg') {
			Toast('请上传 jpg 格式图片');
				return false;
			}
			return true;
		},
			// 返回 Promise
			asyncBeforeRead(file) {
				return new Promise((resolve, reject) => {
					if (file.type !== 'image/jpeg' ) {
					Toast('请上传 jpg 格式图片');
					reject();
					} else {
					let img = new File(['foo'], 'bar.jpg', {
						type: 'image/jpeg',
					});
					resolve(img);
					}
				});
			},
			dingdan(){
	
				let formData = new FormData();
					// formData.append("file",this.file)
					//console.log(this.file[0])
					
					for(var i=0;i<this.file.length;i++){
						// console.log(this.file[i])
						formData.append("file",this.file[i].content)
						formData.append("file",this.file[i].file)
						// console.log(formData.get("file"))
					}
					formData.append("orderID",this.reviewServices.orderID)
					formData.append("productID",this.reviewServices.productID)// id
					formData.append("userID",this.reviewServices.userID)/// 用户id必传
					formData.append("phoneNumber",this.reviewServices.phoneNum)/// 用户手机号
					formData.append("content",this.content)///评论内容
					formData.append("descriptionMatchScore",this.value1)///描述相符
					formData.append("logisticsServiceScore",this.value2)//物流服务
					formData.append("serviceAttitudeScore",this.value3)//服务态度
					formData.append("standardID",this.reviewServices.productStandardID)///样式id
					formData.append("colourID",this.reviewServices.productColourID)//颜色id
					formData.append("colourName",this.reviewServices.productColour)//颜色名称
					formData.append("standard",this.reviewServices.productStandard)//样式名称 
					

					
				axios({
				method: "post",
				// url: "http://192.168.1.84:8081/comment/add",
				url: this.$config.baseApi + "/comment/add",
				headers: {
					"token": localStorage['authToken'],
					// "Content-Type": "application/json"
					"Content-Type":"multipart/form-data",
					// 'Content-Type':'application/x-www-form-urlencoded'
				},
				processData:false,
				data:formData
				}).then(res => {
					status
					if(res.data.status === 1){
						Toast('评论成功')
						this.$router.push('/user/order/list?status=4')
					}else{
						Toast('评论失败')
					}
					
				})
				
			},
            submit(){
				// console.log(this.reviewServices)
                if(this.content.match(/^\s*$/)){
                    Toast("请输入评价内容");
                    return;
                }
                if(this.isSubmit){
                    this.isSubmit=false;
					this.dingdan()
				}
            }
        }
    }
</script>

<style scoped>
    .page {
        width: 100%;
        min-height: 100%;
        background-color: #FFFFFF;
    }

    .main {
        width: 100%;
		height: 100%;
        margin-top: 1.02rem;
		overflow: hidden;
    }
	.main .uinfo{
		display: flex;
		padding: 0 0.3rem;
	}
	.head{
		flex:1;
		width:2rem;
		height: 2rem;
	}
	.head>img{
		width:2rem;
		height: 2rem;
	}
	.head2{
		flex:3;
		padding: 0 0.2rem;
	}
	.nickname{
		line-height: 0.8rem;
		font-size: 0.22rem;
		width: 70%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.reviews-date{
		line-height: 0.5rem;
		font-size: 0.18rem;
		color: #999999;
	}



    .content-wrap {
        width: 100%;
        height: 3rem;
        text-align: center;
        overflow: hidden;
    }

    .content-wrap textarea {
        width: 95%;
        height: 80%;
        font-size: 0.32rem;
        margin-top: 0.3rem;
        outline: none;
        border: 0 none;
        resize: none;
    }

    .submit {
        width: 90%;
        height: 0.8rem;
        background-color: #000000;
        font-size: 0.28rem;
        color: #FFFFFF;
        text-align: center;
        line-height: 0.8rem;
        border: 0 none;
        border-radius: 4px;
        outline: none;
        margin: 0 auto;
        display: block;
        margin-top: 0.3rem;
		bottom: 0;
    }
</style>