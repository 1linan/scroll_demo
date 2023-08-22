import React, { useCallback, useEffect, useRef } from "react";
import { useWindowSize } from "react-use";
import "./App.css";
import { Page1 } from "./components/page1";
import { Page2 } from "./components/page2";
import { Page3 } from "./components/page3";
import { Page4 } from "./components/page4";
import { Header } from "./components/Header/index";
import { useGesture } from "@use-gesture/react";

let currentPage = 1;
let scrolling = false;
function App() {
  const { height, width } = useWindowSize();
  const wrapperRef: any = useRef(null);

  function doSomethingWith(state: any) {
    console.log(state);
    const {
      active,
      movement: [mx],
      direction: [, dy],
      cancel,
    } = state;
    if (dy === 1) {
      scrollUp();
    } else {
      scrollDown();
    }
    console.log(active, mx, dy, "down");
  }

  const wheelOffset = useRef(0);
  const dragOffset = useRef(0);

  function doSomethingWith2(state: any) {
    //console.log(state, "结束");

    const {
      active,
      movement: [mx],
      direction: [, dy],
      cancel,
    } = state;
    if (dy === 1) {
      //鼠标向上滚动，内容向下

      console.log(currentPage, "page");
      if (currentPage < 4) {
        currentPage += 1;
      } else {
        return;
      }
    } else {
      if (currentPage > 1) {
        currentPage -= 1;
      } else {
        return;
      }
    }
  }

  function onScrollEnd(state: any) {
    console.log(state, "滚动");
  }
  function scrollUp() {
    console.log("滚动向上");
    if (scrolling) return;
    const wrapper: any = wrapperRef?.current;
    if (!wrapper) return;
    if (currentPage === 2) {
      wrapper.style.transform = `translate3d(0px, 0px, 0px)`;
      wrapper.style.transition = `all 800ms cubic-bezier(.34,.86,.71,.95) 0s`;
      // setTimeout(() => {
      //   currentPage = 1;
      // }, 800);
      return;
    }
    if (currentPage === 3) {
      wrapper.style.transform = `translate3d(0px, -${height}px, 0px)`;
      wrapper.style.transition = `all 800ms cubic-bezier(.34,.86,.71,.95) 0s`;
      // setTimeout(() => {
      //   currentPage = 2;
      // }, 800);
      return;
    }
    if (currentPage === 4) {
      wrapper.style.transform = `translate3d(0px, -${2 * height}px, 0px)`;
      wrapper.style.transition = `all 800ms cubic-bezier(.34,.86,.71,.95) 0s`;
      // setTimeout(() => {
      //   currentPage = 3;
      // }, 800);
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
  const bind = useGesture({
    // onDrag: (state) => doSomethingWith(state),
    // onDragStart: (state) => doSomethingWith(state),
    // onDragEnd: (state) => doSomethingWith(state),
    // onPinch: (state) => doSomethingWith(state),
    // onPinchStart: (state) => doSomethingWith(state),
    // onPinchEnd: (state) => doSomethingWith(state),
    // onScroll: (state) => doSomethingWith(state),
    onScrollStart: (state) => onScrollEnd(state),
    //onScrollEnd: (state) => onScrollEnd(state),
    // onMove: (state) => doSomethingWith(state),
    // onMoveStart: (state) => doSomethingWith(state),
    // onMoveEnd: (state) => doSomethingWith(state),
    // onWheel: (state) => doSomethingWith(state),
    onWheelStart: (state) => doSomethingWith(state),
    onWheelEnd: (state) => doSomethingWith2(state),

    onWheel: ({ event, offset: [, y], direction: [, dy] }) => {
      event.preventDefault();
      if (dy) {
        wheelOffset.current = y;
        console.log(dy, "dy");
        // runSprings(dragOffset.current + y, dy);
      }
    },
    //onHover: (state) => doSomethingWith(state),
  });

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
    // 给页面绑定鼠标滚轮事件,针对火狐的非标准事件
    // window.addEventListener("DOMMouseScroll", scrollFunc); // 给页面绑定鼠标滚轮事件，针对Google，mousewheel非标准事件已被弃用，请使用 wheel事件代替
    // window.addEventListener("wheel", scrollFunc); // ie不支持wheel事件，若一定要兼容，可使用mousewheel
    // window.addEventListener("mousewheel", scrollFunc);

    let startY = 0; // 触摸起始位置的 y 坐标
    let endY = 0; // 触摸结束位置的 y 坐标

    // 监听 touchstart 事件
    // document.addEventListener("touchstart", function (e) {
    //   startY = e.touches[0].pageY;
    // });

    // // 监听 touchend 事件
    // document.addEventListener("touchend", function (e) {
    //   endY = e.changedTouches[0].pageY;
    //   const deltaY = endY - startY; // 计算 y 坐标的差值
    //   if (deltaY > 0) {
    //     debounce(scrollUp(), 300);
    //   } else if (deltaY < 0) {
    //     debounce(scrollDown(), 300);
    //   }
    // });
  }, [debounce, throttle, width, height]);

  return (
    <div className="App">
      <Header></Header>
      <div
        ref={wrapperRef}
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          zIndex: 9,
          paddingTop: "80px",
        }}
        {...bind()}
      >
        <Page1 />
        <Page2 />
        <Page3 />
        <Page4 />
      </div>
    </div>
  );
}

export default App;
