<template>
    <div class="mainPage">
        <div class="main-top">
            <header-nav></header-nav>
        </div>
        <div class="main-middle">
            <router-view></router-view>
        </div>

    </div>
</template>

<script>
    import HeaderNav from "../components/headerNav";

    export default {
        name: "MainPage",
        components: {HeaderNav}
    }
</script>

<style scoped>
    .main-top {
        height: 60px;
    }

    .main-middle {
        height: 550px;
        text-align: left;
    }

</style>