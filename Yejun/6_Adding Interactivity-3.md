# Updating Objects in State ~ Updating Arrays in State

# ****Updating Objects in State****

---

> state는 객체를 포함하여 어떤 종류의 JavaScript 값이든 저장할 수 있습니다. 하지만 state에 저장 객체를 직접 변경해서 안 됩니다. 객체를 변경하려면 새 객체를 생성하고 해당 복사본을 사용하도록 state를 설정해야 합니다.
> 

### ****What’s a mutation?****

모든 종류의 JavaScript 값을 state에 저장할 수 있습니다. 지금까지 state에 사용했던 숫자나 문자열은 변경될 수 없는 읽기 전용 값입니다. 이 값을 변경하려면 re-render을 트리거해서 변경할 수 있습니다.

아래 예제에서는 state 값이 0에서 5로 변경되었지만 0이라는 숫자 자체가 변경된 것은 아닙니다.

```jsx
const [x, setX] = useState(0);
setX(5);
```

아래 예제에서는 position의 x 값을 변경하고 있습니다. 이렇게 객체 자체의 내용을 변하는 것이 가능하고 이를 mutation(변이)라고 합니다.

```jsx
const [position, setPosition] = useState({ x: 0, y: 0 });
position.x = 5;
```

React에서 state의 객체가 기술적으로는 변경이 가능하지만 변경할 수 없는 것처럼 취급해야 합니다.
따라서  객체를 수정하는 것이 아닌 항상 교체해야 합니다.

### ****Treat state as read-only****

state에 넣은 모든 JavaScript 객체를 읽기 전용으로 취급해야 합니다.

```jsx
const [position, setPosition] = useState({
    x: 0,
    y: 0
});
```

아래 코드에서는 state에 저장된 객체를 직접 수정하고 있습니다. 그렇지만 state 설정 함수를 사용하지 않았기 때문에 React는 객체가 변경된 것을 알 수 없습니다. 따라서 어떠한 변경도 일어나지 않습니다. 그렇기에 렌더링에서 접근할 수 있는 state 값은 읽기 전용으로 취급해야 합니다.

(state mutating이 경우에 따라 작동할 수 있지만 권장하지 않습니다)

```jsx
onPointerMove={e => {
  position.x = e.clientX;
  position.y = e.clientY;
}}
```

setPosition을 사용해 새로운 position 객체를 저장해주면 렌더링이 다시 진행되고 의도대로 동작합니다.

```jsx
onPointerMove={e => {
  setPosition({
    x: e.clientX,
    y: e.clientY
  });
}}
```

<aside>
💡 ****Local mutation is fine****

</aside>

아래 두 코드는 모두 사용가능하며 동일하게 작동합니다. 이미 state에 있는 객체를 변경하는 것은 문제가 되지만 지역적인 mutation를 ********사용하는 것은 가능합니다. 

```jsx
const nextPosition = {};
nextPosition.x = e.clientX;
nextPosition.y = e.clientY;
setPosition(nextPosition);
```

```jsx
setPosition({
  x: e.clientX,
  y: e.clientY
});
```

### ****Copying objects with the spread syntax****

위의 예제에서는 position 객체를 완전히 새로 만들었지만 새 객체 일부는 기존 데이터를 포함해야 하는 경우도 있습니다. 예를 들어 여러 필드 중에 하나만 수정하고 나머지 값을 유지하고 싶다고 한다면 아래 코드 처럼 작성하는 방법도 있지만,

```jsx
setPerson({
  firstName: e.target.value, // New first name from the input
  lastName: person.lastName,
  email: person.email
});
```

이렇게 spread 구문을 사용해서 기존 객체에서 값을 복사해 오는 것도 가능합니다.

```jsx
setPerson({
  ...person, // Copy the old fields
  firstName: e.target.value // But override this one
});
```

spread 구문을 사용할 경우 얕은 복사가 발생합니다. 속도는 빠르지만 중첩된 속성을 업데이트하려면 두 번 이상 사용해야 합니다.

<aside>
💡 ****Using a single event handler for multiple fields****

</aside>

객체 정의 내에서 및 중괄호[]를 사용하여 동적 이름으로 속성을 지정할 수도 있습니다

```jsx
function handleChange(e) {
    setPerson({
      ...person,
      [e.target.name]: e.target.value
    });
  }
```

### ****Updating a nested object****

```jsx
const [person, setPerson] = useState({
  name: 'Niki de Saint Phalle',
  artwork: {
    title: 'Blue Nana',
    city: 'Hamburg',
    image: 'https://i.imgur.com/Sd1AgUOm.jpg',
  }
});
```

