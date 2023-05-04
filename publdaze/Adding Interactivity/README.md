# Responding to Events

## Adding event handlers

- 이벤트 핸들러 함수는 보통 컴포넌트 안에 정의한다.
- 이름은 `handle`로 시작해서 뒤에 이벤트 이름이 따라 오도록 짓는다.
- 짧은 함수의 경우 JSX 안에 inline으로 정의할 수 있다.

+)
이벤트 핸들러에 전달되는 함수는 호출되는 것이 아니라 전달 되어야 함
|passing a function (correct) |calling a function (incorrect) |
|--------------------------------|----------------------------------|
|`<button onClick={handleClick}>`|`<button onClick={handleClick()}>`|

두 번째 예에서는 JavaScript가 JSX 중괄호 안에서 실행되기 때문에 클릭 없이 렌더링 중에 `handleClick()` 함수를 실행함

## Reading props in event handlers

이벤트 핸드러는 컴포넌트 안에 명시되어 있기 때문에 컴포넌트의 props에 접근 가능

## Passing event handlers as props

이벤트 핸들러를 props로 전달하여 내부 컴포넌트에서 사용 가능

## Naming event handler props

사용자 지정 이벤트를 반들 때 이벤트 핸들러 props는 `on`으로 시작하고 뒤에는 대문자가 와야 함

## Event propagation

이벤트 핸들러는 컴포넌트가 가질 수 있는 children로부터의 이벤트도 catch할 수 있는데 이를 이벤트가 트리 위로 "bubbles" 혹은 "propagates"된다고 말한다.

ex.
div와 button에 둘다 핸들러가 있을 경우 버튼을 클릭하면 button의 핸들러가 먼저 실행된 다음 div의 핸들러가 실행된다.

```jsx
export default function Toolbar() {
  return (
    <div
      className="Toolbar"
      onClick={() => {
        alert("You clicked on the toolbar!");
      }}
    >
      <button onClick={() => alert("Playing!")}>Play Movie</button>
      <button onClick={() => alert("Uploading!")}>Upload Image</button>
    </div>
  );
}
```

## Stopping propagation

이벤트 핸들러는 유일한 인자로 event object를 받는다. 이는 일반적으로 `e`로 호출한다.
event object는 propagation을 멈추게 할 수 있다. 이벤트가 부모 구성 요소에 도달하는 것을 방지하고 싶다면 `e.stopPropagation()`를 핸들러 내부에서 호출할 수 있다.

+) DEEP DIVE - Capture phase events
드물게 propagation을 중지했음에도 자식 요소의 모든 이벤트를 얻고 싶은 경우 이벤트 이름 뒤에 Capture을 추가해주면 된다.

## Passing handlers as alternative to propagation

## Preventing default behavior

어떤 브라우저의 이벤트는 그와 관련된 기본 동작을 가진다.
ex. \<form>이 이벤트를 제출했을 때 전체 페이지가 리로드 됨

이 때 `e.preventDefault()` 를 호출하여 해당 동작이 일어나는 걸 막을 수 있다.

주의)

- `e.stopPropagation()`는 위의 태그에 연결된 이벤트 핸들러의 실행을 중지
- `e.preventDefault()` 몇 가지 이벤트에 대한 기본 브라우저 동작을 방지

## Can event handlers have side effects?

이벤트 핸들러는 side effects가 발생하기 최적의 장소

# State: A Component's Memory

## When a regular variable isn’t enough

- 지역 변수는 렌더링 간에 유지되지 않음 - React가 이 구성 요소를 두 번째로 렌더링할 때 변경사항에 대한 고려 없이처음부터 렌더링 함
- 로컬 변수를 변경해도 렌더링이 트리거되지 않음 - React는 새 데이터로 구성 요소를 다시 렌더링해야 한다는 것을 인식하지 못함
  =>
- 렌더링 간에 데이터를 유지 함
- React를 트리거하여 새 데이터로 구성 요소를 렌더링 함(다시 렌더링)

## Adding a state variable

state 변수를 사용하기 위해서 `useState`를 파일 상단에 import 해야 함

ex.
`const [index, setIndex] = useState(0);`

여기서 index는 state 변수이며, setIndex는 setter 함수

### Meet your first Hook

`useState`는 `use`로 시작하는 다른 함수 처럼 **Hook**이라고 부름
Hook은 React가 렌더링 되는 동안만 사용할 수 있는 특수 함수이다.

+)
hookdms 조건, 루프, 기타 중첩 함수 내에서 호출 불가

