<template>

    <div class="find">
        <div class="findContent">
            <img src="static/banner/find.png" alt=""><span>搜索</span>
        </div>
    </div>

</template>

<script>
    export default {
        data() {
            return {}
        }
    }
</script>

<style lang="less" scoped>
    .find{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 1rem 0;
        .findContent{
            background-color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 92%;
            height: 2rem;
            border-radius: 2px;
            img{
                width: 1.6rem;
                margin-right: 0.2rem;
            }
            span{
                color: #777;
            }
        }
    }
</style>