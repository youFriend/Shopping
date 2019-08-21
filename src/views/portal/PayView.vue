<template>
    <div id= "PayView">
        <h3>商城收银台</h3>
        <div class="tip">
            <p>订单提交成功，请尽快付款 &nbsp; 订单号：{{alipay.orderNo}}</p>
            <p>应付金额 <span>{{price}}</span> 元</p>
        </div>
        <div class="QRCode">
            <div>
                <h4>支付宝支付</h4>
                <p v-if="true">距离二维码过期还有120分钟，过期后请重新刷新获得二维码</p>
                <!--<p v-if="true">二维码已经过期，请<a href="javascrip:;">刷新</a>重新获得二维码</p>-->
            </div>
            <div>
                <!--<img :src="alipay.qrUrl" ref="qrImage"/>-->
                <img src="../../assets/loading1.gif" ref="qrImage"/>
                <div>
                    <img src="../../assets/pc_icon_icon-red.png" />
                    <p>请用支付宝扫一扫</p>
                    <p>扫描二维码支付</p>
                </div>
            </div>
            <div>
                <img src="../../assets/alipay.jpg"/>
                <p style="text-align: center">如要扫码请用
                    <a href="https://openhome.alipay.com/platform/appDaily.htm?tab=tool"
                        style="color: #01aaef"
                       target="_blank"
                    >沙箱工具</a>
                    测试
                </p>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "PayView",
        data(){
          return{
            alipay:{
                orderNo:"",
                qrUrl:"",
            },
              price:0 ,
              timer:120,
              queryStatusFun:{}
          }
        },
        methods: {
            getAlipay(){
                if(this.$route.params.orderNo == undefined)
                    return;
                // if(this.$route.params.orderNo.trim() == "")
                //     return;
                this.$axios.post("/order/pay.do",this.qs.stringify({
                    orderNo:this.$route.params.orderNo,
                })).then(response =>{
                    if(response.data.status != 0){
                        // TODO  阿里出现问题
                        console.log("沙箱环境出现bug 或者网络不行");
                        return;
                    }
                    this.alipay.orderNo = response.data.data.orderNo;
                    // this.alipay.qrUrl = response.data.data.qrUrl;
                    this.$refs.qrImage.src=response.data.data.qrUrl;
                    //调用回调函数
                    this.queryStatusFun=this.queryPayStatus;
                    this.queryStatusFun =setInterval(this.queryPayStatus,2000);

                    // console.log(this.alipay.qrUrl);
                }).catch(response =>{

                })
            },
            //实时查询是否支付成功
            queryPayStatus(){
               // this.timer -=2;
               //  if()
                this.$axios.post("/order/queryOrderPayStatus.do",this.qs.stringify({
                    orderNo:this.$route.params.orderNo,
                })).then( response =>{
                    // console.log(response);
                    //如果为true  就表示付款成功
                    if(response.data.data){
                        //
                        // console.log("支付陈工");
                        //
                        clearInterval(this.queryStatusFun);
                        this.$router.push({
                            name:"PaySuccess"
                        });

                    }
                }).catch(response =>{
                    //查询出错
                    // console.log(response+"");
                })

            }
        },
        created() {
            this.getAlipay();
            // console.log(this.$route.params.orderNo);
            this.price = this.$route.params.price;
            //
            this.queryPayStatus();
        }
    }
</script>

<style scoped>
    #PayView{
        height: 650px;
        background-color: white;
        padding: 0px 20px;
    }
    #PayView h3{
        height: 100px;
        line-height: 100px;
        font-size: 28px;

    }
    #PayView .tip{
        height: 25px;
        /*background-color: greenyellow;*/
    }
    #PayView .tip p:nth-of-type(1){
        float: left;
    }
    #PayView .tip p:nth-of-type(2){
        float: right;
    }
    #PayView .tip p:nth-of-type(2) span{
        font-size: 18px;
        color: #e31613;
        font-weight: 600;

    }
    /*图片内容*/
    #PayView .QRCode{
        margin-top: 30px;
        /*border: 1px solid black;*/
        box-shadow: 0 6px 32px rgba(0,0,0,.13);
        height: 430px;
        padding: 50px 20px 0 ;
    }
    #PayView .QRCode>div{
        position: relative;
    }
    #PayView .QRCode>div h4{
        font-weight: 600;
        font-size: 18px;
        display: inline-block;
    }
    #PayView .QRCode>div>p{
        position: absolute;
        bottom: 0;
       left: 100px;
    }
    #PayView .QRCode>div:nth-of-type(1) p a{
        color: red;
    }
    #PayView .QRCode>div:nth-of-type(2){
        display: inline-block;
        margin: 10px 0 0 100px;
        /*background-color: gray;*/
        height: 380px;
        width: 300px;
    }
    #PayView .QRCode>div:nth-of-type(2) img{
        width: 100%;
        height: 300px;
    }
    #PayView .QRCode>div:nth-of-type(2)>div{
        margin-top: 5px;
        width: 100%;
        height: 60px;
        background-color: #ff7674;
        box-sizing: border-box;
    }
    #PayView .QRCode>div:nth-of-type(2)>div img{
        margin: 5px 0 0 25px;
        width: 50px;
        height: 50px;
        display: inline-block;
        float: left;
    }
    #PayView .QRCode>div:nth-of-type(2)>div>p{
        color: white;
        margin: 5px 0 0 25px;
        float: left;
    }
    /*右边图片*/
    #PayView .QRCode>div:nth-of-type(3){
        float: right;
        height: 200px;
        width: 450px;
        margin-right: 200px;
        /*background-color: red;*/
        padding-top: 100px;

    }
    #PayView .QRCode>div:nth-of-type(3) img{
        width: 100%;
        /*height: 100%;*/

    }

</style>