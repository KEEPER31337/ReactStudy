# State의 필요성

예시 : 버튼을 누르면 숫자가 1씩 늘어난다

```jsx
export default function Gallery() {
  let index = 0;

  function handleClick() {
    index = index + 1;
  }

  return (
    <>
      <button onClick={handleClick}>Next</button>
      <h3>{index + 1}</h3>
    </>
  );
}
```

1. 지역변수는 렌더링할때 유지되지 않는다
   `index`는 렌더링될때 처음과 같이 0으로 정의된다
2. 지역변수가 바뀌더라도 다시 렌더링 되지 않는다
   `handlClick`이 실행되어 `index`가 1 증가하더라고 다시 렌더링 되지 않는다

즉, 컴포넌트에 변화하는 값을 넣기 위해선 다음과 같은 조건을 만족해야 한다

1. 렌더링할때, 유지되는 변수
2. 값이 변화했을 때, 다시 렌더링 시키는 변수

`useState`가 모든 조건을 만족한다!

# useState 사용해보기

먼저, `useState`를 `import` 해야 한다. `useState`는 `react`안에 있다!

```jsx
import { useState } from "react";
```

`useState`를 사용해서 변수를 선언할수 있다.

```jsx
const [index, setIndex] = useState(0);
```

set함수를 이용하여 변수의 값을 바꿀수 있다

```jsx
function handleClick() {
  setIndex(index + 1);
}
```

**참고! - Hook 이란?**

`React`에서 `useState`와 같이 use로 시작하는 함수들을 `Hook`이라 부른다.

`Hook`은 React가 렌더링 될때만 동작하는 특별한 함수이다.

직접 `Hook`을 만들어 사용할수도 있다!

`Hook`은 `component` 혹은 다른 `Hook`의 최상위에서만 사용할 수 있다!

# useState 해부하기

예시 - 다음과 같은 코드를 통해 `useState`를 해부해보자

```jsx
const [index, setIndex] = useState(0);
```

관습은 [ `something`, `setSomething` ]으로 받는 것이지만, 원한다면 다르게도 받을 수 있다!

## useState의 구조

1. `useState`에서 사용하는 유일한 인수는 초기값이다!
   위의 예시에서는 `0`이 그 역할을 한다. 즉, `index`의 초기값은 `0`이다.
2. 리턴되는 배열의 첫번째 변수는 저장된 값이다!
   위의 예시에서는 `index`가 그 역할을 한다. 실제로 변수값을 사용하고 싶을때 호출한다.
3. 리턴되는 배열의 두번째 변수는 setting 함수이다!
   위의 예시에서는 `setIndex`가 그 역할을 한다. 저장된 변수의 값을 바꿀때 호출한다.

## useState의 동작

1. 설정된 초기값으로 `component`가 렌더링 된다.
   `[ 0, setIndex ]`
2. setting 함수를 통해 state를 업데이트 한다.
   `setIndex( index + 1 ) ⇒ [ 1, setIndex ]`
3. `components`가 다시 렌더링된다. 업데이트된 `state`가 유지된다!
   `[ 1, setIndex ]`

# useState 여러개 사용하기

`useState`는 여러개 사용해도 문제가 없다.

하지만, 두 변수가 같이 바뀐다면 하나의 `state`에 합치는게 좋다

예시 : `index`를 위한 `state`와 `show more`을 위한 `state`가 같이 존재한다

```jsx
export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  function handleNextClick() {
    setIndex(index + 1);
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  return (
    <>
      <button onClick={handleNextClick}>Next</button>
      <h3>
        ({index + 1} of {sculptureList.length})
      </h3>
      <button onClick={handleMoreClick}>
        {showMore ? "Hide" : "Show"} details
      </button>
      {showMore && <p>More Info</p>}
    </>
  );
}
```

`state`는 `component`안에 `local`로 존재한다.

즉, 같은 `component`를 렌더링 하더라도 각각의 `state`는 별도로 동작한다.

서로 아무런 영향을 줄수 없다!

**참고!**

`React Hooks` 혹은 `useState`의 원리를 알고 싶으면 해당 링크를 참고하자!

[React Hooks: Not Magic, Just Arrays.](https://medium.com/@ryardley/react-hooks-not-magic-just-arrays-cd4f1857236e)
