<template>
    <div class="home">
        <banner/>
        <find/>

    </div>

</template>

<script>

    import banner from '../components/home/banner';
    import find from '../components/home/find';
    import myList from '../components/home/list/myList';
    import allList from '../components/home/list/allList';
    import Server from '../server/axios';

    export default {
        data() {
            return {
                page_num:1,
                page_size:30
            }
        },

        mounted(){
            this.getListData();
        },

        methods:{
            getListData(){
                Server.commonRequest('getStarList',{
                    page_num:this.page_num,
                    page_size:this.page_size
                }).then(res=>{
                    console.log(res);
                })
            }
        },


        components:{
            banner,find,myList,allList
        }
    }
</script>

<style lang="less" scoped>
    .home{

    }
</style>