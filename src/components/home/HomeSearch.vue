<template>
    <div id="HomeSearch">
        <!--顶部搜索栏开始-->
        <div class="classify">
            <ul>
                <li v-bind:class="sortedSelectedClass(0)" @click="sortedSelect(0)">
                    <a href="javaScript:">
                        综合<span class="el-icon-sort-down"></span>
                    </a>
                </li>
                <li v-bind:class="sortedSelectedClass(1)" @click="sortedSelect(1)">
                    <a href="javaScript:">
                        销售 <span class="el-icon-sort-down"></span>
                    </a>
                </li>

                <li v-bind:class="sortedSelectedClass(2)" @click="sortedSelect(2)">
                    价格
                    <p>
                        <span class="el-icon-sort-up " v-bind:class="{noSelectedPrice:isPriceUp}"></span>
                    </p>
                </li>
                <li v-bind:class="sortedSelectedClass(3)" @click="sortedSelect(3)"><a href="javaScript:">
                    价格
                    <p>
                        <span class="el-icon-sort-down " v-bind:class="{noSelectedPrice:isPriceUp}"></span>
                    </p>
                </a>
                </li>
                <!--内部的分类-->
                <li>
                <!--<li v-bind:class="{priceUp:isPriceEnter}" @mouseenter="priceEnter" @mouseleave="priceLeave">-->
                    <!--<input type="text" placeholder="￥" v-model="selectByPrice.less">-->
                    <!--<p>-</p>-->
                    <!--<input type="text" placeholder="￥" v-model="selectByPrice.max">-->
                    <!--<div v-if="isPriceEnter">-->
                        <!--<a href="javascript:;" @click="clearSelectPrice">清空</a>-->
                        <!--<button @click="selectPrice">确定</button>-->
                    <!--</div>-->
                </li>
            </ul>
        </div>
        <!--内容部分结束-->
        <div class="content">
            <div v-for="(item , index) in this.productData.list" :key="index">
                <a v-if="selectByPrice.array[index] == undefined || selectByPrice.array[index] == true"
                   href="javascript:;" @click="productDetails(item.id)">
                    <img :src="getMain(item.mainImage)" alt=""/>
                    <h4>有优惠券打骨折</h4>
                    <h5>￥<span>{{item.price}}</span></h5>
                    <p>{{item.name}}</p>
                    <p>{{item.subtitle}}</p>
                </a>
            </div>
        </div>
        <!--分页功能-->
        <div class="pagination">
            <!--@size-change="handleSizeChange"-->
            <!--:current-page.sync="currentPage3"-->

            <el-pagination
                    @current-change="currentPageChange"
                    :page-size="productData.pageSize"
                    layout="prev, pager, next, jumper"
                    :total="productData.total">
                <!---->
                <!--productData.pages-->
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: "HomeSearch",
        data() {
            return {
                isPriceEnter: false,
                isPriceUp: true,
                sortSelectIndex: 1,
                sortType: {
                    priceUp: "priceUp",
                    comprehensive: "comprehensive",
                    priceDown: "priceDown",
                    sellCount: "sellCount", //销售
                },
                selectByPrice: {
                    less: "",
                    max: "",
                    array: []
                },
                productData: {},
                isCategory: false,
                searchKey: "",
                //
            }
        },
        props: {

        },
        methods: {
            priceEnter: function () {
                this.isPriceEnter = true;
            },
            priceLeave: function () {
                this.isPriceEnter = false;
            },
            sortedSelectedClass: function (i) {
                return {
                    selected: (i === this.sortSelectIndex)
                }
            },
            sortedSelect: function (index) {
                this.sortSelectIndex = index;
                //开始
                // console.log("sort开始")
                this.sortProduct(this.getSortType(index));
            },
            getSortType(index) {
                // console.log("sort开始Type")
                if (index == 0) {
                    return this.sortType.comprehensive;
                } else if (index == 1) {
                    return this.sortType.sellCount;
                } else if (index == 2) {
                    return this.sortType.priceUp;
                } else if (index == 3) {
                    return this.sortType.priceDown;
                }
                return '';
            },
            //逻辑
            //排序
            sortProduct(type) {
                // console.log(this.product);
                if (type == this.sortType.comprehensive) {
                    //TODO
                    //综合排序就是不排序
                } else if (type == this.sortType.sellCount) {
                    //TODO
                    //销售量来排序也是不排序

                } else if (type == this.sortType.priceUp) {
                    this.productData.list.sort(function (p1, p2) {
                        //价格上下来排序
                        return p1.price - p2.price;
                    });
                    // console.log("价格上");
                } else if (type == this.sortType.priceDown) {
                    this.productData.list.sort(function (p1, p2) {
                        return p2.price - p1.price;
                    });
                    // console.log("价格下");
                }
                // console.log("排序结束");
            },
            clearSelectPrice() {
                this.selectByPrice.less = '';
                this.selectByPrice.max = '';

            },
            // 选择最大的内容
            selectPrice() {
                if (!this.isLeagal(this.selectByPrice.less))
                    return;
                if (!this.isLeagal(this.selectByPrice.max))
                    return;
                //

                //去除多余的
                this.selectByPrice.array = new Array(this.productData.list.length);
                // console.log( this.selectByPrice.array);
                for (var i = 0; i < this.productData.list.length; i++) {
                    // console.log(typeof  item.unShow);
                    this.selectByPrice.array[i] = false;
                    var item = this.productData.list[i];
                    if (item.price >= this.selectByPrice.less && item.price <= this.selectByPrice.max) {
                        this.selectByPrice.array[i] = true;
                    }
                }
                // console.log(""+this.selectByPrice.less+" "+this.selectByPrice.max);
            },

            //分页功能页数改变
            currentPageChange(num) {


                console.log(num);
                //
                if (this.isCategory) {
                    this.$axios.get("/productController/getList.do",
                        {
                            params: {
                                categoryId: this.productData.list[0].categoryId,
                                pageNumber: num,
                                pageSize: 8
                            }
                        }
                    ).then(response => {
                        if (response.data.status == 1)
                            return;
                        this.productData = response.data.data;
                        //response.data.data.list
                        // console.log( this.productData);
                        //this.$router.
                        // location.reload();
                    }).catch(response => {
                        console.log(response);
                    });
                } else {
                    this.$axios.get("/productController/search.do", {
                        params: {
                            keyword: this.searchKey,
                            pageSize: 8,
                            pageNumber: num,
                        }
                    }).then(response => {
                        //
                        if (response.data.status == 1)
                            return;
                        this.productData = response.data.data;
                        //
                        console.log( this.productData) ;
                    });

                }

            },
        },
        created() {
            // console.log(this.product);
            //
            //  console.log(this.productData);

        },
        mounted() {
            // this.productData = this.productDataParams.productData;
            // this.searchKey = this.productDataParams.searchKey;
            // this.isCategory = this.productDataParams.isCategory;
        }

    }

