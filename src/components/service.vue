<template>
    <div>
        <el-row :gutter="0">
            <el-col :lg="24" :md="24" :sm="24" :xs="24" class="service-banner">
            </el-col>
        </el-row>
        <!--title-->
        <div class="container" style="margin-bottom:20px;">
            <div class="s_center_title" style="text-align: center">
                <h1>全面完善的服务商体系<br/>
                    高效解决企业发展所需的各类服务</h1>
            </div>
            <el-row :gutter="10">
                <!--服务商列表-->
                <el-col :lg="12" :md="12" :sm="24" :xs="24" style="border-right:1px solid #ccc;padding-right:20px;">
                    <el-row>
                        <el-col :lg="24" :md="24" :sm="24" :xs="24">
                            <div class="s_header_img">
                                <img src="../../static/img/01c.png" alt="">
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :lg="24" :md="24" :sm="24" :xs="24" >
                            <div class="s_service_list clearfix" v-for="(item , index) in ServiceList" :key="index">
                                <h2>{{ item['value']}}</h2>
                                <el-row>
                                    <p v-show="noData" style="margin-left:15px;font-size:12px;margin-bottom: 10px;line-height:36px;">暂无数据</p>
                                    <el-col v-show="!noData" :lg="6" :md="6" :sm="6" :xs="6" v-for="(item, index) in needData" :key="index">
                                       <div class="c1">
                                            <div class="c2">
                                                <h3>{{item['enterprise']}}</h3>
                                                <p>电话:{{item['phone']}}</p>
                                                <el-rate v-model="value1" disabled show-score text-color="#ff9900" score-template="{value}">
                                                </el-rate>
                                            </div>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-col>
                    </el-row>
                </el-col>
                <!--被服务企业列表-->
                <el-col :lg="12" :md="12" :sm="24" :xs="24">
                    <el-row>
                        <el-col>
                            <div style="padding-left:13px;">
                                <div class="s_header_img">
                                    <img src="../../static/img/02z.png" alt="">
                                </div>
                                <div class="s_intermediary_list">
                                    <div class="filte" style="margin-top:20px">
                                        <div class="filte_top rel">
                                            <dl>
                                                <!-- <dt>项目阶段</dt> -->
                                                <dd  style="width: 93%;" :class="{ auto : moreFlag }">
                                                    <a href="javascript:;" :class="{ on : display_active[index] }" @click="handleClick(index,item.id)" class="sx_child" v-for="(item , index) in category" :key="index"  :sid="item.id" v-if="index>0">{{ item['name']}}</a>
                                                </dd>
                                            </dl>
                                        </div>
                                        <div class="filte_body" v-loading.body="loading">
                                            <el-row :gutter="10">
                                                <p v-show="noDate" style="margin-left:5px;">暂无数据</p>
                                                <el-col v-show="!noDate" class="gh" :xs="24" :sm="24" :md="24" :lg="24" v-for="(item,index) in serviceBody" :key="index">
                                                    <router-link :to="{name:'invest_detail', params: {id:item.id}}" >
                                                        <div class="intermediary_list">
                                                            <h1>{{item['name']}}</h1>
                                                            <div class="c3">
                                                                <p>地址:{{ item['address']}}</p>
                                                                <p>电话:{{ item['phone']}}</p>
                                                            </div>
                                                            <ul style="clear:both;height:30px;">
                                                                <li>{{ item['labels']}}</li>
                                                            </ul>
                                                        </div>
                                                    </router-link>
                                                </el-col>
                                            </el-row>
                                        </div>
                                    </div>
                                </div>
                                <!--分页-->
                                <el-row :gutter="10" style="margin-bottom: 50px;margin-top:50px;">
                                    <el-col :lg="8" :md="8" :sm="24" :xs="24" :offset="8">
                                        <div class="block">
                                            <el-pagination :current-page="1" :total="totalPages" @current-change="handleCurrentChange" layout="prev, pager, next">
                                            </el-pagination>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>

                        </el-col>
                    </el-row>
                </el-col>

            </el-row>

            <!-- footer -->
        </div>
    </div>
</template>

