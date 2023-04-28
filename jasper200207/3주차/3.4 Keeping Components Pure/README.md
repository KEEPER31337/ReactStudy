# Purity ( 순수함 )

## Pure Function ( 순수함수 ) 란?

- 자기 업무만 신경쓴다 : 해당 함수가 생성되기 전에 존재했던 변수나 오브젝트를 바꾸지 않는다.
- 같은 입력, 같은 출력 : 같은 입력이 들어오면 항상 같은 출력이 나온다

예시 : 입력된 수를 두배해서 출력하는 함수

```jsx
function double(number) {
  return 2 * number;
}
```

## 리엑트의 순수함

리엑트는 항상 순수한 컴포넌트를 원한다. 즉, 같은 `props`가 들어오면 같은 `JSX`로 리턴한다.

예시 : 해당 `Cup` 컴포넌트는 순수하지않다! 컴포넌트 밖의 `guest` 변수를 바꾼다.

```jsx
let guest = 0;

function Cup() {
  // Bad: changing a preexisting variable!
  guest = guest + 1;
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaSet() {
  return (
    <>
      <Cup />
      <Cup />
      <Cup />
    </>
  );
}
```

예시 : 순수해진 `Cup`

```jsx
function Cup({ guest }) {
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaSet() {
  return (
    <>
      <Cup guest={1} />
      <Cup guest={2} />
      <Cup guest={3} />
    </>
  );
}
```

## Local Mutation

순수한 컴포넌트는 밖의 변수를 바꾸지 않는다 하지만 컴포넌트 안에서는 허용된다

예시 : `TeaGathering` 내부의 `cups` 배열이 바뀌고 있다

```jsx
function Cup({ guest }) {
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaGathering() {
  let cups = [];
  for (let i = 1; i <= 12; i++) {
    cups.push(<Cup key={i} guest={i} />);
  }
  return cups;
}
```

`TeaGathering`안의 배열이기에 안에서 바뀌어도 `TeaGathering` 컴포넌트 안에서만 일어나는 일이다.

이렇게 안에서 바뀌는 현상을 `Local Mutation`이라고 한다.

## Side Effects

화면을 업데이트 하거나, 애니메이션을 시작하거나, 데이터를 바꾸는 등 렌더링 중이 아닐 때 작동하는 것들을 `Side Effects`라고 한다. 이러한 `Side Effects`는 `event handlers` 안에 존재한다.

리엑트의 함수형 프로그래밍에서는 순수함을 중요시 하지만, `Side Effects`는 예외로 둔다. 즉, `event handlers`는 순수할 핗요가 없다!

`useEffect`도 렌더링 이후에 작동하지만 최후의 수단으로 남겨두자!

가능하면 대부분의 로직을 렌더링만으로 이뤄지도록 만들자!
