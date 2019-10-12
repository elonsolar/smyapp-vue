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
                            <el-button
                                    size="mini"
                                    type="primary"
                                    @click="handleAdd">添加</el-button>


                        </el-form-item>
                        <el-form-item>
                            <el-upload
                                            ref="upload"
                                            action="/"
                                            :show-file-list="false"
                                            :on-change="importExcel"
                                            :auto-upload="false">
                                        <el-button
                                              slot="trigger"
                                              icon="el-icon-upload"
                                              size="mini"
                                              type="primary">
                                          导入
                                        </el-button>
                                    </el-upload>
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
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
    import XLSX from 'xlsx'
    export default {
        name: "StudentList",
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
            handleEdit(index, row) {
                console.log(index, row);
                debugger
                this.$router.push({path:"/studentForm/"+row.id})
            },
            handleDelete(index, row) {
                console.log(index, row);
                this.$confirm('确认删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let params={
                        id:row.id,
                    }
                    this.axios.delete("/api/smy/controller/DeleteStudentById",{params}).then((res)=>{
                        if (res.data.success){
                            this.$message({
                                message: "修改成功",
                                offset: "200",
                            })
                        }
                        let params = {   //要么定义为params 传参{params}, 使用其他变量名,传参需{params:其他名}
                            "studentName": this.studentName
                        }
                        this.loadData(params)
                    }).catch((res)=>{

                    })

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
            handleAdd(){
                this.$router.push({path:"/studentForm/add"})
            },
            handleimport(){
                this.$refs.fileInput.$emit("click")
            }
            ,
            importExcel(file) {
                // let file = file.files[0] // 使用传统的input方法需要加上这一步
                const types = file.name.split('.')[1]
                const fileType = ['xlsx', 'xlc', 'xlm', 'xls', 'xlt', 'xlw', 'csv'].some(item => item === types)
                if (!fileType) {
                    this.$message('格式错误！请重新选择')
                    return
                }
                this.file2Xce(file).then(tabJson => {
                    if (tabJson && tabJson.length > 0) {
                        this.xlsxJson = tabJson
                        let stus=tabJson[0].sheet;
                        let data=[]
                        for (let st in stus) {
                            data.push({studentName:stus[st].学员姓名 ,phoneNum:stus[st].联系电话,birthDay:stus[st].学员生日})
                        }
                        let ds=JSON.stringify(data)
                        const wfForm = new FormData();
                        wfForm.append("students",ds)

                        this.axios.post("/api/smy/controller/BatchAddStudent",wfForm).then((res)=>{
                            this.$message({
                                message: res.data,
                                offset: "200",

                            })
                        }).catch((res)=>{

                        })
                       // console.log('数据', this.xlsxJson)
                        // xlsxJson就是解析出来的json数据,数据格式如下
                        // [
                        //   {
                        //     sheetName: sheet1
                        //     sheet: sheetData
                        //   }
                        // ]
                    }
                })
            },
            file2Xce(file) {
                return new Promise(function(resolve, reject) {
                    const reader = new FileReader()
                    reader.onload = function(e) {
                        const data = e.target.result
                        this.wb = XLSX.read(data, {
                            type: 'binary'
                        })
                        const result = []
                        this.wb.SheetNames.forEach((sheetName) => {
                            result.push({
                                sheetName: sheetName,
                                sheet: XLSX.utils.sheet_to_json(this.wb.Sheets[sheetName])
                            })
                        })
                        resolve(result)
                    }
                    reader.readAsBinaryString(file.raw)
                    // reader.readAsBinaryString(file) // 传统input方法
                })
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