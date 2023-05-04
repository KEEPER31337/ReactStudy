# 4주차 Adding Interactivity 2

## 1-1. ****State as a Snapshot****

- state는 Snabshot처럼
    - set state를 해도, state가 바로 변경되는게 아닌, rerender가 trigger된다!
- rendering이란 react가 컴포넌트, 즉 함수를 호출하는 것. 이 함수는 ****호출되는 시점의 UI (snabShot)
- react는 이 snabShot과 일치하도록 업데이트!

💡 **발생하는 문제는?**

```jsx
<button onClick={() => { (0)
        setNumber(number + 1); //setNumber(1);
        setNumber(number + 1); //setNumber(1);
        setNumber(number + 1); //setNumber(0 + 1);
}}>+3</button>
```

- `setNumber(number + 1)` 다음 렌더링에서 1로 변경해라!(현재는 0)
- `setNumber(number + 1)` 다음 렌더링에서 1로 변경해라!(현재는 0)
- `setNumber(number + 1)` 다음 렌더링에서 1로 변경해라!(현재는 0)

💡 **시간 경과에 따른 state**

```jsx
<button onClick={() => {
        setNumber(number + 5);
        alert(number);
}}>+5</button>
```

- number(UI)가 0이며 alert(0) 한 다음
- number(UI)는 5가 될 것임.

```jsx
<button onClick={() => {
        setNumber(number + 5);
        setTimeout(() => {
          alert(number);
        }, 100);
}}>
```

- number(UI)가 5로 보이지만, alert(0)을 할 것임.

⇒ 해당 시점 snabshot의 number를 alert하기 때문에

➡️ 과거에 생성된 이벤트 핸들러는 해당 시점 렌더링의 상태 값을 갖는다

---

## 1-2. ****Queueing a Series of State Updates****

🚨 **React가 ‘batching’를 사용하여 여러 상태 업데이트를 처리하는 방법**

- **batching(일괄 처리)이란?**
    - React는 이벤트핸들러의 모든 코드가 끝난 뒤, state 업데이트! 재렌더링! 이를 batching이라고 함
    - **장점?** 여러 state를 업데이트해도, 그때마다 렌더링이 일어나는게 아니라 한번에!
    - **단점?**  이벤트 핸들러의 모든 코드가 끝날때까지 UI 변경은 없다!
    - 의도적인 이벤트(ex) 버튼 클릭)은 batching되지 않으니 걱정 노!

### **THEN, 어떻게 해결할까?**

- setState에 함수를 인자로 전달하자! **n => n + 1**
- 함수는 이전 state값을 전달받는다!
- 함수들은 queue에 저장되어 순차적으로 진행.
- ⇒ queue의 함수들이 순차적으로, 동기적으로 작동하면서 원하는대로 동작!

🚨 **동일한 상태 변수에** **여러 업데이트를 연속으로 적용하는 방법**

- **updater function(n => n + 1)** 을 사용
- 참고) setState(x)가 실제로는 setState(n => x)처럼 작동
- **How?**
    
    ```jsx
    <button onClick={() => {
            setNumber(n => n + 1);
            setNumber(n => n + 1);
            setNumber(n => n + 1);
    }}>+3</button> // + 3
    ```
    
    1. React는 이벤트 핸들러의 모든코드가 실행된 후, queue에 해당 state setter 3개를 넣는다.
    2. `setNumber(n => n+1)` 해당 함수를 queue에 추가
    3. `setNumber(n => n+1)` 해당 함수를 queue에 추가
    4. `setNumber(n => n+1)` 해당 함수를 queue에 추가
    5. 다음 렌더링에서 `useState`를 call한다 //`const [number, setNumber] = useState(0);`
    6. React는 queue를 통과한다.
        1. 1번째 updater function에 n(0)을 전달한다.
        2. 1번째 updater function의 반환값을 가져온뒤, 2번째 updater function의 n으로 전달한다. 
        3. 반복
    7. `useState` 에서 최종 state를 반환한다. ⇒ 적용이 된다! 
- **How**?
    - setState(x)가 실제로는 setState(n => x)처럼 작동
    
    ```jsx
    <button onClick={() => {
            setNumber(n => number + 5); //setNumber(number + 5);
            setNumber(n => number + 5); //setNumber(number + 5);
            setNumber(n => n + 1);
    }}>Increase the number</button> // + 6
    ```
    
    1. React는 이벤트 핸들러의 모든코드가 실행되고, state setter를 찾아서 queue에 넣어요~
    2. `setNumber(n => number + 5)` queue에 **state를 5로 replace** 추가(updater function이 아님)
    3. `setNumber(n => number + 5)` queue에 **state를 5로 replace** 추가(이전 상태값은 여전히 0)
    4. `setNumber(n => n+1)` 해당 함수를 queue에 추가
    5. 다음 렌더링에서 `useState`를 call한다(렌더링과정에서 queue처리)
    6. React는 queue를 통과한다.
        1. 최종 결과는 +6
    7. `useState` 에서 최종 state를 반환한다. ⇒ 적용이 된다! 

- **네이밍 규칙**
    - `setEnabled(prevEnabled => !prevEnabled)` 로 prefix 사용
    - `setEnabled(enabled => !enabled)` 로 state 변수이름 사용
    

➡️ **An updater function** (e.g. `n => n + 1`) gets added to the queue.

➡️ **Any other value** (e.g. number `5`) adds “replace with `5`” to the queue, ignoring what’s already queued.

## 과제 - queue를 직접 구현해보자!

Base state: **0**

Queue: **[5, n => n+1, n⇒ n+1]**

Expected result: 7

```jsx
export function getFinalState(baseState, queue) {
  let finalState = baseState;

 //구현해야할 부분
  for (let update of queue) {
    if (typeof update === 'function') {
      finalState = update(finalState); // 함수 동작
    } else {
      finalState = update; //값 바로 넣어줌
    }
  }
	//구현해야할 부분

  return finalState;
}
```
