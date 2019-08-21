<template>
    <div id="MyShopCart">
        <!--面包屑导航-->
        <div class="breadNav">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>我的购物车</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!--图标-->
        <div>
            <h1 style="background-color: #f6e27c;width: 100%" >
                <!--<Logo ></Logo>-->
                <!--广告招租-->
            </h1>
        </div>
        <!--内容开始-->
        <div class="content">
            <!--第一行-->
            <div class="CHead">
                <div @click="checkedAllOrUnchecked(!allChecked)">
                    <input type="checkbox" id="checkbox" v-model="allChecked" >
                    <label for="checkbox" style="margin-left: 10px">全选</label>
                </div>
                <div>商品</div>
                <div>单价</div>
                <div>数量</div>
                <div>小计</div>
                <div>操作</div>
            </div>

            <!--购物车商品-->
            <div class="cartItem" v-for="(item, index) in cartList" :key="index">
                <div>
                    <input type="checkbox" :id="item.productId" v-model="item.productChecked" @click="changeSingle(item.productId,item.productChecked)">
                    <label v-bind:for="item.productId">
                        <img :src="getMain(item.productMainImage)" height="100" width="100" />
                    </label>
                    <div>{{item.productName}}</div>
                    <div>{{item.productSubtitle}}</div>
                </div>
                <div>￥{{item.productPrice}}</div>
                <div @click="getChooseItem(item)">
                    <el-input-number v-model="item.quantity"  @change="handleChange" :min="1" :max="item.productSock" ></el-input-number>
                </div>
                <div>￥{{item.productTotalPrice}}</div>
                <div><a href="javascript:;" @click="deleteCart(item.productId)">删除</a></div>
            </div>
        </div>
        <div v-if="showCartTip.ifNotEnough" class="showCartTip">
            <p v-if="showCartTip.isZero">没有更多了</p>
        </div>
        <!--&lt;!&ndash;分页功能&ndash;&gt;-->
        <!--<div class="pagination">-->
            <!--&lt;!&ndash;@size-change="handleSizeChange"&ndash;&gt;-->
            <!--&lt;!&ndash;:current-page.sync="currentPage3"&ndash;&gt;-->
            <!--&lt;!&ndash;@current-change="handleCurrentChange"&ndash;&gt;-->
            <!--<el-pagination-->
                    <!--:page-size="2"-->
                    <!--layout="prev, pager, next, jumper"-->
                    <!--:total="5">-->
            <!--</el-pagination>-->
        <!--</div>-->
        <!--结算-->
        <div class="payOrder">
            <div @click="checkedAllOrUnchecked(!allChecked)">
                <!--<input type="checkbox" id="checkbox1" v-model="allChecked" >-->
                <!--<label for="checkbox1">全选</label>-->
            </div>
            <div>
                 <!--<a href="javascript:;">删除选中的商品</a>-->
            </div>
            <button @click="linkTo({name:'SubmitOrder'})">去结算</button>
            <div>
                总价：<span>{{cartTotalPrice}}</span>
            </div>

        </div>
    </div>
</template>

