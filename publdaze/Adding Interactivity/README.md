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

## 여러 state 업데이트를 큐에 담기

> state 변수를 설정하면 다음 렌더링이 큐(대기열, queue)에 들어갑니다. 그러나 경우에 따라 다음 렌더링을 큐에 넣기 전에, 값에 대해 여러 작업을 수행하고 싶을 때도 있습니다.

### state 업데이트 일괄처리

React는 state 업데이트를 하기 전에 이벤트 핸들러의 모든 코드가 실행될 때까지 기다립니다.
이렇게 하면 너무 많은 리렌더링을 촉발하지 않고 다수의 state 변수를 업데이트할 수 있습니다.
=> 이를 **batching**(일괄처리)이라고 합니다.

**batching**의 장점

- React 앱을 훨씬 빠르게 실행할 수 있게 합니다.
- 일부 변수만 업데이트된 “반쯤 완성된” 혼란스러운 렌더링을 처리하지 않아도 됩니다.

### 다음 렌더링 전에 동일한 state 변수를 여러 번 업데이트하기

렌더링 전에 동일한 state 변수를 여러 번 업데이트 하기 위해 이전 state를 기반으로 다음 state를 계산하는 함수를 전달할 수 있습니다.

`setNumber(number + 1)`
->
`setNumber(n => n + 1)`

여기서 `n => n + 1`는 **updater function**(업데이터 함수)

**updater function이 setter에 전달될 때 과정**

1. React는 이벤트 핸들러의 다른 코드가 모두 실행된 후에 이 함수가 처리되도록 큐에 넣습니다.
2. 다음 렌더링 중에 React는 큐를 순회하여 최종 업데이트된 state를 제공합니다.

ex.

```jsx
<button
  onClick={() => {
    setNumber(number + 5);
    setNumber((n) => n + 1);
  }}
>
  Increase the number
</button>
```

