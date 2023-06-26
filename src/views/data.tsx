import { useEffect, useState, useRef } from "react";
import styles from './data.module.less';

export function Data() {
  const wrapperRef: any = useRef(null);
  const [data, setData] = useState<string[]>([]);


  //分堆：将数据分成一堆50个,便于观察
  function groupsFn(arr: Array<string>) {
    let i = 0;
    let res = [];
    while (i < arr.length) {
      res.push(arr.slice(i, i + 50));
      i += 50;
    }
    return res;
  }

  useEffect(() => {
    let mixture = [];
    for (let i = 48; i <= 57; i++) {
      const firstChar = String.fromCharCode(i); // 获取数字 0-9 中的字符
      for (let j = 65; j <= 90; j++) {
        const secondChar = String.fromCharCode(j); // 获取字母 A-Z 中的字符
        for (let k = 48; k <= 57; k++) {
          const thirdChar = String.fromCharCode(k); // 再次获取数字 0-9 中的字符
          mixture.push(`${firstChar}${secondChar}${thirdChar}`);
        }
      }
    }
    //获取分堆后的数组
    let mixtureArr: string[][] = groupsFn(mixture);

    //分堆触底加载
    let Index = 0;
    function loadData(mixtureArr: string[][]) {
      if (Index < mixtureArr.length - 1) {
        console.log(Index)
        setData((x) => [...x, ...mixtureArr[Index - 1]]);
        Index++;
      }
    }

    loadData(mixtureArr);

    function scrollDown() {
      let wrapper = wrapperRef.current;
      if (wrapper) {
        const scrollHeight = wrapper.scrollHeight;
        const scrollTop = wrapper.scrollTop;
        const clientHeight = wrapper.clientHeight;

        if (scrollTop + clientHeight >= scrollHeight - 10) {
          loadData(mixtureArr);
        }
      }
    }


    function scrollUp() {

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

  }, [wrapperRef]);






  return (
    <div className={styles.dataContainer}>
      <div className={styles.dataItems}>
        <h1>数字+字母</h1>
        <div className={styles.items} ref={wrapperRef}>
          {
            data.map((v, index) => <button key={index}>{v}</button>)
          }
        </div>
      </div>
    </div>
  )
}