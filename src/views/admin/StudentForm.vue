<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="学生姓名">
                <el-input v-model="form.studentName"></el-input>
            </el-form-item>
            <el-form-item label="联系电话">
                <el-input v-model="form.phoneNum"></el-input>
            </el-form-item>
            <el-form-item label="生日">

                    <el-date-picker type="date" placeholder="选择日期" v-model="form.birthDay"
                                    style="width: 100%;"></el-date-picker>

            </el-form-item>

            <el-form-item label="地址">
                <el-input type="textarea" v-model="form.address"></el-input>
            </el-form-item>
            <el-form-item label="座右铭">
                <el-input type="textarea" v-model="form.motto"></el-input>
            </el-form-item>
            <el-form-item label="理想">
                <el-input type="textarea" v-model="form.ideal"></el-input>
            </el-form-item>
            <el-form-item label="最崇拜的人">
                <el-input v-model="form.heroMan"></el-input>
            </el-form-item>
            <el-form-item label="最喜欢的人">
                <el-input v-model="form.favoritePerson"></el-input>
            </el-form-item>
            <el-form-item label="最喜欢的颜色">
                <el-input v-model="form.favoriteColor"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">{{addOrUpdate}}</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import {formatDate} from 'element-ui/src/utils/date-util'

    export default {
        name: "StudentForm",
        data() {
            return {
                addOrUpdate:"",
                id: "",
                form: {
                    studentName: '',
                    phoneNum: '',
                    address: '',
                    motto: '',
                    ideal: '',
                    heroMan: '',
                    favoritePerson: '',
                    favoriteColor: '',
                    birthDay: ''
                }
            }
        },
        methods: {
            onSubmit() {
                const wfForm = new FormData();
                for (let x in this.form) {
                    if (x == "birthDay") {
                        wfForm.append(x, formatDate(this.form[x], "yyyy-MM-dd"))
                        console.log(formatDate(this.form[x], "yyyy-MM-dd"))
                    } else {
                        wfForm.append(x, this.form[x])
                    }
                }
                if (this.id) {
                    wfForm.append("id",this.id)
                    this.axios.post("/api/smy/controller/UpdateStudent", wfForm).then(res => {
                        debugger
                        if (res.data.success) {
                            this.$router.push({path: "/admin"})
                        }else{
                            this.$message({
                                message: "修改失败",
                                offset: "200",
                                type: "error"
                            })
                        }
                    }).catch(res => {
                        console.log(res)
                    })
                } else {
                    this.axios.post("/api/smy/controller/AddStudent", wfForm).then(res => {
                        if (res.data.success) {
                            this.$router.push({path: "/admin"})
                        }
                    }).catch(res => {
                        console.log(res)
                    })
                }
            },
            loadFormData: function (id) {
                let params = {
                    id: id
                }
                this.axios.get("/api/smy/controller/GetStudentById", {params}).then((res) => {
                    debugger
                    let stu = res.data
                    //this.form=stu
                    for (let key in stu) {
                        this.form[key] = stu[key]
                    }
                    console.log(this.form)
                }).catch((res) => {
                    console.log(res)
                })
            }
        },
        created: function () {
            let id = this.$route.params.id
            if (id !="add"){
                this.addOrUpdate="修改"
                this.id=id
                this.loadFormData(this.$route.params.id)
            }else{
                this.addOrUpdate="添加"
            }

        }
        ,
        watch: {
            $route() {
                this.id = this.$router.params.id

            },
            id(n, o) {
                this.loadFormData(n)
            }
        }
    }
</script>