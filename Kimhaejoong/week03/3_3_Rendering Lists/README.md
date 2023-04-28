# ****Rendering Lists****

아래 리스트를

```jsx
<ul>
  <li>Creola Katherine Johnson: mathematician</li>
  <li>Mario José Molina-Pasquel Henríquez: chemist</li>
  <li>Mohammad Abdus Salam: physicist</li>
  <li>Percy Lavon Julian: chemist</li>
  <li>Subrahmanyan Chandrasekhar: astrophysicist</li>
</ul>
```

1. array로 옮깁니다.

```jsx
***const people =*** [
  'Creola Katherine Johnson: mathematician',
  'Mario José Molina-Pasquel Henríquez: chemist',
  'Mohammad Abdus Salam: physicist',
  'Percy Lavon Julian: chemist',
  'Subrahmanyan Chandrasekhar: astrophysicist'
];
```

2. jsx의 새 array에 기존 array의 데이터를 map합니다.

```jsx
***const listItems = people.map(person => <li>{person}</li>);***
```

3. 컴포넌트에서 새 array를 <ul>로 감싸서 리턴합니다.

```jsx
return <ul>{listItems}</ul>;
```

- 👍자바스크립트의 filter() 메소드를 사용하여 아이템들을 필터링할 수 있습니다.
    
    아래의 데이터에서
    
    ```jsx
    const people = [{
      id: 0,
      name: 'Creola Katherine Johnson',
      profession: 'mathematician',
    }, {
      id: 1,
      name: 'Mario José Molina-Pasquel Henríquez',
      profession: 'chemist',
    }, {
      id: 2,
      name: 'Mohammad Abdus Salam',
      profession: 'physicist',
    }, {
      name: 'Percy Lavon Julian',
      profession: 'chemist',  
    }, {
      name: 'Subrahmanyan Chandrasekhar',
      profession: 'astrophysicist',
    }];
    ```
    
    1. filter() 메소드를 통해 chemist만 있는 새 array를 만듭니다
    
    ```jsx
    ***const chemists = people.filter(person =>
      person.profession === 'chemist'
    );***
    ```
    
    2. chemist를 map합니다.
    
    ```jsx
    ***const listItems = chemists.map(person =>***
      <li>
         <img
           src={getImageUrl(person)}
           alt={person.name}
         />
         <p>
           <b>{person.name}:</b>
           {' ' + person.profession + ' '}
           known for {person.accomplishment}
         </p>
      </li>
    ***);***
    ```
    
    3. 컴포넌트에 리턴합니다.
    
    ```jsx
    return <ul>{listItems}</ul>;
    ```
    
    ⚠️ ⇒ 는 return 없이 값을 리턴하지만, 중괄호를 사용했을 때는 반드시 return 해줘야 합니다.⚠️
    

- 🔴리스트의 각 항목에 key를 추가하여 해당 경고를 해결합니다.
    
    ```jsx
    Warning: Each child in a list should have a unique “key” prop.
    ```
    
    ```jsx
    <li key={person.id}>...</li>
    ```
    
- Key
    
    데이터베이스의 데이터 : 데이터베이스 고유의 Key/ID 
    
    로컬 생성 데이터 : incrementing counter, `[crypto.randomUUID()](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID)`, `[uuid](https://www.npmjs.com/package/uuid)` 패키지 사용
    
    **sibling 끼리는 고유한 Key를 가져야하지만**, 다른 array에서 같은 Key를 사용해도 됩니다.
    
    **Key는 변경하면 안됩니다**. 렌더링할 때 생성하면 안됩니다.
    
    **jsx의 Key**는 **폴더의 파일이름**과 같은 역할을 합니다.
    

- Challange 1 / 4
    
    ```jsx
    import { people } from './data.js';
    import { getImageUrl } from './utils.js';
    
    export default function List() {
      ***const chemists = people.filter(person => 
        person.profession === 'chemist'
      );
      const everyoneElse = people.filter(person => 
        person.profession !== 'chemist'
      );***
      return (
        <article>
          <h1>Scientists</h1>
          ***<h2>Chemists</h2>
          <ul>
            {chemists.map(person =>
              <li key={person.id}>
                <img
                  src={getImageUrl(person)}
                  alt={person.name}
                />
                <p>
                  <b>{person.name}:</b>
                  {' ' + person.profession + ' '}
                  known for {person.accomplishment}
                </p>
              </li>
            )}
          </ul>
          <h2>Everyone Else</h2>
          <ul>
            {everyoneElse.map(person =>
              <li key={person.id}>
                <img
                  src={getImageUrl(person)}
                  alt={person.name}
                />
                <p>
                  <b>{person.name}:</b>
                  {' ' + person.profession + ' '}
                  known for {person.accomplishment}
                </p>
              </li>
            )}
          </ul>***
        </article>
      );
    }
    ```
    
    chemists 와 everyoneElse array를 새로 만들어서 return할 때 불러왔습니다.
    
- Challange 2 / 4
    
    ```jsx
    import { recipes } from './data.js';
    
    export default function RecipeList() {
      return (
        <div>
          <h1>Recipes</h1>
          ***{recipes.map(recipe =>
            <div key={recipe.id}>
              <h2>{recipe.name}</h2>
              <ul>
                {recipe.ingredients.map(ingredient =>
                  <li key={ingredient}>
                    {ingredient}</li>
                )}
              </ul>
            </div>
          )}***
        </div>
      );
    }
    ```
    
    map을 사용했고, h2에는 recipe.name, li에는 recipe.ingredients를 map으로 넣었습니다.
    
- Challenge 3 / 4
    
    ```jsx
    import { recipes } from './data.js';
    
    ***function Recipe({id, name,ingredients}){
      return(
        <div>
          <h2>{name}</h2>
          <ul>
            {ingredients.map(ingredient =>
              <li key={ingredient}>
              {ingredient}
              </li>
            )}
          </ul>
        </div>
      );
    }***
    
    export default function RecipeList() {
      return (
        <div>
          <h1>Recipes</h1>
          {recipes.map(recipe =>
            ***<Recipe {...recipe} key={recipe.id} />***
          )}
        </div>
      );
    }
    ```
    
    RecipeList에서 Recipe 컴포넌트를 추출하고, props로 전달했습니다
    
- Challenge 4 / 4
    
    ```jsx
    const poem = {
      lines: [
        'I write, erase, rewrite',
        'Erase again, and then',
        'A poppy blooms.'
      ]
    };
    
    export default function Poem() {
      let output = [];
    
      // Fill the output array
      poem.lines.forEach((line, i) => {
        output.push(
          <hr key={i + '-separator'} />
        );
        output.push(
          <p key={i + '-text'}>
            {line}
          </p>
        );
      });
      // Remove the first <hr />
      output.shift();
    
      return (
        <article>
          {output}
        </article>
      );
    }
    ```
