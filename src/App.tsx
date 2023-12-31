import React, { useCallback, useEffect, useRef } from "react";
import { useWindowSize } from "react-use";
import "./App.css";
import { Page1 } from "./components/page1";
import { Page2 } from "./components/page2";
import { Page3 } from "./components/page3";
import { Page4 } from "./components/page4";

let currentPage = 1;
let scrolling = false;
function App() {
  const { height, width } = useWindowSize();
  const wrapperRef: any = useRef(null);

  //节流
  const throttle = useCallback(function (func: any, delay: number) {
    let timer: any = null;
    return function (this: any, ...args: any[]) {
      if (!timer) {
        timer = setTimeout(() => {
          func.apply(this, args);
          timer = null;
        }, delay);
      }
    };
  }, []);

  //防抖
  const debounce = useCallback((func: any, delay: number) => {
    let timer: any;
    return function (this: any, ...args: any[]) {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }, []);

  // useEffect(() => {
  //   const wrapper: any = wrapperRef?.current;
  //   if (currentPage === 1) {
  //     wrapper.style.transform = `translate3d(0px, 0px, 0px)`;
  //   } else if (currentPage === 2) {
  //     wrapper.style.transform = `translate3d(0px, -${height - 80}px, 0px)`;
  //   }
  // }, [height]);

  useEffect(() => {
    function scrollUp() {
      if (scrolling) return;
      const wrapper: any = wrapperRef?.current;
      if (!wrapper) return;
      if (currentPage === 2) {
        wrapper.style.transform = `translate3d(0px, 0px, 0px)`;
        wrapper.style.transition = `all 800ms cubic-bezier(.34,.86,.71,.95) 0s`;
        setTimeout(() => {
          currentPage = 1;
        }, 800);
        return;
      }
      if (currentPage === 3) {
        wrapper.style.transform = `translate3d(0px, -${height}px, 0px)`;
        wrapper.style.transition = `all 800ms cubic-bezier(.34,.86,.71,.95) 0s`;
        setTimeout(() => {
          currentPage = 2;
        }, 800);
        return;
      }
      if (currentPage === 4) {
        wrapper.style.transform = `translate3d(0px, -${2 * height}px, 0px)`;
        wrapper.style.transition = `all 800ms cubic-bezier(.34,.86,.71,.95) 0s`;
        setTimeout(() => {
          currentPage = 3;
        }, 800);
        return;
      }
      return;
    }
    function scrollDown() {
      if (scrolling) return;
      const wrapper: any = wrapperRef?.current;
      if (!wrapper) return;
      if (currentPage === 1) {
        wrapper.style.transform = `translate3d(0px, -${height}px, 0px)`;
        wrapper.style.transition = `all 800ms cubic-bezier(.34,.86,.71,.95) 0s`;
        setTimeout(() => {
          currentPage = 2;
          scrolling = false;
        }, 800);
        return;
      }

      if (currentPage === 2) {
        wrapper.style.transform = `translate3d(0px, -${2 * height}px, 0px)`;
        wrapper.style.transition = `all 800ms cubic-bezier(.34,.86,.71,.95) 0s`;
        setTimeout(() => {
          currentPage = 3;
          scrolling = false;
        }, 800);
        return;
      }
      if (currentPage === 3) {
        wrapper.style.transform = `translate3d(0px, -${3 * height}px, 0px)`;
        wrapper.style.transition = `all 800ms cubic-bezier(.34,.86,.71,.95) 0s`;
        setTimeout(() => {
          currentPage = 4;
          scrolling = false;
        }, 800);
        return;
      }
      return;
    }

    function scrollFunc(e: any) {
      let el = e || window.event;
      el.stopPropagation();
      if (el.wheelDelta) {
        if (el.wheelDelta > 0) {
          //当鼠标滚轮向上滚动时
          scrollUp();
        }
        if (el.wheelDelta < 0) {
          //当鼠标滚轮向下滚动时
          scrollDown();
        }
      } else if (e.detail) {
        if (el.detail < 0) {
          //当鼠标滚轮向上滚动时
          scrollUp();
        }
        if (el.detail > 0) {
          //当鼠标滚轮向下滚动时
          scrollDown();
        }
      }
    }
    // 给页面绑定鼠标滚轮事件,针对火狐的非标准事件
    window.addEventListener("DOMMouseScroll", scrollFunc); // 给页面绑定鼠标滚轮事件，针对Google，mousewheel非标准事件已被弃用，请使用 wheel事件代替
    window.addEventListener("wheel", scrollFunc); // ie不支持wheel事件，若一定要兼容，可使用mousewheel
    window.addEventListener("mousewheel", scrollFunc);

    let startY = 0; // 触摸起始位置的 y 坐标
    let endY = 0; // 触摸结束位置的 y 坐标

    // 监听 touchstart 事件
    document.addEventListener("touchstart", function (e) {
      startY = e.touches[0].pageY;
    });

    // 监听 touchend 事件
    document.addEventListener("touchend", function (e) {
      endY = e.changedTouches[0].pageY;
      const deltaY = endY - startY; // 计算 y 坐标的差值
      if (deltaY > 0) {
        debounce(scrollUp(), 300);
      } else if (deltaY < 0) {
        debounce(scrollDown(), 300);
      }
    });
  }, [debounce, throttle, width, height]);

  return (
    <div className="App" ref={wrapperRef}>
      <Page1 />
      <Page2 />
      <Page3 />
      <Page4 />
    </div>
  );
}

export default App;