![Image](https://user-images.githubusercontent.com/78250089/236205602-876bb5e5-4891-4ea5-a2d9-b3a7185210fb.png)

### 업데이트 후 state를 바꾸면 어떻게 될까

```jsx
<button
  onClick={() => {
    setNumber(number + 5);
    setNumber((n) => n + 1);
    setNumber(42);
  }}
>
  Increase the number
</button>
```

![Image](https://user-images.githubusercontent.com/78250089/236206669-e3a14a9f-4824-4adb-8aaf-4494f69eae93.png)

주의)
updater function은 순수해야하며 결과만 반환해야 함!
updater function 내부에서 state를 변경하거나 다른 사이드 이팩트 실행하려고 하지 말기!

### 명명 규칙

업데이터 함수 인수의 이름은 해당 state 변수의 첫 글자로 지정하는 것이 일반적입니다.

ex.

```jsx
setEnabled((e) => !e);
setLastName((ln) => ln.reverse());
setFriendCount((fc) => fc * 2);
```

자세한 코드를 선호하는 경우

- 전체 state 변수 이름을 반복하거나 (ex. `setEnabled(enabled => !enabled)`)
- **prev** 접두사를 사용하는 것 (ex. `setEnabled(prevEnabled => !prevEnabled)`)

이 일반적인 규칙입니다.

## 객체 state 업데이트

> state는 객체를 포함해서, 어떤 종류의 JavaScript 값이든 저장할 수 있지만 React state에 있는 객체를 직접 변경하면 안 됩니다.
대신 객체를 업데이트하려면 새 객체를 생성하고(혹은 기존 객체의 복사본을 만들고), 해당 복사본을 사용하도록 state를 설정해야 합니다.

### mutation이란?

`number`, `string`, `boolean` 과 같은 JavaScript 값들은 읽기만 가능하고 immutable한 값입니다.  
이 값을 바꾸기 위해 re-render을 촉발할 수 있습니다.

객체 state의 경우 기술적으로 객체 자체의 내용을 변경하는 것이 가능합니다.  
=> 이를 **mutation**(변이)라고 합니다.

하지만 React에서 기술적으로 객체가 mutable하더라도, immutable한 것 처럼 다뤄야 합니다.  
즉, 객체를 직접 변경하는 대신, 항상 교체해야 합니다.

### state를 읽기 전용으로 취급해라

```jsx
onPointerMove={e => {
  position.x = e.clientX;
  position.y = e.clientY;
}}
```

위와 같은 코드에서는 이전 렌더링에서 position에 할당된 객체를 수정합니다.  
하지만 state 설정자 함수를 사용하지 않았으므로 React는 객체가 변경된 걸 알지 못합니다.  
따라서 렌더링에서 접근할 수 있는 state 값은 읽기 전용으로 취급해야 하며  
state mutating이 경우에 따라 작동할 수는 있으나, 권장하지는 않습니다.

->

```jsx
onPointerMove={e => {
  setPosition({
    x: e.clientX,
    y: e.clientY
  });
}}
```

`setPosition`을 사용하면 `position`을 새 객체로 바꾸고 해당 컴포넌트를 다시 렌더링 하므로 의도했던 동작이 잘 수행될 수 있습니다.


**[ DEEP DIVE ]**

```jsx
const nextPosition = {};
nextPosition.x = e.clientX;
nextPosition.y = e.clientY;
setPosition(nextPosition);
```

```jsx
setPosition({
  x: e.clientX,
  y: e.clientY
});
```


첫번째 코드처럼 방금 생성한 새로운 객체를 mutating하는 것은 괜찮으며 첫번째 코드와 두번째 코드는 완전히 동일합니다.

Mutation은 이미 state에 있는 객체를 변경할 때만 문제가 되며 방금 생성한 객체의 경우 다른 코드가 아직 참조하지 않으므로 객체를 변경해도 다른 객체에 영향을 미치지 않아 괜찮습니다.  
=> 이를 **local mutation**(지역 변이)라고 합니다. 지역변이의 경우 렌더링하는 동안에도 수행할 수 있습니다.

### spread 구문을 사용하여 객체 복사하기

새 객체를 생성할 때 기존 데이터도 복사하고 싶은 경우

```jsx
setPerson({
  firstName: e.target.value,
  lastName: person.lastName,
  email: person.email
});
```

이와 같이 모든 속성을 개별적으로 복사하는 방법 대신

```jsx
setPerson({
  ...person,
  firstName: e.target.value
});
```

이와 같이 `...` 객체 spread 구문을 사용할 수 있습니다.  

`...` spread 구문 앝은 복사로 한 단계 깊이만 복사한다는 점을 유의해야 합니다.  
-> 속도는 빠르지만 중첩된 속성을 업데이트 하려면 두 번 이상 사용해야 합니다.

**[ DEEP DIVE ]**

객체 내에서 동적 이름을 가진 속성도 지정할 수 있습니다.

```jsx
setPerson({
  ...person,
  [e.target.name]: e.target.value
});
```

`<input>` DOM 요소에 지정된 `name` 속성을 참조하여 사용할 수 있으며,
여러 필드에 대하여 여러 핸들러로 분리하여 사용하는 대신 단일 핸들러를 사용할 수 있습니다.

### 중첩된 객체 업데이트하기

```jsx
const [person, setPerson] = useState({
  name: 'Niki de Saint Phalle',
  artwork: {
    title: 'Blue Nana',
    city: 'Hamburg',
    image: 'https://i.imgur.com/Sd1AgUOm.jpg',
  }
});
```

위의 중첩된 객체 구조에서 `person.artwork.city`를 업데이트 하고 싶으면  
`person.artwork.city = 'New Delhi';` 처럼 mutation을 사용하는 방법이 명확합니다.

하지만 React에서는 state를 immutable하게 다뤄야하므로  
`city`를 변경하려면 먼저 새 `artwork` 객체를 생성한 다음 새 `artwork`을 가리키는 새로운 `person` 객체를 생성해야 합니다.  

```jsx
const nextArtwork = { ...person.artwork, city: 'New Delhi' };
const nextPerson = { ...person, artwork: nextArtwork };
setPerson(nextPerson);
```

단일 함수 호출로도 작성할 수 있습니다.

```jsx
setPerson({
  ...person,
  artwork: {
    ...person.artwork,
    city: 'New Delhi'
  }
});
```

**[ DEEP DIVE ]**

코드가 실행될 때

```jsx
let obj = {
  name: 'Niki de Saint Phalle',
  artwork: {
    title: 'Blue Nana',
    city: 'Hamburg',
    image: 'https://i.imgur.com/Sd1AgUOm.jpg',
  }
};
```

이와 같은 객체는 실제로 중첩된 객체가 아닌 

```jsx
let obj1 = {
  title: 'Blue Nana',
  city: 'Hamburg',
  image: 'https://i.imgur.com/Sd1AgUOm.jpg',
};

let obj2 = {
  name: 'Niki de Saint Phalle',
  artwork: obj1
};
```

이와 같이 서로 다른 객체를 보고 있습니다.  

여기서 `obj1`은 `obj2`의 내부에 있지 않으므로 다른 객체에서도 사용할 수 있습니다.

### Immer로 간결한 업데이트 로직 작성

Immer는 mutating 구문을 사용하여 작성하더라도 자동으로 사본을 생성해주는 편리한 인기 라이브러리입니다.

```jsx
updatePerson(draft => {
  draft.artwork.city = 'Lagos';
});
```

이와 같이 객체를 mutating하는 것 처럼 사용할 수 있으니 일반 mutation과 달리 이전 state를 덮어쓰지 않습니다.

**[ DEEP DIVE ]**

Immer는 어떻게 동작하는가

> Immer에서 제공하는 draft는 프록시라는 특수한 유형의 객체로, 사용자가 수행하는 작업을 “기록”합니다. 그렇기 때문에 원하는 만큼 자유롭게 수정할 수 있습니다! Immer는 내부적으로 draft의 어떤 부분이 변경되었는지 파악하고 편집 내용이 포함된 완전히 새로운 객체를 생성합니다.

Immer을 사용하기 위해
1. `npm install use-immer`을 실행하여 설치합니다.
2. `useState` 대신 `import { useImmer } from 'use-immer'`로 useImmer을 사용합니다.

```jsx
import { useImmer } from 'use-immer';

export default function Form() {
  const [person, updatePerson] = useImmer({
    name: 'Niki de Saint Phalle',
    artwork: {
      title: 'Blue Nana',
      city: 'Hamburg',
      image: 'https://i.imgur.com/Sd1AgUOm.jpg',
    }
  });

  function handleNameChange(e) {
    updatePerson(draft => {
      draft.name = e.target.value;
    });
  }

  function handleTitleChange(e) {
    updatePerson(draft => {
      draft.artwork.title = e.target.value;
    });
  }

  function handleCityChange(e) {
    updatePerson(draft => {
      draft.artwork.city = e.target.value;
    });
  }

  function handleImageChange(e) {
    updatePerson(draft => {
      draft.artwork.image = e.target.value;
    });
  }
}
```

이와 같이 state에 중첩이 있고 객체를 복사하는 코드가 반복되는 경우 업데이트 핸들러를 간결하게 유지하는 데 Immer는 좋은 방법입니다.

**[ DEEP DIVE ]**

React에서 state mutating을 권장하지 않는 이유

- Debugging
  - 렌더링 사이에 state가 어떻게 변경 되었는 지 명확하게 확인 가능합니다.
- Optimizations
  - state가 전과 후 동일하다면 작업을 건너뛰는 것이 가능하기 때문에 변경이 있었는 지 확인하는 것이 매우 빠릅니다.
- New Features
  - 현재 React에서 개발중인 기능이 state가 스냅샷처럼 취급되는 것에 의존합니다.
- Requirement Changes
  - 과거의 state 복사본을 메모리에 보관하면 필요할 때 재사용할 수 있기 때문에 실행 취소/다시 실행 구현, 변경 내역 표시, 사용자가 양식을 이전 값으로 재설정할 수 있도록 하는 등 기능을 추가하기에도 좋습니다.
- Simpler Implementation
  - 많은 “반응형” 솔루션처럼 프로퍼티를 가로채거나, 항상 프록시로 감싸거나, 초기화할 때 다른 작업을 하는 등 객체에 특별한 작업을 할 필요가 없습니다.
