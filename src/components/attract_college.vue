<template>
    <div class="container">
        <!-- 双创 -->
        <el-row :gutter="10" style="margin-bottom: 50px;">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" style="margin-top:10px;position:relative;">
                <el-breadcrumb separator="/" class="padder-vx bb">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: '/incubators' }">双创空间</el-breadcrumb-item>
                    <el-breadcrumb-item v-if="type=='1'">招商信息列表</el-breadcrumb-item>
                    <el-breadcrumb-item v-if="type=='2'">求租信息列表</el-breadcrumb-item>
                </el-breadcrumb>
                <!-- 跳到孵化器申请表单 -->
                <router-link v-if="type == 1" :to="{ name: 'attract_list', params: {categoryId:'3', type: type}}" class="zs">发布招商</router-link>
                <router-link v-if="type == 2" :to="{ name: 'attract_list', params: {categoryId:'3', type: type}}" class="zs">发布求租</router-link>
            </el-col>
            <el-col :lg="24" :md="24" :sm="24" :xs="24" style="margin-top:15px;">
                 <p v-if="attractFlag" style="text-align:center;">暂无数据</p>
                <el-row v-if="type=='1' && item['type'] == 1" :gutter="10" v-for="(item, index) in investData" :key="index" style="border-bottom:1px solid #ddd;margin-bottom: 10px;">
                    <router-link :to="{name:'attract_detail', params: {id:item['id']}}">
                        <el-col :xs="5" :sm="5" :md="5" :lg="5">
                            <div class="incubators_more_img">
                                <img src="../../static/img/int1.png" alt="" style="margin-left: -5px;">
                            </div>
                        </el-col>
                        <el-col :xs="15" :sm="15" :md="15" :lg="15">
                            <div class="incubators_more_introduce">
                                <h2 v-if="!item['title']">招商</h2>
                                <h2 v-if="item['title']">{{item['title']}}</h2>
                                <p><span>地址：</span>{{item['address']}}</p>
                                <p><span>联系方式：</span>{{item['contact']}} &nbsp;&nbsp;{{item['phone']}}</p>
                            </div>
                        </el-col>
                        <el-col :xs="3" :sm="3" :md="3" :lg="3">
                            <div class="incubators_more_area">
                                <h3 class="b">{{item['price']}}{{item['unit']}}</h3>
                            </div>
                        </el-col>
                    </router-link>
                </el-row>
                <el-row v-if="type=='2' && item['type'] == 2" :gutter="10" v-for="(item, index) in investData" :key="index" style="border-bottom:1px solid #ddd;margin-bottom: 10px;">
                    <router-link :to="{name:'attract_detail', params: {id:item['id']}}">
                        <el-col :xs="20" :sm="20" :md="20" :lg="20">
                            <div class="incubators_more_introduce">
                                <h2 v-if="!item['title']">求租</h2>
                                <h2 v-if="item['title']">{{item['title']}}</h2>
                                <p><span>地址：</span>{{item['address']}}</p>
                                <p><span>联系方式：</span>{{item['contact']}} &nbsp;&nbsp;{{item['phone']}}</p>
                            </div>
                        </el-col>
                        <el-col :xs="3" :sm="3" :md="3" :lg="3">
                            <div class="incubators_more_area">
                                <h3 class="b">{{item['price']}}{{item['unit']}}</h3>
                            </div>
                        </el-col>
                    </router-link>
                </el-row>
            </el-col>
        </el-row>
        <!--分页-->
        <el-row :gutter="10" style="margin-bottom: 50px;" v-if="attractFlag">
            <el-col :lg="8" :md="8" :sm="24" :xs="24" :offset="8">
                <div class="block">
                    <el-pagination :current-page="1" :total="totalPages" @current-change="handleCurrentChange" layout="prev, pager, next">
                    </el-pagination>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import api from "../axios/api.js";
    export default {
        data() {
            return {
                type: '',
                attractFlag: false,
                investData: "", //招商列表信息
                totalPages: ''
            };
        },
        created() {
            this.initRent();
            this.type = this.$route.params.type;

        },
        methods: {
            initRent() {
                let url = "/qb/tenancy/3/" + '10' + '/1';
                api.Get(url).then(res => {
                    if(res['data'].length > 0) {
                        this.attractFlag = false;
                        this.investData = res['data'];
                    } else {
                        this.attractFlag = true;
                    }
                    this.totalPages = res['totalPages'] * 10;
                });
            },
            handleCurrentChange(val) {
                //获取到当前分页页码，获取当前页面数据
                var url = '/qb/tenancy/3/' + '10' + '/' + val
                api.Get(url)
                    .then(res => {
                        this.investData = res['data'];
                        this.totalPages = res['totalPages'] * 10;
                    })
            }
        },
        watch: {
            '$route' (to, from) {
                this.initRent();
                this.attractFlag = false;
                this.type = this.$route.params.type;
            }
        }
    };
</script>

<style>
    .bb {
        border-bottom: 3px solid #0089e3;
        position: relative;
    }
    .zs {
        background-color: #f48100;
        border: none;
        color: #fff;
        border-radius: 4px;
        width: 80px;
        height: 26px;
        text-align: center;
        line-height: 26px;
        position: absolute;
        right: 10px;
        top: 0;
    }
    .incubators_more_img img {
        width: 80%;
    }
    .incubators_more_area img {
        width: 100%;
    }
    .incubators_more_introduce h2 {
        color: #0089e3;
        font-weight: normal;
        line-height: 30px;
        font-size: 16px;
    }
    .incubators_more_introduce p {
        line-height: 30px;
        color: #666;
    }
    .incubators_more_introduce a {
        width: 100px;
        line-height: 30px;
        border-radius: 4px;
        background-color: #f48100;
        color: #fff;
        font-size: 14px;
        border: none;
        margin-top: 5px;
        text-align: center;
    }
    .incubators_more_area h3 {
        color: #f48100;
        font-size: 14px;
        font-weight: normal;
        margin-top: 30px;
        margin-bottom: -30px;
    }
    .incubators_more_area p {
        color: #666;
        font-size: 10px;
        font-weight: normal;
        margin-top: 30px;
    }
</style>