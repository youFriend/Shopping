<template>
    <div id="SubmitOrder">
        <!--导航栏开始-->
        <div class="breadNav">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/MyShopCart' }">购物车</el-breadcrumb-item>
                <el-breadcrumb-item>提交订单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!--logo + 收货地址-->
        <div class="second">
            <div>
            </div>
        </div>
        <!--商品详情-->
        <div class="content">
            <h4 class="header">填写并核实对订单信息</h4>
            <div class="body">
                <div >
                    <h5>
                        <span>收货人信息</span>
                        <a href="javascript:;" @click="chooseAddressV={};addressShow=true;addressAdd=true;">新增</a>
                    </h5>
                    <div class ="receiverInfo" v-for="(item,i) in addressList" :key="i">
                        <div v-if="i == chooseAddressIndex ||isOpenAddress" class="chooseAddress" @click="chooseAddress(i)">
                        <p><span>姓名：{{item.receiverName}}</span>
                            <span class="receiverAddress">收货人地址：{{item.receiverProvince}}{{item.receiverCity}}{{item.receiverDistrict}}{{item.receiverAddress}}
                            </span>
                            <span> 邮编：{{item.receiverZip}}</span>
                            <span>收货人手机：</span><span> {{item.receiverPhone}}</span>
                        </p>
                        <a  href="javascript:;" @click="deleteAdd(item)">删除</a>
                        <a  href="javascript:;" @click="addressShow=true; chooseAddress(i)">编辑</a>
                        </div>
                    </div>
                    <div v-show="addressShow" class="address-board" >
                        <div>
                            <h5>
                                <span>收货人信息</span>
                                <a href="javascript:;" @click="closeAddress()" class="el-icon-close"></a>
                            </h5>
                            <div class = "province">
                                <label for="province">省份市区：</label>
                                <input type="text" id="province" placeholder="所在省份" v-model="chooseAddressV.receiverProvince">
                                <span> - </span>
                                <input type="text" id="city"  placeholder="所在城市" v-model="chooseAddressV.receiverCity">
                            </div>
                            <div>
                                <label for="receiverDistrict">所在区：</label>
                                <input type="text" id="receiverDistrict" v-model="chooseAddressV.receiverDistrict">
                            </div>
                           <div>
                               <label for="receiverAddress">详细地址：</label>
                               <input type="text" id="receiverAddress" v-model="chooseAddressV.receiverAddress">
                           </div>
                            <div>
                                <label for="orderName">收货人：</label>
                                <input type="text" id="orderName" v-model="chooseAddressV.receiverName">
                            </div>
                            <div>
                                <label for="receiverZip">邮编：</label>
                                <input type="text" id="receiverZip" v-model="chooseAddressV.receiverZip">
                            </div>
                            <div>
                                <label for="orderPhone">联系方式：</label>
                                <input type="text" id="orderPhone" v-model="chooseAddressV.receiverPhone">
                            </div>
                            <div>
                                <button @click="requireAddress(chooseAddressV)">{{this.addressAdd ? '添加':'保存收货人信息'}}</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div >
                    <h5>支付方式</h5>
                    <p><a href="javascript:;">货到付款</a>
                        <!--<a href="javascript:;">在线支付</a>-->
                    </p>
                </div>
                <div >
                   <div class="receive">
                       <h5>送货清单</h5>
                       <router-link :to="{ path: '/MyShopCart' }">修改购物车</router-link>
                   </div>
                    <div v-for="(item,index) in cartList" :key="index" class="content-body-item">
                        <div>
                            <h5>配送方式</h5>
                            <div>京东配送</div>
                            <p>预计送达：<span> 三天内</span></p>
                            <p><span>7天内退货，15天内换货</span></p>
                        </div>
                        <div>
                            <h5>优惠满99减50</h5>
                            <div>
                                <img :src="getMain(item.productMainImage)" height="80" width="80"/>
                                <p> {{item.productName}}
                                    {{item.productSubtitle}}
                                </p>
                                <strong>￥  {{item.productPrice}}</strong>
                                <span>x {{item.quantity}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--确认提交-->
        <div class="submission" >
            <div>
                <p>应付总额<strong>￥{{totalPrice}}</strong></p>
                <p>寄送至：
                    <span>{{chooseAddressV.receiverProvince}}</span>
                    <span>{{chooseAddressV.receiverCity}}</span>
                    <span>{{chooseAddressV.receiverDistrict}}</span>
                    <span>{{chooseAddressV.receiverAddress}}</span>
                    <span>邮箱：{{chooseAddressV.receiverZip}}</span>
                    <span>手机：  {{chooseAddressV.receiverPhone}}</span>
                    <span>收货人： {{chooseAddressV.receiverName}}</span>
                </p>
            </div>
            <button @click="takeOrder">提交订单</button>
        </div>
    </div>
</template>

<script>
    // import Logo from '../../components/Logo.vue'
    export default {
        name: "SubmitOrder",
        data(){
          return{
              addressShow:false,
              addressAdd:false,
              addressList:[],
              //找到
              chooseAddressV:{},
              cartData:{},
              cartList: [],
              chooseAddressIndex : 0,
              isOpenAddress:false ,
              totalPrice:0,
          }
        },
        components:{
            // "Logo":Logo
        },
        methods: {
            //显示收货地址等
            getValue(value){
                if(!this.addressAdd){
                    return value;
                }else
                    return '';
            },
            //提交订单
            takeOrder(){
                // console.log(this.chooseAddressV);
                //
                this.$axios.post("/order/create.do" ,this.qs.stringify({
                    shippingId:this.chooseAddressV.id,
                })).then(response =>{
                    // console.log(response);
                    if(response.data.status == 0){
                        this.linkTo({name:"PayView",params:{
                                orderNo:response.data.data.orderNo,
                                price:response.data.data.payment,
                            }});
                    }else {
                        //TODO
                    }
                }).catch( response =>{

                })
                //
                // this.$router.push({name:"PayView"})

            },
            getAddressList(){
                this.$axios.post("/shipping/list.do").then(
                    response =>{

                        this.addressList = response.data.data.list;
                        if(this.addressList.length == 0)
                            return;
                        this.chooseAddressV = this.addressList[this.chooseAddressIndex];
                       // console.log(response.data.data.list);
                    }
                )
            },
            //得到购物车
            getCartList(){
                this.$axios.post("/cart/list.do").then(
                    response =>{
                        this.cartData = response.data.data ;
                        this.cartList = response.data.data.cartProductVOList;
                        this.totalPrice=response.data.data.cartTotalPrice;
                        //
                        // console.log(response.data.data);
                    }
                )
            },
            /**
             *             选择地址
             */
            chooseAddress(index){
                this.chooseAddressIndex = index ;
                this.isOpenAddress = ! this.isOpenAddress ;
                //把添加设置为false;
                this.addressAdd = false;
                //
                this.chooseAddressV=this.addressList[this.chooseAddressIndex];
                //console.log(index);
            },
            /**
             * 关闭窗口编辑
             * @param data
             */
            closeAddress(){
                this.addressShow = ! this.addressShow ;
                this.getAddressList();
            },
            //修改地址
            requireAddress(data){
                // data.createTime = null;
                // data.updateTime = null;
                // data.removeAttribute("createTime");
                // data.removeAttribute("updateTime");
                delete data.createTime;
                delete data.updateTime;
                if(this.addressAdd){
                    //如果是增加，
                    this.$axios.post("/shipping/add.do",this.qs.stringify(
                        data
                    )).then(reponse =>{
                        //console.log(reponse);
                        this.closeAddress();
                    }).catch(response =>{

                    });
                }else{
                    //如果是保存
                    this.$axios.post("/shipping/update.do",this.qs.stringify(
                        data
                    )).then(reponse =>{
                        //console.log(reponse);
                        this.closeAddress();
                    }).catch(response =>{

                    });
                }

                //重新获得地址 (因为是异步请求，所以放在这里就不对了)
                //this.closeAddress();
                //
                // this.$router.go(0);

            },
            deleteAdd(data){
                // console.log(data);
                //如果是保存
                this.$axios.post("/shipping/delete.do",this.qs.stringify(
                    { shippingId:data.id }
                )).then(reponse =>{
                    this.chooseAddressIndex = 0 ;
                    this.getAddressList();
                }).catch(response =>{

                });

               // window.location.reload();
            }
        },
        created() {
            this.getAddressList();
            //获得内容
            this.getCartList();
        }

    }
</script>

<style >
    #SubmitOrder {
        background-color: white;
    }
    /*面包屑导航*/
    #SubmitOrder .breadNav{
        height: 30px;
        background-color: #e3e4e5;
        position: relative;
    }
    #SubmitOrder .breadNav .el-breadcrumb{
        line-height: 30px;
        padding-left: 10px;
    }
    /*图标*/
    #SubmitOrder .second{
        height: 100px;
        background-color: gold;
    }

    /*<!--商品详情-->*/
    #SubmitOrder .content{
        height: auto;
        /*background-color: lightgoldenrodyellow;*/
        padding: 0 10px;

    }
    #SubmitOrder .content h4{
        font-size: 18px;
        font-weight: 500;
        color: #666;
        background-color: white;
        padding: 10px;
    }

    #SubmitOrder .content .body{
        /*background-color: grey;*/
        width: 100%;
        height: auto;
        padding: 20px;
        border: 1px solid #f0f0f0;
        box-sizing: border-box;
    }
    #SubmitOrder .content .body>div{
        border-bottom: 1px solid #f0f0f0;
    }
    /*收货人信息*/
    #SubmitOrder .content .body h5{
        font-weight: 600;
        padding: 20px 0;
    }
    #SubmitOrder .content .body h5 a{
        font-weight: 500;
    }
    #SubmitOrder .content .body p{
        /*background-color: lightcoral;*/
        display: inline-block;
        height: 50px;
    }
    #SubmitOrder .content .body p span{
        padding-left: 20px;
    }
    #SubmitOrder .content .body>div a{
        display: inline-block;
        /*width: 100px;*/
        /*background-color: greenyellow;*/
        float: right;
        margin-right: 20px;
    }
    /*最后修改的内容*/
    #SubmitOrder .content .body .receiverInfo span{
        width: 110px;
        display: inline-block;
        /*background-color: #f0f3ef;*/
    }
    #SubmitOrder .content .body .receiverInfo .receiverAddress{
        display: inline-block;
        width: 420px;
        /*background-color: greenyellow;*/
    }
    /*选择的Address*/
    #SubmitOrder .content .body .chooseAddress{
        height: 30px;
        line-height: 30px;
        box-sizing: border-box;

    }
    #SubmitOrder .content .body .chooseAddress:hover{
        background-color: gainsboro;
    }
    /*支付方式*/
    #SubmitOrder .content .body>div:nth-of-type(2) a{
        /*background-color: #f0f3ef;*/
        margin-left: 20px;
        width: 150px;
        height: 35px;
        line-height: 31px;
        border: 2px solid red;
        box-sizing: border-box;
        text-align: center;

    }
    #SubmitOrder .content .body>div:nth-of-type(2) a:nth-of-type(2){
        margin-right: 2px;
    }
    #SubmitOrder .content .body>div:nth-of-type(2) a:nth-of-type(1){
        margin-left: 0;
    }
    /*送货清单*/
    #SubmitOrder .content .body>div:nth-of-type(3){
        border: none;
    }
    #SubmitOrder .content .body .receive{
        border: none;
    }
    #SubmitOrder .content .body .receive h5{
        display: inline-block;
    }
    #SubmitOrder .content .body .receive a{
        padding-top: 20px;
    }
    /*送货的内容*/
    #SubmitOrder .content .body .content-body-item{
        /*background-color: gainsboro;*/
        padding: 0;
        height: 185px;
        margin-top: 15px;
    }
    #SubmitOrder .content .body .content-body-item>div{
        display: inline-block;
        width: 30%;
        height: 185px;
        float: left;
        box-sizing: border-box;
        padding-left: 20px;

    }
    #SubmitOrder .content .body .content-body-item h5{
        padding: 10px 0;
    }
    #SubmitOrder .content .body .content-body-item p{
        margin-top: 10px;
        color: #999999;
        /*height: 50px;*/
        /*background-color: greenyellow;*/
        /*display: block;*/
        width: 295px;
        height: 60px;
    }
    #SubmitOrder .content .body .content-body-item p span{
        color: black;
    }
    #SubmitOrder .content .body .content-body-item>div:nth-of-type(1){
        background-color: #f7f7f7;
    }
    #SubmitOrder .content .body .content-body-item>div:nth-of-type(1) div{
        border: 1px solid red;
        width: 100px;
        text-align: center;
        font-size: 14px;
    }
    #SubmitOrder .content .body .content-body-item>div:nth-of-type(1) p{
        height: 28px;
        padding-top: 5px;
    }
    #SubmitOrder .content .body .content-body-item>div:nth-of-type(1) p:nth-of-type(2){
        border-top:1px solid #dddddd;
        margin-right: 20px;
    }
    #SubmitOrder .content .body .content-body-item>div:nth-of-type(1) span{
        padding: 0;
    }
    /*item右边*/
    #SubmitOrder .content .body .content-body-item>div:nth-of-type(2){
        background-color: #f3fbfe;
        width: 70%;
    }
    #SubmitOrder .content .body .content-body-item>div:nth-of-type(2) img{
        float: left;
    }
    #SubmitOrder .content .body .content-body-item>div:nth-of-type(2) p{
        float: left;
        width: 450px ;
        margin-left: 10px;
    }
    #SubmitOrder .content .body .content-body-item>div:nth-of-type(2) strong{
        margin-top: 30px;
        display: inline-block;
        margin-left: 40px;
        color: red;
        font-size: 18px;
        font-weight: 600;
    }
    #SubmitOrder .content .body .content-body-item>div:nth-of-type(2) span{
        margin-left: 40px;
    }

    /*<!-确认提交信息-->*/
    #SubmitOrder .submission{
        margin-top: 30px;
        height: 100px;
        background-color: #e3e4e5;
        box-sizing: border-box;

    }
    #SubmitOrder .submission>div{

        border-top: 1px solid #e6e6e6;
        height: 65px;
        padding-right: 10px;
    }
    #SubmitOrder .submission>div p{
        float: right;
        clear: both;
        color: #999999;
    }
    #SubmitOrder .submission>div p span{
        margin-left: 1rem;
    }
    #SubmitOrder .submission>div p strong{
        display: inline-block;
        /*background-color: greenyellow;*/
        height: 30px;
        font-size: 18px;
        font-weight: 600;
        color: red;
    }
    #SubmitOrder .submission button{
        border: none;
        float: right;
        clear: both;
        /*margin-right: 25px;*/
        width: 150px;
        height: 35px;
        background-color: #e64145;
        font-size: 20px;
        font-weight: 600;
        line-height: 35px;
        color: white;
        cursor: pointer;
    }

    /**最后面添加的地址面板*/
    #SubmitOrder .address-board{
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: rgba(200,200,200,0.5);
    }
    #SubmitOrder .content .body .address-board>div{
        width: 600px;
        height: 480px;
        background-color: white;
        margin: 50px auto;
        border: 3px solid #c3c3c3;

    }
    #SubmitOrder .content .body .address-board>div h5{
        background-color: #f3f3f3;
        height: 35px;
        padding: 0 10px;
        line-height: 35px;
        box-sizing: border-box;
        position: relative;
    }
    #SubmitOrder .content .body .address-board>div h5 a{
        position: absolute;
        margin: 0;
        right: 10px;
        top: 5px;
        width: 35px;
        height: 100%;
        text-align: right;
        font-size: 25px;
        color: #a8a8a8;
    }
    #SubmitOrder .content .body .address-board>div>div{
        height: 50px;
        margin: 10px 0 0 30px;
        width: 100%;
    }
    #SubmitOrder .content .body .address-board>div>div:nth-of-type(1){
        margin-top: 22px;
    }
    #SubmitOrder .content .body .address-board>div>div label{
        display: inline-block;
        width: 80px;
    }
    #SubmitOrder .content .body .address-board>div>div input{
        width: 400px;
        height: 30px;
    }
    #SubmitOrder .content .body .address-board>div>div button{
        margin-left: 80px;
        background-color: red;
        color: white;
        border: none;
       outline-color: red;
        cursor: pointer;
        width: 120px;
        height: 35px;
    }
    /*最后修补的内容*/
    #SubmitOrder .content .body .address-board .province input{
        width: 180px;
        box-sizing: border-box;
    }
    #SubmitOrder .content .body .address-board .province span{
        display: inline-block;
        width: 44px  ;
        text-align: center;
    }

</style>