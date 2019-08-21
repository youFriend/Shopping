<template>
    <div id="UserCenter">
        <div class="breadNav">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>个人中心</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="left">
            <h6>用户中心</h6>
            <ul>
                <li v-bind:class="{selected:1===this.panelIndex}" @click="selectedFun(1)">
                    <a href="javaScript:">
                        我的信息
                    </a>
                </li>
                <li v-bind:class="{selected:2 === this.panelIndex}" @click="selectedFun(2)">
                    <a href="javaScript:">
                        我的订单
                    </a>
                </li>
                <li v-bind:class="{selected:3===this.panelIndex}" @click="selectedFun(3)">
                    <a href="javaScript:">
                        活动中心
                    </a>
                </li>
            </ul>
        </div>
        <div class="content">
            <div v-if="panelIndex == 1" class="UserInfo">
                <h6>用户信息</h6>
                <div>
                    <div>
                        <span>用户名：</span><p>{{this.userInfo.username}}</p>
                    </div>
                    <div v-if="false">
                        <span>出生年月：</span>
                        <p>
                            <select >
                                <option v-for="index in 90" :key="index">{{index+1930}}</option>
                            </select>
                            <label>年</label>
                            <select >
                                <option v-for="index in 12" :key="index" >{{index}}</option>
                            </select>
                            <label>月</label>
                            <select >
                                <option v-for="index in 31" :key="index">{{index}}</option>
                            </select>
                            <label>日</label>
                        </p>
                    </div>
                    <div v-if="false">
                        <span>性别：</span>
                        <p>
                            <radio_group>
                                <input type="radio" name="sex" id="man" checked="true">
                                <label for="man">男</label>
                                <input type="radio" name="sex" id="human">
                                <label for="human">女</label>
                                <input type="radio" name="sex" id="secret">
                                <label for="secret">保密</label>
                            </radio_group>
                        </p>
                    </div>
                    <div>
                        <span>邮箱：</span><p>{{this.userInfo.email}}</p>
                    </div>
                    <!--修改密码-->
                    <el-button v-if="!showChangeScrict"
                            @click="showChangeScrict = true">修改密码</el-button>
                    <form v-if="showChangeScrict" class="modify-password-form">
                        <div>
                            <span>旧密码：</span><input type="password" v-model="password.oldP">
                        </div>
                        <div>
                            <span>新密码：</span><input type="password" v-model="password.newP">
                        </div>
                        <div>
                            <span>确认密码：</span><input type="password" v-model="password.newPConfirm">
                        </div>
                        <el-button @click="modifyPassword">保存</el-button>
                    </form>
                </div>
            </div>
            <div v-if="panelIndex == 2" class="UserOrder" >
                <h6>我的订单</h6>
                <div>
                    <!--内容头部-->
                    <div>
                        <ul>
                            <li><a href="javascript:;">全部订单</a></li>
                            <li><a href="javascript:;">待付款</a></li>
                            <li><a href="javascript:;">待收货</a></li>
                            <li><a href="javascript:;">待评价</a></li>
                        </ul>
                        <!--<div>-->
                            <!-- TODO 通过搜索进行获取内容 -->
                            <!--&lt;!&ndash;商品名称/商品编号&ndash;&gt;-->
                            <!--<input type="text" placeholder="订单编号" :value="orderId"/>-->
                            <!--<input type="submit" value="搜索"/>-->
                        <!--</div>-->
                    </div>
                    <!--内容中心-->
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <td>订单详情</td>
                                    <td>收货人</td>
                                    <td>金额</td>
                                    <td>状态</td>
                                    <td>操作</td>
                                </tr>
                            </thead>

                            <tbody   v-for="(item,index) in orderDetails.list" :key="index">
                            <tr >
                                <td ></td>
                            </tr>
                                <tr class="tbodyHead">
                                    <td colspan="5"><p>{{item.createTime}}</p>
                                        <p>订单号:<a href="javascript:;">{{item.orderNo}}</a></p></td>
                                </tr>
                                <tr class="tbodyBody">
                                    <td>
                                        <div>
                                            <a href="javascript:;">
                                                <img :src="getMain(item.orderItemVOList[0].priductImage)" height="100px" width="100px"/>
                                            </a>

                                        </div>
                                        <div>
                                            <a href="javascript:;">
                                                <span v-for="(product,i) in item.orderItemVOList" :key="i">
                                                    {{product.productName}}
                                                </span>
                                                &nbsp;
                                            </a>
                                        </div>
                                    </td>

                                    <td>{{item.receiverName}}</td>
                                    <td class="UpBorder">
                                        <p>总额￥{{item.payment}}</p>
                                        <p >在线支付</p>
                                    </td>
                                    <td>
                                        <p>{{item.statusDesc}}</p>
                                        <p><a href="javascript:;">订单详情</a></p>
                                    </td>
                                    <td>
                                        <a v-if="item.status < 20" @click="cancelOrder(item.orderNo)">取消订单</a>
                                    </td>
                                </tr>
                            </tbody>

                        </table>
                        <div class="pagination">
                            <el-pagination
                                    @current-change="currentPageChange"
                                    :page-size="orderDetails.pageSize"
                                    layout="prev, pager, next, jumper"
                                    :total="orderDetails.total">
                                <!---->
                                <!--productData.pages-->
                            </el-pagination>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="panelIndex == 3" class="UserActivity">
                <h6>玩游戏赚优惠卷</h6>
                <div style="padding: 20px 10px">
                    <!--<a href="javascript:;">-->
                        <!--<img src="../../assets/bb.jpg" height="200px" width="200px" title="点击开始游戏"></a>-->
                    暂无
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "UserCenter",
        data(){
            return {
                panelIndex:1,
                userIdentity:false,
                showChangeScrict:false,
                userInfo:{
                    username:"",
                    email:""
                },
                password:{
                    oldP:"",
                    newP:"",
                    newPConfirm:"",
                },
                orderId:"", //搜索订单编号得ID
                orderDetails:{},
                currenPage:1,
            }
        },
        methods:{
          selectedFun( value ) {
             //console.log( typeof value);
             //  this.panelIndex=value;
              this.panelIndex = value;
              //
          },
          //修改密码
          modifyPassword(){
            if(this.password.newPConfirm != this.password.newP){
                //如果不等于，那么就提示新旧密码不等
                this.showTipError({
                    message: "新密码前后不对应",
                    customClass:'tipClass',
                });
                return;
            }
            this.$axios.post(
                "/user/resetPassword.do",
                this.qs.stringify({
                    oldPassword:this.password.oldP,
                    newPassword:this.password.newP
                })
            ).then(response =>{
                console.log(response);
                console.log(response.data.status);
                if(response.data.status == 0){
                    //如果响应成功,重置
                    this.password.oldP = "";
                    this.password.newP = "" ;
                    this.password.newPConfirm = "";
                    //
                    this.showTip({
                        message: "修改密码成功",
                        customClass:'tipClass',
                        type:'success'
                    });
                    this.showChangeScrict = false;
                }else{
                    this.showTipError({
                        message: response.data.msg,
                        customClass:'tipClass',
                    });
                }

            }).catch(response =>{

            })
          },
          //获得订单的信息
          getMyOrder(num){
              this.$axios.post( "/order/list.do",this.qs.stringify({
                  pageNum : num,
                  pageSize : 3,
                  })

                 ).then(response => {
                      //
                    // console.log(response);
                    // this.orderList = response.data.data.list;
                    this.orderDetails = response.data.data;
                    // console.log(this.orderDetails);
              }).catch(response =>{
                  //
                  console.log(response);
              })
          },
            //TODO 获取订单编号得详细信息
            getMyOrderById(){
              // this.$axios.get("")
            },
            // 分页功能
            currentPageChange (num){
                this.getMyOrder(num);
                this.currenPage =num;
            },
            //取消订单
            cancelOrder (orderNo){
              this.$axios.post("/order/cancel.do",this.qs.stringify({
                  orderNo:orderNo
              })).then(response =>{
                  // console.log(this.currenPage);
                  // console.log(response);
                  // window.location.reload();
                  this.getMyOrder(this.currenPage);
              })
            }
        },

        created() {
            this.getMyOrder(1);
            //获得用户信息
            this.$axios.post("/user/getUserInfo.do"
            ).then(response => {
                //console.log(response.data);
                if (response.data.status == 1)
                    return;
                this.constant.userInfo = response.data.data;
                this.userInfo = this.constant.userInfo;
                // console.log(this.constant.userInfo);
            }).catch(response => {

            });
        }

    }