<script>
    import api from '../axios/api.js'
    export default {
        data() {
            return {
                category: "",
                ServiceList: '',
                loading: false,
                moreFlag: true,
                needData: '',
                noData: false,
                noDate: false,
                serviceBody: '',
                display_active: [false, false, false, false],
                activeName: "tab1",
                serviceEight: '',
                value1: 4,//星级评分
                totalPages: "",
            }
        },
        created() {
            this.getServiceList();
            this.getQb();
            this.getServiceEight();
            this.initServicesList();
        },
        methods: {
// 服务商机构value
            getServiceList() {
                this.fullscreenLoading = true;
                api.Get('/dict/service').then(res => {
                    this.ServiceList = res;
                });
            },
//服务商机构内容
            getProviderClass(id) {
                let url = '/enterprise/' + id + '/' + '2' + '/' + '10' + '/' + '1';
                api.Get(url)
                    .then(res => {
                        this.needData = res['data'];
                        if (this.needData.length == 0) {
                            this.nodata = true;
                        } else {
                            this.nodata = false;
                        }
                        this.totalPages = res['totalPages'] * 10;
                    });
            },
            initServicesList() {
                var url = "/enterprise/apply/" + "4" + "/" + "1" + "?cid=" + 0;
                api.Get(url).then(res => {
                    this.needData = res["page"]["data"];
                });
            },


// 享受服务企业name
            getQb() {
                api.Get('/qb')
                    .then(res => {
                        this.category = res;
                        this.category.forEach((value, index, array) => {
                            if (index == 1) {
                                this.$set(this.display_active, 1, true)
                                this.initNewsList(this.category[index]["id"]);
                                this.fullscreenLoading = false;
                            }
                        });
                    })
            },
            handleClick(index, sid) {
                var sx_child_item = document.querySelectorAll('.sx_child');
                for (let i = 1; i <= sx_child_item.length; i++) {
                    if (sx_child_item[i] != sx_child_item[index]) {
                        this.$set(this.display_active, i, false)
                    } else {
                        this.$set(this.display_active, i, true)
                        console.log('i=' + i)
                        console.log('index=' + index)
                    }
                }
                this.initNewsList(sid);
                window.localStorage.setItem("sid", sid);
            },
            initNewsList(sid) {
                this.loading = true
                var url = "/enterprise/" + sid + "/1/" + "12" + "/" + "1";
                api.Get(url).then(res => {
                    this.serviceBody = res["data"];
                    if (this.serviceBody.length == 0) {
                        this.nodata = true;
                        this.loading = false;
                    } else {
                        this.nodata = false;
                        this.loading = false;
                    }
                    this.totalPages = res["totalPages"] * 10;
                });
                var info = "/pub/info/22" + "/" + "10" + "/1";
                api.Get(info).then(res => {
                    this.infoData = res["data"];
                    // if (this.infoData.length == 0) {
                    //     this.nodata = true;
                    // } else {
                    //     this.nodata = false;
                    // }
                    // this.totalPages = res["totalPages"] * 10;
                });
            },
            handleCurrentChange(val) {
                //获取到当前分页页码，获取当前页面数据
                let sid = window.localStorage.getItem("sid");
                var url = "/enterprise/" + sid + "/1/" + "12" + "/" + val;
                api.Get(url).then(res => {
                    this.serviceBody = res["data"];
                    this.totalPages = res["totalPages"] * 10;
                });
            },

// 已享受服务,有需求服务,未享受服务
            getServiceEight(){
                api.Get('/pub/enterprises')
                    .then(res => {
                        this.serviceEight = res;
                    })
            },

        }
    }
</script>

<style scoped>
/*01/服务商机构*/
    .s_center_title{
        text-align: center;
        color:#0089e3;
        font-size:24px;
        margin-top:40px;
        margin-bottom: 60px;
    }
    .s_center_title h1{
        line-height:45px;
        letter-spacing:2px;
        font-weight:600;
    }
    .s_header_img img{
        width:25%;
        float:left;
        margin-bottom:40px;
    }
