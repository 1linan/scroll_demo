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

  useEffect(() => {
    const wrapper: any = wrapperRef?.current;
    function scrollUp() {
      if (scrolling) return;
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

    let startY = 0; // 触摸起始位置的 y 坐标
    let endY = 0; // 触摸结束位置的 y 坐标

    // 监听 touchstart 事件
    wrapper.addEventListener("touchstart", function (e: any) {
      startY = e.touches[0].pageY;
    });

    let index = 0;
    // 监听 touchend 事件
    wrapper.addEventListener("touchend", function (e: any) {
      endY = e.changedTouches[0].pageY;
      const deltaY = endY - startY; // 计算 y 坐标的差值
      if (deltaY > 0) {
        debounce(scrollUp(), 300);
      } else if (deltaY < 0) {
        debounce(scrollDown(), 300);
      }
    });

    function aa(e: any) {
      if (e.wheelDelta < 0) {
        index--;
        if (index < 0) {
          index = 0;
        }
      }
      if (e.wheelDelta > 0) {
        index++;
        if (index > 3) {
          index = 3;
        }
      }

      if (wrapper) {
        wrapper.style.top = -index * 100 + "vh";
        wrapper.style.transition = `all 800ms cubic-bezier(.34,.86,.71,.95) 0s`;
      }
    }

    window.addEventListener("mousewheel", throttle(aa, 800));
    window.addEventListener("wheel", throttle(aa, 800));
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
