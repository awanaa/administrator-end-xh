/*
 * @Author: caiyf
 * @Email: caiyifei@etonedu.cn
 * @Date: 2023-02-14 17:03:20
 * @Last Modified by: caiyf
 * @Last Modified time: 2023-11-20 17:42:13
 * @Description: 获取card文件夹下的第一层.vue文件的集合
 */

const requireComponent = require.context(
    // 其组件目录的相对路径
    '../components',
    // 是否查询其子目录
    false,
    // 匹配基础组件文件名的正则表达式
    /\w+\.vue$/
)

// 对象存放所有子组件
const components = {}
requireComponent.keys().forEach(filePath => {
    const name = filePath.split('/').pop().replace(/\.\w+$/, '')
    components[name] = requireComponent(filePath).default
})

export default components