<script>
    import Logo from '../../components/Logo.vue'
    import AddressDialog from '../../components/AddressDialog.vue'
    export default {
        name: "MyShopCart",

        data() {
            return {
                showCartTip:{
                    isZero:false,
                    ifNotEnough:false,
                },
                cartList:[],
                cartTotalPrice:"",
                allChecked : false,
                updataCount:0,
            }
        },
        components:{
            'Logo':Logo,
            'AddressDialog':AddressDialog,
        },
        methods: {
            getChooseItem(item){
                // console.log(this.updataCount);
                // console.log(item);
               this.$axios.post("/cart/update.do",this.qs.stringify({
                   count:this.updataCount,
                   productId:item.productId,
               })).then(response =>{
                   this.cartList = response.data.data.cartProductVOList;
                   this.cartTotalPrice =  response.data.data.cartTotalPrice;
                   //this.allChecked = response.data.data.allChecked;
                   //
                   this.isShowNullTip();
               }).catch(reason => {

               });
                //重新刷新内容
               //
            },
            handleChange(value) {
                console.log(value);
                this.updataCount=value;
            },
            getName(name,index){
                return name+index
            },
            getCartList(){
                this.$axios.post("/cart/list.do").then( response => {
                    //
                   // console.log(response.data.data);
                    //
                    this.cartList = response.data.data.cartProductVOList;
                    this.cartTotalPrice =  response.data.data.cartTotalPrice;
                    this.allChecked = response.data.data.allChecked;
                    //
                    this.isShowNullTip();
                   // console.log(this.cartList);
                }).catch( response => {
                    //
                    console.log(response);
                })
            },
            //逻辑
            changeSingle (id,checked){
                 console.log(id +" "+ checked);

                var url ="";
                if(checked == 1){
                    url = "/cart/unSelect.do";
                }else{
                    url ="/cart/select.do";
                }
                this.$axios.post(url,this.qs.stringify({
                    productId:id
                })
                ).then(response =>{
                    //console.log(response.data);
                    //
                    this.cartList = response.data.data.cartProductVOList;
                    this.cartTotalPrice =  response.data.data.cartTotalPrice;
                    this.allChecked = response.data.data.allChecked;
                })
            },
            checkedAllOrUnchecked(checked){

                var url="";
                if(checked){
                    url = "/cart/selectAll.do";
                }else{
                    url = "/cart/unSelect.do";
                }
              this.$axios.post(url).then(response =>{
                 // console.log(response.data);
                  //
                  this.cartList = response.data.data.cartProductVOList;
                  this.cartTotalPrice =  response.data.data.cartTotalPrice;
                  this.allChecked = response.data.data.allChecked;
              }).catch(response =>{

              })
            },
            deleteCart(id){
                this.$axios.post("/cart/delete.do",this.qs.stringify(
                    {
                        productId : id
                    }
                )).then( response => {
                    this.getCartList();
                })
            },
            isShowNullTip(){
                if(this.cartList.length < 2){
                    this.showCartTip.ifNotEnough =true;
                    if(this.cartList.length <= 0){
                        this.showCartTip.isZero=true;
                    }else{
                        this.showCartTip.isZero=false;
                    }
                }else
                    this.showCartTip.ifNotEnough =false;

            }
        },
        created() {
            this.getCartList();
            //
        }
    }
</script>

