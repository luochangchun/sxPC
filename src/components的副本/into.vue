<template>
    <div>
        <!--服务企业login-->
        <el-row :gutter="10">
            <el-col :lg="24" :md="24" :sm="24" :xs="24" style="background-color:#23b7e5">
                <el-row :gutter="10">
                    <el-col :lg="18" :md="18" :sm="18" :xs="18" :offset="3" class="provider_header">
                        <div class="provider_login">
                            <img :src="enterpriseDetail['icon']" alt="">
                        </div>
                        <div>
                            <p>{{enterpriseDetail['name']}}</p>
                            <!-- <button>贷款</button> -->
                        </div>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <!--优惠服务-->
        <el-row :gutter="10">
            <el-col :lg="18" :md="18" :sm="18" :xs="18" :offset="3" class="provider_discounts">
                <h1>优惠服务</h1>
                <el-row class="provider_p">
                    <el-col :lg="20" :md="20" :sm="24" :xs="24">
                        <p>服务内容填写</p>
                        <p v-html="enterpriseDetail['detail']['content']"></p>
                    </el-col>
                    <el-col :lg="4" :md="4" :sm="24" :xs="24">
                        <el-popover ref="popover1" placement="top-start" title="请联系平台" width="200" trigger="hover" content="027-65465656">
                        </el-popover>
                        <el-button v-popover:popover1>申请服务</el-button>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <!--服务详情介绍-->
        <el-row :gutter="10">
            <el-col :lg="18" :md="18" :sm="18" :xs="18" :offset="3" class="provider_discounts">
                <h1>服务详情介绍</h1>
                <el-row class="provider_p">
                    <el-col :lg="24" :md="24" :sm="24" :xs="24">
                        <!-- <div>
                                <img src="../../static/img/provide_1.jpg" alt="">
                            </div> -->
                        <p style="margin:40px 0;">{{enterpriseDetail['intro']}}</p>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <!--企业详情-->
        <el-row :gutter="10" style="margin-top: 50px;margin-bottom: 50px;">
            <el-col :lg="18" :md="18" :sm="18" :xs="18" :offset="3">
                <el-row>
                    <el-col :lg="17" :md="17" :sm="24" :xs="24">
                        <table border="1" class="table table-bordered bg-light" style="background-color: #edf1f2">
                            <tbody>
                                <tr>
                                    <td class="font-bold w-xs">企业名称</td>
                                    <td colspan="3">
                                        <p>{{enterpriseDetail['name']}}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="font-bold w-xs">联系人</td>
                                    <td>刘经理</td>
                                    <td class="font-bold">联系电话</td>
                                    <td>
                                        <p>15172525978</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="font-bold w-xs">地址</td>
                                    <td colspan="3">
                                        <p>武汉市洪山区珞狮北路2号樱花大厦A座</p>
                                    </td>
                                </tr>
                                <tr style="height:240px;">
                                    <td class="font-bold w-xs h-md">企业简介与优势</td>
                                    <td colspan="3"></td>
                                </tr>
                                <tr style="height:90px;">
                                    <td class="font-bold w-xs">服务领域</td>
                                    <td colspan="3" class="h-xs">
                                        <p>{{enterpriseDetail['intro']}}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="font-bold w-xs">备注</td>
                                    <td colspan="3"></td>
                                </tr>
                            </tbody>
                        </table>
                    </el-col>
                    <el-col :lg="6" :md="6" :sm="24" :xs="24" :offset="1">
                        <div>
                            <img src="../../static/img/provider_2.jpg" alt="">
                        </div>
                    </el-col>
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
                enterpriseDetail: '',
            }
        },
        created() {
            let id = this.$route.params.id;
            this.getEnterprise(id);
        },
        methods: {
            getEnterprise(id) {
                api.Get('/enterprise/' + id)
                    .then(res => {
                        this.enterpriseDetail = res;
                    });
            }
        }
    }
</script>

<style>
    /*服务企业login*/
    .provider_header p {
        line-height: 60px;
        color: #fff;
        font-size: 14px;
    }
    .provider_header button {
        border: 1px solid #fff;
        background-color: transparent;
        width: 60px;
        color: #fff;
        font-size: 12px;
        text-align: center;
    }
    .provider_login img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        float: left;
        background-color: #fff;
        margin-right: 5%;
    }
    .provider_header {
        margin-top: 30px;
        margin-bottom: 40px;
    }
    /*优惠服务*/
    .provider_discounts h1 {
        font-size: 24px;
        font-weight: 400;
        line-height: 40px;
        display: inline-block;
        border-bottom: 2px solid #c8c9cc;
        margin-bottom: 30px;
        margin-top: 50px;
    }
    .provider_p {
        background-color: #edf1f2;
        padding: 15px;
    }
    .provider_p p {
        line-height: 30px;
        color: #58666e;
    }
    .provider_p button span {
        cursor: pointer;
        border-radius: 6px;
        width: 100px;
        height: 38px;
        line-height: 38px;
        display: block;
        color: #dcf2f8;
        background-color: #23b7e5;
        text-align: center;
    }
    .el-button {
        border: none;
    }
    /*企业详情*/
    .table {
        width: 100%;
        max-width: 100%;
        margin-bottom: 20px;
        border-spacing: 0;
        border-collapse: collapse;
        display: table;
        border: 1px solid #ddd;
    }
    tr {
        display: table-row;
        vertical-align: inherit;
        border-color: inherit;
        height: 47px;
    }
    td {
        line-height: 47px;
        border: 1px solid #ddd;
        padding: 0 10px;
        font-size: 14px;
    }
    td p {
        color: #298eff;
        cursor: pointer;
    }
</style>