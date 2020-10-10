<template>
	<div class="page">
		<SubHeader title="登录"></SubHeader>
		<div class='main login-main'>
			<div class='member-img'>
				<div class="img">
					<img src="../../../assets/images/common/aimumisi.png" alt="">
				</div>
			</div>

			<div class='code-wrap tubiaoz' style="margin-top: 0.8rem;">
				<div class='tubiao'>
					<img src="../../../assets/images/common/shoujihao.png" alt="">
				</div>
				<input type="text" placeholder="手机号" v-model="phoneNumber" />
			</div>

			<div class='password-wrap'>
				<div class='password tubiaoz' style="width: 100%;">
					<div class='tubiao' style="width:0.38rem;height:0.38rem">
						<img src="../../../assets/images/common/mima-reg.png" alt="">
					</div>
					<input :type="isOpen?'text':'password'" placeholder="请输入密码" v-model="password" />
				</div>
				<div class='switch-wrap'>
					<div style="width: 0.34rem;height: 0.22rem;" @click="isOpen = !isOpen">
						<img src="../../../assets/images/common/yingcangmima.png" style="width:100%;height:100%;" alt="">
					</div>
				</div>
			</div>

			<div class="fastreg-wrap">
				<div @click="$router.push('/user/mod_password')">忘记密码?</div>
				<div @click="$router.push('/reg')">
					<img src="../../../assets/images/home/index/reg.png" alt="忘记密码" />
					快速注册
				</div>
			</div>

			<div class='sure-btn' @click="doLogin()">立即登录</div>

			<!-- <div class='sure-btn2'>
				<input type="checkbox" id="checkbox" @click="selet($event)">
				我已阅读并同意 <span @click.stop="$router.push('/useragreement')" style="color: #000000;font-weight: bold;">《爱慕米思用户协议》</span>
			</div> -->
		</div>
	</div>
</template>


<script>
	import Vue from 'vue';
	import {
		mapActions
	} from 'vuex';
	import {
		Toast
	} from 'vant';
	import SubHeader from "../../../components/sub_header";
	Vue.use(Toast);
	export default {
		data() {
			return {
				isOpen: false,
				phoneNumber: "",
				password: "",
				valuecheck: false,

			}
		},
		created() {
			// console.log(returnCitySN.cip)
		},
		components: {
			SubHeader
		},
		methods: {
			...mapActions({
				login: "user/login"
			}),
			selet(e) {
				this.valuecheck = e.target.checked


			},
			doLogin() {
				if (this.phoneNumber.match(/^\s*$/)) {
					Toast('您输入的账号和密码不正确，请重新输入')
					return;
				}
				if (!this.phoneNumber.match(/^1[0-9][0-9]\d{8}$/)) {
					Toast("您输入的手机号格式不正确");
					return;
				}

				if (this.password.match(/^\s*$/)) {
					Toast("请输入密码");
					return;
				}
				if (this.password.length <= 5) {
					Toast("请输入一个大于6位的密码");
					return;
				}
				if (this.password.length > 16) {
					Toast("请输入一个小于12位的密码");
					return;
				}


				this.login({
					phoneNumber: this.phoneNumber,
					password: this.password,
					success: (res) => {
						if (res.status === 0) {
							Toast(res.message);

							// this.$router.go(-1);
							this.$router.push('/index');
							// this.$router.go('/index')
						} else {
							Toast('您输入的账号和密码不正确，请重新输入')
							// Toast(res.message);
						}
					}
				})
			}
		}
	}
</script>

<style scoped>
	.page {
		width: 100%;
		height: 100vh;
		background-color: #ffffff;
		position: relative;
	}

	.main {
		position: fixed;
		width: 100%;
		top: 45%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.member-img {
		width: 100%;
		height: auto;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.member-img .img {
		width: 1.3rem;
		height: 1.3rem;
		border: #EFEFEF solid 1px;
		border-radius: 50%;
	}

	.member-img .img img {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}

	.tubiaoz {
		display: flex;
		align-items: center;
	}

	.tubiaoz .tubiao {
		margin-right: 0.28rem;
		width: 0.38rem;
		height: 0.38rem;
	}

	.tubiaoz .tubiao img {
		width: 100%;
		height: 100%;
	}

	.code-wrap {
		width: 80%;
		height: 0.84rem;
		margin: 0 auto;
		border-radius: 2px;
		border-bottom: #EFEFEF solid 1px;
		margin-top: 0.4rem;
	}

	.sure-btn2 {
		margin-top: 0.6rem;
		font-size: 11px;
		color: #969696;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.password-wrap {
		width: 80%;
		height: 0.84rem;
		margin: 0 auto;
		border-radius: 2px;
		border-bottom: #EFEFEF solid 1px;
		margin-top: 0.4rem;
		display: flex;
		display: -webkit-flex;
	}

	.password-wrap .password {
		width: 80%;
		height: 100%;
		display: flex;
		align-items: center;
	}

	.password-wrap .switch-wrap {
		width: 20%;
		margin-top: 0.1rem;
	}

	.sure-btn {
		width: 85%;
		height: 0.9rem;
		margin: 0 auto;
		background: #000000;
		font-size: 0.32rem;
		color: #FFFFFF;
		line-height: 0.9rem;
		text-align: center;
		margin-top: 0.4rem;
		border-radius: 1rem;
	}

	.fastreg-wrap {
		width: 85%;
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
		-webkit-justify-content: space-between;
		font-size: 0.24rem;
		margin: 0 auto;
		margin-top: 0.3rem;
	}

	.fastreg-wrap img {
		width: 0.32rem;
		height: 0.32rem;
		vertical-align: middle;
	}
</style>
