# Writing Markup with JSX

JSX : 자바스크립트 안에 html을 집어넣은 것

⚠️JSX의 규칙⚠️

1. 한 번에 하나의 부모 태그만 반환
2. 모든 태그를 닫아둘 것
3. camelCase를 사용합시다!

 +.  JSX 컨버터도 좋습니다

[https://transform.tools/html-to-jsx](https://transform.tools/html-to-jsx)

- Challange 1 / 1
    
    ```jsx
    // App.js
    export default function Bio() {
      return (
        ***<>***
          <div class="intro">
            <h1>Welcome to my website!</h1>
          </div>
          <p class="summary">
            You can find my thoughts here.
            ***<br/><br/>***
            <b>And <i>pictures***</i></b>*** of scientists!
          </p>
        ***</>***
      );
    }
    ```
    
    jsx룰에 따라서, 전체 마크업을 <>과</>로 감싸고, 닫히지 않은 <br>태그를 닫아주고, 순서가 바뀐 </b>와 </i>를 바꿔준다.