</script>

<style>
     #UserCenter{
        position: relative;
     }
     /*面包屑导航*/
     #UserCenter .breadNav{
        height: 30px;
         background-color: #e3e4e5;
         position: relative;
     }
     #UserCenter .breadNav .el-breadcrumb{
         line-height: 30px;
         padding-left: 10px;
     }
     #UserCenter .left{
         position: relative;
         top: 10px;
         left: 0;
         display: inline-block;
         height: 600px;
         width: 10%;
         /*background-color: lightgreen;*/
     }
     #UserCenter .left {
         font-size: 14px;
         font-weight: 500;
     }
     #UserCenter .left li{
         margin-top: 25px;
     }
     #UserCenter .selected a{
        color: red;
     }
     #UserCenter .left h6{
         font-size: 16px;
         font-weight: 600;
     }
    /*内容开始*/
     #UserCenter .content{
         position: absolute;
         left: 10%;
         top: 40px;
        display: inline-block;
         width: 90%;
         /*background-color: white;*/
         height: 600px;
     }
     /*用户的信息*/
     #UserCenter .content .UserInfo{
         /*background-color: greenyellow;*/
     }
     /*修改用户的密码*/
     #UserCenter .content .UserInfo .modify-password-form{

     }
     #UserCenter .content .UserInfo .modify-password-form>div{
         padding-top: 20px;
         box-sizing: border-box;
     }
     #UserCenter .content  h6{
         background-color: white;
         width: 100%;
         height: 50px;
         box-sizing: border-box;
         border-radius: 5px;
         line-height: 50px;
         font-weight: 600;
         padding-left: 10px;
     }
     #UserCenter .content .UserInfo>div{
         margin-top: 10px;
         background-color: white;
         height: 530px;
         box-sizing: border-box;
         width: 100%;
         border-radius: 5px;
         padding-left: 10px;

     }
     #UserCenter .content .UserInfo>div>div{
         padding-top: 20px;
         /*background-color: yellow;*/
     }
     #UserCenter .content .UserInfo>div>div select{
         width: 100px;
         text-align: center;
         padding-left: 20px;
     }

     #UserCenter .content .UserInfo>div span{
        display: inline-block;
         width: 100px;
         height: 50px;
         text-align: right;
         /*background-color: lightcyan;*/
     }
     #UserCenter .content .UserInfo>div p{
         display: inline-block;
     }

     #UserCenter .content .UserInfo>div>div label{
         display: inline-block;
         width: 50px;
         text-align: center;
         /*background-color: lightgreen;*/
     }
     #UserCenter .content .UserInfo>div .el-button{
         width: 100px;
         height: 30px;
         border: none;
         background-color: #f0f3ef;
         border-radius: 3px;
         margin-left: 100px;
         text-align: center;
         padding: 0;
     }
     #UserCenter .content .UserInfo>div .el-button span{
         text-align: center;
         line-height: 30px;
     }
     #UserCenter .content .UserInfo>div .el-button span:hover{
         color: black;
     }

    /*我的订单开始*/
     #UserCenter .content .UserOrder{

     }
     #UserCenter .content .UserOrder>div{
         margin-top: 10px;
         background-color: white;
         height: 650px;
         box-sizing: border-box;
         width: 100%;
         border-radius: 5px;
         padding: 20px 20px 0 10px;
     }
     #UserCenter .content .UserOrder>div>div:nth-of-type(1){
         /*background-color: lightcyan;*/
     }
     #UserCenter .content .UserOrder ul{
         display: inline-block;
     }
     #UserCenter .content .UserOrder ul>li{
         display: inline-block;
         width: 100px;
         height: 30px;
         line-height: 30px;
     }
     #UserCenter .content .UserOrder>div>div>div{
         display: inline-block;
         width: 300px;
         height: 30px;
         position: absolute;
         right: 20px;
         /*background-color: yellow;*/
     }
     #UserCenter .content .UserOrder>div>div>div input{
         width: 250px;
         height: 100%;
         box-sizing: border-box;
         float: left;
     }
     #UserCenter .content .UserOrder>div>div>div input:nth-child(2) {
         width: 50px;
         margin-top: 0px;
         /*height: 100%;*/
         border: 2px solid rgba(0,0,0,0);

     }

     /*table开始*/

     #UserCenter .content .UserOrder>div table{
         margin-top: 20px;
         /*background-color: #f0f3ef;*/
         width: 100%;
         text-align: center;
         color:#aaa;
     }
     #UserCenter .content .UserOrder>div table a{
         color:#333;
     }
     #UserCenter .content .UserOrder>div table thead{
         background-color: #f5f5f5;
     }
     #UserCenter .content .UserOrder>div table thead td{
         height: 40px;
     }

     #UserCenter .content .UserOrder>div table thead td:first-child{
        width: 400px;
     }
     #UserCenter .content .UserOrder>div table tbody{
        width: 100%;
         /*height: 100px;*/
        border-bottom: 1px solid #e5e5e5;
     }

     #UserCenter .content .UserOrder>div table tbody tr:nth-child(2){
        border-top:1px solid #e5e5e5;
     }
     #UserCenter .content .UserOrder>div table tbody tr td:nth-of-type(1){
         border-left: 1px solid #e5e5e5;
     }
     #UserCenter .content .UserOrder>div table tbody tr td:last-child {
         border-right: 1px solid #e5e5e5;
     }
     /*第一个墙开始*/
     #UserCenter .content .UserOrder>div table tbody tr:nth-child(1) td{
         border: none;
         height: 30px;
     }
     #UserCenter .content .UserOrder>div table tbody .tbodyHead td{
         height: 30px;
         line-height: 30px;
     }
     #UserCenter .content .UserOrder>div table tbody .tbodyHead p{
         display: inline-block;
         margin-left: 20px;

     }
     #UserCenter .content .UserOrder>div table tbody .tbodyHead{
         width: 100%;
         text-align: left;
         background-color: #f5f5f5;
     }
     #UserCenter .content .UserOrder>div table tbody .tbodyBody td{
         height: 90px;
         border-right:1px solid #e5e5e5;
     }
     #UserCenter .content .UserOrder>div table tbody .tbodyBody td:nth-of-type(1)>div{
         float: left;
         width: 80px;
         font-size: 14px;
         text-align: left;
         margin-left: 5px;
     }
     #UserCenter .content .UserOrder>div table tbody .tbodyBody td:nth-of-type(1)>div:nth-child(2){
         width: 65%;
         margin-left: 0;
         /*background-color: gray;*/
     }
     /*左边图片开始*/
     #UserCenter .content .UserOrder>div table tbody .tbodyBody td:nth-of-type(1)>div img{
         width: 65px;
         height: 65px;
     }
     #UserCenter .content .UserOrder>div table tbody .tbodyBody .UpBorder{
         width: 180px;
         padding: 0 20px;
         box-sizing: border-box;
         color:#a8a8a8;
     }
     #UserCenter .content .UserOrder>div table tbody .tbodyBody .UpBorder p{
         padding: 5px;
     }
     #UserCenter .content .UserOrder>div table tbody .tbodyBody .UpBorder p:nth-child(1){
         border-bottom: 1px solid #a8a8a8;
     }
    /*活动中心开始*/
     #UserCenter .content .UserActivity{

     }
     #UserCenter .content .UserActivity>div{
         margin-top: 10px;
         background-color: white;
         height: 530px;
         box-sizing: border-box;
         width: 100%;
         border-radius: 5px;
         padding-left: 10px;
     }
    /*分页功能*/
     #UserCenter .content .UserOrder>div>div>div[class="pagination"]{
         display: inline-block;
         /*width: 300px;*/
         /*height: 30px;*/
         position: relative;
         /*right: 20px;*/

         margin-left: 10px;
         width: 100%;
         box-sizing: border-box;
         /*background-color: #e0e450;*/
     }
     #UserCenter .content .UserOrder>div>div .pagination {
         margin-top: 10px;
         position: relative;
         height: 44px;
         /*background-color: red;*/
     }

     #UserCenter .content .UserOrder>div>div .pagination .el-pagination {
         position: absolute;
         right: 0;
         /*font-size: 16px;*/
     }

     #UserCenter .content .UserOrder>div>div .pagination .el-pagination button,
     #UserCenter .content .UserOrder>div>div .pagination .el-pagination input,
     #UserCenter .content .UserOrder>div>div .pagination .el-pager li {
         height: 40px;
         width: 30px;
         line-height: 40px;
         font-size: 14px;
     }
     #UserCenter .content .UserOrder>div>div .pagination .el-pagination input{
         height: 30px;
         margin-top: 5px;
     }
     #UserCenter .pagination .el-pager {
         height: 40px;

     }
    /*更改手势*/
     #UserCenter a{
         cursor: pointer;
     }

</style>