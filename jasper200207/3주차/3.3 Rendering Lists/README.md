# 배열 렌더링

map()을 이용하여 렌더링 할 수 있다.

## 데이터 준비

```jsx
const people = [
  "Creola Katherine Johnson: mathematician",
  "Mario José Molina-Pasquel Henríquez: chemist",
  "Mohammad Abdus Salam: physicist",
  "Percy Lavon Julian: chemist",
  "Subrahmanyan Chandrasekhar: astrophysicist",
];
```

## 배열 안의 요소를 JSX로 변환

```jsx
const listItems = people.map((person) => <li>{person}</li>);
```

## 리턴

```jsx
return <ul>{listItems}</ul>;
```

# 배열 필터링

filter()을 이용하여 필터링 할 수 있다

## 데이터 준비

```jsx
const people = [
  {
    id: 0,
    name: "Creola Katherine Johnson",
    profession: "mathematician",
  },
  {
    id: 1,
    name: "Mario José Molina-Pasquel Henríquez",
    profession: "chemist",
  },
  {
    id: 2,
    name: "Mohammad Abdus Salam",
    profession: "physicist",
  },
  {
    name: "Percy Lavon Julian",
    profession: "chemist",
  },
  {
    name: "Subrahmanyan Chandrasekhar",
    profession: "astrophysicist",
  },
];
```

## 필터링

```jsx
const chemists = people.filter((person) => person.profession === "chemist");
```

## 필터링한 배열을 JSX로 변환

```jsx
const listItems = chemists.map((person) => (
  <li>
    <img src={getImageUrl(person)} alt={person.name} />
    <p>
      <b>{person.name}:</b>
      {" " + person.profession + " "}
      known for {person.accomplishment}
    </p>
  </li>
));
```

## 리턴

```jsx
return <ul>{listItems}</ul>;
```

**참고!**

⇒ 를 이용하면 return을 사용하지 않아도 된다

```jsx
const listItems = chemists.map(
  (person) => <li>...</li> // Implicit return!
);
```

이때, { } 가 다음에 오면 return이 필요하다. ⇒ { } 의 형태는 `block body` 라는 함수를 나타내는 문법!

```jsx
const listItems = chemists.map((person) => {
  // Curly brace
  return <li>...</li>;
});
```

# Key

array의 아이템에게는 string 이나 number 형태의 고유한 키값이 필요하다

map함수로 JSX 요소를 렌더링 할때는 key가 항상 필요하다

Key는 React가 해당 컴포넌트를 찾는 기준이 된다. 키가 있어야 array의 순서가 바뀌더라도 같은 컴포넌트로 인식할 수 있다.

## Key를 얻는 법

- DB 상의 데이터 : 만약 DB에 unique한 key가 있다면 그 값을 사용하면 된다
- 로컬에서 생성한 데이터 : 만약 로컬에서 생성해야 한다면 `crypto.randomUUID()` 혹은 `uuid` 패키지를 이용하여 생성한다

## Key의 규칙

- key는 항상 고유해야 한다. 하지만, 다른 array에 들어있다면 문제없다.
- key는 바뀌지 않아야 한다. 렌더링하면서 생성하지 말자.
