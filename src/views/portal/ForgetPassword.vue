<template>
    <div id="ForgetPassword">
        <div class="breadNav">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/Login' }">登录</el-breadcrumb-item>
                <el-breadcrumb-item>忘记密码</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!-- 直接上内容 -->
        <div class="content">
            <div>
                <h5>忘记密码</h5>
                <input type="password" name="password" placeholder="邮箱">
                <div class="correctCode">
                    <input type="password" name="password" placeholder="验证码(前台暂未完善)">
                    <button>发送验证</button>
                </div>
                <input type="text" name="username" placeholder="新密码">
                <input type="password" name="password" placeholder="确认密码">

                <router-link to="/ForgetPassword">
                        <button>立即修改</button>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ForgetPassword"
    }
</script>

<style scoped>
    #ForgetPassword{
        /*padding-top: 100px;*/
    }
    /*面包屑导航*/
    #ForgetPassword .breadNav{
        height: 30px;
        /*background-color: #e3e4e5;*/
        position: relative;
    }
    #ForgetPassword .breadNav .el-breadcrumb{
        line-height: 30px;
        padding-left: 10px;
    }
    /*内容开始*/
    #ForgetPassword .content{
        /*margin-top: 100px;*/
        height:500px;
        background-color: #e4393c;
        /* width:100%; */
        position: relative;
        text-align: center;
    }
    #ForgetPassword .content>div{
        background-color: white;
        width: 300px;
        height: 350px;
        right: 80px;
        top: 75px;
        position: absolute;

    }
    #ForgetPassword .content div h5{
        font-size: 25px;
        line-height: 25px;
        box-sizing: border-box;
        padding-top: 15px;
        margin: 0;
    }
    #ForgetPassword .content div input, #ForgetPassword .content div button{
        /* margin:20px 0 0 25px; */
        margin-top: 20px;
        width: 250px;
        height: 29px;
        box-sizing: border-box;
    }
    #ForgetPassword .content div input:nth-of-type(1){
        margin-top: 30px;
    }
    #ForgetPassword .content>div>div{
        padding-top: 10px;
        width: 250px;
        box-sizing: border-box;
        display: inline-block;
        text-align: right;
    }
    #ForgetPassword .content div button{
        border: none;
        background-color: #e4393c;
        font-size: 18px;
        color:white;
        cursor: pointer;
    }
    /*最后修复的bug*/
    #ForgetPassword .content>div .correctCode{
        padding-top: 20px;
        margin: 0;
        /*background-color: yellow;*/
        /*height: 50px;*/


    }
    #ForgetPassword .content>div .correctCode input{
        width: 150px;
        display: inline-block;
        box-sizing: border-box;

        margin: 0;
        /*float: left;*/
    }
    #ForgetPassword .content>div .correctCode button{
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