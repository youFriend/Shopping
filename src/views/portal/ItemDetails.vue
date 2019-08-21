<template>
    <div id="ItemDetails">
        <div class="breadNav">

            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>{{product.name}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!--上部分-->
        <div class="content1">
            <div>
                <img class="main-img" :src="mainImageUrl" height="350" width="400"/>
                <div>
                    <img
                            v-bind:class="{'red-border': subImageindex == index }"
                            v-for="(item,index) in subImages" :key="index"
                            @mouseenter="subimageEnter(index)"
                            @mouseleave="subImageLeave(index)"
                            :src="item" height="100" width="80"/>
                </div>
            </div>
            <div>
                <h5>{{product.name}}</h5>
                <p>{{product.detail}}</p>
                <div> 价格：<span>{{product.price}}</span></div>
                <p>库存：<span>{{product.stock}}</span></p>
                <div>
                    数量：
                    <el-input-number v-model="count" controls-position="right" @change="handleChange" :min="1"
                                     :max="product.stock"></el-input-number>
                </div>
                <div>
                    <button @click="addCart">加入购物车</button>
                </div>
            </div>
        </div>
        <!--下部分-->
        <div class="tab-list">
            <div>
                <h5>商品详情</h5>
            </div>
            <div class="tab-item">
                <img v-for="(item,index) in subImages" :key="index" :src="item" height="300" width="800"/></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ItemDetails",
        data() {
            return {
                count: 1,
                product: {},
                subImages: [],
                mainImageUrl: "",
                subImageindex: 0,
            }
        },
        methods: {
            handleChange(value) {

            },
            addCart() {
                this.$axios.post("/cart/add.do", this.qs.stringify({
                    count: this.count,
                    productId: this.product.id,
                })).then(response => {
                    //TODO
                    // console.log(response);
                    if (response.data.status == 0) {
                        this.showTip({
                            message: '添加成功',
                            type: 'success',
                            customClass: 'tipClass',
                            duration: 1000,
                        });
                    } else {
                        this.linkTo({name: 'Login'});
                    }

                }).then(response => {

                })
            },
            subimageEnter(index) {
                this.mainImageUrl = this.subImages[index];
                this.subImageindex = index;
            },
            subImageLeave() {

            },
        },
        created() {
            this.product = this.$route.query.product;
            // console.log(this.product.id == null);
            if (this.product.id == null) {
                var id = this.$route.query.id;
                this.$axios.get("/productController/detail.do", {
                    params: {
                        productId: id
                    }
                }).then(response => {

                    if (response.data.status == 0) {
                        this.product = response.data.data;
                        //如果是传递过来的数值
                        var str = this.getSubImages(this.product.subImages);
                        this.subImages = str;
                        this.mainImageUrl = this.getMain(this.product.mainImage);
                    }
                });

            } else {
                //如果是传递过来的数值
                var str = this.getSubImages(this.product.subImages);
                this.subImages = str;
                this.mainImageUrl = this.getMain(this.product.mainImage);
            }

            // this.subImages.unshift(this.getMain(this.product.mainImage));
            // console.log(this.$route.query.product);
            // console.log(str);
        }
    }
</script>

<style>
    #ItemDetails {
        box-sizing: border-box;
        background-color: white;
    }

    /*面包屑导航*/
    #ItemDetails .breadNav {
        height: 30px;
        background-color: #e3e4e5;
        position: relative;
    }

    #ItemDetails .breadNav .el-breadcrumb {
        line-height: 30px;
        padding-left: 10px;
    }

    /*上半区开始*/
    #ItemDetails .content1 {
        height: 500px;
        position: relative;
    }

    #ItemDetails .content1 > div {
        /*background-color: #dc9c91;*/
        width: 400px;
        height: 100%;
        float: left;
    }

    #ItemDetails .content1 > div:nth-of-type(1) img {

        /*box-shadow: 0 0 1px #888888;*/
        width: 90px;
        height: 80px;
        margin-left: 10px;
        margin-top: 5px;
    }

    #ItemDetails .content1 > div:nth-of-type(1) > img:nth-of-type(1) {
        border-bottom: 1px solid #dfdfdf;
    }

    #ItemDetails .content1 > div:nth-of-type(1) img:first-of-type {
        margin-left: 2px;
    }

    #ItemDetails .content1 > div:nth-of-type(1) .main-img {
        width: 400px;
        height: 400px;
        margin: 0;
    }

    #ItemDetails .content1 > div > div .red-border {
        border: 1px solid red;
    }

    /*右面开始*/
    #ItemDetails .content1 > div:nth-of-type(2) {
        width: 800px;
        padding: 10px 20px 0;
        /*background-color: pink;*/
        box-sizing: border-box;
    }

    #ItemDetails .content1 > div:nth-of-type(2) h5 {
        font-size: 24px;
        font-weight: 500;
        width: 100%;
    }

    #ItemDetails .content1 > div:nth-of-type(2) p {
        margin-top: 10px;
        width: 100%;
    }

    #ItemDetails .content1 > div:nth-of-type(2) > div {
        margin-top: 10px;
        height: 50px;

        line-height: 48px;
        box-sizing: border-box;
    }

    #ItemDetails .content1 > div:nth-of-type(2) > div:nth-of-type(1) {
        background-color: #eee;
    }

    #ItemDetails .content1 > div:nth-of-type(2) > div span {
        color: red;
        font-size: 22px;
    }

    /*数量按钮*/
    #ItemDetails .content1 > div:nth-of-type(2) > div .el-input-number {

    }

    #ItemDetails .content1 > div:nth-of-type(2) > div .el-input-number span {
        height: 19px;
        border: 1px solid #dcdfe6;
        border-radius: 0px;
        left: 80px;
        top: 0px;
    }

    #ItemDetails .content1 > div:nth-of-type(2) > div .el-input-number span:nth-of-type(1) {
        top: 19px;
    }

    #ItemDetails .content1 > div:nth-of-type(2) > div .el-input-number input {
        width: 80px;
        border-radius: 0px;
        padding: 0;
    }

    #ItemDetails .content1 > div:nth-of-type(2) > div button {
        border: none;
        height: 50px;
        padding: 0;
        width: 175px;
        background-color: red;
        font-size: 18px;
        font-weight: 600;
        color: white;
        cursor: pointer;
    }

    /*下部分图片*/
    #ItemDetails .tab-list {
        width: 100%;
        height: auto;
        background-color: white;
        text-align: center;
    }

    #ItemDetails .tab-list > div:nth-of-type(1) {
        height: 60px;
        box-sizing: border-box;
        background-color: gainsboro;
        border: 1px solid #c8c8c8;
    }

    #ItemDetails .tab-list > div:nth-of-type(1) h5 {
        width: 150px;
        background-color: red;
        line-height: 58px;
        font-size: 18px;
        height: 100%;
        color: white;
    }

    #ItemDetails .tab-list > div {
        height: auto;
        margin: 0;
        padding: 0;
    }

    #ItemDetails .tab-list > div img {
        margin: 10px 0;
        width: 1000px;
        height: 400px;
    }

    /*添加成为的内容*/

</style>