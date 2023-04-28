# 2주차 Describing The UI

## 1-1. ****Your First Component****  재사용가능한 컴포넌트 만들기

1.  javascript function으로 컴포넌트를 만들어요~ 
    
    💡 컴포넌트 이름의 첫글자는 대문자로! ex) Card, Table
    
2. component는 **jsx를 return**해야해요!
    
    💡 return시 반드시 부모 요소로 감싸져있어야한다.
    
3. export default / exfault  로 컴포넌트를 내보냅니다! → 다른 컴포넌트에서 import해서 쓸 수 있음

```jsx
export default function Profile() {
  return (
    <div></div>
  )
} 
```

🚨 주의

1. 하나의 file에서 여러개의 componet를 만들지 맙시다! → 다 파일 분리해~
2. 하나의 컴포넌트 안, 새로운 컴포넌트를 정의하지 맙시다! [매우 느려지고 버그 발생!](https://react.dev/learn/preserving-and-resetting-state#different-components-at-the-same-position-reset-state)

---

## 1-2. ****Importing and Exporting Components****

- 하나의 root 컴포넌트가 존재. 그 아래에 자식 컴포넌트들 있음.
    - CRA → src/App.js가 root 컴포넌트
- export / export default 로 컴포넌트를 내보냅니다! → 다른 컴포넌트에서 import해서 쓸 수 있음
    - `'./Gallery.js'` or `'./Gallery'`  둘 다 가능
- **A file can only have one default export, but it can have numerous named exports!**
- 💡 export, export default 차이는?
    - ****export default****
        - 내보낼 요소가 하나만 → 보통 컴포넌트 단위로 js파일을 관리하기 때문에, 주로 사용됨
        - `import Button from ~`
    - ****export name****
        - 여러개 내보낼때!
        - `import {Button} from ~`
    
- 예제1 - 파일 다 분리, 각각 다 export
    
    ```jsx
    import { Profile } from './Profile ';
    
    export default function App() { //root 컴포넌트
      return (
        <div>
          <Profile />
        </div>
      );
    }
    ```
    
    ```jsx
    import { Gallery} from './Gallery.js';
    
    export default function Profile () {
      return (
        <section>
          <h1>Amazing scientists</h1>
          <Profile />
          <Profile />
          <Profile />
        </section>
      );
    }
    ```
    
    ```jsx
    export default function Gallery() {
      return (
        <img
          src="https://i.imgur.com/QIrZWGIs.jpg"
          alt="Alan L. Hart"
        />
      );
    }
    ```
    
- 예제2 - 하나의 파일안, 2개 컴포넌트, 그러나 export는 하나만(공식문서)
    
    ```jsx
    import Gallery from './Gallery.js';
    
    export default function App() {
      return (
        <Gallery />
      );
    }
    ```
    
    ```jsx
    function Profile() { 
    // 애는 외부파일에서 읽지 않기에!
    // export부분 안씀
      return (
        <img
          src="https://i.imgur.com/QIrZWGIs.jpg"
          alt="Alan L. Hart"
        />
      );
    }
    
    export default function Gallery() {
      return (
        <section>
          <h1>Amazing scientists</h1>
          <Profile />
          <Profile />
          <Profile />
        </section>
      );
    }
    ```
    
- 예제3 - 하나의 파일안, 2개 컴포넌트, export 2개 다 하기
    
    이미 Gallery를 export default로 내보내고 있음.
    
    export default 2개는 못하기 때문에, 여러개를 내보낼수있는 export name을 사용하면 됨.
    
    ```jsx
    import Gallery from './Gallery.js';
    import { Profile } from './Gallery.js';
    
    export default function App() {
      return (
        <Profile />
      );
    }
    ```
    
    ```jsx
    export function Profile() {
      return (
        <img
          src="https://i.imgur.com/QIrZWGIs.jpg"
          alt="Alan L. Hart"
        />
      );
    }
    
    export default function Gallery() {
      return (
        <section>
          <h1>Amazing scientists</h1>
          <Profile />
          <Profile />
          <Profile />
        </section>
      );
    }
    ```
    

---

## 1-3. ****Writing Markup with JSX****

- JSX(JavaScript XML)는 Javascript에 XML(eXtensible Markup Language)을 추가한 확장한 **문법**이다.
- 마크(Mark) == (Tag)로 둘러싸인 언어
    
    ex) html → `<body></body>`
    
- 컴포넌트(JSX문법으로 쓰여진) → **재사용성 GOOD~**

### ****The Rules of JSX****

1. root element로 감싸줘야한다. 
    1. `<div></div> `
    2. `<></>` (fragment : 의미없는 태그사용을 피하기 위해)
2. 모든 tag는 열면 닫아야한다!
    1. `<div></div>` OR `<div/>`
3. tag에 attribute를 넣을땐, camelCase로!
    1. `background-color`(기존) → `backgroundColor` (JSX)
    2. `class` (css) → `className`으로!

+) [html → JSX문법으로 변환해주는 사이트](https://transform.tools/html-to-jsx) 

---

## 1-4. ****JavaScript in JSX with Curly Braces { }****

- JSX tag에 attribute는 기본적으로 “ ” 으로 넣어줌.
- JSX안에 JavaScript logic, variable 를 보여줘야 할 때, ****curly braces { } 사용!****

```jsx
const name = "cat";
const image = "https://media.tenor.com/EERXjdAqkUEAAAAM/cat-cat-watchin.gif";
return (
    <>
      <h1>{name}의 일기</h1>
      <img src={image} alt="아주 귀여운 고양이" />
    </>
);
```

- ****double curlies {{}} → css, object에 사용****
    - css style 적용
    
    ```jsx
    // <ul style="background-color: black"> 기존 html내 style적용
    
    <ul style={
      {
        backgroundColor: 'black',
        color: 'pink'
      }
    }>
    ```
    
    - object에서 사용법
    
    ```jsx
    const person = {
      name: 'Gregorio Y. Zara',
      theme: {
        backgroundColor: 'black',
        color: 'pink'
      }
    };
    
    export default function TodoList() {
      return (
        <div style={person.theme}>
          <h1>{person.name}'s Todos</h1>
        </div>
      );
    }
    ```