### Anatomy of useState

useState의 유일한 인자로 state 변수의 초기값을 넘겨줄 수 있다.

## Giving a component multiple state variables

한 컴포넌트에 여러 개의 state를 사용할 수 있다.

state가 관련이 없을 경우 다수의 state를 사용하는 건 좋은 생각이나, 두 state를 자주 같이 변경한다면 그것을 하나로 합치는 게 더 쉬울 것이다.

ex. 필드가 많은 양식

## State is isolated and private

같은 컴포넌트를 두 번 렌더링 할 경우 컴포넌트 내의 state는 독립적이며 서로 영향을 주지 않는다.

# Render and Commit

UI 요청하고 제공하는 프로세스

1. Triggering a render (손님의 주문을 주방으로 전달)
2. Rendering the component (주방에서 주문 준비)
3. Committing to the DOM (테이블에 가져다 주기)

## Step 1: Trigger a render

컴포넌트를 렌더링 되는 2가지 이유

- 컴포넌트의 initial render될 때
- 컴포넌트의 state는 update 될 때

### Initial render

앱을 시작할 때, initial render를 트리거 해야한다.
대상 DOM node를 `createRoot`로 호출한 후 `render` 메서드로 이를 호출한다.

### Re-renders when state updates

일단 컴포넌트가 처음 렌더링되면 set함수로 state를 업데이트 함으로써 추가적인 렌더링을 트리거 할 수 있다. - 컴포넌트의 state를 업데이트하면 자동적으로 렌더링 대기열에 추가된다.

## Step 2: React renders your components

render를 트리거 한 후, 리액트는 화면에 무엇을 표시할 지 알아내기 위해 컴포넌트를 호출 한다.
렌더링이란: 리액트가 컴포넌트를 호출하는 것이다.

## Step 3: React commits changes to the DOM

구성 요소를 렌더링(호출)한 후 React는 DOM을 수정한다.

- React는 렌더링 간에 차이가 있는 경우에만 DOM 노드를 변경

## Epilogue: Browser paint

렌더링이 완료되고 React가 DOM을 업데이트한 후 브라우저는 화면을 repaint하는데, 프로세스는 이른 browser rendering으로 알고 있지만 이 문서에서는 혼동을 피하기 위해 painting이라고 일컫는다.

## 스냅샷으로서의 State

### state를 설정하여 렌더링 유발한다.

```jsx
import { useState } from "react";

export default function Form() {
  const [isSent, setIsSent] = useState(false);
  const [message, setMessage] = useState("Hi!");

  if (isSent) {
    return <h1>Your message is on its way!</h1>;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setIsSent(true);
      }}
    >
      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
}
```

버튼을 클릭시 동작은 다음과 같습니다.

1. `onSubmit` 이벤트 핸들러가 실행됩니다.
2. `setIsSent(true)`가 `isSent`를 `true`로 설정하고 새로운 렌더링을 큐에 넣습니다.
3. React는 새로운 `isSent`값에 따라 컴포넌트를 다시 렌더링합니다.

### 렌더링은 각 시점에 스냅샷을 생성한다.

> 렌더링이란?
> React가 컴포넌트 함수를 호출하는 것

함수로부터 반환되는 JSX는 시간상 UI의 스냅샷과 같습니다.
이 때 props, event handlers, local variales은 렌더링 시의 값을 계산하여 사용됩니다.

**리렌더링 과정**
![Image](https://user-images.githubusercontent.com/78250089/236166079-b2614fed-8fa2-425e-8999-20aedd80dadd.png)

**state 업데이트로 인한 렌더링 과정**
![Image](https://user-images.githubusercontent.com/78250089/236168775-37fbe024-d968-40ae-9013-6e72187cf53a.png)

예시)

```jsx
const [number, setNumber] = useState(0);
// ...
<button
  onClick={() => {
    setNumber(number + 1);
    setNumber(number + 1);
    setNumber(number + 1);
  }}
>
  +3
</button>;
```

state를 설정하면 다음 렌더링에 대해서만 변경되기 때문에
첫 번째 렌더링시 `number`는 `0`이었으니 `onClick`핸들러에서 `setNumber(number + 1)`가 호출된 후에도 `number`의 값은 여전히 0이 됩니다.

### 시간 경과에 따른 State

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

두 코드 다 같은 렌더링 중(스냅샷을 찍었을 때)의 값을 반영하기 때문에 값이 변경되기 전 값을 띄워줍니다.
