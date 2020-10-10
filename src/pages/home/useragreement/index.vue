<template>
    <div class="page">
        <SubHeader title="用户协议"></SubHeader>
        <div class='main' >
			<div ref='maintext' class="maintext" v-html="useragreement"></div>
        </div>
    </div>
</template>

<script>
	
    import Vue from 'vue';
    import {Toast} from "vant";
    import SubHeader from "../../../components/sub_header";
	import axios from 'axios'
    Vue.use(Toast);
    export default {
        data(){
            return {
				useragreement:''
            }
        },
        components:{
            SubHeader
        },
        created(){
			this.getuseragreementdata()
        },
        methods:{
			getuseragreementdata(){
				axios({
					url:this.$config.baseApi+"/user/getAgreement",
					methods: "get",
				}).then(res=>{
					if(res.data.status === 0){
						this.useragreement = res.data.data.content
					}else{
						Toast(res.data.message)
					}
					
					// console.log(res.data.message)
				}).catch(err=>{
					Toast(err.data.message)
				})
			}
	
		}
           
    }
</script>

<style scoped>

    .page{width:100%;height:100vh;background-color: #ffffff;}
    .main{width:100%;padding:1.4rem 0.6rem;box-sizing: border-box;}
</style>
