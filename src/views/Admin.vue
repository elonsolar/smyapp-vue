<template>
    <div>
        <el-row class="test">
            <el-col :span="24">
                水沐鋆后台管理
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
                <div class="grid-content bg-purple">

                    <h5>后台管理</h5>
                    <el-menu :router="router"
                             default-active="2"
                             class="el-menu-vertical-demo"
                             @open="handleOpen"
                             @close="handleClose"
                             background-color="">
                        <el-submenu index="1">
                            <template slot="title">
                                <i class="el-icon-user-solid"></i>
                                <span>学生管理</span>
                            </template>
                            <el-menu-item index="/admin"><i class="el-icon-user"></i>基本信息</el-menu-item>
                            <el-menu-item index="/honorList"><i class="el-icon-medal"></i>获得荣誉</el-menu-item>
                            <el-menu-item index="/pictureList"><i class="el-icon-camera"></i>图片档案</el-menu-item>
                        </el-submenu>
                        <el-submenu index="2">
                            <template slot="title">
                                <i class="el-icon-s-data"></i>
                                <span slot="title">数据分析</span>
                            </template>
                            <el-menu-item><i class="el-icon-user"></i>学科分析</el-menu-item>
                            <el-menu-item><i class="el-icon-s-check"></i>老师分析</el-menu-item>
                            <el-menu-item><i class="el-icon-money"></i>收入分析</el-menu-item>
                        </el-submenu>
                    </el-menu>

                </div>
            </el-col>
            <el-col :span="16">
                <div class="grid-content ">
                    <router-view></router-view>

                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "Admin",
        data() {
            return {
                router: true
            }
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style scoped lang="scss">
    .el-row {
        margin-bottom: 20px;

        &:last-child {
            margin-bottom: 0;
        }
    }

    .el-col {
        border-radius: 4px;
    }

    .bg-purple-dark {
        background: #99a9bf;
    }

    .bg-purple {
        background: white;
    }

    .bg-purple-light {
        background: white;
    }

    .grid-content {
        border-radius: 4px;
        min-height: 36px;
        height: 610px;
    }

    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
    .test{
        height: 40px;
    }
</style>