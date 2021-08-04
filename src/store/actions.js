import { ADD_TO_CART, ADD_COUNTER } from './mutation-type'
export default {
  [ADD_TO_CART](context, payload) {
    return new Promise((resolve, reject) => {
      const oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

      if (oldProduct) {
        context.commit(ADD_COUNTER, oldProduct)
        resolve("当前商品+1")
      } else {
        payload.count = 1
        payload.checked = true
        context.commit(ADD_TO_CART, payload)
        resolve("添加新的商品")
      }
    })
  }
}