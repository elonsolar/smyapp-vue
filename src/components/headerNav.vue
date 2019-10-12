<template>
    <el-menu :default-active="activeIndex" :router="isRouter" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="/mainPage" open>个人主页</el-menu-item>
        <el-menu-item index="/honor" >我的荣誉榜</el-menu-item>
        <el-submenu index="3">
            <template slot="title">我的故事</template>
            <el-menu-item index="/course/eth" >儿童画</el-menu-item>
            <el-menu-item index="/course/dm">动漫</el-menu-item>
            <el-menu-item index="/course/sm">素描</el-menu-item>
        <el-menu-item index="/course/gh">国画</el-menu-item>
        <el-menu-item index="/course/yb">硬笔</el-menu-item>
        <el-menu-item index="/course/rb">软笔</el-menu-item>
            <el-menu-item index="/course/ty" >陶艺</el-menu-item>

           <!-- <el-submenu index="2-4">
                <template slot="title">选项4</template>
                <el-menu-item index="2-4-1">选项1</el-menu-item>
                <el-menu-item index="2-4-2">选项2</el-menu-item>
                <el-menu-item index="2-4-3">选项3</el-menu-item>
            </el-submenu>-->
        </el-submenu>
       <!-- <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>-->
    </el-menu>
</template>

<script>
    export default {
        name: "headerNav",
        data() {
            return {
                activeIndex: '/selfProfile',
                isRouter:true
            };
        },
        methods: {
            handleSelect(key, keyPath,item) {
               // console.log("key:"+key +"keyPath:"+ keyPath+item);
               // console.log(item.$attrs.courseName)
            /*    console.log(item.$attrs.courseName)
             let   name=item.$attrs.courseName
                this.$router.push({ path: `/course/${name}`})*/
            }
        }
    }
</script>

<style scoped lang="scss">
    .el-menu{
        float:right;
    }
</style>