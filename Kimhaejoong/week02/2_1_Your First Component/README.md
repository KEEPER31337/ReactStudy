# Your First Component

1. 컴포넌트 export
2. function 정의 ⚠️대문자로 시작
3. markup 추가 ⚠️div와 괄호를 이용해 여러가지 한번에 return

컴포넌트에 다른 컴포넌트를 중첩할 수 있다.

리액트는 첫글자를 통해 소문자면 html 태그, 대문자면 component로 구분한다.

- Challange 1 / 4
    
    ```
    ***export default*** function Profile() {
      return (
        <img
          src="https://i.imgur.com/lICfvbD.jpg"
          alt="Aklilu Lemma"
        />
      );
    }
    ```
    
    function을 export default 해주지 않아 오류 발생
    
- Challange 2 / 4
    
    ```
    export default function Profile() {
      return ***(***
        <img src="https://i.imgur.com/jA8hHMpm.jpg" alt="Katsuko Saruhashi" />
        ***);***
    }
    ```
    
    return하는 값의 앞뒤에 괄호치고 ; 붙이기
    
- Challange 3 / 4
    
    ```
    function ***P***rofile() {
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
          <***P***rofile />
          <***P***rofile />
          <***P***rofile />
        </section>
      );
    }
    ```
    
    Profile()의 P가 소문자 p로 적혀있어 실행이 안됨
    
- Challange 4 / 4
    
    ```
    ***export default function Congratulations(){
      return (
        <h1>Good job!</h1>
      );
    }***
    ```
    
    Congratulations 컴포넌트를 새로 만들기