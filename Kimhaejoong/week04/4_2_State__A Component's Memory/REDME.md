# ****When a regular variable isn’t enough****

```jsx
import { sculptureList } from './data.js';

export default function Gallery() {
  let index = 0;

  function handleClick() {
    index = index + 1;
  }

  let sculpture = sculptureList[index];
  return (
    ...
  );
}
```

`handleClick` 은 `index` 를 업데이트하는 것처럼 보이지만,

1. 지역 변수는 렌더링 동안에 지속되지 않고,
2. 지역 변수가 렌더링을 트리거하지도 못하기 때문에

업데이트된 정보가 나타나지 않습니다.

컴포넌트에서 데이터를 업데이트하려면

1. 렌더링 동안에 데이터를 유지하고,
2. 리액트가 컴포넌트의 새 데이터를 재렌더링하도록 트리거해야합니다.

`useState` 후크는 렌더링 동안 유지되는 **state 변수**와 변수를 업데이트하고 리액트를 트리거해 컴포넌트를 재렌더링할 **state setter 함수**를 제공합니다.

# ****Adding a state variable****

```jsx
import { useState } from 'react';
```

state 변수를 추가하기 위해, useState를 import 합니다.

```jsx
let index = 0;
```

```jsx
const [index, setIndex] = useState(0);
```

처음의 예시에서, index 변수 라인을 아래처럼 바꿉니다.

이때, `index` 는 state 변수이고. `setIndex` 는 setter 함수 입니다.

📖`[ ]` 구문은 배열에서 값을 읽을 수 있는데, `useState`에서 반환된 배열은 항상 2개의 항목만 있습니다.

```jsx
function handleClick() {
  setIndex(index + 1);
}
```

처음의 예시에서, `index = index + 1` 을 `setIndex(Index + 1)` 로 바꿔줍니다.

# ****Meet your first Hook****

리액트에서 `useState` 처럼 `use` 로 시작하는 함수들은 **Hook**라 부릅니다.

Hook는 리액트가 렌더링하는 동안에만 작동하며, 다른 리액트 기능에 연결하게 해줍니다.

State는 이 다른 리액트 기능 중 하나입니다,

# ****Anatomy of `useState`**

`useState`를 사용하는 것은 리액트에게 **무언가를 기억하라고 말하는 것**입니다.

```jsx
const [index, setIndex] = useState(0); 
```

이 경우에는 리액트에게 `index`를 기억하라는 것입니다.

🗒️ `const [ something, setSomeThing ]` 이 국룰! 🗒️

`useState`는 **state 변수의 초기값**이 유일한 인수입니다. (예시에서, index 초기값 0 지정)

컴포넌트를 렌더링할 때마다, `useState`는 **state변수**(`index`)와 **state setter 함수**(`setIndex`)를 포함한 배열을 반환합니다.

위의 예시는

1. 컴포넌트가 맨 처음 렌더링됩니다 - `useState(0)` → `[0, setIndex]` 가 반환되고 리액트는 0을 기억합니다.
2. state가 업데이트됩니다 - `setIndex(index + 1)` → `setIndex(1)`, index = 1, 다른 렌더링을 트리거합니다.
3. 컴포넌트가 재렌더링됩니다 - 리액트는 `useState(0)` 을 보고있지만, `index`의 1을 기억하기 때문에, `[1, setIndex]`가 반환됩니다.
4. 반복!

# ****Giving a component multiple state variables****

```jsx
import { useState } from 'react';
import { sculptureList } from './data.js';

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  function handleNextClick() {
    setIndex(index + 1);
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  let sculpture = sculptureList[index];
  return (
				...
  );
}
```

정수 index와 boolean showMore의 두 가지 state 변수가 선언되었습니다.

예시처럼 두 state 변수가 관계없을 때는 두 개로 분리하면 좋지만, 관계점을 찾았을 때는 하나로 통일하는 것이 좋습니다.

# ****State is isolated and private****

만약 같은 컴포넌트를 두번 렌더링한다면, 각 컴포넌트는 완전히 다른 state를 가지게됩니다.

```jsx
// App.js
import Gallery from './Gallery.js';

export default function Page() {
  return (
    <div className="Page">
      ***<Gallery />***
      ***<Gallery />***
    </div>
  );
}
```

