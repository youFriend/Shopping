export default {

    install(Vue, pluginOptions = {}) {
        //
        Vue.prototype.showTip = function (data1) {
            var defaultData = {
                center: true,
                duration: 3000,
            }
            //合并对象
            Object.assign(defaultData, data1);
            //全局函数1
            this.$message(defaultData);

        };
        Vue.prototype.showTipError = function (data1) {
            //既有默认 又有 自定义
            var defaultData = {
                center: true,
                duration: 1000
            }
            Object.assign(defaultData, data1);
            this.$message.error(defaultData);
        };
        // 检查是否合法
        Vue.prototype.isLeagal = function (data1) {
            if (data1 == null) {
                return false;
            }
            if (data1 == undefined) {
                return false;
            }
            if (data1.trim() == "") {
                return false;
            }
            return true;
        }

        /**
         *
         * @param params {
         *     data: , prop , less ,max
         * }
         */
        Vue.prototype.filterMy = function (params) {

            return params.data;
        }
        /**
         * 得到Main 图片
         */
        Vue.prototype.getMain = function (str) {
            if (str == null)
                return "";
            if (str.indexOf(";") == -1)
                return;
            return str.split(";")[1];
        }
        /**
         * 得到子图片
         *
         * */
        Vue.prototype.getSubImages = function (str) {
            if (str == null)
                return "";
            if (str.indexOf(";") == -1)
                return;
            return str.split(";").filter(item => {
                return item.trim() != "";
            });
        }
        /*
        * 检查是否登录
        * */
        Vue.prototype.getAxios = function () {
            return this.$axios;
        }

        /**
         * 得到商品的详情
         */
        Vue.prototype.productDetails = function (id) {
            //
            this.$axios.get("/productController/detail.do", {
                params: {
                    productId: id
                }
            }).then(response => {
                if (response.data.status == 0) {
                    //
                    this.$router.push({
                        name: "ItemDetails",
                        query: {
                            product: response.data.data,
                            id: id,
                        }
                    });
                }
            })

        },
            //判断是否是手机登录
            Vue.prototype.isMobile = function () {
                //App.vue
                let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
                return flag;
            }


    }
}
