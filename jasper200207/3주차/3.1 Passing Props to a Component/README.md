# Props 란?

jsx 태그로 정보를 전달한다.

예시 : img 태그에 className, src, alt 등 props를 전달했다.

```jsx
function Avatar() {
  return (
    <img
      className="avatar"
      src="https://i.imgur.com/1bX5QH6.jpg"
      alt="Lin Lanying"
      width={100}
      height={100}
    />
  );
}
```

# 컴포넌트와 Props 주고받기

## 하위 컴포넌트에 props 전달

예시 : person, size 전달했다.

```jsx
export default function Profile() {
  return (
    <Avatar person={{ name: "Lin Lanying", imageId: "1bX5QH6" }} size={100} />
  );
}
```

## 하위 컴포넌트에서 값 읽기

함수의 매개변수 형태로 받아올 수 있다.

```jsx
function Avatar({ person, size }) {
  // person and size are available here
}
```

`props`로 한번에 받아올 수 있다.

```jsx
function Avatar(props) {
  let person = props.person;
  let size = props.size;
  // ...
}
```

# 기본값

`=` 를 통해서 기본값을 줄 수 있다.

```jsx
function Avatar({ person, size = 100 }) {
  // ...
}
```

기본값을 주지 않을 경우 `undefined`가 기본으로 설정한다.

# Spread로 Props 넘기기

상위 컴포넌트가 하위 컴포넌트에게 모든 props를 넘겨야 할때, spread 문법을 사용할 수 있다.

예시 : Profile이 받은 모든 props를 Avatar에 전달하고 있다.

```jsx
function Profile(props) {
  return (
    <div className="card">
      <Avatar {...props} />
    </div>
  );
}
```

# children으로 JSX 전달하기

상위 컴포넌트 태그 안에 들어간 jsx는 children으로 전달한다.

예시 : Card가 children을 받아서 div안에 넣었다.

```jsx
function Card({ children }) {
  return <div className="card">{children}</div>;
}
```

```jsx
export default function Profile() {
  return (
    <Card>
      <Avatar
        size={100}
        person={{
          name: "Katsuko Saruhashi",
          imageId: "YfeOqp2",
        }}
      />
    </Card>
  );
}
```

이때, Card는 안에 뭐가 들어가는지 알 필요가 없다. 어차피 들어가는거에 맞춰서 넣기만 하기 때문

# Props는 항상 반영된다

props는 상위 컴포넌트가 바뀌면 반영되서 바뀐다. 추후에 배울 state를 사용하기 때문

예시 : 시간이 바뀔때, 색이 바뀔때 마다 실시간으로 바뀌는 시계

```jsx
export default function Clock({ color, time }) {
  return <h1 style={{ color: color }}>{time}</h1>;
}
```
