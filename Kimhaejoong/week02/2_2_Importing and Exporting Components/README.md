# Importing and Exporting Components

1. 컴포넌트를 넣을 새 js파일을 만든다.
2. 새 파일에서 컴포넌트를 export해둔다.
3. export한 컴포넌트를 사용하는 파일에서 해당 컴포넌트를 import한다.

+  export default는 반드시 하나/ export 는 많이 해도 가능

- Challange 1 / 1
    
    ```
    // App.js
    import Gallery from './Gallery.js';
    
    export default function App() {
      return (
        <div>
          ***<Gallery />***
        </div>
      );
    }
    ```
    
    ```
    // Gallery.js
    ***import Profile from './Profile.js';***
    
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
    
    ```
    // Profile.js
    ***export default function Profile() {
      return (
        <img
          src="https://i.imgur.com/QIrZWGIs.jpg"
          alt="Alan L. Hart"
        />
      );
    }***
    ```
    
    Gallery.js에서 profile()부분을 떼서 Profile.js에 옮겨주고 export default 해준다.
    
    분리가 끝났으니 Gallery.js에서 다시 import해주고, App.에서 Gallery를 호출한다.