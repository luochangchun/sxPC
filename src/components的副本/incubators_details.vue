<template>
    <div class="container">
        <!--双创空间详情页-->
        <el-row :gutter="10" style="margin-bottom: 50px;">
            <el-col :lg="24" :md="24" :sm="24" :xs="24">
                <el-row :gutter="10" style="margin-top: 50px;border:1px solid #ddd;padding:15px;background-color: #fff">
                    <el-col :lg="12" :md="12" :sm="24" :xs="24">
                        <div class="details-img">
                            <el-carousel :interval="500000" arrow="never" height="240px">
                                <el-carousel-item v-for="(item, index) in photos" :key="index">
                                    <img :src="item.uri">
                                </el-carousel-item>
                            </el-carousel>
                        </div>
                    </el-col>
                    <el-col :lg="11" :md="11" :sm="24" :xs="24" :offset="1" class="details-text">
                        <h6>{{incubator['name']}}</h6>
                        <p>地址:{{incubator['address']}}</p>
                        <p>级别:{{incubator['level']}}</p>
                        <p>联系方式:{{incubator['contact']}} {{incubator['phone']}}</p>
                        <router-link v-if="incubator['categoryId']==2" :to="{ name: 'enter', params: { id: incubator['id']}}">申请入驻</router-link>
                        <!-- 跳到工位申请表单 -->
                        <router-link v-if="incubator['categoryId']==3" :to="{ name: 'station', params: { id: incubator['id']}}">申请入驻</router-link>
                    </el-col>
                </el-row>
                <el-row :gutter="10" class="incubators_details_text" style="border:1px solid #ddd;background-color: #fff;padding:15px;margin-top:20px;">
                    <p v-html="content"></p>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import api from '../axios/api.js'
    export default {
        data() {
            return {
                incubator: '',
                photos: '',
                content: ''
            }
        },
        created() {
            let id = this.$route.params.id
            this.getIncubator(id);
        },
        methods: {
            getIncubator(id) {
                api.Get('/qb/' + id)
                    .then(res => {
                        this.incubator = res['incubator'];
                        this.photos = res['photos']
                        if (!res['incubator']['detail']) {
                            this.content = "暂无数据"
                        } else {
                            this.content = res['incubator']['detail']['content'];
                        }
                    });
            }
        }
    }
</script>

<style scoped>
    .details-img img {
        width: 100%;
        height: 100%;
    }
    .details-title-img img {
        width: 100%;
        border: 1px solid #ddd;
    }
    img {
        width: 100%;
        display: block;
        margin-right: auto;
        margin-left: auto;
        vertical-align: middle;
    }
    .details-text h6 {
        font-size: 26px;
        color: #666;
        margin-bottom: 10px;
        margin-top: 10px;
    }
    .details-text p {
        line-height: 200%;
    }
    .details-text a {
        background-color: #f48100;
        border: none;
        color: #fff;
        border-radius: 4px;
        width: 90px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        margin-top: 30px;
    }
</style>