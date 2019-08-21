<template>
    <div id="HomeMain">
        <!--秒杀商品-->
        <div class="quickly">
            <div class="quicklyHeader">
                <h3>京东秒杀</h3>
                <p>FLASH DEALS</p>
                <p><img src="../../assets/logo.png" title="暂无" /></p>
                <p>本场距离结束还剩</p>
                <h4><span>00</span><span>00</span><span>00</span></h4>
            </div>
            <ul>
                <li v-for="(item,index) in shaData" :key="index" @click="productDetails(item.id)">
                        <img :src="getMain(item.mainImage)" alt="">
                        <p>{{item.name}}</p>
                        <h6>￥ <span>{{item.price}}</span></h6>
                </li>
            </ul>
        </div>
        <!--排行榜-->
        <div class="sort">
            <div class="left">
                <h5>销售排行榜</h5>
                <ul>
                    <li  v-for="(item,index) in topData" :key="index" @click="productDetails(item.id)">
                        <img :src="getMain(item.mainImage)"/>
                        <!---->
                        <h6>{{item.name}}</h6>
                        <!--<p>{{item.subtitle}}</p>-->
                    </li>
                </ul>
            </div>
            <div class="center">
                <h5>个人推荐</h5>
                <div>
                    <div  v-for="(item,index) in recommendData" :key="index" @click="productDetails(item.id)" style="cursor: pointer">
                        <img :src="getMain(item.mainImage)" />
                        <!--{{recommendData[index].name}}-->
                        <h6>{{item.name}}</h6>
                        <!--{{recommendData[index].subtitle}}-->
                        <p>{{item.subtitle}}</p>
                    </div>

                </div>
            </div>
            <div class="left right">
                <h5>优惠券中心</h5>
                <ul>
                    <li v-for="index in 5" :key="index">
                        <img src="../../assets/logo.png" title="功能暂时无法开放"/>
                        <div class="tipDown">
                            <h6>￥<span>100</span></h6>
                            <p>家居优惠券满300</p>
                            <div class="horizontal">
                                <p >立即领取</p>
                            </div>
                        </div>

                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "HomeMainMain",
        data(){
            return{
                //推荐数据
                recommendData:[],
                //秒杀
                shaData:[],
                //排行榜
                topData:[],
            }
        },
        methods:{
            //获得推荐
            getRecommend(){
                this.$axios.get("/productController/search.do",{
                    params:{
                        keyword : '的',
                        pageSize: 4,
                    }
                }).then( response =>{
                    this.recommendData = response.data.data.list;
                    // console.log(this.recommendData);
                })
            },
            //获得秒杀功能
            getTurnPicture(){
                this.$axios.get("/productController/search.do",{
                    params:{
                        keyword : '的',
                        pageSize: 5
                    }
                }).then( response =>{
                    this.shaData = response.data.data.list;
                    // console.log(this.shaData);
                })
            },
            //获得排行榜
            getTop10(){
                this.$axios.get("/productController/search.do",{
                    params:{
                        keyword : '的',
                        pageSize: 5
                    }
                }).then( response =>{
                    this.topData = response.data.data.list;
                    // console.log(this.topData);
                })
            }
        },
        created() {
            // console.log(this.searchText.trim());
            //个人推荐 VS 京东秒杀
            this.getRecommend();
            //销售排行榜
            this.getTop10();

            //秒杀功能
            this.getTurnPicture();
            //右边两个小格子

        }
    }
</script>