위와 같이 중첩된 객체를 수정하기 위해서는 먼저 새로 artwork객체를 생성한 다음 새로운 person 객체를 생성해야 합니다.

```jsx
const nextArtwork = { ...person.artwork, city: 'New Delhi' };
const nextPerson = { ...person, artwork: nextArtwork };
setPerson(nextPerson);
```

혹은 spread 구문을 활용해서 아래와 같이 단일 함수 호출로도 작성할 수 있습니다.

```jsx
setPerson({
  ...person, // Copy other fields
  artwork: { // but replace the artwork
    ...person.artwork, // with the same one
    city: 'New Delhi' // but in New Delhi!
  }
});
```

<aside>
💡 ****Objects are not really nested****

</aside>

아래 객체는 obj내에 artwork가 있어 중첩된 객체 보입니다.

```jsx
let obj = {
  name: 'Niki de Saint Phalle',
  artwork: {
    title: 'Blue Nana',
    city: 'Hamburg',
    image: 'https://i.imgur.com/Sd1AgUOm.jpg',
  }
};
```

하지만 실행될 때는 아래와 같이 두 개의 서로 다른 객체가 존재하며 객체를 가리키고 있습니다. 따라서 obj1은 obj2 내부에 있지 않기 때문에 다른 객체에서도 사용할 수 있습니다.

```jsx
let obj1 = {
  title: 'Blue Nana',
  city: 'Hamburg',
  image: 'https://i.imgur.com/Sd1AgUOm.jpg',
};

let obj2 = {
  name: 'Niki de Saint Phalle',
  artwork: obj1
};
```

### ****Write concise update logic with Immer****

Immer는 mutating 구문을 사용하여 편리하게 사본을 처리할 수 있게 해주 인기있는 라이브러리입니다. 아래와 같이 사용할 수 있으며 원본 객체를 변형하는 것 처럼 보이지만 일반 mutation과 달리 이전 state를 덮어쓰지 않습니다.

```jsx
updatePerson(draft => {
  draft.artwork.city = 'Lagos';
});
```

Immer를 사용하려면 :

1. `npm install use-immer` 를 사용해 immer를 설치합니다.
2. `import { useState } from 'react'` 대신 `import { useImmer } from 'use-immer'`를 사용합니다.

아래 예제 코드와 같이 사용할 수 있습니다. (useState → useImmer)

```jsx
import { useImmer } from 'use-immer';

export default function Form() {
  const [person, updatePerson] = useImmer({
    name: 'Niki de Saint Phalle',
    artwork: {
      title: 'Blue Nana',
      city: 'Hamburg',
      image: 'https://i.imgur.com/Sd1AgUOm.jpg',
    }
  });
```

### ****Recap****

- React의 모든 state를 읽기 전용으로 취급합니다.
- 객체를 state에 저장한 경우 객체를 직접 변경하더라고 렌더링이 트리거되지 않습니다.
- 객체를 변경하는 대신 새로운 객체를 생성하여 저장하면 렌더링이 트리거 됩니다.
- spread 구문을 사용하여 객체의 복사본을 만들 수 있습니다.
- spread 구문은 얕은 복사가 발생합니다.
- 반복적인 복사 코드를 줄이려면 immer를 사용할 수 있습니다.

# ****Updating Arrays in State****

---

### ****Updating arrays without mutation****

JavaScript에서 배열도 다른 종류의 객체입니다. 객체와 마찬가지로 React state에 저장된 배열은 읽기 전용으로 취급해야 합니다. 따라서 배열 내부의 항목을 재할당하거나 변경하는 메소드를 사용해서는 안됩니다. (`push()` `pop()` 등)

대신 배열을 업데이트 할 때마다 새 배열을 state 설정 함수에 전달해야 합니다. 이를 위해 `filter()` 나 `map()`과 같은 기존 배열이 변경되지 않는 메소드를 호출해서 새 배열을 만들 수 있습니다. 

아래는 배열 작업의 참조 테이블입니다. React state의 배열을 다룰 때에는 왼쪽 열의 메소드는 피하고 오른쪽 열의 메소드를 사용해야 합니다.

|  | avoid (mutates the array) | prefer (returns a new array) |
| --- | --- | --- |
| adding | push, unshift | concat, [...arr] spread syntax |
| removing | pop, shift, splice | filter, slice |
| replacing | splice, arr[i] = ... assignment | map |
| sorting | reverse, sort | copy the array first |

Immer를 사용하면 두 열의 메서드를 모두 사용할 수 있습니다.

<aside>
⚠️ `slice`와 `splice`이름은 비슷하지만 매우 다릅니다.