.s_service_list h2{
    color:#e38000;
    font-size:13px;
    font-weight:600;
    border:1px solid #e38000;
    height:30px;
    width:120px;
    border-radius:10px;
    line-height:30px;
    text-align: center;
    margin-bottom:10px;
}
.c1{
    background-color:rgb(250,250,250);
    /*height:100px;*/
    margin-bottom:20px;
    padding:15px 10px;

}
.c2{
    border-left:1px solid rgba(204,204,204,0.43);
    margin:10px 3px;
}
.c1:last-child{
    padding-right:0;
}
.c2 h3{
    color:#666;
    font-size:11px;
    text-align: center;
    margin-left:5px;
    margin-right:5px;
    line-height:22px;
}
.c2 p{
    color:#999;
    font-size:9px;
    text-align: center;
    line-height:30px;
}
.block{
    margin-left:10px;
    margin-right:5px;
}






/*02/享受服务企业*/

/*tab切换*/
.filte dl {
    position: relative;
    margin-bottom:0;
}

.filte dl:after {
    content: "";
    display: block;
    clear: both
}
.c3 p{
    color: #999;
    font-size: 9px;
    text-align: center;
    line-height: 30px;
}

.filte dl dd {
    padding: 0 5px;
    /*border-bottom: 1px solid #d1dbe5;*/
    height: 30px;
    line-height: 30px;
    overflow: hidden;
}
.filte dl dd.auto {
    height: auto;
}
.filte dl dd a {
    margin-right: 10px;
    margin-bottom: 10px;
    display: inline-block;
    color: #8391a5;
    font-size: 14px;
}

.filte dl dd a.on {
    color:#e38000;
    font-size:13px;
    font-weight:600;
    border:1px solid #e38000;
}
/*tab切换*/


.s_intermediary_list{
    clear: both;
    margin-top:50px;
    padding-bottom:10px;
    margin-bottom: 20px;
}
.intermediary_list{
    border-bottom:1px dashed #ccc;
    padding:5px 10px;
    margin-top: 15px;
}
.intermediary_list:hover{
    background-color:rgb(250,250,250);
}

.s_intermediary_list>.filte dd a{
    float: left;
    margin-right: 2%;
    font-size: 13px;
    font-weight: 600;
    padding-left: 20px;
    padding-right: 20px;
    text-align: center;
    height: 30px;
    width: 76px;
    border-radius: 10px;
    line-height: 30px;
    overflow: hidden;
    text-align: center;
    margin-bottom: 10px;
    /* color: #e38000; */
    color: #999;
    /* border: 1px solid #e38000; */
    border: 1px solid #999;
}
.intermediary_list div p{
    float:left;
}
.intermediary_list div p:first-child{
    margin-right: 12%;
}
.intermediary_list ul li{
    float:left;
    line-height:20px;
    width:60px;
    height:20px;
    font-size:12px;
    color:#fff;
    text-align: center;
    margin-left:9px;
}
.intermediary_list h1{
    font-size:14px;
    font-weight: 600;
    color:#333;
    line-height:30px;
}
.intermediary_list ul{
    margin-top:30px;
}
.intermediary_list ul li:first-child{
    margin-left:0;
}
.intermediary_list ul li:nth-child(1n+1){
    background-color:#88d8a3;
}
.intermediary_list ul li:nth-child(2n+2){
    background-color:#f6d492;
}
.intermediary_list ul li:nth-child(3n+3){
    background-color:#ccc;
}












    /*banner*/
.show_need_btn {
    border: none;
    background-color: #f48100;
    color: #fff;
    font-size: 14px;
    width: 70px;
    height: 24px;
    line-height: 24px;
    border-radius: 4px;
    text-align: center;
    margin-right: 5px;
}
/*banner*/
.service-banner {
    background: url(../../static/img/service02.png) no-repeat center center;
    background-size: cover;
    width: 100%;
    height: 260px;
}
.service-nav {
    border-bottom: 1px solid #ddd;
    color: #333;
}
.service-banner .service-nav:last-child {
    border-bottom: none;
}
.service-nav img {
    width: 17px;
    display: inline-block;
    margin-bottom: 0;
    margin-left: 8px;
    margin-right: 8px;
}
.service-nav p {
    height: 40px;
    line-height: 40px;
    display: inline-block;
    font-size: 14px;
}

</style>