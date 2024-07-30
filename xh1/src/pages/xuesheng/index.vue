<template>
    <div class="container">
        <XhTop></XhTop>
        <!-- 展示路由组件 -->
        <div class="content">
            <!-- 展示路由组件区域 -->
            <router-view></router-view>
            <div class="shang">
                <div class="shang-left">
                    <div class="dian"></div>
                    <span>学生管理</span>
                </div>
                <div class="shang-right">
                <Search/>
                </div>
            </div>
            <div class="xia">
                <div class="xia-top">
                    <div class="top-left">
                        <button class="act">新增学生</button>
                        <button>批量导入</button>
                        <button>批量导出</button>
                    </div>
                    <div class="top-right">
                        <div class="pailie">
                           <Pailie></Pailie>
                        </div>
                        <div class="pailie">
                            <Classpailie/>
                        </div>
                        <div>
                    </div>
                </div>
                
            </div>
 
          
                <div class="xia-content">
                    <Biaodan></Biaodan>
                </div>

         </div>  
        </div>
        <div class="bottom">123123</div>
    </div>
</template>

<script setup lang="ts">
import XhTop from '@/components/xh-top/index.vue'
import Search from '@/pages/xuesheng/search/index.vue'
import Pailie from '@/pages/xuesheng/pailie/index.vue'
import Classpailie from '@/pages/xuesheng/classpailie/index.vue'
import Biaodan from '@/pages/xuesheng/biaodan/index.vue'



</script>

<style scoped lang="scss">
.container {
    display: flex;
    flex-direction: column;
    align-items: center;

    .content {
        margin-top: 80px;
        width: 1532px;
        min-height: 700px;
        /* background: red; */
    }
}
.shang{
    display: flex;
    justify-content:space-between;
    margin-top: 63px;
    .shang-left{
        display: flex;
        .dian{
            width: 12px;
height: 35px;
opacity: 0.61;
background: #3b46e1;
border: 1px solid #797979;
border-radius: 5px;
        }
        span{
            width: 56px;
height: 20px;
font-size: 14px;
font-family: Microsoft YaHei, Microsoft YaHei-Normal;
font-weight: normal;
text-align: LEFT;
color: #333333;
margin-top: 10px;
margin-left: 10px;
        }
    }
}
.xia{
    width: 1532px;
height: 761px;
opacity: 1;
border: 1px solid #a4a2a2;
box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.15); 
margin-top: 26px;
.xia-top{
    width: 1532px;
height: 91px;
border: 1px solid #797979;
display: flex;
justify-content: space-between;
.top-left{
    margin-left: 29px;
    .act{
        width: 103px;
height: 44px;
background: #3b46e1;
border: 1px solid #797979;
border-radius: 4px;
font-size: 16px;
font-family: Microsoft YaHei, Microsoft YaHei-Normal;
font-weight: normal;
text-align: CENTER;
color: #333333;
line-height: 20px;
    }
    button{
        width: 103px;
height: 44px;
border: 1px solid #797979;
border-radius: 4px;
font-size: 16px;
font-family: Microsoft YaHei, Microsoft YaHei-Normal;
font-weight: normal;
text-align: CENTER;
color: #333;
line-height: 20px;
margin-top: 24px;
margin-right: 50px;
    }
}
.top-right{
    display: flex;

    .pailie{
        margin-right: 90px;
        margin-top: 32px;
    }
span{
    margin-right:11px ;
}
}
}
}
</style>