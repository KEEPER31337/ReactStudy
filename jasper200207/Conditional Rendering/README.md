# return을 통한 조건부 렌더링

if문을 사용하여 조건부 렌더링을 할 수 있다.

예시 : isPacked=true이면 체크가 붙는 컴포넌트

```jsx
function Item({ name, isPacked }) {
  if (isPacked) {
    return <li className="item">{name} ✔</li>;
  }
  return <li className="item">{name}</li>;
}
```

렌더링이 안되게 할려면 null을 리턴한다

예시 : isPacked=true일때만, 렌더링 되는 컴포넌트

```jsx
function Item({ name, isPacked }) {
  if (isPacked) {
    return null;
  }
  return <li className="item">{name}</li>;
}
```

# JSX안에서 조건부 렌더링

## 삼항연산자 ( ? : )

조건 ? 참일때 : 거짓일때 의 형식

예시 : isPacked=true이면 체크와 줄이 생기는 컴포넌트

```jsx
function Item({ name, isPacked }) {
  return <li className="item">{isPacked ? <del>{name + " ✔"}</del> : name}</li>;
}
```

## AND 연산자 ( && )

거짓일때 null 리턴을 && 연산자로 줄일 수 있다.

예시 : isPacked=true이면 체크가 붙는 컴포넌트

```jsx
function Item({ name, isPacked }) {
  return (
    <li className="item">
      {name} {isPacked && "✔"}
    </li>
  );
}
```

**주의!**

왼쪽에 숫자를 넣지 말자

&& 연산자는 0을 false로 인식하기 때문, 존재하냐 아니야로 판단하지 않음

`cnt > 0 &&` 처럼 조건 연산자를 추가하자

## 변수를 이용한 조건부 렌더링

let으로 변수를 만들어서 사용할 수 있다. 이때, 변수에 JSX를 넣는 것도 가능하다.

예시 : isPacked=true이면 체크와 줄이 생기는 컴포넌트

```jsx
function Item({ name, isPacked }) {
  let itemContent = name;
  if (isPacked) {
    itemContent = <del>{name + " ✔"}</del>;
  }
  return <li className="item">{itemContent}</li>;
}
```
