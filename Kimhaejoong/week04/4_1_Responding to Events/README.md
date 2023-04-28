# Adding event handlers

Event handler를 추가하려면, function을 정의하고 적절한 JSX태그에 prop으로 전달합니다.

1. Event handler는 Component 내부에 정의됩니다.
2. handle로 시작되는 이름을 가집니다.

```jsx
export default function Button() {
  ***function handleClick() {
    alert('You clicked me!');
  }***

  return (
    <button ***onClick={handleClick}***>
      Click me
    </button>
  );
}
```

1. JSX 태그에 인라인으로 정의하는 것도 가능합니다.

```jsx
<button onClick={***function handleClick() {
  alert('You clicked me!');
}***}>
```

1. → 를 사용해도 됩니다.

```jsx
<button onClick={***() => {
  alert('You clicked me!');
}***}>
```

# Reading props in event handlers

Event Handler는 Component 내부에 선언되기 때문에 Props에 액세스할 수 있습니다.

```jsx
function AlertButton({ message, children }) {
  return (
    <button onClick={() => alert(message)}>
      {children}
    </button>
  );
}

export default function Toolbar() {
  return (
    <div>
      <AlertButton ***message="Playing!"***>
        Play Movie
      </AlertButton>
      <AlertButton ***message="Uploading!"***>
        Upload Image
      </AlertButton>
    </div>
  );
}
```

# Passing event handlers as props

Event Handler를 부모 component에 prop으로 전달할 수도 있습니다.

```jsx
function Button({ onClick, children }) {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
}

function PlayButton({ movieName }) {
  function handlePlayClick() {
    alert(`Playing ${movieName}!`);
  }

  return (
    <Button ***onClick={handlePlayClick}***>
      Play "{movieName}"
    </Button>
  );
}

function UploadButton() {
  return (
    <Button onClick={***() => alert('Uploading!')***}>
      Upload Image
    </Button>
  );
}

export default function Toolbar() {
  return (
    <div>
      <PlayButton movieName="Kiki's Delivery Service" />
      <UploadButton />
    </div>
  );
}
```

PlayButton 컴포넌트는 handlePlayClick을 prop으로 Button 컴포넌트에 전달합니다.

UploadButton은 () => alert('Uploading!')을 onClick prop으로 Button 컴포넌트에 전달합니다.

# Naming event handler props

Event Handler의 props 이름은 마음대로 지을 수 있지만, 보통 on으로 이름을 시작합니다.

# Event propagation

```jsx
export default function Toolbar() {
  return (
    <div className="Toolbar" ***onClick={() => {
      alert('You clicked on the toolbar!');
    }}***>
      <button ***onClick={() => alert('Playing!')}***>
        Play Movie
      </button>
      <button ***onClick={() => alert('Uploading!')}***>
        Upload Image
      </button>
    </div>
  );
}
```

div 와 button 에 모두 onClick event handler가 있습니다.

이런 경우 자식 태그의 event handler가 먼저 작동하고, 이후 부모 태그의 event handler가 작동하는 방식으로 모든 event handler가 작동합니다.

# Stopping propagation

```jsx
function Button({ onClick, children }) {
  return (
    <button onClick={***e => {
      e.stopPropagation();
      onClick();
    }***}>
      {children}
    </button>
  );
}
```

이벤트 오브젝트는 주로 event의 e를 따와서 쓰고, `e.stopPropagation()` 같 를 통해 event의 propagate를 막을 수 있습니다.

# ****Preventing default behavior****

```jsx
export default function Signup() {
  return (
    ***<form onSubmit={() => alert('Submitting!')}>
      <input />
      <button>Send</button>
    </form>***
  );
}
```

내부의 버튼이 클릭됐을 때 페이지 전체를 리로드하는 <form> 태그와 같이 브라우저 이벤트가 디폴트 동작을 행하는 경우가 있습니다. 

```jsx
export default function Signup() {
  return (
    <form onSubmit={e => {
      ***e.preventDefault();***
      alert('Submitting!');
    }}>
      <input />
      <button>Send</button>
    </form>
  );
}
```

`e.preventDefault()` 를 사용해서 디폴트 동작을 막을 수 있습니다.

# ****Can event handlers have side effects?****

Event handler는 pure할 필요가 없기 때문에, 버그나 원치 않은 결과를 가져오기 매우 좋습니다!

- Challange 1 / 2
    
    ```jsx
    export default function LightSwitch() {
      function handleClick() {
        let bodyStyle = document.body.style;
        if (bodyStyle.backgroundColor === 'black') {
          bodyStyle.backgroundColor = 'white';
        } else {
          bodyStyle.backgroundColor = 'black';
        }
      }
    
      return (
        <button onClick={***handleClick***}>
          Toggle the lights
        </button>
      );
    }
    ```
    
    onClick의 prop으로 전달하기 위해 handleClick 뒤의 괄호를 지웠습니다.
    
- Challange 2 / 2
    
    ```jsx
    export default function ColorSwitch({
      onChangeColor
    }) {
      return (
        <button ***onClick={onChangeColor}***>
          Change color
        </button>
      );
    }
    ```
    
    onChangeColor를 prop으로 button에 전달했습니다.