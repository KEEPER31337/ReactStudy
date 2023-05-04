# State as a Snapshot

- 아래 버튼이 클릭 되었을 때 일반적으로 기대하는 결과는 number += 3이다.  
  하지만 실제 결과를 확인해보면 number에서 1만 증가하는데 그 이유는 state는 다음 렌더링 시 변경되어 적용되기 때문에 현재 number 값이 0이라면 세 번의 setNumber 모두 `setNumber(0 + 1);`의 명령을 수행하고 number 값은 1로 변경된다.
  `jsx
<button onClick={() => {
setNumber(number + 1);
setNumber(number + 1);
setNumber(number + 1);
}}>+3</button>
`

- 아래 예제도 현재 number 값이 0이라면 `setNumber(0 + 5);`와 `alert(0);`를 수행하게 되며 이후 number 값은 5가 된다.

  ```jsx
  <button
    onClick={() => {
      setNumber(number + 5);
      alert(number);
    }}
  >
    +5
  </button>
  ```

- 위의 예제에서 시간 지연을 추가하여 alert를 3초 뒤에 실행되게 하였다. 하지만 실행되는 결과는 위와 동일하게 number + 5된 값이 아닌 현재 number 값이 alert로 전달된다.
  ```jsx
  <button
    onClick={() => {
      setNumber(number + 5);
      setTimeout(() => {
        alert(number);
      }, 3000);
    }}
  >
    +5
  </button>
  ```

<br/>

# Queueing a Series of State Updates

- 위와 같이 state 값을 여러번 변경하려면 아래와 같이 `n => n + 1`이라는 함수 형태로 전달하면 된다. 아래 코드를 실행하면 의도한대로 number값이 3 증가하는 것을 확인할 수 있다.

  ```jsx
  <button
    onClick={() => {
      setNumber((n) => n + 1);
      setNumber((n) => n + 1);
      setNumber((n) => n + 1);
    }}
  >
    +3
  </button>
  ```

- 아래 예제는 number + 5가 먼저 수행되고 이후 `n => n + 1` 함수가 수행되기 때문에 버튼 클릭시 마다 값이 6 증가하는 것을 확인할 수 있다.

  ```jsx
  <button onClick={() => {
  setNumber(number + 5);
  setNumber(n => n + 1);
  }}>
  ```

- 아래 예제는 위의 코드 마지막에 `setNumber(42);`가 추가되었는데 `setNumber(42);` 실행 후 number = 42가 되어 number 값은 최종적으로는 42가 된다.

  ```jsx
  <button onClick={() => {
  setNumber(number + 5);
  setNumber(n => n + 1);
  setNumber(42);
  }}>
  ```

- 명명 규칙: state 첫 글자로 하는 것이 일반적

```jsx
setEnabled((e) => !e);
setLastName((ln) => ln.reverse());
setFriendCount((fc) => fc * 2);
```
