export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // 1.查找之前数组中是否有该商品
      let oldProduct = context.state.cartList.find((item) => {
        return item.iid === payload.iid
      })
      // 2.判断oldProduct
      if(oldProduct) {
        // oldProduct.count += 1
        context.commit('addCounter', oldProduct)
        resolve('商品数量加一~')
      }else {
        // state.cartList.push(payload)
        context.commit('addToCart', payload)
        resolve('加入购物车成功~')
      }
    })

  }
}
