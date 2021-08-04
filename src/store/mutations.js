import {ADD_TO_CART, ADD_COUNTER} from './mutation-type'
export default {
  [ADD_COUNTER](state, payload) {
    payload.count++
  },
  [ADD_TO_CART](state, payload) {
    state.cartList.push(payload)
  }
  // mutations 的方法尽量单一
  /* addCart(state, payload) {

    // 将添加的商品进行判断，若为已添加的商品，则在其 count += 1，否则添加商品，并将其 count = 1
    // let oldProduct = null
    // for (let item of state.cartList) {
    //   if(item.iid === payload.iid) {
    //     oldProduct = item
    //     break
    //   }
    // }

    // if(oldProduct) {
    //   oldProduct.count += 1
    // } else {
    //   payload.count = 1
    //   state.cartList.push(payload)
    // }

    // Array.find() 返回查找到的元素
    const oldProduct = state.cartList.find(item => item.iid === payload.iid)

    if(oldProduct) {
      oldProduct.count += 1
    } else {
      payload.count = 1,
      state.cartList.push(payload)
    }
  } */
}