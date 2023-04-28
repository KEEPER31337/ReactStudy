# Event Handlers 추가하기

함수를 `Props`로 넘기는 방식으로 `event handlers`를 추가할 수 있다

예시 : alert를 띄우는 버튼

```jsx
export default function Button() {
  function handleClick() {
    alert("You clicked me!");
  }

  return <button onClick={handleClick}>Click me</button>;
}
```

직접 선언한 `handleClick` 함수를 `button`의 `props`로 넘겼다

JSX안에 직접 선언하여 사용할 수 있다

예시 : alert를 띄우는 버튼

```jsx
<button onClick={function handleClick() {
  alert('You clicked me!');
}}>
```

arrow function도 사용 가능하다

예시 : alert를 띄우는 버튼

```jsx
<button onClick={() => {
  alert('You clicked me!');
}}>
```

**주의!**

props로 넘어가는 건 함수여야 한다! 호출된 함수가 아니다!

예시 : `handleClick`을 넘길때

옳은 예

```jsx
<button onClick={handleClick}>
```

틀린 예 : `handleClick()`을 넘기면 `handleClick`의 리턴값이 넘어가서 제대로 동작하지 않는다!

페이지가 렌더링 될때마다 handleClick 함수가 실행된다!

```jsx
<button onClick={handleClick()}>
```

JSX 안에서 선언할때도 함수를 넘겨야 한다

옳은 예

```jsx
<button onClick={() => alert('You clicked me!')}>
```

틀린 예

```jsx
<button onClick={alert('You clicked me!')}>
```

단, 함수의 리턴값이 함수인 경우에는 가능하다. 리턴되는 함수가 동작한다!

```jsx
export default function Button() {
  function handleClick() {
    alert("You clicked me!");
  }

  function returnHandleClick() {
    return handleClick;
  }

  return <button onClick={returnHandleClick()}>Click me</button>;
}
```

# Event Handlers와 Props

## Event handlers안에서 Props 사용하기

`event handlers`는 `component`안에서 정의되기 때문에 `props`를 사용할 수 있다.

예시 : `props`로 받은 `message`를 `alert`로 띄워준다

```jsx
function AlertButton({ message, children }) {
  return <button onClick={() => alert(message)}>{children}</button>;
}
```

## Event handlers를 Props로 사용하기

`event handlers`를 `component`의 `props`로 넘길수 있다.

예시 : `onClick event handler` 를 `props`로 하는 `component`

PlayButton component와 같이 두가지를 응용해서 사용할 수 있다.

```jsx
function Button({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>;
}

function PlayButton({ movieName }) {
  function handlePlayClick() {
    alert(`Playing ${movieName}!`);
  }

  return <Button onClick={handlePlayClick}>Play "{movieName}"</Button>;
}
```

`event handlers`의 이름은 마음대로 정할 수 있다.

예시 : onSmash를 사용했다

```jsx
function Button({ onSmash, children }) {
  return <button onClick={onSmash}>{children}</button>;
}
```

여러개도 사용할 수 있다

예시 : onPlayMovie와 onUploadImage가 있다

```jsx
function Toolbar({ onPlayMovie, onUploadImage }) {
  return (
    <div>
      <Button onClick={onPlayMovie}>Play Movie</Button>
      <Button onClick={onUploadImage}>Upload Image</Button>
    </div>
  );
}
```

# Event propagation

## Event propagation이란?

자식 event handlers가 반응할 때, 부모 event handlers가 같이 반응할 수 있다.

이러한 현상을 `Event Bubbles` 또는 `Event Propagation`이라고 한다

예시 : 버튼을 누르면 부모 div의 onClick이 같이 반응한다.

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

`onScroll`을 제외한 모든 event는 JSX에서 `Event Propagation` 현상이 일어난다

## stopPropagation

event의 `stopPropagation` 함수를 통해서 Event Propagation 현상을 멈출 수 있다

예시 : Event Propagation 현상이 안일어난다

1. Button의 onClick event handlers가 동작
2. onClick의 매개변수로 들어온 e(event)의 stopPropagation 실행
3. div의 onClick이 동작하지 않는다.
4. div만 클릭시에는 div의 onClick 동작

```jsx
function Button({ onClick, children }) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      {children}
    </button>
  );
}

export default function Toolbar() {
  return (
    <div
      className="Toolbar"
      onClick={() => {
        alert("You clicked on the toolbar!");
      }}
    >
      <Button onClick={() => alert("Playing!")}>Play Movie</Button>
      <Button onClick={() => alert("Uploading!")}>Upload Image</Button>
    </div>
  );
}
```

**참고!**

위의 예제에서 props로 받은 event handlers를 내부에서 정의한 event handlers안에 넣어서 사용하는 걸 확인할 수 있다.

# Default Behavior

특정 events는 기본 동작을 포함하고 있다. 예를 들어 `<form>`의 `onSubmit`은 기본적으로 페이지를 `reload` 한다.

기본 동작을 없애고 싶으면 event의 preventDefault를 사용할 수 있다.

예시 : reload 되지 않고 onSubmit이 동작한다

```jsx
export default function Signup() {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        alert("Submitting!");
      }}
    >
      <input />
      <button>Send</button>
    </form>
  );
}
```
