<template>
    <div id="home">
        <!--导航开始-->
        <div class="nav">
            <ul>
                <li v-if="userInfo.username == null">
                    <router-link to="/Login">请先登录</router-link>
                </li>
                <li>

                    <router-link :to="needToLogin('/UserCenter')">个人中心</router-link>
                </li>
                <li>
                    <router-link :to="needToLogin('/MyShopCart')">我的购物车(<span>{{myCartCount}}</span>)</router-link>
                </li>
                <li>
                    <router-link to="/About">关于xx网站</router-link>
                </li>
                <li v-if="userInfo.username != null" @click="logout">
                    <a href="javascript:;">退出</a>
                </li>
            </ul>
        </div>
        <!--搜索开始-->
        <div class="search">
                <img src="./../../assets/logo.png">
                <input type="text" v-model="searchText">
                <button @click="searchProduct" class="el-icon-search"></button>
        </div>
        <!--轮播图+分类-->
        <div class="content1">
            <!--分类-->
            <div  @mouseenter="enter" @mouseleave="leave">
                <div class="classify">
                    <ul>
                        <li v-for="(items,i) in this.categoryName" :key="i" @mouseenter="showCategory(i)" >
                        <span v-for="(item,j) in items.data" :key="j" >
                            <a href="javascript:;" @click="getProductByCategory(item.id)">{{item.name}}</a> \
                        </span>

                        </li>
                    </ul>
                </div>
                <div v-if="isShowClasssify" class="classifC" >
                    <div>
                        <ul >
                            <li >
                                <span v v-for="(item ,i ) in this.categoryHover" :key="i">
                                   <a href="javascript:;" @click="getProductByCategory(item.id)">{{item.name}}</a>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <!--轮播图 v-if="isShowClasssify"-->
            <div   class="carousel">
                <el-carousel height="350px">
                    <el-carousel-item >
                       <img src="./../../assets/aa.jpg" @click="getProductByCategory(15)">
                    </el-carousel-item>
                    <el-carousel-item >
                        <img src="../../assets/t1.jpg" @click="getProductByCategory(16)">
                    </el-carousel-item>
                    <el-carousel-item >
                        <img src="../../assets/t2.jpg" @click="getProductByCategory(17)">
                    </el-carousel-item>
                </el-carousel>
            </div>
            <!--推荐-->
            <div class="recommend">
                <div>
                    <img src="./../../assets/bb.jpg" alt="" title="暂无">
                </div>
                <div>
                    <img src="./../../assets/kk1.jpg" alt="" title="暂无">
                </div>
            </div>
        </div>
        <!--下面的内容-->
        <HomeMain v-if="isMain"></HomeMain>
        <!--下面的是搜索内容-->
        <!--

        -->
        <HomeSearch ref="homeSearch"  v-else></HomeSearch>
    </div>
</template>

<script>
    import HomeMain from '../../components/home/HomeMain'
    import HomeSearch from '../../components/home/HomeSearch'

    export default {
        name: "Home",
        data(){
            return{
                isShowClasssify:false,
                isMain:false,
                categoryName:[],
                categoryHover:[],
                productData:{},
                isCategory:true,
                searchKey:"",
                userInfo:{
                    username : null
                },
                searchText:"",
                myCartCount:0,
                turnData:[],
            }
        },
        methods:{
           enter:function () {
               this.isShowClasssify=true;
           },
            leave:function () {
                this.isShowClasssify=false;
            },
            //逻辑
            needToLogin(path){
                if(this.userInfo.username == null){
                    return "/Login"
                }else{
                    return path;
                }
            },
            logout(){

              this.$axios.get('/user/logout.do').then(response => {
                  window.location.reload();
              }).catch(response => {

              })
            },
            //动态显示分类的内容
            showCategory(i){
                // console.log(i);
                this.categoryHover =this.categoryName[i].children;
                // console.log(this.categoryHover);
            },
            getProductByCategory(id){
               this.$axios.get("/productController/getList.do",
               { params :{
                   categoryId:id,
                       pageSize:8,
                   }
               }
               ).then(response => {
                   if(response.data.status == 1)
                       return;
                   this.productData = response.data.data;
                   this.isMain = false;

                   this.$nextTick(() => {
                       // this.$refs.homeSearch.say();
                       this.$refs.homeSearch.isCategory = true;
                       this.$refs.homeSearch.productData =  this.productData;
                       this.$refs.homeSearch.searchKey = "";
                   });
               }).catch(response => {
                   console.log(response);
               })

            },
            /**
             * 产品搜索
             */
            searchProduct(){
                // console.log(this.$refs.homeSearch.isCategory);
                if(this.searchText == null || this.searchText.trim() =="")
                    return;
                // console.log(this.searchText.trim());
                this.$axios.get("/productController/search.do",{
                    params:{
                        keyword : this.searchText.trim(),
                        pageSize:8,
                    }
                }).then( response =>{
                    //
                    //
                    this.productData = response.data.data;
                    this.isMain = false;

                    this.$nextTick(() => {
                        // this.$refs.homeSearch.say();
                        this.$refs.homeSearch.isCategory = false;
                        this.$refs.homeSearch.productData =  this.productData;
                        this.$refs.homeSearch.searchKey = this.searchText.trim();
                    });

                    //


                     //console.log(response.data.data.list);

                })
            },
            //    /cart/getCartProductCount.do
            //购物车的数量
            getShopCartCount(){
                this.$axios.post("/cart/getCartProductCount.do")
                    .then(response =>{
                        //myCartCount
                        // console.log(response.data);
                        this.myCartCount = response.data.data;
                    }).catch(response =>{

                });

            },
            //
            //获得推荐
            getTurn(){
                this.$axios.get("/productController/search.do",{
                    params:{
                        keyword : '的',
                        pageSize: 4,
                    }
                }).then( response =>{
                    this.turnData = response.data.data.list;
                    // console.log(this.recommendData);
                })
            },
        },
        components:
            {
                "HomeMain":HomeMain,
                "HomeSearch":HomeSearch,
            },
        mounted(){
            this.$nextTick(()=>{
                this.getShopCartCount();
                // console.log("77");
            })

        },
        created() {
            //
            this.isMain =true;
            //获得分类信息
            this.$axios.get("/category/getAllCategory.do",
            ).then(response => {
                this.constant.category =response.data.data;
                this.categoryName =this.constant.category;
                // console.log( this.constant.category);
            }).catch(response =>{

            });

            //获得用户信息
            if(this.constant.userInfo.username != null){
                this.userInfo = this.constant.userInfo;
                return;
            }
            //
            this.$axios.post("/user/getUserInfo.do"
            ).then(response => {
                //console.log(response.data);
                if(response.data.status == 1)
                    return ;
                this.constant.userInfo = response.data.data;
                this.userInfo = this.constant.userInfo;
                //console.log(this.constant.userInfo);
            }).catch(response =>{

            });
          //  this.getShopCartCount();
        }

    }

