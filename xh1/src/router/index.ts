// import path from 'path';
import {createRouter, createWebHistory} from  'vue-router';
import smartSport from '@/router/smartSport.js';
export default createRouter({
    history: createWebHistory(),
    routes: [
          
         ...smartSport,
            {
            path: '/',
            component: () => import('@/pages/home/index.vue'),
            name: 'home'
            },
        {
          path: '/home',
          component: () => import('@/pages/home/index.vue'),
          name: 'home'
          },
        {
          path: '/xuesheng',
          component: () => import('@/pages/xuesheng/index.vue'),
          name: 'xuesheng'
          },
          
         
          {
            path: '/jiaoshi',
            component: () => import('@/pages/jiaoshi/index.vue'),
            name: 'jiaoshi'
            },
          
            {
              path: '/yingyongguanli',
              component: () => import('@/pages/yingyongguanli/index.vue'),
              name:'yingyongguanli'
              },
              {
                path: '/checking',
                component: () => import('@/pages/yingyongguanli/checking/index.vue'),
                name:'checking'
                },
                {
                  path: '/leave',

                  component: () => import('@/pages/yingyongguanli/leave/index.vue'),
                  name:'leave'
                  },
                  {
                    path: '/paper',
                    component: () => import('@/pages/yingyongguanli/paper/index.vue'),
                    name:'paper'
                    },
                    {
                      path: '/inform',
                      component: () => import('@/pages/yingyongguanli/inform/index.vue'),
                      name:'inform'
                     
                      },
                      {
                        path: '/kechen',
                        component: () => import('@/pages/yingyongguanli/kechen/index.vue'),
                        name:'kechen'
                       
                        },
                        {
                          path: '/teacher',
                          component: () => import('@/pages/yingyongguanli/teacher/index.vue'),
                          name:'teacher'
                         
                          },
                   
        {
            path:'/',
            redirect:'/home'
        } 
    ],
 

    // 滚动行为:控制滚动条的位置
    scrollBehavior() {
        return { 
            top: 0 ,
            left: 0


        }
    }
});


document.addEventListener('DOMContentLoaded', () => {
  const phoneInput = document.getElementById('phoneInput') as HTMLInputElement;
  const countryCode = document.getElementById('countryCode') as HTMLSelectElement;

  if (phoneInput && countryCode) {
    phoneInput.addEventListener('input', () => {
      phoneInput.value = phoneInput.value.replace(/[^\d]/g, '');
    });
  }
});
