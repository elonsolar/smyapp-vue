<template>
    <div class="block">
        <el-timeline>
            <el-timeline-item
                    v-for="(activity, index) in activities"
                    :key="index"
                    :icon="activity.icon"
                    :type="activity.type"
                    :color="activity.color"
                    :size="activity.size">
            <!-- :timestamp="activity.timestamp"-->

                <el-button type="info" plain class="el-icon-video-camera-solid" @click="Test(activity.timestamp,index)">{{activity.timestamp}}</el-button>

            </el-timeline-item>
        </el-timeline>
    </div>
</template>

<script>
    export default {
        name: "CourseLeft",
        data() {
            return {
                activities: [{
                    content: '支持使用图标',
                    timestamp: '2018-04-12',
                    size: 'large',
                    type: 'primary',
                    icon: 'el-icon-more'
                }, {
                    content: '支持自定义颜色',
                    timestamp: '2018-04-03 ',
                }, {
                    content: '支持自定义尺寸',
                    timestamp: '2018-04-03 ',
                }, {
                    content: '默认样式的节点',
                    timestamp: '2018-04-03 '
                }]
            };
        },
        methods: {
            Test: function (t, i) {
                /* this.activities.forEach((e, j, ar) => {
                     ar[j].color = 'white';
                 })
                 this.activities[i].color ="black"
                 console.log(this.activities)*/
                let ar = this.activities.map(function (x) {
                    x.color = ''
                    return x
                })
                ar[i].color = "green"
                this.activities = ar;
            }
        }
    };
</script>

<style scoped>
    .time-line-content {
        text-decoration: underline;
        display: inline-block;
    }
</style>