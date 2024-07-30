<template>
    <div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="名字" width="180" /> 
        <el-table-column prop="class" label="班级" />
        <el-table-column prop="leader" label="班主任" />
        <el-table-column prop="date" label="入学时间" width="380" />
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button type="text" @click="handleClick(row)">编辑</el-button>
            <el-button type="text" @click="handleClick(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </template>
  
  <script setup lang="ts">
  const tableData = [
    { 
      name: 'Tom',
      class: '一班',
      leader: '张三',
      date: '2016-05-03',
    },
    {
      name: 'Tom',
      class: '一班',
      leader: '张三',
      date: '2016-05-03',
    },
    {
      name: 'Tom',
      class: '一班',
      leader: '张三',
      date: '2016-05-03',
    },

    {
      name: 'Tom',
      class: '一班',
      leader: '张三',
      date: '2016-05-03',
    },

    {
      name: 'Tom',
      class: '一班',
      leader: '张三',
      date: '2016-05-03',
    },

    {
      name: 'Tom',
      class: '一班',
      leader: '张三',
      date: '2016-05-03',
    },


  ];
  interface TableRow {
  name: string;
  class: string;
  leader: string;
  date: string;
}

const handleClick = (row: TableRow) => {
  console.log(row);
}
  
  </script>

<style scoped>

</style>