<style scoped>

    #HomeMain .quickly{
        margin-top: 20px;
        width: 100%;
        height: 250px;
        background-color: white;
        /*box-shadow: 1px 1px  2px rgba(154, 160, 150, 0.99);*/
        /*margin-bottom: 10px;*/
    }
    #HomeMain .quickly .quicklyHeader{
        float: left;
        width: 200px;
        height: 250px;
        box-sizing: border-box;
        background-color: #f34141;
        display: inline-block;
        color: white;
    }
    #HomeMain .quickly h3{
        /*padding-top: 30px;*/
        text-align: center;
        font-weight: 500;
        font-size: 30px;
        line-height: 50px;
    }
    #HomeMain .quickly .quicklyHeader p{
        text-align: center;
        line-height: 20px;
        color: #f49b99;
    }
    #HomeMain .quickly .quicklyHeader p:nth-of-type(3){
        color: white;
    }
    #HomeMain .quickly .quicklyHeader h4{
        padding-top: 10px;
        text-align: center;
    }
    #HomeMain .quickly .quicklyHeader h4 span{
        display: inline-block;
        line-height: 40px;
        width: 40px;
        height: 40px;
        background-color: #2f3430;
        font-size: 25px;
        margin-left: 10px;
    }
    #HomeMain .quickly .quicklyHeader h4 span:nth-of-type(1){
        margin-left: 0;
    }

    #HomeMain .quickly img{
        width: 80px;

    }
    #HomeMain .quickly ul{
        display: inline-block;
    }
    #HomeMain .quickly li{
        float: left;
        box-sizing: border-box;
        width: 180px;
        height: 250px;
        padding: 10px 0;
        /*background-color: pink;*/
        margin-left: 20px;
        line-height: 25px;
        cursor: pointer;
    }
    #HomeMain .quickly li h6{
        font-weight: 700;
    }
    #HomeMain .quickly li img{
        width: 180px;
        height: 180px;
    }
    /*排行榜开始*/
    #HomeMain .sort{
        margin-top: 20px;
        height: 500px;
        width: 100%;
        box-sizing: border-box;
        /*background-color: white;*/
    }
    #HomeMain .sort .left{
        float: left;
        width: 350px;
        height: 100%;
        /*border: 1px solid black;*/
        background-color: white;
    }

    #HomeMain .sort .left li{
        clear: both;
        /*background-color: #ffffff;*/
        height: 70px;
        margin-top: 20px;
        float: left;
        cursor: pointer;
        /*box-shadow: 1px 1px 1px black;*/
    }
    #HomeMain .sort .left ul{
        background-color: red;
    }
    #HomeMain .sort .left h5{
        padding-top: 15px;
        text-align: center;
        font-size: 30px;
        line-height: 30px;
        font-weight: 500;
        background-color: rgba(240, 243, 239, 0.07);
    }
    #HomeMain .sort .left img{
        margin-left: 10px;
        width: 50px;
        height: 50px;
    }
    #HomeMain .sort .left p {
        /*width: 200px;*/
        /*line-height: 40px;*/
        /*background-color: silver;*/

    }
    #HomeMain .sort .left h6{
        text-align: left;
        width: 290px;
        line-height: 40px;
        box-sizing: border-box;
        padding-left: 20px;
        font-size: 18px;
        font-weight: 500;
        /*background-color: greenyellow;*/
    }
    #HomeMain .sort .left p ,#HomeMain .sort .left h6,#HomeMain .sort .left img{
        float: left;
    }
    #HomeMain .sort .center{
        float: left;
        margin-left: 50px;
        width: 400px;
        height: 100%;
        /*border: 1px solid black;*/
        background-color: white;
    }
    #HomeMain .sort .center h5{
        padding-top: 15px;
        text-align: center;
        font-size: 30px;
        line-height: 30px;
        font-weight: 500;
        background-color: rgba(240, 243, 239, 0.07);
    }
    #HomeMain .sort .center div div{
        width: 180px;
        height: 200px;
        /*background-color: gold;*/
        display: inline-block;
        margin: 20px 0 0 12px;
        box-sizing: border-box;
        /*padding-left: 20px;*/

    }
    #HomeMain .sort .center div div img{
        width: 100%;
        height: 150px;
    }
    #HomeMain .sort .center div div p{
        font-size: 13px;
    }
    #HomeMain .sort .center div div h6{
        font-weight: 600;
        color: #3e8c96;
    }
    /*右边*/
    #HomeMain .sort .right{
        float: left;
        margin-left: 50px;
        width: 350px;
        height: 100%;
        /*border: 1px solid black;*/
        background-color: white;
    }

    #HomeMain .sort .right li{
        position: relative;
        background-color: #f6f6f6;
        width: 300px;
        margin-left: 25px;
        /*text-align: center;*/
        height: 70px;
        cursor: pointer;
    }
    #HomeMain .sort .right p{
        /*background-color: red;*/
        /*height: 70px;*/
        /*line-height: 70px;*/
        /*width: 100%;*/
        padding-left: 10px;
        color: #b1b3b0;
    }
    #HomeMain .sort .right h6{
        font-size: 25px;
        font-weight: 800;
        color: #f34141;
    }
    #HomeMain .sort .right img{
        width: 50px;
        height: 50px;
        /*background-color: burlywood;*/
        padding-top: 10px;
    }
    #HomeMain .sort .right .horizontal{
        position: absolute;
        right: 0;
        top: 0;
        width: 50px;
        height: 70px;
        font-size: 13px;
        background-color: #f34141;
    }
    #HomeMain .sort .right .horizontal p{
        width: 10px;
        padding-left: 20px;
        color: white;
    }
    #HomeMain .tipDown{

    }
    #HomeMain .sort .left .tipDown h6 {
        /*width: 90px;*/
        /*background-color: yellow;*/
        width: 200px;
        display: inline-block;
    }
</style>