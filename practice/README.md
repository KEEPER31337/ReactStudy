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

4. `App.jsx` 파일 상단에 본인 컴포넌트 import해주기
5. `App.jsx` 파일의 `router` 안의 `children` 배열에 아래 예시 같이 코드 추가

```jsx
{
  path: "publdaze",
  element: <Publdaze />,
},
```

6. `Home.jsx`에 본인 링크 추가

```jsx
<Link to="publdaze">
  <h3>publdaze</h3>
</Link>
```

7. 본인 컴포넌트 폴더 내에 추가 실습 폴더 및 컴포넌트 생성하고 3번에서 생성한 본인 컴포넌트에 import해서 사용해보며 실습 진행
   <img width="323" alt="image" src="https://user-images.githubusercontent.com/78250089/230439377-13b250c1-5157-42b7-b1ad-b8f4d9072038.png"> <img width="362" alt="image" src="https://user-images.githubusercontent.com/78250089/230439618-cd99d3de-3222-449f-a45e-524117698866.png">

## 실행 방법

1. root 경로에서 **practice** 폴더로 이동 `cd practice`
2. 프로젝트에 필요한 패키지를 설치 `npm i`
3. 프로젝트 실행 `npm start`