</script>

<style >
    #home{
        color: #626279;
    }
    #home img{
        cursor: pointer;
    }
    /*导航开始*/
    #home .nav {
        position: relative;
        width: 100%;
        height: 30px;
        background-color: #e3e4e5;
        box-sizing: border-box;
    }
    #home .nav ul{
        position: absolute;
        top: 0;
        right: 0;
    }
    #home .nav li{
        float: left;
        margin-left: 30px;
        line-height: 30px;
        font-size: 14px;
        color: #828282;
    }
    #home .search{
        height: 100px;
        /*background-color: green;*/
        position: relative;
        box-sizing: border-box;
        padding-top: 33px;
    }
    #home .search img{
        width: 50px;
        height: 50px;
        position: absolute;
        left: 389px;
        top: 24px;
    }
    #home .search input{
        float: left;
        box-sizing: border-box;
        margin-left: 470px;
        width: 340px;
        height: 35px;
    }
    #home .search button{
        float: left;
        width: 50px;
        height: 35px;
        background-color: #f10215;
        border: none;
    }
    #home .content1{
        height: 350px;
        background-color: white;
        position: relative;
        /*box-shadow: 1px 2px 3px rgba(154, 160, 150, 0.99);*/
    }
    #home .content1 div:nth-of-type(1){
        /*width: 1000px;*/
        /*background-color: green;*/
    }
    #home .content1 .classify{
        float: left;
        width: 300px;
        height: 100%;
        box-sizing: border-box;
        /*background-color: greenyellow;*/
        /*padding-left: 20px;*/
        box-shadow: 1px 1px 10px rgba(154, 160, 150, 0.99);

    }
    #home .content1 .classify li{
        box-sizing: border-box;
        width: 100%;
        height: 35px;
        background-color: white;
        color: #626262;
    }
    #home .content1 .classify li:hover{
        background-color: #e3e4e5;
    }
    #home .content1 .classify li span{
        /*width: 70px;*/
        /*height: 35px;*/
        line-height: 35px;
        margin-left: 20px;

    }
    #home .content1 .classifC{
        width: 260px;
        height: 100%;
       /*float: left;*/
        position: absolute;
        left: 300px;
        z-index: 998;
        box-sizing: border-box;
        background-color: rgba(220,220,220,0.9);
        /*border: 1px solid #e3e4e5;*/
        /*box-shadow: -1px -1px 10px rgba(154, 160, 150, 0.99) inset;*/
    }
    #home .content1 .classifC div:nth-child(1){
        padding-left: 10px;
        /*background-color: pink;*/
        height: 350px
    }
    #home .content1 .classifC  li{
        margin-top: 1px;
    }

    #home .content1 .classifC h6{
        color: black;
        font-weight: 500;

    }
    #home .content1 .classifC span{
        display: inline-block;
        box-sizing: border-box;
        /*background-color: red;*/
        width: 80px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        margin-left: 1px;
    }
    #home .content1 .classifC span:hover{
        background-color: #808080;
        color: #f0f3ef;
    }
    #home .carousel{
        margin-left: 310px;

        width: 680px;
        height: 100%;
        box-shadow: 1px 1px 10px rgba(154, 160, 150, 0.99);
        /*background-color: #59ff48;*/
    }
    #home .carousel img{
        width: 100%;
    }
    #home .recommend {
        box-sizing: border-box;
       position: absolute;
        top: 0;
        right: 0;
        width: 200px;
        height: 100%;
    }
    #home .recommend div{
        box-sizing: border-box;
        padding: 0 0 1px 1px;
        width: 100%;
        height: 170px;
        box-shadow: 1px 2px 3px rgba(154, 160, 150, 0.99);
        /*background-color: green;*/
    }
    #home .recommend div:nth-of-type(2){
        margin-top: 10px;
    }
    #home .recommend div img{
        width: 100%;
        height: 100%;
    }


</style>