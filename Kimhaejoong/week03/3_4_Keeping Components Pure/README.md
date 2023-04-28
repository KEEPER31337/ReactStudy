# ****Keeping Components Pure****

React는 작성한 모든 컴포넌트를 pure function이라 가정합니다.

![https://react.dev/images/docs/illustrations/i_puritea-recipe.png](https://react.dev/images/docs/illustrations/i_puritea-recipe.png)

**같은 input에 대해 항상 같은 결과**를 리턴합니다.

⚠️ 아래와 같은 경우에, 컴포넌트는 외부의 변수의 값을 읽고 쓰게 됩니다.

```jsx
***let guest = 0;***

function Cup() {
  ***// Bad: changing a preexisting variable!
  guest = guest + 1;***
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaSet() {
  return (
    <>
      <Cup />
      <Cup />
      <Cup />
    </>
  );
}
```

만약 다른 컴포넌트가 guest 변수에  접근한다면, 때에 따라 다른 jsx를 생성하게 되고, 예측 불가능해집니다. → 버그 발생으로 이어ㅇ

```jsx
function Cup({ guest }) {
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaSet() {
  return (
    <>
      <Cup guest={1} />
      <Cup guest={2} />
      <Cup guest={3} />
    </>
  );
}
```

변수 대신 props을 사용하여 이런 문제를 해결하라고 합니다.

- 📖 StrictMode 📖
    
    StricrMode는 컴포넌트 함수를 두번 호출하여 컴포넌트가 pure룰을 어기는지 찾아줍니다.
    
    사용자의 입력에 따라 결과를 바뀌게 하려면 변수나 객체가 아닌, props를 활용해야 합니다.
    
    `<React.StrictMode>`로 컴포넌트를 감싸서 StrictMode를 선택할 수 있습니다.
    

아래에서 처럼 렌더링 도중에 변수나 객체에 접근하여 그 값을 변경하는 것은 괜찮습니다.

```jsx
function Cup({ guest }) {
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaGathering() {
  let cups = [];
  ***for (let i = 1; i <= 12; i++) {
    cups.push(<Cup key={i} guest={i} />);
  }***
  return cups;
}
```

- Challange 1 / 3
    
    ```jsx
    export default function Clock({ time }) {
      let hours = time.getHours();
      ***let classname;***
      if (hours >= 0 && hours <= 6) {
        ***className = 'night';***
      } else {
        ***className = 'day';***
      }
      return (
        <h1 id="***className***">
          {time.toLocaleTimeString()}
        </h1>
      );
    }
    ```
    
    if문 안에서 직접 지정하는게 아닌, className변수에 받은 후 return할 때 포함시켜 해결했습니다.
    
- Challange 2 / 3
    
    ```jsx
    import Panel from './Panel.js';
    import { getImageUrl } from './utils.js';
    
    export default function Profile({ person }) {
      return (
        <Panel>
          <Header ***person={person}***/>
          <Avatar ***person={person}***/>
        </Panel>
      )
    }
    
    function Header(***{person}***) {
      return <h1>{***person.name***}</h1>;
    }
    
    function Avatar(***{person}***) {
      return (
        <img
          className="avatar"
          src={getImageUrl(***person***)}
          alt={***person.name***}
          width={50}
          height={50}
        />
      );
    }
    ```
    
    currentPerson 변수를 없애고 person props를 각 컴포넌트에 추가했습니다.
    
- Challange 3 / 3
    
    ```jsx
    export default function StoryTray({ stories }) {
    	~~stories.push({
        id: 'create',
        label: 'Create Story'
      });~~
    
      return (
        <ul>
          {stories.map(story => (
            <li key={story.id}>
              {story.label}
            </li>
          ))}
          ***<li>Create Story</li>***
        </ul>
      );
    }
    ```
    
    렌더링 이후 컴포넌트에서 array의 값을 변경하기 때문에 
    
    해당 부분을 지우고 리턴할 부분에 <li>Create Story</li> 를 추가했습니다.
