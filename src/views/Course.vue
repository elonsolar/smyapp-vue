<template>
    <div class="course">
        <el-tag>{{courseName}}</el-tag>
        <div>
            <el-collapse v-model="activeName" accordion @change="onChange">
                <el-collapse-item v-for="td  in currentTimeData" :title="td.timeLine" :name="td.timeLine">
                    <div class="block" v-for="pic in currentPictureData" :key="pic.url">
                        <!-- <span class="demonstration">{{ fit }}</span>-->
                        <el-image
                                style="width: 100px; height: 100px"
                                :src="pic.url"
                                :alt="pic.desc"
                                :preview-src-list="[pic.url]"
                        ></el-image>
                    </div>
                </el-collapse-item>

            </el-collapse>
        </div>
        <el-dialog :visible.sync="cardVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>

<script>


    export default {
        name: "Course",
        data() {
            return {
                cardVisible:false,
                dialogImageUrl:'',
                activeName: '',
                courseName: '',
                studentId: '',
                currentTimeData:['2018-01','2019-08'],
                currentPictureData:[],
                courseType:'',
                nameMap: {
                    "eth": "儿童画",
                    "dm": "动漫",
                    "sm": "素描",
                    "gh": "国画",
                    "yb": "硬笔",
                    "rb": "软笔",
                    "ty": "陶艺"
                },
                fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
                url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            }
        },
        created() {
            debugger
            this.courseName = this.nameMap[this.$route.params.courseName]
            this.courseType=this.$route.params.courseName
            this.studentId = JSON.parse(localStorage.getItem("student")).id

        },
        watch: {
            $route() {
                debugger
                this.courseName = this.nameMap[this.$route.params.courseName]
            },
            courseName:function() {
                this.currentPictureData=[]
                this.loadTimeLins(this.studentId,this.$route.params.courseName)
               /* let params={
                    studentId:this.studentId,
                    courseType:this.$route.params.courseName,
                    pageNo:1,
                    pageSize:100
                }
                this.reload(params)*/
            }
        },
        methods: {
            loadPicture:function (params) {
               this.axios.get("/api/smy/controller/ListPicture", {params}).then((response)=>{
                   let d=response.data.datas
                   let picArray=[]
                   if (d){
                       let pic=d.map(item=>{
                           picArray.push({desc:item.description,url: "/api/files/"+item.realName})
                       })
                   }

                this.currentPictureData=picArray
               }).catch((response)=>{

               })

            },
            loadTimeLins:function(studentId,courseType){
                debugger
                this.currentTimeData=[]
                let params={
                    studentId:studentId,
                    courseType:courseType
                }
                this.axios.get("/api/smy/controller/PictureTimeLine",{params}).then((resp)=>{
                    debugger
                    let data=resp.data;
                    this.currentTimeData=data

                }).catch((resp)=>{

                })
            },
            onChange(activeName) {

                let params={
                    studentId:this.studentId,
                    courseType:this.courseType,
                    createTime:activeName,
                    pageNo:1,
                    pageSize:100
                }
                this.loadPicture(params)
            },
            viewPicture:function (e) {
                debugger
                this.cardVisible=true;
                this.dialogImageUrl=e.target.getAttribute("src")
            }
        }
    }
</script>

<style scoped>
    .el-tag {
        text-align: left;
    }

    .block {
        display: inline-block;

    }

    .el-image {
        padding-left: 30px;
        padding-top: 10px;
    }
</style>