</script>

<style>
    #HomeSearch {
        margin-top: 20px;
    }

    #HomeSearch .classify {
        /*height: 40px;*/
        background-color: #f1f1f1;
        border-top: 1px solid #cccccc;
        border-bottom: 1px solid #cccccc;
        padding: 0;
    }

    #HomeSearch .classify li {
        display: inline-block;
        margin: 5px 0 5px 0;
        width: 100px;
        height: 30px;
        background-color: white;
        text-align: center;
        border: 1px solid #CCC;
        line-height: 30px;
        box-sizing: border-box;

    }

    #HomeSearch .classify li span {
        /*background-color: yellow;*/
        padding-left: 10px;
    }

    #HomeSearch .classify li p {
        display: inline-block;
        padding-left: 0;
        /*background-color: yellow;*/
    }

    #HomeSearch .classify li p span {
        padding-left: 0;
    }

    #HomeSearch .classify li p .noSelectedPrice {
        color: #c6c9c3;
    }

    #HomeSearch .classify .selected {
        background-color: #e4393c;
    }

    #HomeSearch .classify .selected a {
        color: white;
    }

    #HomeSearch .classify li:hover {
        border: 1px solid #e4393c;
        color: #e4393c;
    }

    #HomeSearch .classify li:last-child {
        z-index: 10;
        /*box-sizing: border-box;*/
        position: absolute;
        border: 1px solid rgba(0, 0, 0, 0);;
        margin: 0 0 0 20px;
        padding: 5px 0 0 0;
        width: 180px;
        height: 0;
        font-size: 14px;
        background-color: #f1f1f1;
    }

    #HomeSearch .classify li:last-child.priceUp {
        border: 1px solid #999999;
        background-color: white;
        height: 90px;
        font-size: 14px;
        padding: 5px 10px;
        box-shadow: 1px 1px 5px #c6c9c3;
    }

    #HomeSearch .classify li:last-child input, #HomeSearch .classify li:last-child p {
        display: inline-block;
        width: 50px;
        height: 30px;
        box-sizing: border-box;

    }

    #HomeSearch .classify li:last-child div {
        margin-top: 7px;
        box-sizing: border-box;
    }

    #HomeSearch .classify li:last-child a {
        float: left;
        margin-left: 5px;
    }

    #HomeSearch .classify li:last-child button {
        height: 30px;
        background-color: white;
        border: 1px solid grey;
        float: right;
        margin-right: 5px;
    }

    /*商品列表开始*/
    #HomeSearch .content {
        /*margin-top: 10px;*/
        height: auto;
        width: 100%;
        position: relative;
        overflow: hidden;
        /*background-color: gold;*/
    }

    #HomeSearch .content > div {
        position: relative;
        background-color: white;
        width: 285px;
        height: 320px;
        box-sizing: border-box;
        display: inline-block;
        margin: 20px 0 0 20px;
        text-align: center;
        padding: 10px 10px;
        border: 1px solid rgba(0, 0, 0, 0);
    }

    #HomeSearch .content > div:hover {
        border: 1px solid #e2e2e2;
    }

    #HomeSearch .content > div:nth-of-type(4n+1) {
        margin-left: 0;
    }

    #HomeSearch .content > div img {
        width: 260px;
        height: 220px;
    }

    #HomeSearch .content > div h4 {
        background-image: url("../../assets/label.png");
        background-size: 285px 42px;
        color: white;
        width: 285px;
        height: 42px;
        font-weight: 700;
        line-height: 42px;
        font-size: 14px;
        position: absolute;
        top: 188px;
        left: 0;
        padding-top: 10px;
        box-sizing: border-box;

    }

    #HomeSearch .content > div h5 {
        margin-top: 5px;
        line-height: 20px;
        font-size: 20px;
        font-weight: 400;
        color: #e4393c;
        text-align: left;
        height: 20px;
    }

    #HomeSearch .content > div p {
        text-align: left;
        font-size: 14px;
        margin-top: 5px;
        line-height: 14px;
        height: 14px;
    }

    /*分页功能*/
    #HomeSearch .pagination {
        margin-top: 10px;
        position: relative;
        height: 44px;
    }

    #HomeSearch .pagination .el-pagination {
        position: absolute;
        right: 0;
        /*font-size: 16px;*/
    }

    #HomeSearch .pagination .el-pagination button, #HomeSearch .pagination .el-pagination input, #HomeSearch .pagination .el-pager li {
        height: 40px;
        width: 40px;
        line-height: 40px;
        font-size: 14px;
    }

    #HomeSearch .pagination .el-pager {
        height: 40px;

    }
</style>