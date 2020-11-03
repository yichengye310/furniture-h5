<template>
	<div class="page">
		<SubHeader title="注册"></SubHeader>
		<div class='main'>
			<div class='member-img'>
				<div class="img">
					<img src="../../../assets/images/common/qiaoli.png" alt="">
				</div>
			</div>
			<div class='cellphone-wrap' style="margin-top: 0.8rem;">
				<div class='cellphone tubiaoz'>
					<div class='tubiao'>
						<img src="../../../assets/images/common/shoujihao.png" alt="">
					</div>
					<input type="tel" @input="checkCellphone" placeholder="请输入手机号" v-model="phoneNumber" />
				</div>
			</div>
			<div class='password-wrap'>
				<div class='password tubiaoz'>
					<div class='tubiao'>
						<img src="../../../assets/images/common/mima-reg.png" alt="">
					</div>
					<input :type="isOpen?'text':'password'" placeholder="请输入一个最少六位数的密码" v-model="password" />
				</div>
				<div class='switch-wrap' style="display: flex;
			align-items: center;
			line-height: 0.22rem;
			justify-content: center;">
					<div style="width: 0.34rem;height: 0.22rem;" @click="isOpen = !isOpen">
						<img src="../../../assets/images/common/yingcangmima.png" style="width:100%;height:100%;" alt="">
					</div>
				</div>
			</div>
			<div class='code-wrap cellphone-wrap cellphone-wrap2'>
				<div class='tubiaoz'>
					<div class='tubiao' style="width: 0.38rem;height: 0.38rem;">
						<img src="../../../assets/images/common/yanzhengma.png" alt="" style="width:100%;height:100%;">
					</div>
					<input type="text" placeholder="请输入验证码" v-model="validCode" />
				</div>
				<div :class="{'code-btn':true, success:isSendMsgCode}" @click="getMsgCode">{{msgCodeText}}</div>
			</div>
			<div class='sure-btn' @click="submit()">立即注册</div>
			<div class='sure-btn2'>
				<input type="checkbox" id="checkbox" @click="selet($event)">
				我已阅读并同意 <span @click.stop="$router.push('/useragreement')" style="color: #000000;font-weight: bold;">《乔利家具用户协议》</span>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';
	import {
		mapActions
	} from "vuex";
	import {
		Toast,
		Switch
	} from "vant";
	import SubHeader from "../../../components/sub_header";
	import axios from 'axios'
	import $ from 'jquery'
	Vue.use(Toast);
	Vue.use(Switch);
	export default {
		data() {
			return {
				showCode: this.$config.baseApi + "/vcode/chkcode?token=" + this.$config.token,
				vcode: "",
				phoneNumber: "",
				validCode: "",
				password: "",
				valuecheck: false,
				isOpen: false,
				isSendMsgCode: false,
				msgCodeText: "获取验证码"
			}
		},
		components: {
			SubHeader
		},
		created() {
			this.timer = null;
			this.isSubmit = true;
		},
		methods: {
			...mapActions({
				checkVCode: "user/checkVCode",
			}),
			selet(e) {
				this.valuecheck = e.target.checked
			},
			//重新获取验证码
			changVCode(e) {
				e.target.src = this.$config.baseApi + "/vcode/chkcode?token=" + this.$config.token + "&random=" + new Date().getTime();
			},
			//提交注册
			async submit() {
				if (this.password.match(/^\s*$/)) {
					Toast("密码不能为空");
					return;
				}
				if (this.password.length <= 5) {
					Toast("请输入一个大于6位的密码");
					return;
				}
				if (this.password.length > 16) {
					Toast("请输入一个小于16位的密码");
					return;
				}
				if (this.phoneNumber.match(/^\s*$/)) {
					Toast("请输入手机号");
					return;
				}
				if (!this.phoneNumber.match(/^1[0-9][0-9]\d{8}$/)) {
					Toast("您输入的手机号格式不正确");
					return;
				}

				if (this.validCode.match(/^\s*$/)) {
					Toast("请输入短信验证码");
					return;
				}
				if (this.valuecheck === false) {
					Toast("请先勾选用户协议协议");
					return;
				}
				if (this.isSubmit) {
					this.isSubmit = false;
					axios({
						url: this.$config.baseApi + "/user/register",
						methods: "get",
						params: {
							phoneNumber: this.phoneNumber,
							password: this.password,
							validCode: this.validCode
						},
					}).then(res => {
						if (res.status === 200) {
							Toast(res.data.message)
						}
						if (res.data.status === 0) {
							Toast(res.data.message)
							this.login({
								phoneNumber: this.phoneNumber,
								password: this.password,
								success: (res) => {
									if (res.status === 0) {
										Toast(res.message);

										this.$router.push('/login');
										this.$router.go(-1)

									} else {
										Toast(res.message);
									}
								}
							})
						}
					}).catch(err => {
						console.log(err)
					})
				}

			},
			//获取短信验证码
			async getMsgCode() {
				if (this.isSendMsgCode) {
					if (this.phoneNumber.match(/^\s*$/)) {
						Toast("请输入手机号");
						return;
					}
					if (!this.phoneNumber.match(/^1[0-9][0-9]\d{8}$/)) {
						Toast("您输入的手机号格式不正确");
						return;
					}
					if (this.password.length < 6) {
						Toast("请输入6-16位密码");
						return;
					};
					if (this.password.length > 16) {
						Toast("请输入6-16位密码");
						return;
					};
					$.ajax({
						url: this.$config.baseApi + "/user/validCode?phoneNumber=" + this.phoneNumber,
						type: "get",
						success: function(res) {
							// console.log(res)
							Toast(res.message)
						},
						error: function(data) {
							// console.log(data)
							Toast(data.message)
						}
					})

					this.isSendMsgCode = false;
					let time = 60;
					this.msgCodeText = "重新获取(" + time + ")";
					this.timer = setInterval(() => {
						if (time > 0) {
							time--;
							this.msgCodeText = "重新获取(" + time + ")";
						} else {
							clearInterval(this.timer);
							this.msgCodeText = "获取验证码";
							this.isSendMsgCode = true;
						}
					}, 1000)
				}
			},
			checkCellphone() {
				let isChecked = true;
				if (this.phoneNumber.match(/^\s*$/)) {
					isChecked = false;
				}
				if (!this.phoneNumber.match(/^1[0-9][0-9]\d{8}$/)) {
					isChecked = false;
				}
				if (isChecked) {
					this.isSendMsgCode = true;
				} else {
					this.isSendMsgCode = false;
				}
			}
		},
		beforeDestroy() {
			clearInterval(this.timer);
		}
	}
