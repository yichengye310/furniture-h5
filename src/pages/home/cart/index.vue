<template>
  <div class="cart-main">
    <SubHeader
      title="购物车"
      :isBack="$route.query.from==='goods_details'?true:false"
      @click="$route.push(-1)"
    ></SubHeader>

    <div class="cart-list" v-for="(item,index) in cartsgoods" :key="index">
      <div :class="{'select-btn':true,'active':item.istochoose}" @click="selectItem(index)"></div>
      <div class="image-wrap">
        <div class="image" @click="$router.push('/goods/details?productID='+item.productID)">
          <img :src="item.productTitleImage" />
        </div>
        <div class="del" @click="delItem(index)">删除</div>
      </div>
      <div class="goods-wrap">
        <div
          class="goods-title"
          @click="$router.push('/goods/details?productID='+item.productID)"
        >{{item.productName}}</div>
        <div class="goods-attr">
          <span>
            <div>{{item.productStandard}} {{item.productColour}}</div>
          </span>
        </div>
        <div class="buy-wrap">
          <div class="price" style="color: red;">¥{{item.realPrice.toFixed(2)}}</div>
          <div class="amount-input-wrap">
            <div
              :class="item.addedNum>1?'btn dec':'btn dec active'"
              @click="jianshaoshuliang(item,index)"
            >-</div>
            <div class="amount-input">
              <input type="tel" :value="item.addedNum" />
            </div>
            <div class="btn inc" @click="zenjiashuliang(item,index)">+</div>
          </div>
        </div>
      </div>
    </div>

    <div class="orderend-wrap">
      <div class="select-area">
        <div class="select-wrap" @click="allSelect()">
          <div :class="{'select-btn':true, active:isAllSelect}"></div>
          <div class="select-text">全选</div>
        </div>
        <div class="total">
          <!-- 运费：<span>¥{{freight}}</span>&nbsp;&nbsp; -->
          合计：
          <span>¥{{total}}</span>
        </div>
      </div>
      <div :class="total>0?'orderend-btn':'orderend-btn disable'" @click="statement()">去结算</div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState, mapGetters, mapActions } from "vuex";
