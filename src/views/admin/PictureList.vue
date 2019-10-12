<template>
    <div>
        <el-row class="PictureSearchForm">
            <el-col :span="24">
                <el-form :inline="true">
                    <el-form-item label="学生姓名">
                        <el-input size="mini" v-model="studentName" @change="dialogTableVisible = true"  placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="科目名称">
                        <el-select size="mini" v-model="courseType" placeholder="请选择科目">
                            <el-option label="儿童画" value="eth"></el-option>
                            <el-option label="动漫" value="dm"></el-option>
                            <el-option label="素描" value="sm"></el-option>
                            <el-option label="国画" value="gh"></el-option>
                            <el-option label="硬笔" value="yb"></el-option>
                            <el-option label="软笔" value="rb"></el-option>
                            <el-option label="陶艺" value="ty"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button size="mini" type="primary" @click="onSearch">查询</el-button>
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
                            prop="courseType"
                            label="科目"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="description"
                            label="描述">
                    </el-table-column>
                    <el-table-column  prop="realName"
                                      label="图片">
                        <template slot-scope="scope">
                            <img @click="cardView" :src="scope.row.realName" alt="fileName" style="height: 60px;width: 60px">
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">

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
        <el-dialog title="" :visible.sync="dialogTableVisible">
            <StudentSelect @listenevent="listenevent"></StudentSelect>
        </el-dialog>
        <el-dialog :visible.sync="cardVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>

</template>

<script>
    import {formatDate} from 'element-ui/src/utils/date-util'
    import StudentSelect from "../../components/StudentSelect";
    export default {
        name:"PictureList",
        components: {StudentSelect},
        data() {
            return {
                dialogTableVisible:false,
                cardVisible:false,
                dialogImageUrl:"",
                total:0,
                tableData:[],
                studentName:"",
                studentId:"",
                courseType:"",
                pageSize:5,
                currentPage:1

            }
        },
        methods:{

            cardView(e){
                this.cardVisible=true
                this.dialogImageUrl=e.target.getAttribute("src")
            },
            onSearch(form){
                let params={
                    studentId: this.studentId,courseType: this.courseType
                }
                this.loadData(params)
            },
            currentChange(pageNo){
                let params={
                    pageNo:this.pageNo,pageSize:this.pageSize,studentId: this.studentId,courseType: this.courseType
                }
                this.loadData(params)
            },
            loadData(params){
                let courseMap={ "eth":"儿童画",
                        "dm":"动漫",
                        "sm":"素描",
                        "gh":"国画",
                        "yb":"硬笔",
                        "rb":"软笔",
                        "ty":"陶艺"}
                this.axios.get("/api/smy/controller/ListPicture", {params}).then((response) => {
                    this.tableData = response.data.datas
                    this.total = response.data.total
                   this.tableData.forEach((v,i,ar)=>{
                        ar[i].courseType=courseMap[v.courseType];
                        debugger
                       ar[i].realName="/api/files/"+v.realName

                    })
                }).catch((response) => {

                })
            },
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(row.realName)
                let params={
                    id:row.id,
                    realName:row.realName
                }
                this.axios.delete("/api/smy/controller/DeletePictureById",{params}).then((res)=>{
                    if (res.data.success){
                        this.$message({
                            message: "删除成功",
                            offset: "200",
                        })
                    }
                })
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
            handleAdd(){
                this.$router.push({path:"/pictureForm"})
            },
            listenevent(stu){
                debugger
                this.studentName=stu.studentName;
                    this.studentId=stu.studentId;
                    this.dialogTableVisible=false
            }
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
    .el-form{
        text-align: left;
    }

</style>