<template>
    <div id="app">
        <div class="body1">
            <router-view></router-view>

        </div>
        <Footer class="body1 footer"></Footer>
    </div>
</template>
<script>
    import Footer from './components/Footer'

    export default {
        components: {
            "Footer": Footer
        },
        created() {
            //this.$router.push({name: "Home"})
        }

    }
</script>
<style>
    #app {

    }

    #app .body1 {
        width: 1200px;
        /*height: 500px;*/
        height: auto;
        background-color: #f0f3ef;
        /*background-color: yellow;*/
        margin: 0 auto;
    }

    #app .footer {
        /*background-color: yellow;*/
        margin-top: 10px;
        height: auto;
    }



</style>