</script>

<style scoped>
	.page {
		width: 100%;
		height: 100vh;
		background-color: #ffffff;
	}

	.main {
		position: fixed;
		top: 45%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 100%;
		padding: 1.4rem 0.6rem;
		box-sizing: border-box;
	}

	.tubiaoz {
		display: flex;
		align-items: center;
	}

	.tubiaoz .tubiao {
		width: 0.38rem;
		height: 0.38rem;
	}

	.tubiaoz .tubiao img {
		width: 100%;
		height: 100%;
	}

	.member-img {
		width: 100%;
		height: auto;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 0.74rem;
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

	.cellphone-wrap {
		width: 90%;
		height: 0.84rem;
		margin: 0 auto;
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
		-webkit-justify-content: space-between;
		margin-top: 0.4rem;
	}

	.cellphone-wrap .cellphone {
		width: 100%;
		height: 100%;
		border-bottom: #EFEFEF solid 1px;
		border-radius: 2px;
	}

	.cellphone-wrap .cellphone input,
	.code-wrap input,
	.password-wrap .password input {
		width: 92%;
		height: 95%;
		font-size: 0.28rem;
		padding-left: 0.2rem;
	}

	.cellphone-wrap .code-btn {
		width: 35%;
		height: 0.34rem;
		color: #717376;
		border: #EAEAEA solid 1px;
		border-radius: 1rem;
		font-size: 0.24rem;
		text-align: center;
		line-height: 0.34rem;
		padding: 0.14rem 0.22rem;
	}

	.cellphone-wrap .code-btn.success {
		background: #FFFFFF;
		border: 1px solid #000000;
		color: #000000
	}

	.cellphone-wrap2 {
		display: flex;
		align-items: center;
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


	.code-wrap {
		width: 90%;
		height: 0.84rem;
		margin: 0 auto;
		border-radius: 2px;
		border-bottom: #EFEFEF solid 1px;
		margin-top: 0.4rem;
	}

	.password-wrap {
		width: 90%;
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

	}

	.password-wrap .switch-wrap {
		width: 20%;
	}

	.sure-btn {
		width: 85%;
		height: 0.8rem;
		margin: 0 auto;
		background: #000000;
		font-size: 0.36rem;
		color: #FFFFFF;
		line-height: 0.8rem;
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
