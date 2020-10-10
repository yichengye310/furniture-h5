<template>
  <div class="page">
      <SubHeader title="更改密码"  @submit="submit()"></SubHeader>
    <div class="main">
      <div class="cellphone-wrap">
        <div class="cellphone tubiaoz">
          <input type="tel" @input="checkCellphone" placeholder="请输入手机号" v-model="phoneNumber" />
        </div>
      </div>
      <div class="code-wrap cellphone-wrap cellphone-wrap2">
        <div class="tubiaoz">
          <input type="text" placeholder="请输入验证码" v-model="validCode" />
        </div>
        <div :class="{'code-btn':true, success:isSendMsgCode}" @click="getMsgCode">{{msgCodeText}}</div>
      </div>
      <div class="password-wrap">
        <div class="password tubiaoz">
          <input :type="isOpen?'text':'password'" placeholder="请输入新密码" v-model="password" />
        </div>
        <div
          class="switch-wrap"
          style="display: flex;
			align-items: center;
			line-height: 0.22rem;
			justify-content: center;"
        >
          <div style="width: 0.34rem;height: 0.22rem;" @click="isOpen = !isOpen">
          </div>
        </div>
      </div>
      <div class='sure-btn' @click="submit()">完成</div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapActions } from "vuex";
import { Toast, Switch } from "vant";
import SubHeader from "../../../components/sub_header";
import axios from "axios";
import $ from "jquery";
Vue.use(Toast);
Vue.use(Switch);

export default {
  data() {
    return {
      showCode:
        this.$config.baseApi + "/vcode/chkcode?token=" + this.$config.token,
      vcode: "",
      phoneNumber: "",
      validCode: "",
      password: "",
      valuecheck: false,
      isOpen: false,
      isSendMsgCode: false,
      msgCodeText: "获取验证码"
    };
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
		asyncOutLogin:"user/outLogin",
    }),
    selet(e) {
      this.valuecheck = e.target.checked;
      if (this.password.match(/^\s*$/)) {
        Toast("密码不能为空");
        return;
      }
      if (this.password.length < 6) {
        Toast("请输入一个大于6位的密码");
        return;
      }
      if (this.password.length > 12) {
        Toast("请输入一个小于12位的密码");
        return;
      }
      console.log(this.valuecheck);
    },
    //重新获取验证码
    changVCode(e) {
      e.target.src =
        this.$config.baseApi +
        "/vcode/chkcode?token=" +
        this.$config.token +
        "&random=" +
        new Date().getTime();
    },
    //提交注册
    async submit() {
		// console.log(this.password.length)
		
      if (this.password.match(/^\s*$/)) {
        Toast("密码不能为空");
        return;
      }
      if (this.password.length < 6) {
        Toast("请输入一个大于6位的密码");
        return;
      }
      if (this.password.length > 12) {
        Toast("请输入一个小于12位的密码");
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
      if (this.isSubmit) {
        this.isSubmit = false;

        axios({
          url: this.$config.baseApi + "/user/changePwd",
          methods: "get",
          params: {
            phoneNumber: this.phoneNumber,
            password: this.password,
            validCode: this.validCode
          }
        }).then(res => {
			// console.log(res)
            if (res.status === 200) {
              Toast(res.data.message);
            }
            if (res.data.status === 0) {
              Toast(res.data.message);
			  this.asyncOutLogin()
              this.$router.push("/login");
            }
          }).catch(err => {
            console.log(err);
          });
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
       axios({
          url:this.$config.baseApi + "/user/validCode",
          methods: "get",
		  params: {
			phoneNumber: this.phoneNumber,
			}
		  }).then(res => {
			  // console.log(res)
			   Toast(res.data.message);
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
            this.msgCodeText = "获取短信验证码";
            this.isSendMsgCode = true;
          }
        }, 1000);
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
};
</script>

<style scoped>
.page {
  width: 100%;
  height: 100vh;
  background-color: #ffffff;
}
.main {
  width: 100%;
  padding: 1.4rem 0.6rem;
  box-sizing: border-box;
}
.tubiaoz {
  display: flex;
  align-items: center;
}
.tubiaoz .tubiao {
  width: 0.32rem;
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
  width: 1rem;
  height: 1rem;
}
.member-img .img img {
  width: 100%;
  height: 100%;
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
  border-bottom: #efefef solid 1px;
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
  border: #eaeaea solid 1px;
  /* border-radius: 1rem; */
  font-size: 0.24rem;
  text-align: center;
  line-height: 0.34rem;
  padding: 0.14rem 0.22rem;
}
.cellphone-wrap .code-btn.success {
  background: #ffffff;
  border: 1px solid #000000;
  color: #000000;
}
.cellphone-wrap2 {
  display: flex;
  align-items: center;
}
.code-wrap {
  width: 90%;
  height: 0.84rem;
  margin: 0 auto;
  border-radius: 2px;
  border-bottom: #efefef solid 1px;
  margin-top: 0.4rem;
}
.password-wrap {
  width: 90%;
  height: 0.84rem;
  margin: 0 auto;
  border-radius: 2px;
  border-bottom: #efefef solid 1px;
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
  color: #ffffff;
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