- `slice` : 배열 또는 그 일부를 복사할 수 있습니다.
- `splice` : 항목을 삽입하거나 삭제하기 위해 배열을 변경합니다**.**
</aside>

### ****Adding to an array****

`push()`는 원하지 않는 배열을 변경합니다.

새로운 배열을 만드는 방법에는 여러가지가 있지만 가장 쉬운 방법은 spread 구문을 활용하여 배열에 원소를 추가할 수 있습니다. 

```jsx
setArtists( // Replace the state
  [ // with a new array
    ...artists, // that contains all the old items
    { id: nextId++, name: name } // and one new item at the end
  ]
);
```

가장 앞에 원소를 추가하고 싶다면 아래와 같이 사용할 수 있습니다.

```jsx
setArtists([
  { id: nextId++, name: name },
  ...artists // Put old items at the end
]);
```

### ****Removing from an array****

배열에서 원소를 제거하는 가장 쉬운 방법은 필터링을 활용하는 것입니다. `filter` 메소드를  사용해서 해당 항목을 포함하지 않는 새 배열을 생성합니다.

```jsx
setArtists(
  artists.filter(a => a.id !== artist.id)
);
```

여기서 `artists.filter(a => a.id !== artist.id)`는 id가 `artist.id`와 다른 것들로 구성된 배열을 만든다는 의미입니다. `filter`를 사용해 삭제하고자 하는 원소를 필터링하고 새로운 배열을 만들어 state 설정 함수를 호출하며 기존 배열을 수정하지 않습니다.

### ****Transforming an array****

배열의 일부 또는 전체 원소를 변경하려는 경우 map()을 사용하여 새 배열을 만들 수 있습니다. 전달할 함수는 인덱스 또는 데이터를 기반으로 각 원소에 대해 수행할 작업을 결정할 수 있습니다.

아래 예에서는 두 개의 원과 정사각형 좌표를 저장하고 버튼을 누르면 원만 50px 아래로 이동합니다.
map()을 사용하여 새로운 배열을 만들고 작업을 수행합니다.

```jsx
const [shapes, setShapes] = useState(
  [{ id: 0, type: 'circle', x: 50, y: 100 },
   { id: 1, type: 'square', x: 150, y: 100 },
   { id: 2, type: 'circle', x: 250, y: 100 }]
  );

function handleClick() {
  const nextShapes = shapes.map(shape => {
    if (shape.type === 'square') {
      // No change
      return shape;
    } else {
      // Return a new circle 50px below
      return {
        ...shape,
        y: shape.y + 50,
      };
    }
  });
  // Re-render with the new array
  setShapes(nextShapes);
}
```

### ****Replacing items in an array****

배열에서 하나 이상의 항목을 변경하려는 경우가 많습니다. `arr[0] = 0`와 같이 사용하면 원래 배열을 변경하므로 대신 map을 사용할 수 있습니다.

아래 예는 `map()`을 사용하여 새 배열을 만들고 인덱스를 두 번째 인수로 받아 변경된 값을 반환할지 원래 값을 반환할지 결정합니다. 

```jsx
const [counters, setCounters] = useState(
    [0, 0, 0]
  );

function handleIncrementClick(index) {
  const nextCounters = counters.map((c, i) => {
    if (i === index) {
      // Increment the clicked counter
      return c + 1;
    } else {
      // The rest haven't changed
      return c;
    }
  });
  setCounters(nextCounters);
}
```

### ****Inserting into an array****

배열의 시작과 끝이 아닌 특정 위치에 원소를 삽입해야 할 수도 있습니다. 이렇게 하려면 spread 구문과 `slice()`를 함께 사용해서 처리할 수 있습니다.

```jsx
const [name, setName] = useState('');
const [artists, setArtists] = useState(
  [{ id: 0, name: 'Marta Colvin Andrade' },
	 { id: 1, name: 'Lamidi Olonade Fakeye'},
	 { id: 2, name: 'Louise Nevelson'}]
);

function handleClick() {
  const insertAt = 1; // Could be any index
  const nextArtists = [
    // Items before the insertion point:
    ...artists.slice(0, insertAt),
    // New item:
    { id: nextId++, name: name },
    // Items after the insertion point:
    ...artists.slice(insertAt)
  ];
  setArtists(nextArtists);
  setName('');
}
```

### ****Making other changes to an array****

filter(), map(), spread 구문, 비변형 메소드만으로는 수행할 수 없는 작업도 있습니다. 예를 들어 배열을 뒤집거나 정렬해야 하는 경우가 있습니다. JavaScript의 reverse()나 sort() 메소드는 기존 배열을 변경함으로 직접 사용할 수 없습니다.

