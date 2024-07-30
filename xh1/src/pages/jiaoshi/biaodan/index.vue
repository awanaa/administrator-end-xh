<template>
    <div>
       <el-table :data="tableData" style="width: 100%;" height="695px">
         <el-table-column fixed prop="name" label="名字" width="120" />
         <el-table-column prop="state" label="性别" width="120" />
         <el-table-column prop="city" label="学科" width="120" />
         <el-table-column prop="address" label="工科" width="300" />
         <el-table-column prop="zip" label="联系电话" width="300" />
         <el-table-column prop="phone" label="电子邮件" width="300" />
         <el-table-column prop="date" label="入职时间" width="150" />
         <el-table-column label="操作" width="150">
           <template #default="scope">
             <el-button @click="handleDelete(scope.$index)" type="text" size="small">删除</el-button>
           </template>
         </el-table-column>
       </el-table>
     </div>
   </template>
   
   <script setup lang="ts">
   import { ref } from 'vue';
   const tableData = ref([
     {
       date: '2016-05-03',
       name: 'Tom',
       state: '男',
       city: '英语',
       address: '202312341111',
       zip: '18818492242',
       phone: '18818492242@qq.com',
       
     },
     {
       date: '2016-05-03',
       name: 'Tom',
       state: '男',
       city: '英语',
       address: '202312341111',
       zip: '18818492242',
       phone: '18818492242',
       
     },  {
       date: '2016-05-03',
       name: 'Tom',
       state: '男',
       city: '英语',
       address: '202312341111',
       zip: '18818492242',
       phone: '18818492242',
       
     },  {
       date: '2016-05-03',
       name: 'Tom',
       state: '男',
       city: '英语',
       address: '202312341111',
       zip: '18818492242',
       phone: '18818492242',
       
     },  {
       date: '2016-05-03',
       name: 'Tom',
       state: '男',
       city: '英语',
       address: '202312341111',
       zip: '18818492242',
       phone: '18818492242',
       
     },
   ])
   const handleDelete = (index: number) => {
     tableData.value.splice(index, 1);
   };
   </script>
   
   <style scoped lang="scss">
   ::v-deep .el-table__header {
       
     height: 76px; // 新的头部高度
   //   opacity: 0.83;
     background-color: #a4a2a2!important;
     border: 1px solid #797979;
   }
   ::v-deep .el-table__row {
     height: 70px; // 新的表格高度
   }
   </style>