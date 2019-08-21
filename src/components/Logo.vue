<template>
    <div id="Logo">
        <router-link to="/Home">
            <img src="../assets/logo.png" />
        </router-link>

    </div>
</template>

<script>
    export default {
        name: "Logo",
        methods:{
        }
    }

</script>

<style scoped>
    #Logo{
        position: absolute;
    }
    #Logo img{
        width: 100px;
        height: 100px;

    }
</style>