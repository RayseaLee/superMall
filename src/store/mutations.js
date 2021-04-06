export default {
  // mutations唯一的目的就是修改state中的状态
  // mutations中的每个方法尽可能完成的事件比较单一一点
  addCounter(state, payload) {
    //对已经在购物车的商品数量加一
    payload.count++
  },
  addToCart(state, payload) {
    //加入购物车
    payload.count = 1
    payload.checked = true
    state.cartList.push(payload)

  }
}
