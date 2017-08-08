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
