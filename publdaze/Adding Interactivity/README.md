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
