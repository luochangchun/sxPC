<template>
    <div class="container">
        <!--双创空间详情页-->
        <el-row :gutter="10" style="margin-bottom: 50px;">
            <el-col :lg="24" :md="24" :sm="24" :xs="24">
                <el-row :gutter="10" style="margin-top: 50px;border:1px solid #ddd;padding:15px;background-color: #fff">
                    <el-col :lg="12" :md="12" :sm="24" :xs="24">
                        <div class="details-img"><img src="../../static/img/id_03.png" alt="" style="min-height:270px;"></div>
                        <el-row :gutter="10">
                            <el-col :lg="4" :md="4" :sm="4" :xs="4" v-for="(item,index) in 6" :key="item">
                                <div class="details-title-img">
                                    <img src="../../static/img/id_06.png" alt="">
                                </div>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :lg="11" :md="11" :sm="24" :xs="24" :offset="1" class="details-text">
                        <h6 v-if="tenancyApply['detail']">{{tenancyApply['detail']['title']}}</h6>
                        <h6 v-if="!tenancyApply['detail']">暂无标题</h6>
                        <p>地址:{{tenancyApply['address']}}</p>
                        <p>联系方式:{{tenancyApply['contact']}} {{tenancyApply['phone']}}</p>
                        <p>场地面积:{{tenancyApply['area']}}平米</p>
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
				tenancyApply: '',
				photos: '',
				content:''
			}
		},
		created() {
			let id = this.$route.params.id
			this.getTenancyApply(id);
		},
		methods: {
			getTenancyApply(id) {
				api.Get('/qb/tenancy/' + id)
					.then(res => {
						this.tenancyApply = res['tenancyApply'];
						this.photos = res['photos']
						if(!res['tenancyApply']['detail']) {
							this.content="暂无数据"
						} else {
							this.content=res['tenancyApply']['detail']['content'];
						}
					});
			}
		}
	}
</script>

<style>
    .details-img img {
        width: 100%;
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