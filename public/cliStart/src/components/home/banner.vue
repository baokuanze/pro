<template>
    <div class="banner">
        <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide v-for="(item,index) in list" :key="index" >
                <img class="bannerImg" :src="item.banner_img" alt="">
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>


    import { swiper, swiperSlide } from 'vue-awesome-swiper'

    import server from '../../server/axios';

    export default {
        data() {
            return {
                list:[],
                swiperOption: {
                    pagination: {
                        el: '.swiper-pagination',
                        bulletActiveClass: 'my-bullet-active'
                    },
                    autoplay: true
                }
            }
        },

        computed:{
            swiper() {
                return this.$refs.mySwiper.swiper
            }
        },

        mounted() {
            server.request('getBanner',{a:1}).then(res => {
                if(res && res['status'] == 1){
                    this.list = res['data'];
                    this.list.push({
                        banner_img:'static/banner/1.jpg'
                    })
                }
            });
        },

        components: {
            swiper,
            swiperSlide
        }
    }
</script>

<style lang="less">
    .banner{
        width: 100%;
        height: 8.5rem;
        overflow: hidden;
        .bannerImg{
            width: 100%;
        }
    }
    .my-bullet-active{
        background-color: white;
        opacity: 1;
    }
</style>