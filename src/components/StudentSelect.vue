<template>

    <div>
        <div>
            <el-row>
                <el-col :span="24">
                    <el-form :inline="true"  class="demo-form-inline">
                        <el-form-item label="学生姓名">
                            <el-input size="mini" v-model="studentName" placeholder="请输入"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button size="mini" type="primary" @click="onSubmit">查询</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>

        </div>

        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    prop="studentName"
                    label="姓名"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="phoneNum"
                    label="联系电话"
                    width="180">
            </el-table-column>

            <el-table-column
                    prop="address"
                    label="地址">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleSelect(scope.$index, scope.row)">选择</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div>
            <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="total"
                    :page-size="pageSize"
                    :current-page="currentPage"
                    @current-change="currentChange">
            </el-pagination>
        </div>
    </div>

</template>

<script>
    export default {
        name: "StudentSelect",
        data() {
            return {
                total: 0,//默认数据总数
                currentPage: 1,
                pageSize: 5,
                tableData: [],
                studentName: "",
                phoneNum: ""
            }
        },
        methods: {
            currentChange(pageNo) {
                let params = {   //要么定义为params 传参{params}, 使用其他变量名,传参需{params:其他名}
                    "studentName": this.studentName,
                    "pageNo": pageNo,
                    "pageSize": this.pageSize
                }
                this.loadData(params)
            }, onSubmit() {
                let params = {   //要么定义为params 传参{params}, 使用其他变量名,传参需{params:其他名}
                    "studentName": this.studentName
                }
                this.loadData(params)
            },
            loadData(params) {
                this.axios.get("/api/smy/controller/ListStudent", {params}).then((response) => {
                    this.tableData = response.data.datas
                    this.total = response.data.total
                    console.log(this.total)

                }).catch((response) => {

                })
            },
            handleSelect(index, row) {
                console.log(index, row);
                debugger
                this.$emit("listenevent",{studentName:row.studentName,studentId:row.id})
            }
        },
        created() {
            let params = {}
            this.loadData(params)
        }
    }
</script>
<style scoped>
    .el-form {
        float: left;
    }
</style>