# ****Conditional Rendering****

- 👍조건에 따라 jsx를 반환할 수 있습니다.
    
    ```jsx
    function Item({ name, isPacked }) {
      ***if (isPacked)*** {
        return <li className="item">{name} ✔</li>;
      ***}***
      return <li className="item">{name}</li>;
    }
    
    export default function PackingList() {
      return (
        <section>
          <h1>Sally Ride's Packing List</h1>
          <ul>
            <Item 
              ***isPacked={true}*** 
              name="Space suit" 
            />
            <Item 
              ***isPacked={true}*** 
              name="Helmet with a golden leaf" 
            />
            <Item 
              ***isPacked={false}*** 
              name="Photo of Tam" 
            />
          </ul>
        </section>
      );
    }
    ```
    
- 👍조건에 따라 NULL 값을 반환할 수도 있습니다.
    
    ```jsx
    if (isPacked) {
      ***return null;***
    }
    return <li className="item">{name}</li>;
    ```
    
- 👍삼항 연산자를 이용해서 조건에 따라 jsx를 포함시킬 수 있습니다.
    
    ```jsx
    return (
      <li className="item">
        ***{isPacked ? name + ' ✔' : name}***
      </li>
    );
    ```
    
- 👍괄호와 줄바꿈을 이용해서 더 많은 html 태그를 반환할 수 있습니다.
    
    ```jsx
    function Item({ name, isPacked }) {
      return (
        <li className="item">
          {isPacked ? (
            ***<del>
              {name + ' ✔'}
            </del>***
          ) : (
            name
          )}
        </li>
      );
    }
    ```
    
- 👍&&연산자의 논리를 통해 조건을 표현할 수도 있습니다.
    
    ```jsx
    return (
      <li className="item">
        {name} ***{isPacked && '✔'}***
      </li>
    );
    ```
    
    - ⚠️&&연산자의 왼쪽에 0을 두지 말 것⚠️
        
        messageCount && <p>New messages</p> 같이 messageCount가 0 인 것으로 판단되지 않고 숫자 그 자체로 해석되기 때문에 messageCount > 0 && <p>New messages</p> 와 같은 방식으로 좌항의 boolean을 만들라고 합니다.
        

- Challange 1 / 3
    
    ```jsx
    function Item({ name, isPacked }) {
      return (
        <li className="item">
          {name} ***{isPacked ? '✔' : '❌'}***
        </li>
      );
    }
    
    export default function PackingList() {
      return (
        <section>
          <h1>Sally Ride's Packing List</h1>
          <ul>
            <Item 
              isPacked={true} 
              name="Space suit" 
            />
            <Item 
              isPacked={true} 
              name="Helmet with a golden leaf" 
            />
            <Item 
              isPacked={false} 
              name="Photo of Tam" 
            />
          </ul>
        </section>
      );
    }
    ```
    
    삼항 연산자로 ❌ 경우도 추가했습니다.
    
- Challange 2 / 3
    
    ```jsx
    function Item({ name, importance }) {
      return (
        <li className="item">
          {name} 
          ***<i>
            {importance>0 && " (Importance: "+importance+")"}
          </i>***
        </li>
      );
    }
    
    export default function PackingList() {
      return (
        <section>
          <h1>Sally Ride's Packing List</h1>
          <ul>
            <Item 
              importance={9} 
              name="Space suit" 
            />
            <Item 
              importance={0} 
              name="Helmet with a golden leaf" 
            />
            <Item 
              importance={6} 
              name="Photo of Tam" 
            />
          </ul>
        </section>
      );
    }
    ```
    
    i 태그와 && 연산자로 중요도를 추가했습니다.
    
- Challange 3 / 3
    
    ```jsx
    function Drink({ name }) {
      ***if(name === 'tea' ){
        return (
          <section>
            <h1>{name}</h1>
            <Children plant='leaf' caffein='15–70 mg/cup' age='4,000+ years' />
          </section>
        );
      }else if(name === 'coffee'){
        return (
          <section>
            <h1>{name}</h1>
            <Children plant='bean' caffein='80–185 mg/cup' age='1,000+ years' />
          </section>
        );
      }***
    }
    
    ***function Children({plant, caffein, age}){
      return(
        <dl>
          <dt>Part of plant</dt>
          <dd>{plant}</dd>
          <dt>Caffeine content</dt>
          <dd>{caffein}</dd>
          <dt>Age</dt>
          <dd>{age}</dd>
        </dl>
      );
    }***
    
    export default function DrinkList() {
      return (
        <div>
          <Drink name="tea" />
          <Drink name="coffee" />
        </div>
      );
    }
    ```
    
    Drink 컴포넌트 안에서 if 사용하고 Children 컴포넌트를 추가하여 처리했습니다.
