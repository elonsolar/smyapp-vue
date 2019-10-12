<template>
    <div>
    <el-form ref="form" :model="pictureForm" label-width="80px">
        <el-form-item label="学生姓名">

            <el-input v-model="pictureForm.studentName" @change="dialogTableVisible = true"></el-input>

        </el-form-item>
        <el-form-item label="科目类别" prop="region">
            <el-select v-model="pictureForm.courseType" placeholder="请选择科目">
                <el-option label="儿童画" value="eth"></el-option>
                <el-option label="动漫" value="dm"></el-option>
                <el-option label="素描" value="sm"></el-option>
                <el-option label="国画" value="gh"></el-option>
                <el-option label="硬笔" value="yb"></el-option>
                <el-option label="软笔" value="rb"></el-option>
                <el-option label="陶艺" value="ty"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="图片" prop="file" ref="uploadpic">
              <el-upload action=""
                      list-type="picture-card"
                      :auto-upload="false"
                         :on-change="imageChange">
                  <i slot="default" class="el-icon-plus"></i>
                  <div slot="file" slot-scope="{file}">
                      <img
                              class="el-upload-list__item-thumbnail"
                              :src="file.url" alt=""
                      >
                      <span class="el-upload-list__item-actions">
        <span
                class="el-upload-list__item-preview"
                @click="handlePictureCardPreview(file)"
        >
          <i class="el-icon-zoom-in"></i>
        </span>
        <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleDownload(file)"
        >
          <i class="el-icon-download"></i>
        </span>
        <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
        >
          <i class="el-icon-delete"></i>
        </span>
      </span>
                  </div>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>

        </el-form-item>
        <el-form-item label="描述">
            <el-input type="textarea" v-model="pictureForm.description"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button @click="onCancel">取消</el-button>
        </el-form-item>
    </el-form>
    <el-dialog title="" :visible.sync="dialogTableVisible">
        <StudentSelect @listenevent="listenevent"></StudentSelect>
    </el-dialog>
    </div>
</template>
<script>
    import StudentSelect from "../../components/StudentSelect";
    export default {
        name: "PictureForm",
        components: {StudentSelect},
        data() {
            return {
                dialogTableVisible:false,
                dialogImageUrl: '',
                dialogVisible: false,
                disabled: false,
                images:[],
                pictureForm: {
                    studentName: '',
                    studentId:'',
                    courseType: '',
                    description: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                }
            }
        },
        methods: {
            listenevent(stu){
                debugger
                this.pictureForm.studentName=stu.studentName;
                this.pictureForm.studentId=stu.studentId;
                this.dialogTableVisible=false
            },
            onSubmit() {
                console.log('submit!');
                const wfForm = new FormData();
                wfForm.append("studentName",this.pictureForm.studentName);
                wfForm.append("studentId",this.pictureForm.studentId);
                wfForm.append("courseType",this.pictureForm.courseType);
                wfForm.append("description",this.pictureForm.description);
                this.images.forEach((v,i)=>{
                    debugger
                    wfForm.append('file', v.raw,v.name)
                });

                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
                this.axios.post("/api/smy/controller/UploadPicture", wfForm,config).then( res => {
                   if (res.data.success){
                       this.$router.push({path:"/pictureList"})
                   }
                }).catch( res => {
                    console.log(res)
                })
            },
            onCancel(){
                this.$router.push({path:"/pictureList"})
            },
            handleRemove(file) {
                console.log(file);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleDownload(file) {
                console.log(file);
            },
            imageChange(file, fileList, name){
                debugger
                this.images = fileList;
            }
        }
    }
</script>
<style scoped lang="scss">
    .el-form {
        text-align: left;
    }
</style>