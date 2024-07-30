/*
 * @Author: caiyf
 * @Date: 2024-04-09 11:11:50
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-06-17 10:47:00
 * @Description: 智慧体育
 * @FilePath: \mobile\mhealth\src\router\modules\smartSport.js
 */

export default [
    {
      path: "/smartSport",
      name: "smartSport",
      component: () => import("@/views/smartSport/Root.vue"),
      
      children: [
        {
          path: '',
          redirect: 'index',
          meta: { title: "智慧体育" }
        },
        {
          path: 'index',
          name: "smartSport_index",
          component: () => import("@/views/smartSport/Index.vue"),
          meta: { title: "智慧体育" }
        },
        {
          path: 'physical_record',
          name: "smartSport_physical_record",
          component: () => import("@/views/smartSport/PhysicalRecord.vue"),
          meta: { title: "体测记录" }
        },
        {
          path: 'physical_review',
          name: "smartSport_physical_review",
          component: () => import("@/views/smartSport/PhysicalReview.vue"),
          props: true,
          meta: { title: "视频回放 " }
        },
        {
          path: 'class_list',
          name: "smartSport_classList",
          component: () => import("@/views/smartSport/ClassList.vue"),
          meta: { title: "班级名单" }
        },
        {
          path: 'physical_archives',
          name: "smartSport_physicalArchives",
          component: () => import("@/views/smartSport/PhysicalArchives.vue"),
          meta: { title: "体测档案" }
        },
        {
          path: 'physical_project_record',
          name: "smartSport_project_record",
          component: () => import("@/views/smartSport/ProjectRecordList.vue"),
          meta: { title: '体侧记录' }
        },
        {
          path: 'physical_top_record',
          name: "smartSport_top_record",
          component: () => import("@/views/smartSport/TopRecordList.vue"),
          meta: { title: '成绩top3' }
        },
        {
          path: 'sport_item',
          name: "smartSport_sportItem",
          component: () => import("@/views/smartSport/SportItem.vue"),
          meta: { title: "体测档案" }
        },
        {
          path: 'physical_score_addition',
          name: "smartSport_physical_score_addition",
          component: () => import("@/views/smartSport/PhysicalScoreAddition.vue"),
          meta: { title: "成绩补录" }
        },
        {
          path: 'physical_score_addition_detail',
          name: "smartSport_physical_score_addition_detail",
          component: () => import("@/views/smartSport/AdditionDetail.vue"),
          meta: { title: "成绩补录" }
        },

        // V3.2.0 学生上传照片功能
        {
          path: 'login',
          name: "smartSport_login",
          component: () => import("@/views/smartSport/picture/Login.vue"),
          meta: { title: "登录" }
        },
        {
          path: 'select_school',
          name: "smartSport_selectSchool",
          component: () => import("@/views/smartSport/picture/SelectSchool.vue"),
          meta: { title: "选择学校" }
        },
        {
          path: 'photograph_notice',
          name: "smartSport_photographNotice",
          component: () => import("@/views/smartSport/picture/PhotographNotice.vue"),
          meta: { title: "拍照须知" }
        },
        {
          path: 'select_class',
          name: "smartSport_selectClass",
          component: () => import("@/views/smartSport/picture/SelectClass.vue"),
          meta: { title: "选择班级" }
        },
        {
          path: 'pic_uploadList',
          name: "smartSport_picUploadList",
          component: () => import("@/views/smartSport/picture/PicUploadList.vue"),
          meta: { title: "" }
        },
        {
          path: 'take_picture',
          name: "smartSport_takePicture",
          component: () => import("@/views/smartSport/picture/TakePicture.vue"),
          meta: { title: "拍照" }
        },
        {
          path: 'uploading',
          name: "smartSport_uploading",
          component: () => import("@/views/smartSport/picture/Uploading.vue"),
          meta: { title: "上传" }
        },
        {
          path: 'picture_detail',
          name: "smartSport_pictureDetail",
          component: () => import("@/views/smartSport/picture/PictureDetail.vue"),
          meta: { title: "照片详情" }
        },

        // 作业管理
        {
          path: 'homework_manage',
          name: "smartSport_homeworkManage",
          component: () => import("@/views/smartSport/homework/Index.vue"),
          meta: { title: '作业管理' }
        },
        {
          path: 'homework_detail',
          name: 'smartSport_homeworkDetail',
          component: () => import("@/views/smartSport/homework/HomeworkDetail.vue"),
          meta: { title: '作业详情' }
        },
        {
          path: 'homework_remark',
          name: 'smartSport_homeworkRemark',
          component: () => import("@/views/smartSport/homework/HomeworkRemark.vue"),
          meta: { title: '作业备注' }
        },
        {
          path: 'project_detail',
          name: 'smartSport_projectDetail',
          component: () => import("@/views/smartSport/homework/ProjectDetail.vue"),
          meta: { title: '运动项目' }
        },
        {
          path: 'class_homework',
          name: 'smartSport_classHomework',
          component: () => import("@/views/smartSport/homework/ClassHomework.vue"),
          meta: { title: '班级作业' }
        },
        {
          path: 'leave_message',
          name: 'smartSport_leaveMessage',
          component: () => import("@/views/smartSport/homework/LeaveMessage.vue"),
          meta: { title: '留言' }
        },
        {
          path: 'sport_record',
          name: 'smartSport_sportRecord',
          component: () => import("@/views/smartSport/homework/SportRecord.vue"),
          meta: { title: '运动记录' }
        }
      ]
    }
]