<style >
    #MyShopCart{
        background-color: white;
        /*height: 944px;*/
        height: auto;
    }
    /*面包屑导航*/
    #MyShopCart .breadNav{
        height: 30px;
        background-color: #e3e4e5;
        position: relative;
    }
    #MyShopCart .breadNav .el-breadcrumb{
        line-height: 30px;
        padding-left: 10px;
    }
    /*logo开始*/
    #MyShopCart h1{
        height: 100px;
        width: 100px;
        display: inline-block;
    }

        /*内容开始*/
    #MyShopCart .content {

    }
    /*内容头部开始*/
    #MyShopCart .content .CHead{
        background-color: #f3f3f3;
        height:45px ;
        line-height: 45px;
        box-sizing: border-box;
        border: 1px solid #e3e4e5;
    }

    #MyShopCart .content .CHead div{
        display: inline-block;
        width: 120px;
        height:45px ;
        text-align: center;
        padding-left: 30px;
        box-sizing: border-box;
        /*background-color: lightblue;*/
    }
    #MyShopCart .content .CHead div:nth-of-type(1){
        text-align: left;
    }
    #MyShopCart .content .CHead div:nth-of-type(2){
        width: 553px;
    }
    #MyShopCart .content .CHead div:nth-of-type(4){
        width: 165px;
    }
    #MyShopCart .content .CHead input{
    }
    /*商品信息开始*/
    #MyShopCart .content .cartItem{
       padding: 20px 0;
        margin-top: 20px;
        border: 1px solid #f1f1f1;
        border-top: 1px solid #aaaaaa;
        text-align: center;
        box-sizing: border-box;
    }
    #MyShopCart .content .cartItem>div{
        padding-left: 30px;
        display: inline-block;
        box-sizing: border-box;
        width: 120px;
    }
    #MyShopCart .content .cartItem>div:nth-of-type(1){
        width: 688px;
        text-align: left;
    }
    #MyShopCart .content .cartItem>div:nth-of-type(3){
        width: 150px;
    }
    /*框架内容开始*/
    #MyShopCart .content .cartItem>div:nth-of-type(3) .el-input{
        width: 100px;
        height: 38px;
        border: 1px solid #dcdfe6;
        border-radius: 3px;
    }
    #MyShopCart .content .cartItem>div:nth-of-type(3) .el-input input{
        /*78 -40*/
        /*180-30*/
        border: none;
        width: 100px;
        height: 38px;
        padding: 0 30px;
    }
    #MyShopCart .content .cartItem>div:nth-of-type(3) .el-input-number span{
        width:30px ;
    }

    #MyShopCart .content .cartItem>div:nth-of-type(3) .el-input-number span:nth-of-type(2){
        /*138-30*/
        left: 70px;
    }
    #MyShopCart .content .cartItem>div:nth-of-type(3) .el-input-number span i{

    }
    #MyShopCart .content .cartItem>div:nth-of-type(1) div{
       display: inline-block;
    }
    #MyShopCart .content .cartItem>div:nth-of-type(1) img{
        float: left;
        margin-left: 10px;
    }
    #MyShopCart .content .cartItem>div:nth-of-type(1) input{
        float: left;
      margin-top: 15px;
    }
    #MyShopCart .content .cartItem>div:nth-of-type(1) div{
        padding-top: 10px;
        margin-left: 10px;
        width: 480px;
    }
    #MyShopCart .content .cartItem>div:nth-of-type(1) div span{
        width: 50px;
        display: inline-block;
        text-align: left;
    }
    /*!*分页功能*!*/
    /*!*分页功能*!*/
    /*#MyShopCart .pagination{*/
        /*margin-top: 20px;*/
        /*position: relative;*/
        /*height: 44px;*/
    /*}*/
    /*#MyShopCart .pagination .el-pagination{*/
        /*position: absolute;*/
        /*right: 0;*/
        /*!*font-size: 16px;*!*/
    /*}*/
    /*#MyShopCart .pagination .el-pagination button,#MyShopCart .pagination .el-pagination input, #MyShopCart .pagination .el-pager li{*/
        /*height: 30px;*/
        /*width: 40px;*/
        /*line-height: 30px;*/
        /*font-size: 14px;*/
    /*}*/

    /*#MyShopCart .pagination .el-pager{*/
        /*height: 30px;*/

    /*}*/
    /*去结算*/
    #MyShopCart .payOrder{
        padding-left: 35px;
        height: 55px;
        border-top: 1px solid #f0f0f0;
        border-bottom: 1px solid #f0f0f0;
        background-color: white;

    }
    #MyShopCart .payOrder div{
        display: inline-block;
        width: 150px;
        height: 100%;
        box-sizing: border-box;
        line-height: 55px;

    }
    #MyShopCart .payOrder div:first-child{
        text-align: left;
    }
    #MyShopCart .payOrder div:nth-of-type(3){
      float: right;
    }
    #MyShopCart .payOrder div span{
        color: red;
        font-size: 18px;
    }
    #MyShopCart .payOrder button{
        color: white;
        background-color: red;
        border: none;
        height: 100%;
        width: 150px;
        box-sizing: border-box;
        float: right;
        font-size: 20px;
        font-weight: 600;
        cursor: pointer;
    }
    #MyShopCart .showCartTip{
        padding-top: 120px;
        height: 150px;
    }
    #MyShopCart .showCartTip p{
       text-align: center;
        font-size: 20px;
    }

</style>