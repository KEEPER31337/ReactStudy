## 실습 방법

1. `src/pages` 경로에 본인 폴더 생성 (첫글자 대문자)
   <img width="202" alt="image" src="https://user-images.githubusercontent.com/78250089/230432910-329a3dea-fba8-4682-b23d-af5b12695c37.png">
2. `src/pages/{본인 폴더}` 경로에 폴더명과 동일한 컴포넌트 파일 생성
   <img width="177" alt="image" src="https://user-images.githubusercontent.com/78250089/230433138-bbb5590d-f0ff-4ee3-bea8-5f2530630af1.png">
3. 해당 파일에 컴포넌트 생성 (컴포넌트 파일명과 동일하게 컴포넌트명 지정해주면 됩니다.)

```jsx
import React from 'react';

function Publdaze(props) {
  return (
    <div>
      {실습 컴포넌트}
    </div>
  );
}

export default Publdaze;
```

or

```jsx
import React from "react";

const Publdaze = () => {
  return (
    <div>
      {실습 컴포넌트}
    </div>
  );
};

export default Publdaze;
```

3. `App.jsx` 파일 상단에 본인 컴포넌트 import해주기
4. `App.jsx` 파일의 `router` 안의 `children` 배열에 아래 예시 같이 코드 추가

```jsx
{
  path: "publdaze",
  element: <Publdaze />,
},
```
