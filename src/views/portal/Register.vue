<template>
    <div id="Register">
        <div class="breadNav">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/Login' }">登录</el-breadcrumb-item>
                <el-breadcrumb-item>注册</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!-- 直接上内容 -->
        <div class="content">
            <div>
                <h5>注册</h5>
                <p v-if="usernameUsed != null" class="tip">该用户名已经注册</p>
                <input type="text" name="username" placeholder="用户名" v-model="username">
                <input type="password" name="password" placeholder="密码" v-model="password">
                <p v-if="emailUsed != null" class="tip tip-email">该用邮箱已经注册</p>
                <input type="text" name="password" placeholder="邮箱" v-model="email">
                <div class="correctCode">
                    <!--<input type="password" name="password" placeholder="验证码" v-model="checkCode">-->
                    <!--<button>发送验证</button>-->
                </div>
                <button @click="register">立即注册</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Register",
        data() {
            return {
                username: "",
                password: "",
                email: "",
                checkCode: "", //验证码
                usernameUsed: undefined,
                emailUsed: undefined,

            }
        },
        methods: {
            register() {
                this.$axios.post("/user/register.do",
                    this.qs.stringify({
                        username: this.username,
                        password: this.password,
                        email: this.email,
                        checkCode: this.checkCode,
                    })
                ).then((response) => {
                    // console.log(response);
                    //vue 内部跳转
                   if(response.data.status == 0){
                       // console.log(response);
                       //注册成功，然后进行登录
                       this.$axios.post("/user/login.do",
                           this.qs.stringify({
                               username: this.username,
                               password: this.password,
                           })
                       ).then((response) => {
                           //vue 内部跳转
                           if(response.data.status == 0){
                               // console.log("deng");
                               this.$router.push({name:"Home"});
                               this.constant.userInfo = response.data.data;
                               this.showTip({
                                   message: '欢迎您 '+ this.constant.userInfo.username+ '。 本网站为学习网站，' +
                                       '不会产生真实数据，实属只看不买的好网站',
                                   type:'success',
                                   customClass:'tipClass',
                               })
                           }else {
                               this.errorTip.isShow = true;
                               this.errorTip.responseMsg = response.data.msg;

                           }
                       }).catch((response) =>{
                           //服务器
                           // this.showTipError("网络开小差");
                       })
                   }
                }).catch((response) =>{
                    //服务器
                    // this.showTipError("网络开小差");
                })
            }
        },
        watch: {
            username(oldVal, newVal) {
                this.$axios.post("/user/checkUsernameOrEmailLegal.do",
                this.qs.stringify({
                    str:oldVal,
                    type:"username" //"email"
                })).then(response =>{
                    this.usernameUsed = response.data.msg;
                  //  console.log(response.data.msg);
                }).catch(response =>{

                })
            },
            email(oldVal, newVal) {
                this.$axios.post("/user/checkUsernameOrEmailLegal.do",
                    this.qs.stringify({
                        str:oldVal,
                        type:"email" //"email"
                    })).then(response =>{
                    this.emailUsed = response.data.msg;
                   // console.log(response.data.msg);
                }).catch(response =>{

                })
            }
            ,
        }
    }
</script>

<style scoped>
    #Register {
        /*padding-top: 100px;*/
    }

    /*面包屑导航*/
    #Register .breadNav {
        height: 30px;
        /*background-color: #e3e4e5;*/
        position: relative;
    }

    #Register .breadNav .el-breadcrumb {
        line-height: 30px;
        padding-left: 10px;
    }

    /*内容开始*/
    #Register .content {
        /*margin-top: 100px;*/
        height: 500px;
        background-color: #e4393c;
        /* width:100%; */
        position: relative;
        text-align: center;
    }

    /*提示的文字*/
    #Register .content .tip {
        position: absolute;
        z-index: 200;
        border-radius: 10px;
        display: block;
        height: 20px;
        border: 1px solid #faccc6;
        color: #e4393c;
        background-color: #ffebeb;
        font-size: 5px;
        width: 100px;
        top: 58px;
        left: 175px;
        box-sizing: border-box;
    }

    #Register .content .tip-email {
        top: 158px;

    }

    #Register .content > div {
        background-color: white;
        width: 300px;
        height: 350px;
        right: 80px;
        top: 75px;
        position: absolute;

    }

    #Register .content div h5 {
        font-size: 25px;
        line-height: 25px;
        box-sizing: border-box;
        padding-top: 15px;
        margin: 0;
    }

    #Register .content div input, #Register .content div button {
        /* margin:20px 0 0 25px; */
        margin-top: 20px;
        width: 250px;
        height: 29px;
        box-sizing: border-box;
    }

    #Register .content div input:nth-of-type(1) {
        margin-top: 30px;
    }

    #Register .content > div > div {
        padding-top: 10px;
        width: 250px;
        box-sizing: border-box;
        display: inline-block;
        text-align: right;
    }

    #Register .content div button {
        border: none;
        background-color: #e4393c;
        font-size: 18px;
        color: white;
        cursor: pointer;
    }

    /*最后修复的bug*/
    #Register .content > div .correctCode {
        padding-top: 20px;
        margin: 0;
        /*background-color: yellow;*/
        /*height: 50px;*/


    }

    #Register .content > div .correctCode input {
        width: 150px;
        display: inline-block;
        box-sizing: border-box;

        margin: 0;
        /*float: left;*/
    }

    #Register .content > div .correctCode button {
        width: 100px;
        height: 30px;
        /*border: 1px solid #e4393c;*/
        margin: 0;
        box-sizing: border-box;
        padding: 0;
        line-height: 30px;
        /*background-color: gainsboro;*/
    }
</style>