import SubHeader from "../../../components/sub_header";
import UpRefresh from "../../../assets/js/libs/uprefresh.js";
import axios from "axios";
// import Vue from 'vue';
import { Toast } from "vant";
export default {
  data() {
    return {
      isAllSelect: true,
      gouwucheshopshu: 1
    };
  },
  watch: {
    $route() {
      this.getcartshangping();
      // 此处写router变化时，想要初始化或者是执行的方法......
    }
  },
  created() {
    // let token = window.localStorage['authToken']
    this.getcartshangping();
    this.pullUp = new UpRefresh();
    this.checkAllSelect();
  },
  beforeRouteUpdate(to, from, next) {
    this.getcartshangping();
    next();
  },
  mounted() {
    document.title = this.$route.meta.title;
  },
  computed: {
    ...mapState({
      cartsgoods: state => state.cart.cartsgoods
    }),
    ...mapGetters({
      total: "cart/total",
      freight: "cart/freight"
    })
  },
  components: {
    SubHeader
  },
  methods: {
    ...mapActions({
      getCartGoods: "cart/getCartGoods",
      getCartGoodsPage: "cart/getCartGoodsPage"
    }),
    ...mapMutations({
      ADD_ORDER: "cart/ADD_ORDER",
      ADD_CARTORDER: "cart/ADD_CARTORDER"
    }),
    //减少商品数量
    jianshaoshuliang(item,index) {
      if (item.addedNum > 1) {
        axios({
          method: "post",
          url: this.$config.baseApi + "/shoppingCart/modifyNumber",
          headers: {
            "Content-Type": "application/json;"
          },
          params: {
            cartItemID: item.cartItemID,
            modifedNum: item.addedNum - 1
          }
        }).then(res => {
          if (res.data.status === 0) {
            this.getcartshangping();
          }
        });
      }else{
          this.delItem(index)
      }
    },
    //增加商品数量
    zenjiashuliang(item,index) {
      axios({
        method: "post",
        url: this.$config.baseApi + "/shoppingCart/modifyNumber",
        headers: {
          "Content-Type": "application/json;"
        },
        params: {
          cartItemID: item.cartItemID,
          modifedNum: item.addedNum + 1
        }
      }).then(res => {
        if (res.data.status === 0) {
          this.getcartshangping();
        }
      });
    },

    //获取商品
    getcartshangping() {
      this.getCartGoods({
        success: res => {
          this.pullUp.init(
            { curPage: 1, maxPage: res.data.pages, offsetBottom: 100 },
            page => {
              let Page2 = page ? page : 1;
              this.getCartGoodsPage({
                page: Page2,
                success: () => {
                  this.$nextTick(() => {
                    this.$utils.lazyImg();
                  });
                }
              });
            }
          );
          this.$nextTick(() => {
            this.$utils.lazyImg();
          });
        }
      });
    },

    //删除商品
    delItem(index) {
      let cartItemID = [];
      cartItemID.push(this.cartsgoods[index].cartItemID);
      let cartItemIDList = {
        cartItemIDList: cartItemID
      };

      axios({
        method: "post",
        url: this.$config.baseApi + "/shoppingCart/deleteItems",
        headers: {
          "Content-Type": "application/json;"
        },
        data: cartItemIDList
      }).then(res => {
        this.getcartshangping();
        if (res.data.status === 0) {
          Toast(res.data.message);
        } else {
          Toast(res.data.message);
        }
      });
    },
    //选择商品
    selectItem(index) {
      //单选多选
    //   if (this.cartsgoods.length > 0) {
        this.cartsgoods[index].istochoose = !this.cartsgoods[index].istochoose;
        this.checkAllSelect();
    //   }
    },
    //全选
    allSelect() {
      if (this.cartsgoods.length > 0) {
        this.isAllSelect = !this.isAllSelect;
        for (let i = 0; i < this.cartsgoods.length; i++) {
          this.cartsgoods[i];
          this.cartsgoods[i].istochoose = this.isAllSelect;
        }
      }
    },
    //检测是否全选
    checkAllSelect() {
      if (this.cartsgoods.length > 0) {
        let isChecked = true;
        for (let i = 0; i < this.cartsgoods.length; i++) {
          if (!this.cartsgoods[i].istochoose) {
            isChecked = false;
            break;
          }
        }
        this.isAllSelect = isChecked;
      }
    },
    //去结算
    statement() {
      if (this.total > 0) {
        let cartDataorder = [];
        for (let i = 0; i < this.cartsgoods.length; i++) {
          if (this.cartsgoods[i].istochoose) {
            let param = [
              {
                standard: this.cartsgoods[i].productStandard,
                standardID: this.cartsgoods[i].productStandardID,
                bandPrice: this.cartsgoods[i].realPrice
              },
              {
                colourName: this.cartsgoods[i].productColour,
                colourID: this.cartsgoods[i].productColourID
              }
            ];
            let attrs = [];
            attrs.push({ param: param });
            let cartData = {
              productID: this.cartsgoods[i].productID,
              productName: this.cartsgoods[i].productName,
              amount: this.cartsgoods[i].addedNum,
              img: this.cartsgoods[i].productTitleImage,
              attrs: attrs,
              cartIDList: this.cartsgoods[i].cartItemID
            };
            cartDataorder.push({ cartData: cartData });
          }
        }
        this.ADD_CARTORDER({ cartsorderdata: cartDataorder });
        this.$router.push("order?orderFrom=1&cartdata=1");
        // console.log(cartDataorder)
      }
    }
  }
};
</script>

<style scoped>
.cart-main {
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 2.2rem;
}
.content {
  /* height: 100vh; */
  overflow: hidden;
  position: absolute;
  top: 1rem;
  bottom: 2.5rem;
  left: 0;
  right: 0;
}
.cart-main .cart-list {
  width: 100%;
  height: 2.2rem;
  background-color: #ffffff;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
  margin-top: 0.1rem;
  border-bottom: 1px solid #efefef;
  padding: 0 0.32rem;
  box-sizing: border-box;
  /* box-align: unset; */
}

.cart-main .cart-list .select-btn {
  width: 0.4rem;
  height: 0.4rem;
  border: #efefef solid 1px;
  border-radius: 100%;
  margin-left: 0.2rem;
  margin-right: 0.3rem;
}

.cart-main .cart-list  .select-btn.active {
  width: 0.4rem;
  height: 0.4rem;
  background-image: url("../../../assets/images/home/cart/xuanzeheise.png");
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
  border: #ffffff solid 1px;
}

