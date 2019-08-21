<template>
    <div id="PaySuccess">
        <div>
            <img src="../../assets/zhifubao.jpg" height="313" width="500"/>
            <h5>支付成功</h5>
            <router-link to="/Home">返回主页面>></router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PaySuccess"
    }
</script>

<style scoped>
    #PaySuccess{

    }
    #PaySuccess div{
        width: 600px;
        height: 650px;
        margin: 0 auto;
        background-color: #ffffff;
        text-align: center;
    }

    #PaySuccess div h5{
        font-size: 40px;
        font-weight: 600;
        margin-top: 20px;
        color: #01aaef;
        /*background-color: gainsboro;*/
    }
    #PaySuccess div a{
        /*background-color: yellow;*/
        display: inline-block;
        margin-top: 30px;
        font-size: 30px;
    }

</style>