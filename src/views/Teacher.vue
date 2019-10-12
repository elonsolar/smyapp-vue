<template>
    <div class="home">
        <div class="pageLogin">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
                     class="demo-ruleForm">
                <el-form-item label="帐号" prop="pass">
                    <el-input type="text" v-model="ruleForm.account" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="checkPass">
                    <el-input type="text" v-model="ruleForm.password" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>

        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
    import HomeMove from "../components/homeMove";
    import LoginForm from "../components/LoginForm";

    export default {
        name: 'Teacher',
        components: {
            HomeMove,
        },
        methods: {
            getData: function () {
                this.axios.get('/api/a').then((response) => {

                    console.log(data)
                }).catch((response) => {
                    console.log(response)
                })
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let result = false
                        let params = {   //要么定义为params 传参{params}, 使用其他变量名,传参需{params:其他名}
                            "account": this.ruleForm.account, "password": this.ruleForm.password
                        }
                        debugger
                        this.axios.get('/api/smy/controller/LoginTeacher', {params}).then((response) => {

                            result = response.data.success;
                            if (result) {
                                localStorage.setItem("teacher",JSON.stringify(response.data.teacher))
                                localStorage.setItem("userType","teacher")
                                this.$router.push("/admin")
                            } else {
                                this.$message({
                                    message: "请核对帐号和密码",
                                    offset: "200",
                                    type: "error"
                                })
                            }
                        }).catch((response) => {
                            console.log(response)
                        })


                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }

        },
        data() {
            var checkAge = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('年龄不能为空'));
                }
                setTimeout(() => {
                    if (!Number.isInteger(value)) {
                        callback(new Error('请输入数字值'));
                    } else {
                        if (value < 18) {
                            callback(new Error('必须年满18岁'));
                        } else {
                            callback();
                        }
                    }
                }, 1000);
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm: {
                    password: '',
                    account: '',
                },
                rules: {
                    pass: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    checkPass: [
                        {validator: validatePass2, trigger: 'blur'}
                    ],
                    age: [
                        {validator: checkAge, trigger: 'blur'}
                    ]
                }
            };
        }
    }
</script>
<style scoped lang="scss">
    @media screen and (min-width: 800px) {
        .home {
            background-color: rgba(188, 178, 174, 0.09);
            width: 100%;
            height: 610px;
            position: relative;
            background-image: url("../assets/ceramic.jpg");
            background-size: 100% 100%;
        }
    }


    @media screen and (max-width: 800px) {
        .home {
            width: 100%;
            height: 610px;
            position: relative;
            background-size: 100% 100%;
        }
    }

    .pageLogin {
        position: absolute;
        border: 1px solid white;
        background-color: white;
        right: 20px;
        padding-top: 40px;
        padding-right: 20px;
        text-align: center;
        top: 30%;
    }
</style>