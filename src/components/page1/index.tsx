import React from "react";

/**
 *
 * 踩坑记录，移动端开发使用height=100vh
 *
 *height:100vh,因为1vh单位代表了屏幕可视区域的1%，在开发中浏览器预览并没有任何问题。
 *然而，实际发了测试包，在IQOO手机上测试的时候出现了问题，本来应该占据一整屏的元素
 *超出了一整屏

 为什么？
 因为在高度上各手机的浏览器存在一定的差异，有的手机存在隐藏的地址栏和默认的底部按钮栏，
 导致实际的100vh其实并不是手机的视窗大小，这导致了本该置底的元素距离底部有一定距离


 解决办法：使用js动态改变盒子高度，即使用window.innerHeight来获取实际的屏幕高度


 参考文章：https://blog.csdn.net/a1015895218/article/details/114986691
 */
export function Page1() {
  return (
    <div
      style={{
        height: `${window.innerHeight}px`,
        background: "pink",
      }}
    >
      <h1>Page1</h1>
    </div>
  );
}
