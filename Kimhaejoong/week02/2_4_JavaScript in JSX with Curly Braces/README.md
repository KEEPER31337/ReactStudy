# JavaScript in JSX with Curly Braces

```jsx
export default function Avatar() {
  return (
    <img
      className="avatar"
      src="https://i.imgur.com/7vQD0fPs.jpg"
      alt="Gregorio Y. Zara"
    />
  );
}
```

```jsx
export default function Avatar() {
  ***const avatar = 'https://i.imgur.com/7vQD0fPs.jpg';***
  ***const description = 'Gregorio Y. Zara';***
  return (
    <img
      className="avatar"
      src=***{avatar}***
      alt=***{description}***
    />
  );
}
```

**“**  와 **“** 를 **{** 와 **}** 로 대체하여 자바스크립트를 사용할 수 있다.

중괄호를 사용하는 경우

1. JSX 태그의 내부 텍스트 `<h1>{name}'s To Do List</h1>` ⭕ `<{tag}>Gregorio Y. Zara's To Do List</{tag}>` ❌
2. = 뒤에 오는 속성으로 `src={avatar}` →`avatar` variable / `src="{avatar}"` → `"{avatar}"`

```jsx
export default function TodoList() {
  return (
    <ul style=***{{
      backgroundColor: 'black',
      color: 'pink'
    }}***>
      <li>Improve the videophone</li>
      <li>Prepare aeronautics lectures</li>
      <li>Work on the alcohol-fuelled engine</li>
    </ul>
  );
}
```

JS 오브젝트를 JSX에 전달하려면 쌍 중괄호를 사용해야 한다.

- Challange 1 / 3
    
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
          <h1>{person***.name***}'s Todos</h1>
          <img
            className="avatar"
            src="https://i.imgur.com/7vQD0fPs.jpg"
            alt="Gregorio Y. Zara"
          />
          <ul>
            <li>Improve the videophone</li>
            <li>Prepare aeronautics lectures</li>
            <li>Work on the alcohol-fuelled engine</li>
          </ul>
        </div>
      );
    }
    ```
    
    <h1>태그의 {person}을 {person.name}으로 바꿔주었다.
    
- Challange 2 / 3
    
    ```jsx
    const person = {
      name: 'Gregorio Y. Zara',
      ***url: 'https://i.imgur.com/7vQD0fPs.jpg',***
      theme: {
        backgroundColor: 'black',
        color: 'pink'
      }
    };
    
    export default function TodoList() {
      return (
        <div style={person.theme}>
          <h1>{person.name}'s Todos</h1>
          <img
            className="avatar"
            src=***{person.url}***
            alt="Gregorio Y. Zara"
          />
          <ul>
            <li>Improve the videophone</li>
            <li>Prepare aeronautics lectures</li>
            <li>Work on the alcohol-fuelled engine</li>
          </ul>
        </div>
      );
    }
    ```
    
    <img>태그의 url을 추출해서 person에 추가해두었고, {person.url}을 추가해주었다.
    
- Challange 3 / 3
    
    ```jsx
    const baseUrl = 'https://i.imgur.com/';
    const person = {
      name: 'Gregorio Y. Zara',
      imageId: '7vQD0fP',
      imageSize: 's',
      theme: {
        backgroundColor: 'black',
        color: 'pink'
      }
    };
    
    export default function TodoList() {
      return (
        <div style={person.theme}>
          <h1>{person.name}'s Todos</h1>
          <img
            className="avatar"
            src=***{baseUrl+person.imageId+person.imageSize+".jpg"}***
            alt={person.name}
          />
          <ul>
            <li>Improve the videophone</li>
            <li>Prepare aeronautics lectures</li>
            <li>Work on the alcohol-fuelled engine</li>
          </ul>
        </div>
      );
    }
    ```
    
    img의 src 전체를 중괄호로 묶고, .jpg는 “”로 묶은 후 각 요소를 +로 연결했다.