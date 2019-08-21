<template>
    <div id="Login">
        <div class="breadNav">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>登录</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!-- 直接上内容 -->
        <div class="content">

            <div>
                <h5>登陆</h5>
                <form @submit.prevent="login">
                    <p class="error-tip" v-if="errorTip.isShow">{{errorTip.responseMsg}}</p>
                    <input type="text" v-model="userInfo.username" placeholder="用户名">
                    <input type="password" v-model="userInfo.password" placeholder="密码">
                    <input type="submit" value="登录"/>
                </form>
                <div>
                    <router-link to="/ForgetPassword">忘记密码?</router-link>
                    <router-link to="/Register">立即注册>></router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data: function () {
            return {
                userInfo: {
                    username: "",
                    password: "",
                },
                errorTip :{
                    responseMsg:"",
                    isShow:false
                }
            }
        },
        methods: {
            login() {
                // "/api/user/login.do",
                this.$axios.post("/user/login.do",
                    this.qs.stringify(this.userInfo)
                ).then((response) => {
                    //vue 内部跳转
                    if(response.data.status == 0){
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


        }

    }
</script>

<style>
    #Login {
        /*padding-top: 100px;*/
    }

    /*面包屑导航*/
    #Login .breadNav {
        height: 30px;
        /*background-color: #e3e4e5;*/
        position: relative;
    }

    #Login .breadNav .el-breadcrumb {
        line-height: 30px;
        padding-left: 10px;
    }

    /*内容*/
    #Login .content {
        /*margin-top: 100px;*/
        height: 500px;
        background-color: #e4393c;
        /* width:100%; */
        position: relative;
        text-align: center;
    }

    #Login .content > div {
        background-color: white;
        width: 300px;
        height: 300px;
        right: 80px;
        top: 75px;
        position: absolute;

    }

    #Login .content div h5 {
        font-size: 25px;
        line-height: 25px;
        box-sizing: border-box;
        padding-top: 30px;
        margin: 0;
        margin-bottom: 20px;
    }

    #Login .content div input, .content div [type="submit"] {
        /* margin:20px 0 0 25px; */
        margin-top: 20px;
        width: 250px;
        height: 30px;
        box-sizing: border-box;
    }

    #Login .content div input:nth-of-type(1) {
        margin-top: 30px;
    }

    #Login .content > div > div {
        padding-top: 10px;
        width: 250px;
        box-sizing: border-box;
        display: inline-block;
        text-align: right;
    }

    #Login .content > div > div a {
        margin-left: 15px;
    }

    #Login .content div [type="submit"] {
        border: none;
        background-color: #e4393c;
        font-size: 18px;
        color: white;
        cursor: pointer;
    }
    /*错误的提示*/
    #Login .content form {
        position: relative;
    }
    #Login .error-tip{
        position: absolute;
        display: block;
        height: 20px;
        border : 1px solid #faccc6;
        color: #e4393c;
        background-color: #ffebeb;
        font-size: 5px;
        width: 250px;
        top: 2px;
        left: 25px;
        box-sizing: border-box;
    }
    /*设置所有的提示格式*/
    .tipClass{
        padding: 10px;
        min-width: 1200px;
        border-radius: 0px;
    }
</style>