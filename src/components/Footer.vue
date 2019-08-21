<template>
    <div id="Footer">
        <div v-if="flag">
            假装有大数据做很多推荐
        </div>
        <p>©2019 me 使用我前必读 | 我的协议 | 隐私政策 | 我的合作平台 | 学习网站号 </p>
        <p>京公网安备66666666666666号</p>
    </div>
</template>

<script>
    export default {
        name: "Footer",
        data(){
            return{
                flag:false,
            }
        },
        methods:{

        },
        mounted() {
            //是不是手机端
            if(this.isMobile()){
                this.flag= true;
            }else{
                this.flag= false;
            }
        }
    }
</script>

<style scoped>
 #Footer{
     padding: 50px 0;
     background-color: #808080;
     text-align: left;
 }
 #Footer>div{
     background-color: white;
     height: 1500px;
     line-height: 100px;
     text-align: center;
     font-weight: 700;
     font-size: 30px;
     color: #999999;
     margin-bottom: 50px;
 }
 #Footer p{
     /*margin-top: 50px;*/
     padding-top: 200px;
    text-align: center;
 }
 #Footer p:nth-of-type(2){
     padding-top: 0;
     margin-top: 20px;
 }
</style>