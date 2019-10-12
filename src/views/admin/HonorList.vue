<template>
    <div>
        <el-row class="honorSearchForm">
                <el-col :span="24">
                    <el-form :inline="true">
                        <el-form-item label="学生姓名">
                          <el-input size="mini" v-model="studentName"  placeholder="请输入"></el-input>
                        </el-form-item>
                        <el-form-item label="荣誉名称">
                            <el-input size="mini" v-model="honorName" placeholder="请输入"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button size="mini" type="primary" @click="onSubmit">查询</el-button>
                            <el-button
                                    size="mini"
                                    type="primary"
                                    @click="handleAdd">添加</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>

        </el-row>
        <el-row>
            <el-col :span="24">
                <el-table
                        :data="tableData"
                        style="width: 100%">
                    <el-table-column
                            prop="studentName"
                            label="学生姓名"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="honorName"
                            label="荣誉名称"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="acquisitionTime"
                            label="获得时间">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>

                        </template>
                    </el-table-column>
                </el-table>

                <el-pagination
                        background
                        layout="prev, pager, next"
                        :total="total"
                        :page-size="pageSize"
                        :current-page="currentPage"
                        @current-change="currentChange">
                </el-pagination>
            </el-col>
        </el-row>
    </div>

</template>

<script>
    import {formatDate} from 'element-ui/src/utils/date-util'
    export default {
        name:"HonorList",
        data() {
            return {
                total:0,
                tableData:[],
                studentName:"",
                honorName:"",
                pageSize:5,
                currentPage:1
            }
        },
        methods:{
            onSubmit(form){
                let params={
                   studentName: this.studentName,honorName: this.honorName
                }
                this.loadData(params)
            },
            currentChange(pageNo){
                let params={
                    pageNo:this.pageNo,pageSize:this.pageSize,studentName: this.studentName,honorName: this.honorName
                }
                this.loadData(params)
            },
            loadData(params){
                this.axios.get("/api/smy/controller/ListHonor", {params}).then((response) => {
                    this.tableData = response.data.datas
                    this.total = response.data.total
                    this.tableData.forEach((v,i,ar)=>{
                        ar[i].acquisitionTime=formatDate(  ar[i].acquisitionTime, "yyyy-MM-dd")
                    })
                }).catch((response) => {

                })
            },
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
                this.$confirm('确认删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            handleAdd(){}
        },
        filters:{
            format:function(time) {
               return formatDate(time, "yyyy-MM-dd")
            }
        },
        created() {
            debugger
            this.loadData({})
        }
    }
</script>
<style scoped lang="scss">
    .honorSearchForm{
        text-align: left;
    }
</style>