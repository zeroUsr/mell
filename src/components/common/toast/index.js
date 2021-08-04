import Toast from './Toast'

const obj = {}

// 自定义 $toast 组件
obj.install = (Vue) => {
  // 创建组件构造器
  const toastContrustor = Vue.extend(Toast)

  // 创建组件构造器的实例对象
  const toast = new toastContrustor()

  // 将组建对象手动挂载到某一个元素上
  toast.$mount(document.createElement('div'))

  // 将组件挂载到页面上
  document.body.appendChild(toast.$el)

  // 添加到 Vue 原型上
  Vue.prototype.$toast = toast

}

export default obj