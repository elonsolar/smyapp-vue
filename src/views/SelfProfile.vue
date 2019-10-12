<template>
    <div class="selfProfile">
        <div>
            <p>我叫 {{student.studentName}}</p>
            <p>最喜欢的颜色：{{student.favoriteColor}}</p>
            <p>最喜欢的人：{{student.favoritePerson}}</p>
            <p>最崇拜的人：{{student.heroMan}}</p>
            <p>理想是：{{student.ideal}}</p>
            <p>座右铭是：{{student.motto}}</p>
        </div>
    </div>


</template>

<script>
    export default {
        name: "SelfProfile",
        data() {
            return {

                student:JSON.parse(localStorage.getItem("student"))
            }
        }
    }
</script>

<style scoped lang="scss">
    .selfProfile {
        text-align: center;
        height: 600px;
        padding: 0;
        margin: 0;

        p {
            height: 30px;
            line-height: 30px;
        }
    }
</style>