.cart-main .cart-list .image-wrap {
  width: 1.2rem;
  margin-right: 0.3rem;
}

.cart-main .cart-list .image-wrap .image {
  width: 100%;
  height: 1.2rem;
}

.cart-main .cart-list .image-wrap .image img {
  width: 100%;
  height: 100%;
}

.cart-main .cart-list .image-wrap .del {
  width: 100%;
  text-align: center;
  font-size: 0.24rem;
  color: #b5b5b5;
  margin-top: 0.2rem;
}

.cart-main .cart-list .goods-wrap {
  width: 64%;
  font-size: 0.24rem;
}

.cart-main .cart-list .goods-wrap .goods-title {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
}

.cart-main .cart-list .goods-wrap .goods-attr {
  color: #999999;
  width: 100%;
  margin-top: 0.1rem;
}

.cart-main .cart-list .goods-wrap .goods-attr span {
  padding-right: 0.3rem;
}

.cart-main .cart-list .goods-wrap .buy-wrap {
  width: 100%;
  height: 0.8rem;
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  align-items: center;
  -webkit-align-items: center;
}

.cart-main .cart-list .goods-wrap .buy-wrap .price {
  font-size: 0.28rem;
  color: #000000;
  margin-top: 0.2rem;
}

.cart-main .cart-list .goods-wrap .buy-wrap .amount-input-wrap {
  width: 1.2rem;
  height: 0.4rem;
  border: 1px solid #cccccc;
  margin-right: 0.2rem;
  /* border-radius: 0.08rem; */
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
}

.cart-main .cart-list .goods-wrap .buy-wrap .amount-input-wrap .btn {
  width: 0.6rem;
  height: 0.4rem;
  font-size: 0.32rem;
  text-align: center;
  line-height: 0.4rem;
}

.cart-main .cart-list .goods-wrap .buy-wrap .amount-input-wrap .btn.active {
  color: #b5b5b5;
}

.cart-main .cart-list .goods-wrap .buy-wrap .amount-input-wrap .dec {
  border-right: 1px solid #cccccc;
}

.cart-main .cart-list .goods-wrap .buy-wrap .amount-input-wrap .amount-input {
  width: 0.76rem;
  height: 100%;
  border-top: 1px solid #cccccc;
  border-bottom: 1px solid #cccccc;
}

.cart-main
  .cart-list
  .goods-wrap
  .buy-wrap
  .amount-input-wrap
  .amount-input
  input {
  width: 100%;
  height: 90%;
  text-align: center;
}

.cart-main .cart-list .goods-wrap .buy-wrap .amount-input-wrap .inc {
  border-left: 1px solid #cccccc;
}

.orderend-wrap {
  width: 100%;
  height: 1rem;
  background: #ffffff;
  position: fixed;
  z-index: 10;
  left: 0;
  bottom: 1.2rem;
  border-top: 1px solid #efefef;
  display: flex;
  display: -webkit-flex;
}

.orderend-wrap .select-area {
  width: auto;
  height: 100%;
  flex: 3;
  -webkit-flex: 3;
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  align-items: center;
  -webkit-align-items: center;
}

.orderend-wrap .select-area .select-wrap {
  width: auto;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
}

.orderend-wrap .select-area .select-wrap .select-text {
  font-size: 0.24rem;
}

.orderend-wrap .select-area .select-wrap .select-btn {
  width: 0.4rem;
  height: 0.4rem;
  border: #efefef solid 1px;
  border-radius: 100%;
  margin-left: 0.2rem;
  margin-right: 0.1rem;
}

.orderend-wrap .select-area .select-wrap .select-btn.active {
  background-image: url("../../../assets/images/home/cart/xuanzeheise.png");
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
  border: #ffffff solid 1px;
}

.orderend-wrap .orderend-btn {
  width: auto;
  height: 100%;
  flex: 1;
  -webkit-flex: 1;
  background: #000000;
  font-size: 0.32rem;
  color: #ffffff;
  text-align: center;
  line-height: 1rem;
}

.orderend-wrap .orderend-btn.disable {
  background: #bfbfbf;
}

.orderend-wrap .total {
  font-size: 0.24rem;
  margin-right: 0.2rem;
}

.orderend-wrap .total span {
  color: #000000;
}
</style>
