/**
 * 初始化rem
 * @constructor
 */
export function DOMLoaded() {
  document.addEventListener('DOMContentLoaded', () => {
    computedREM();
  })
}

/**
 * 计算rem
 */
export function computedREM() {
  const html = document.documentElement;
  const windowWidth = html.clientWidth;
  html.style.fontSize = parseInt(windowWidth / 750 * 20) + 'px';
}

/**
 * 向下取整‘万’
 * @param number
 * @returns {*}
 */
export function conversion(number) {
  if (parseInt(number) > 10000) {
    return `${Math.floor((number / 10000))}万`
  }
  return number;
}

/**
 * 格式化多个歌手名
 * @param obj
 * @returns {string}
 */
export function filterSinger(obj) {
  let ret = [];
  obj.forEach((item) => {
    ret.push(item.name);
  });
  return ret.join(' / ');
}

/**
 * 获取列表所有歌曲id
 * @param list
 * @returns {string}
 */
export function getSongsId(list) {
  let ret = [];
  list.forEach((item) => {
    ret.push(item.id);
  });
  return ret.join(',');
}

/**
 * 指定区间随机数
 * @param min
 * @param max
 * @returns {number}
 */
export function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * 随机数组
 * @param arr
 * @returns {Array}
 */
export function randomArr(arr) {
  let _arr = arr.slice();
  for (let i = 0; i < _arr.length; i++) {
    let j = random(0, i);
    let t = _arr[i];
    _arr[i] = _arr[j];
    _arr[j] = t;
  }
  return _arr;
}

/**
 * 获取元素索引
 * @param arr
 * @param cur
 * @returns {number}
 */
export function findIndex(arr, cur) {
  return arr.findIndex((item) => {
    return item.id === cur.id;
  });
}