```jsx
// Gallery.js
import { useState } from 'react';
import { sculptureList } from './data.js';

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);
	...
}
```

State는 특정한 함수의 호출이나 코드의 위치에 묶여있지 않고, 화면의 특정한 위치에 묶여있게 됩니다.

State는 props와 다르게 선언한 컴포넌트에 대해 완전히 프라이빗합니다

만약 두 Gallery 컴포넌트에서 state를 연결하고 싶다면, 자식 컴포넌트에서 지운 뒤 가장 가까운 부모 컴포넌트에 추가하면 됩니다.
<br>
<br>
<br>
- Challenge 1 / 4
    
    ```jsx
    import { useState } from 'react';
    import { sculptureList } from './data.js';
    
    export default function Gallery() {
      const [index, setIndex] = useState(0);
      const [showMore, setShowMore] = useState(false);
    
      function handleNextClick() {
        setIndex(***index<11 ? index + 1 : index***);
      }
      
      ***function handlePreviousClick() {
        setIndex(index>0 ? index - 1 : index);
      }***
    
      function handleMoreClick() {
        setShowMore(!showMore);
      }
    
      let sculpture = sculptureList[index];
      return (
        <>
          ***<button onClick={handlePreviousClick}>
            Previous
          </button>***
          <button onClick={handleNextClick}>
            Next
          </button>
          <h2>
            <i>{sculpture.name} </i> 
            by {sculpture.artist}
          </h2>
          <h3>  
            ({index + 1} of {sculptureList.length})
          </h3>
          <button onClick={handleMoreClick}>
            {showMore ? 'Hide' : 'Show'} details
          </button>
          {showMore && <p>{sculpture.description}</p>}
          <img 
            src={sculpture.url} 
            alt={sculpture.alt}
          />
        </>
      );
    }
    ```
    
    `handleNextClick`은 `index`가 11을 넘어가지 않도록 했고, `handlePreviousClick`을 새로 만들어 돌아가는 버튼을 만들었습니다.
    
- Challenge 2 / 4
    
    ```jsx
    import { useState } from 'react';
    
    export default function Form() {
      ***const [firstName, setFirstName] = useState('');
      const [lastName, setLastName] = useState('');***
    
      function handleFirstNameChange(e) {
        ***setFirstName(e.target.value);***
      }
    
      function handleLastNameChange(e) {
        ***setLastName(e.target.value);***
      }
    
      function handleReset() {
        ***setFirstName('');
        setLastName('');***
      }
    
      return (
        <form onSubmit={e => e.preventDefault()}>
          <input
            placeholder="First name"
            value={firstName}
            onChange={handleFirstNameChange}
          />
          <input
            placeholder="Last name"
            value={lastName}
            onChange={handleLastNameChange}
          />
          <h1>Hi, {firstName} {lastName}</h1>
          <button onClick={handleReset}>Reset</button>
        </form>
      );
    }
    ```
    
    입력에 상호 작용할 수 있도록 state 두가지를 만들었고, 각 컴포넌트를 state에 맞게 수정했습니다.
    
- Challenge 3 / 4
    
    ```jsx
    import { useState } from 'react';
    
    export default function FeedbackForm() {
      const [isSent, setIsSent] = useState(false);
      ***const [message, setMessage] = useState('');***
      if (isSent) {
        return <h1>Thank you!</h1>;
      } else {
        // eslint-disable-next-line
        
        return (
          <form onSubmit={e => {
            e.preventDefault();
            alert(`Sending: "${message}"`);
            setIsSent(true);
          }}>
            <textarea
              placeholder="Message"
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
            <br />
            <button type="submit">Send</button>
          </form>
        );
      }
    }
    ```
    
    return 안에서 선언된 `message` state 변수를 함수 상단으로 옮겼습니다.
    
- Challenge 4 / 4
    
    ```jsx
    import { useState } from 'react';
    
    export default function FeedbackForm() {
      function handleClick() {
        ***name = prompt('What is your name?');***
        alert(`Hello, ${name}!`);
      }
    
      return (
        <button onClick={handleClick}>
          Greet
        </button>
      );
    }
    ```
    
    불필요하게 선언된 state 변수를 지우고 `name = ~` 로 바꿔주었습니다.