# Responding to Events

- procs로 함수를 전달 할 수 있다
    ```jsx
    <button onClick={() => {
    alert('You clicked me!');
    }}>
    ```

- 함수 전달 방법
  - 올바른 호출
    ```jsx
    <button onClick={handleClick}>
    ```

  - 잘못된 호출 (handleClick가 호출되고 반환값이 onClick으로 전달)
    ```jsx
    <button onClick={handleClick()}>
    ```

- 함수를 propc 전달받아 사용하는 예
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
        <Button onClick={handlePlayClick}>
        Play "{movieName}"
        </Button>
    );
    }
    ```

- 만약 중복된 이벤트 핸들러가 있을 경우 자식 이벤트가 먼저 호출되고 이후 부모 이벤트가 호출
    ```jsx
    export default function Toolbar() {
    return (
        <div className="Toolbar" onClick={() => {
        alert('You clicked on the toolbar!');
        }}>
        <button onClick={() => alert('Playing!')}>
            Play Movie
        </button>
        <button onClick={() => alert('Uploading!')}>
            Upload Image
        </button>
        </div>
    );
    }
    ```

- `e.stopPropagation()`를 사용하여 이후 일어날 이벤트를 실행되지 않게 할 수 있다
    ```jsx
    function Button({ onClick, children }) {
    return (
        <button onClick={e => {
        e.stopPropagation();
        onClick();
        }}>
        {children}
        </button>
    );
    }

    export default function Toolbar() {
    return (
        <div className="Toolbar" onClick={() => {
        alert('You clicked on the toolbar!');
        }}>
        <Button onClick={() => alert('Playing!')}>
            Play Movie
        </Button>
        <Button onClick={() => alert('Uploading!')}>
            Upload Image
        </Button>
        </div>
    );
    }
    ```
<br/>

# State: A Component's Memory
- 렌더링간의 데이터 유지를 위해 state 변수 사용
- state 변수는 `const [변수명, 함수명] = useState(초기값)`으로 선언
    ```jsx
    const [index, setIndex] = useState(0);
    ```

- 상태 변수를 변경할 경우 아래와 같이 지정한 함수 호출
    ```jsx
    setIndex(index + 1);
    ```

- Gallery내에 상태 변수가 있을 경우 Gallery를 두 번 사용하더라도 각 Gallery의 상태 변수는 독립적으로 유지
    ```jsx
    import Gallery from './Gallery.js';

    export default function Page() {
    return (
        <div className="Page">
        <Gallery />
        <Gallery />
        </div>
    );
    }
    ```
<br/>

# Render and Commit
- 트리거
  - initial render: 처음 시작 될 때 호출
  - 컴포넌트의 state 요소가 변경되었을 때: state 값이 변경 될 때 호출
- 랜더링
  - initial render: root 요소를 호출
  - state 변경: 변경된 구성 요소를 호출
  - 재귀적으로 하위 항목을 호출
- 커밋
  - initial render: 모든 컴포넌트를 표시
  - state 변경: 변경 사항이 있는 DOM만 변경