그러나 배열을 복사한 다음 변경하여 저장하는 것은 가능합니다.
아래와 같이 nextList에 list를 먼저 복사본을 만들고 reverse() 메소드를 사용하여 수정한 뒤 state 설정 함수를 사용해 저장 할 수 있습니다.

```jsx
const [list, setList] = useState(
  [{ id: 0, title: 'Big Bellies' },
   { id: 1, title: 'Lunar Landscape' },
   { id: 2, title: 'Terracotta Army' }]);

function handleClick() {
  const nextList = [...list];
  nextList.reverse();
  setList(nextList);
}
```

그러나 배열을 복사하더라도 아래와 같이 배열 내부의 객체를 직접 수정 할 수는 없습니다. spread 구문을 사용해 얕은 복사가 일어난 상태이기 때문입니다. 새 배열에는 원래 배열과 동일한 항목이 포함되기 때문에 복사된 배열 내부 객체를 수정하면 기존 배열의 객체 역시 수정됩니다. 따라서 아래와 같은 코드는 문제가 있습니다.

```jsx
const nextList = [...list];
nextList[0].seen = true; // Problem: mutates list[0]
setList(nextList);
```

위의 코드에서 list[0]와 nextList[0]는 동일한 객체를 가리키고 있습니다. 따라서 nextList[0]을 변경할 경우 list[0]도 함께 변경되고 이는 state mutating가 발생한 것입니다. 중접된 객체를 변경하는 것과 유사한 방법으로 이 문제를 해결할 수 있습니다. 변경하려는 개별 항목을 복사해야 합니다.

### ****Updating objects inside arrays****

객체는 실제로 배열 내부에 있지 않습니다. 코드에서는 내부에 있는 것처럼 보일 수 있지만 배열내의 각 객체는 배열이 가리키는 별도의 값입니다. 그렇기에 list[0]과 같은 중첩 필드를 변경할 때는 주의해야 합니다. 다른 배열에서 동일한 요소를 가리키고 있을 수 있습니다.

따라서 중첩된 state를 업데이트하려면 업데이트 하려는 지점부터 최상위 레벨까지 복사본을 만들어야 합니다.

아래 코드는 myNextList라는 복사본 배열을 만들었지만 배열내의 객체는 myList와 동일합니다. 따라서 myNextList의 객체 내부 값을 수정할 경우 원본 배열 내의 값도 함께 수정되기에 버그를 발생시킵니다. 

```jsx
const myNextList = [...myList];
const artwork = myNextList.find(a => a.id === artworkId);
artwork.seen = nextSeen; // Problem: mutates an existing item
setMyList(myNextList);
```

map을 사용해서 기존 배열에는 아무런 변경 없이 수정할 수 있습니다.

```jsx
setMyList(myList.map(artwork => {
  if (artwork.id === artworkId) {
    // Create a *new* object with changes
    return { ...artwork, seen: nextSeen };
  } else {
    ****// No changes
    return artwork;
  }
}));
```

### ****Write concise update logic with Immer****

기존 배열의 변형 없이 중첩 배열을 변경하려면 객체와 마찬가지로 반복되는 부분이 있습니다.

객체와 마찬가지로 Immer를 사용해서 아래와 같은 간결한 코드 작성이 가능합니다.

```jsx
const [myList, updateMyList] = useImmer(
  [{ id: 0, title: 'Big Bellies', seen: false },
  { id: 1, title: 'Lunar Landscape', seen: false },
  { id: 2, title: 'Terracotta Army', seen: true }]
);

updateMyTodos(draft => {
  const artwork = draft.find(a => a.id === artworkId);
  artwork.seen = nextSeen;
});
```

이는 원래 state를 변경하는 것이 아니라 immer에서 제공하는 특수 객체를 변경하기 때문입니다.  그렇기에 push(), pop() 등의 원본 배열을 변경하는 메소드도 사용할 수 있습니다. 이렇게 하면 mutating state 없이도 이벤트 핸들러를 간결하게 유지할 수 있습니다.

### ****Recap****

- state에 배열을 넣을 수는 있지만 변경해서는 안됩니다.
- 배열을 변경하는 대신 새 버전을 만들고 상태를 업데이트합니다.
- 배열 스프레드 구문을 사용하여 새 항목으로 배열을 만들 수 있습니다. (`[...arr, newItem]`)
- `filter()`나 `map()`을 사용하여 필터링되거나 변환된 항목으로 새 배열을 만들 수 있습니다.
- Immer를 사용하여 코드를 간결하게 유지할 수 있습니다.