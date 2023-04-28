# 3주차 Describing The UI 2

## 1-5. ****Passing Props to a Component****

부모 → 자식으로 props를 넘겨요!

- 코드
    1. 부모 컴포넌트
        
        ```jsx
        export default function Profile() {
          return (
            <Avatar
              person={{ name: 'Lin Lanying', imageId: '1bX5QH6' }}//부모 컴포넌트
              size={100}
            />
          );
        }
        ```
        
        💡 person은 객체를 넘겨주기 때문 {{}}
        
    2. 자식 컴포넌트 - 구조분해 할당 사용
        
        ```jsx
        function Avatar({ person, size }) {}
        ```
        
    3. 자식 컴포넌트 - 구조분해 할당 X
        
        ```jsx
        function Avatar(props) {
        	let person = props.person;
          let size = props.size;
        }
        ```
        
- **default 값 주고 싶을때**  `function Avatar({ size = 10 }) {}`
    - `<Avatar size={undefined}/>` `<Avatar/>` ⇒ **default값 찍힘!**
    - `<Avatar size={null}/>` `<Avatar size={0}/>` ⇒  , 0  찍힘!
    
- **spread 연산자로 props 전달**
    
    ```jsx
    function Profile({ person, size, isSepia, thickBorder }) {
      return (
        <div className="card">
          <Avatar
            person={person}
            size={size}
            isSepia={isSepia}
            thickBorder={thickBorder}
          />
        </div>
      );
    }
    ```
    
    ```jsx
    function Profile(props) {
      return (
        <div className="card">
          <Avatar {...props} />
        </div>
      );
    }
    ```
    
- **jsx자체를 props로 전달**
    
    ```jsx
    function Card({ children }) {
      return (
        <div className="card">
          {children}
        </div>
      );
    }
    
    export default function Profile() {
      return (
        <Card>
          <div>흐헤헤</div> 
        </Card>
      );
    }
    ```
    
    🚨 주의
    
    1. jsx자체(<div></div>)를 넘길때, 이 jsx은 **children**이라고 함!
    2. [children type은](https://merrily-code.tistory.com/209) ?  
    
- **props는 immutable하다! 못바꾼다!!!** 
⇒ 부모 component에 새로운 props를 요청해야함 
⇒ ****이전 props는 폐기되고, Javascrip엔진은 메모리를 회수함.
**⇒ 이를 state로!**

---

## 1-6. ****Conditional Rendering****

- if else
    
    ```jsx
    if (isPacked) {
      return <li className="item">{name} ✔</li>;
    }
    return <li className="item">{name}</li>;
    ```
    
    🚨 해당코드는 DRY하지 않음!(== 중복이 많음) 
    
    return null ****⇒ 아무것도 render 해주지 않을때 사용하나, 보통 안씀 ⇒ **조건부로 제어!**
    

- 삼항연산자
    
    `{text ? 'a' : <div>홍홍</div> }`
    

- && 연산
    
    `{text && 'a' }`
    
    - text가 true일경우 render, 그렇지 않으면 아무것도 안함.
    - 🚨 &&연산자 왼쪽에는 무조건 true OR false !(+ 조건문 사용)
    - `{0 && 'a' }` 은, 0을 false로 보지않고, 그냥 **0 출력!**
    
    ```jsx
    return <li className="item">{name} {isPacked && ✔}</li>;
    ```
    
- if + 연산자 둘다
    
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
    

---

## 1-7. ****Rendering Lists****

- map, filter 한번에 봅시다
    
    ```jsx
    function App() {
      const people = [
        { id: 0, name: "aaa" },
        { id: 1, name: "bbb" },
        { id: 2, name: "ccc" },
      ];
    
      const filterPerson = people.filter((person) => person.name !== "bbb");
      return (
        <>
          {filterPerson.map((person) => {
            return <div key={person.id}>{person.name}</div>;
          })}
        </>
      );
    }
    ```
    
    - key는 유니크! + 변경되면 안됨 + 렌더링되는 동안 생성되면 안됨
    - **key는 식별을 위해서** when 배열 이동, 삽입, 삭제등 배열이 변경될 때
- 💡 **return** implicit(암시적), explicit(명시적)으로!
    
    ```jsx
    {filterPerson.map((person) => ( //implicit
        <div key={person.id}>{person.name}</div>
    ))}
    {filterPerson.map((person) => { //explicit
        return <div key={person.id}>{person.name}</div>;
    })}
    ```
    
- 추가)
    1. 배열을 2분류로 나눌때, map 2번쓰지말고 다음처럼
    
    ```jsx
    people.forEach(person => {
      if (person.profession === 'chemist') {
        chemists.push(person);
      } else {
        everyoneElse.push(person);
      }
    });
    ```
    

---

## 1-8. ****Keeping Components Pure****

- 모든 component는 pure function으로 작성하도록!
    - **It minds its own business.** It does not change any objects or variables that existed before it was called.
    - **Same inputs, same output.** Given the same inputs, a pure function should always return the same result.
- **mutation?(변이)**
    - 예상치 못한 버그 만들어냄.
    - ex) 렌더링하는동안 컴포넌트가 기존변수를 바꿈
    - useState, useEffect등을 사용하면 됨!
