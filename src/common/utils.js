/**
 * 防抖函数
 * @param func
 * @param delay
 * @returns {function(...[*]=)}
 */
export function debounce(func, delay) {
  //保存定时器
  let timer = null
  return function (...args) {
    if(timer){
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
