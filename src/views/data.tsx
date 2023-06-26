import { useEffect, useState } from "react";
import styles from './data.module.less';

export function Data() {
  const [data, setData] = useState<string[]>([]);
  const [timer, setTimer] = useState<any[]>([]);


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
    let mixtureArr = groupsFn(mixture);

    //分堆定时渲染
    for (let i = 0; i < mixtureArr.length; i++) {
      //相当于创建很多定时任务去处理
      let timer = setTimeout(() => {
        console.log(i)
        setData((x: string[]) => [...x, ...mixtureArr[i]]);//赋值渲染
      }, 6000 * i)
      setTimer((x) => [...x, timer]);
    }
  }, []);


  function onStopRender() {
    for (let i = 0; i < timer.length; i++) {
      clearTimeout(timer[i]);
    }
  }
  return (
    <div className={styles.dataContainer}>
      <div className={styles.dataItems}>
        <h1>数字+字母</h1>
        <h1><button onClick={onStopRender}>停止渲染</button></h1>
        <div>
          {
            data.map((v, index) => <button key={index}>{v}</button>)
          }
        </div>
      </div>
    </div>
  )
}