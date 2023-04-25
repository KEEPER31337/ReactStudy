# Passing Props to a Component
## props
 - JSX 태그로 정보 전달
  - 컴포넌트에 props 전달
      ```jsx
      export default function Profile() {
      return (
          <Avatar />
      );
      }
      ```

  - prop 값 전달
      ```jsx
      export default function Profile() {
      return (
          <Avatar
          person={{ name: 'Lin Lanying', imageId: '1bX5QH6' }}
          size={100}
          />
      );
      }
      ```

  - 하위 컴포넌트에서 prop 값 가져오기
      ```jsx
      function Avatar({ person, size }) {
      // person and size are available here
      }
      ```
  - 한번에 가져오기
      ```jsx
      function Avatar(props) {
      let person = props.person;
      let size = props.size;
      // ...
      }
      ```

  - 기본 값 지정
      ```jsx
      function Avatar({ person, size = 100 }) {
      // ...
      }
      ```

  - 부모 컴포넌트가 자식 컴포던트에게 모든 요소를 그대로 전달할 경우 한번에 전달
      ```jsx
      function Profile(props) {
      return (
          <div className="card">
          <Avatar {...props} />
          </div>
      );
      }
      ```

# Conditional Rendering
## 조건부 렌더링
- if문을 사용하여 ifPacked가 true일 경우에만 name 우측에 ✔가 표시 
    ```jsx
    function Item({ name, isPacked }) {
    if (isPacked) {
        return <li className="item">{name} ✔</li>;
    }
    return <li className="item">{name}</li>;
    }
    ```

- if문을 사용해서 isPacked가 false 때만 name이 표시
    ```jsx
    function Item({ name, isPacked }) {
    if (isPacked) {
        return null;
    }
    return <li className="item">{name}</li>;
    }
    ```

- 삼항 연산자를 사용하여 isPacked가 true일 경우에 name 우측에 ✔가 표시
    ```jsx
    return (
    <li className="item">
        {isPacked ? name + '✔' : name}
    </li>
    );
    ```

- && 연산자를 사용하여 isPacked가 true일 경우에만 name 우측에 ✔가 표시
    ```jsx
    return (
    <li className="item">
        {name} {isPacked && '✔'}
    </li>
    );
    ```

- 변수와 if문을 이용하여 렌더링
    ```jsx
    function Item({ name, isPacked }) {
    let itemContent = name;
    if (isPacked) {
        itemContent = name + " ✔";
    }
    return (
        <li className="item">
        {itemContent}
        </li>
    );
    }
    ```


# Rendering Lists
- people 데이터
```jsx
const people = [
  'Creola Katherine Johnson: mathematician',
  'Mario José Molina-Pasquel Henríquez: chemist',
  'Mohammad Abdus Salam: physicist',
  'Percy Lavon Julian: chemist',
  'Subrahmanyan Chandrasekhar: astrophysicist'
];
```
- people 데이터를 렌더링
```jsx
export default function List() {
  const listItems = people.map(person =>
    <li>{person}</li>
  );
  return <ul>{listItems}</ul>;
}
```
## test 
- people 데이터
  - key 값은 고유하고 변경 불가
```jsx
const people = [{
  id: 0,
  name: 'Creola Katherine Johnson',
  profession: 'mathematician',
}, {
  id: 1,
  name: 'Mario José Molina-Pasquel Henríquez',
  profession: 'chemist',
}, {
  id: 2,
  name: 'Mohammad Abdus Salam',
  profession: 'physicist',
}, {
  name: 'Percy Lavon Julian',
  profession: 'chemist',  
}, {
  name: 'Subrahmanyan Chandrasekhar',
  profession: 'astrophysicist',
}];
```

- 필터를 사용하여 profession이 chemist인 경우만 렌더링
```jsx
const chemists = people.filter(person =>
  person.profession === 'chemist'
);
```

```jsx
const listItems = chemists.map(person =>
  <li>
     <img
       src={getImageUrl(person)}
       alt={person.name}
     />
     <p>
       <b>{person.name}:</b>
       {' ' + person.profession + ' '}
       known for {person.accomplishment}
     </p>
  </li>
);
```

# Keeping Components Pure
- 컴포넌트가 여러번 실행되더라도 결과 값은 동일하게 반환되어야 함
- double 함수는 항상 number의 2배되는 값을 반환
```jsx
function double(number) {
  return 2 * number;
}
```

- 오류: Cup 함수는 호출될 때마다 guest의 값을 증가시켜 반환하고 있으며 이는 Cup 함수를 호출할 때 마다 반환 값이 달라짐
```jsx
let guest = 0;

function Cup() {
  // Bad: changing a preexisting variable!
  guest = guest + 1;
  return <h2>Tea cup for guest #{guest}</h2>;
}
```

- 아래와 같이 함수를 호출하기 전에 인덱스를 부여하여 함수는 여러번 호출되더라도 동일한 값이 반환되도록 유지
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