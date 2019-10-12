<template>
    <div class="selfHonor">
        <div class="block">
            <el-timeline>
                <el-timeline-item v-for="h in honor" :timestamp="h.acquisitionTime | format" placement="top">
                    <el-card>
                        <h4>{{h.honorName}}</h4>

                    </el-card>
                </el-timeline-item>
            </el-timeline>
        </div>

    </div>

</template>

<script>
    import {formatDate} from 'element-ui/src/utils/date-util'

    export default {
        name: "Honor",
        data() {
            return {
                honor: []
            }
        },
        filters: {
            format:function(time) {
                return formatDate(time, "yyyy-MM-dd")
            }
        },
        created() {
            let student = JSON.parse(localStorage.getItem("student"))
            let params = {   //要么定义为params 传参{params}, 使用其他变量名,传参需{params:其他名}
                "studentId": student.id
            }
            this.axios.get("/api/smy/controller/ListHonorByStudentId", {params}).then((response) => {
                this.honor = response.data
                let dataA = response.data[0]
                let dt = formatDate(dataA.acquisitionTime, "yyyy-MM-dd")
                // console.log(dt)
            }).catch((response) => {

            })
        }
    }
</script>

<style scoped>

</style>