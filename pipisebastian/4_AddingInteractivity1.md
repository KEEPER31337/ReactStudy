# 4주차 Adding Interactivity 1

## 1-1. ****Responding to Events****

- **event handler**
    
    ```jsx
    function handleClick() {//event handler
        alert('You clicked me!');
      }
    
    return (
    	<button onClick={handleClick}/> ⭕
    	<button onClick={handleClick()}/> ❌
    	
    	<button onClick={() => {handleClick()} }/> ⭕
    	<button onClick={() => { alert('You clicked me!');}}> ⭕
      <button onClick={alert('You clicked me!')}>❌
    
    	<button onClick={function handleClick() { ⭕
    	  alert('You clicked me!');
    	}}>
    );
    ```
    
     
    
- 이벤트 ****propagation****
    
    ```jsx
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
    ```
    
    - onClick 이벤트 2개 : 본인 → 부모 순으로 실행됨.
    
- **e.stopPropagation()**
    - 앞서본 이벤트 전달을 막기 위함
        
        ```jsx
        <button onClick={(e) => {e.stopPropagation(); alert('Playing!')}}></button>
        ```
        
- **e.preventDefault()**
    - tag고유 동작(from submit→input전송, a tag클릭시 이동)을 제한
    
    ```jsx
    <form onSubmit={e => {e.preventDefault(); alert('Submitting!');}}>
    ```
    

---

## 1-2. ****State: A Component's Memory****

- render간에 데이터를 유지하기 위한 ***state*** 변수 필요(그냥 로컬변수의 경우, render시 초기값으로 돌아옴)
- re rendering을 위한 trigger 필요 → ***state setter***

**⇒** **useState(hook) 사용!**

```jsx
const [num, setNum] = useState(0);
```

---

## 1-3. ****Render and Commit****

- **Trigger**
    - initial render 되었을때
    - state가 update 되었을때 ex)setState
- **Render**
    - trigger가 일어난 뒤, component를 다시 띄워줌 == rendering!
    - root component부터 → recursive하게!
- **Commit**
    - 렌더링 끝난 뒤, DOM 업데이트! 
    **brower rendering == painting**
    - 렌더링 결과가 똑같다면 ? DOM 업데이트 X!
