<template>
    <div class="container">
        <XhTop></XhTop>
        <!-- 展示路由组件 -->
        <div class="content">
            <!-- 展示路由组件区域 -->
            <router-view></router-view>
            <div class="shang">
                <div class="shang-left">
                    <div class="card">
                        <h2>学生总数</h2>
                        <span>
                            1344
                        </span>
                        <div style="width: 300px;" class="my-progress">
                            <el-progress :text-inside="true" :stroke-width="16" :percentage="70" />
                        </div>
                        <p>一个月内增加了70%</p>
                    </div>

                    <div class="card">
                        <h2>新生总数</h2>
                        <span>
                            156
                        </span>
                        <div style="width: 300px;" class="my-progress">
                            <el-progress :text-inside="true" :stroke-width="16" :percentage="70" />
                        </div>
                        <p>一个月内增加了70%</p>
                    </div>

                    <div class="card">
                        <h2>课程总数</h2>
                        <span>
                            34
                        </span>
                        <div style="width: 300px;" class="my-progress">
                            <el-progress :text-inside="true" :stroke-width="16" :percentage="70" />
                        </div>
                        <p>一个月内增加了70%</p>
                    </div>

                    <div class="card">
                        <h2>教师人数</h2>
                        <span>
                            56
                        </span>
                        <div style="width: 300px;" class="my-progress">
                            <el-progress :text-inside="true" :stroke-width="16" :percentage="70" />
                        </div>
                        <p>一个月内增加了70%</p>
                    </div>
                </div>
                <div class="shang-right" style="margin-right: 100px;">
                    <!-- <span>收支/收入费用报告</span> -->
                    <Zhexiantu></Zhexiantu>
                </div>
            </div>
            <div class="xia">
                <div class="xia-left">
                    <h2>教师名单</h2>
                    <div class="show">
                        <div>
                            <Card />
                        </div>
                    </div>
                    <button><a href="/jiaoshi">查看所有</a></button>
                </div>
                <div class="xia-right">
                    <h2>学生名单</h2>
                    <div class="show">
                        <div style="max-height: 300px; overflow: auto;">
                            <XueCard />
                        </div>
                    </div>
                    <button><a href="/xuesheng">查看所有</a></button>
                </div>
            </div>



        </div>
        <div class="bottom">123123</div>
    </div>

</template>

<script setup lang="ts">
import Zhexiantu from './zhexiantu/index.vue'
import Card from './card/index.vue'
import XueCard from './xue-card/index.vue'
</script>

<style scoped lang="scss">
a{
    text-decoration: none;
    color: #000;

}
.container {
    display: flex;
    flex-direction: column;
    align-items: center;

    .content {
        margin-top: 80px;
        width: 1900px;
        min-height: 700px;
        /* background: red; */
    }
}

.shang {
    display: flex;
    margin-top: 50px;

}

.shang-left {
    width: 1073px;
    display: flex;
    flex-wrap: wrap;
    margin-left: 74px;
}

.shang-right {
    margin-right: 84px;
}

.card {
    width: 451px;
    height: 197px;
    border: 1px solid #797979;
    border-radius: 14px;
    box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.15);
    margin-left: 55px;
    margin-bottom: 46px;

    h2 {
        margin-top: 24px;
        margin-left: 34px;
    }

    span {
        font-size: 24px;
        line-height: 53px;
        // text-align: center;
        display: block;
        width: 133px;
        height: 53px;
        // border: 1px solid #797979;
        margin-top: 10px;
        margin-left: 32px;
    }

    .my-progress {
        margin-left: 32px;
        margin-top: 21px;
    }

    p {
        margin-left: 34px;
        margin-top: 4px;
    }
}

.xia {
    display: flex;
    justify-content: center;
    .xia-left {
        width: 453px;
        height: 426px;
        border: 1px solid #797979;
        border-radius: 9px;
        box-shadow: 0px 5px 6px 0px rgba(0, 0, 0, 0.15);
       margin-right: 50px;
        background-color: #fff;
    }

    h2 {
        margin-top: 24px;
        margin-left: 31px;
        margin-bottom: 21px;
    }

    // .show {
        
       
    // }

    button {
        width: 80px;
        height: 30px;
        border: 1px solid #797979;
        border-radius: 4px;
        display: block;
        margin-left: auto;
        margin-right: auto;
        margin-top: 17px;
        background-color: #fff;
    }
    .xia-right{
        width: 1153px;
        height: 426px;
        border: 1px solid #797979;
        border-radius: 9px;
        box-shadow: 0px 5px 6px 0px rgba(0, 0, 0, 0.15);
      
        
        background-color: #fff;
    }
}
</style>