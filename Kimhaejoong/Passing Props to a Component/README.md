# Passing Props to a Component

아래의 컴포넌트에서

```jsx
export default function Profile() {
  return (
    <Avatar />
  );
}
```

1. props을 자식 컴포넌트에 보냅니다.

```jsx
export default function Profile() {
  return (
    <Avatar
      ***person={ { name: 'Lin Lanying', imageId: '1bX5QH6' } }
      size={100}***
    />
  );
}
```

1. 자식 컴포넌트에서 porps를 읽어옵니다.

```jsx
function Avatar( ***{ person, size }*** ) {
  // person and size are available here
}
```

- 👍 컴포넌트 사용 시 props의 기본값을 설정할 수 있습니다.
    
    ```jsx
    function Avatar({ person, ***size = 100*** }) {
      // ...
    }
    ```
    
- 👍 jsx 스프레드 구문으로 props 전달이 가능합니다
    
    ```jsx
    function Profile( ***{ person, size, isSepia, thickBorder }*** ) {
      return (
        <div className="card">
          <Avatar
            ***person={person}
            size={size}
            isSepia={isSepia}
            thickBorder={thickBorder}***
          />
        </div>
      );
    }
    ```
    
    ```jsx
    function Profile( ***props*** ) {
      return (
        <div className="card">
          <Avatar ***{...props}*** />
        </div>
      );
    }
    ```
    
- 👍 jsx도 컴포넌트의 props로 사용할 수 있습니다.
    
    ```jsx
    import Avatar from './Avatar.js';
    
    function Card({ children }) {
      return (
        <div className="card">
          {children}
        </div>
      );
    }
    
    export default function Profile() {
      return (
        <Card>
          ***<Avatar
            size={100}
            person={{ 
              name: 'Katsuko Saruhashi',
              imageId: 'YfeOqp2'
            }}***
          />
        </Card>
      );
    }
    ```
    
- 👍 props는 시간에 따라 변할 수 있습니다
    
    ```jsx
    export default function Clock({ color, time }) {
      return (
        ***<h1 style={{ color: color }}>
          {time}
        </h1>***
      );
    }
    ```
    
    [Document](https://s7in42.csb.app/)
    

- Challange 1 / 3
    
    ```jsx
    import { getImageUrl } from './utils.js';
    
    ***function Profile( { Name, Source, Profession, Awards, A_explain, Discovered} ){
      return (
        <section className="profile">
            <h2>{Name}</h2>
            <img
              className="avatar"
              src={getImageUrl(Source)}
              alt={Name}
              width={70}
              height={70}
            />   
            <ul>
              <li>
                <b>Profession: </b> 
                {Profession}
              </li>
              <li>
                <b>Awards: {Awards} </b> 
                {A_explain}
              </li>
              <li>
                <b>Discovered: </b>
                {Discovered}
              </li>
            </ul>
          </section>
      );
    }***
    
    export default function Gallery() {
      return (
        <div>
          <h1>Notable Scientists</h1>
          ***<Profile
            Name = "Maria Skłodowska-Curie"
            Source = "szV5sdG"
            Profession = "physicist and chemist"
            Awards = "4"
            A_explain = "(Nobel Prize in Physics, Nobel Prize in Chemistry, Davy Medal, Matteucci Medal)"
            Discovered = "polonium (element)"
          />
          <Profile
            Name = "Katsuko Saruhashi"
            Source = "YfeOqp2"
            Profession = "geochemist"
            Awards = "2"
            A_explain = "(Miyake Prize for geochemistry, Tanaka Prize)"
            Discovered = "a method for measuring carbon dioxide in seawater"
          />***
        </div>
      );
    }
    ```
    
    Gallery 태그 내에 중복되는 부분을 Profile 컴포넌트로 추출해서 다른 부분들만 props로 처리했습니다.
    
- Challange 2 / 3
    
    ```jsx
    import { getImageUrl } from './utils.js';
    
    function Avatar({ person, size }) {
      return (
        <img
          className="avatar"
          src={getImageUrl(person, ***size<90?'s':'b'*** )}
          alt={person.name}
          width={size}
          height={size}
        />
      );
    }
    
    export default function Profile() {
      return (
        <Avatar
          size={40}
          person={{ 
            name: 'Gregorio Y. Zara', 
            imageId: '7vQD0fP'
          }}
        />
      );
    }
    ```
    
    Avatar 컴포넌트 속 getImageUrl의 size props를 바꿔서 해결했습니다.
    
- Challange 3 / 3
    
    ```jsx
    ***function Card({ children }){
      return (
        <div className="card">
          <div className="card-content">
            {children}
          </div>
        </div>
      );
    }***
    
    export default function Profile() {
      return (
        <div>
          ***<Card>
            <h1>Photo</h1>
            <img
              className="avatar"
              src="https://i.imgur.com/OKS67lhm.jpg"
              alt="Aklilu Lemma"
              width={70}
              height={70} 
            />
          </Card>
          <Card>
            <h1>About</h1>
            <p>Aklilu Lemma was a distinguished Ethiopian scientist who discovered a natural treatment to schistosomiasis.</p>
          </Card>***
        </div>
      );
    }
    ```
    
    Card 컴포넌트를 추출하고, 내용은 children prop으로 처리했습니다.
