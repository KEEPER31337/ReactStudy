# Start a New React Project
리액트로 새로운 앱 또는 웹사이트를 구축하기 위해서 React 기반 프레임워크를 사용하는 걸 추천
- 프레임워크 사용 -> 라우팅, 데이터 패칭, HTML 생성등 기능 제공

📌 로컬 개발에는 Node.js 필요

## Production-grade React frameworks
- Next.js : full-stack React framework
- Remix : full-stack React framework with nested routing
- Gatsby : React framework for fast CMS-backed websites
- Expo (for native apps) : React framework that lets you create universal Android, iOS, and web apps with truly native UIs

## Bleeding-edge React frameworks
Next.js와 협력하여 RSC와 같은 프레임워크에 구애 받지 않는 React 기능을 연구, 개발, 통합 및 테스트 중에 있음
- Next.js (App Router) : React의 전체 스택 아키텍처 비전을 실현하기 위해 Next.js API를 재설계한 것 (*아직 베타 버전)

<br />

# Add React to an Existing Project
기존 프로젝트에 리액트를 사용하기 위해 새로 리액트에서 다시 작성할 필요 없이 기존 스택에 리액트 추가하여 컴포넌트 렌더링 가능

📌 로컬 개발에는 Node.js 필요

## Using React for an entire subroute of your existing website
`example.com`에 웹 앱이 존재하는 상태라고 했을 때 `example.com/some-app/`로 시작하는 모든 라우터를 리액트를 사용하여 구현하고 싶을 때 아래의 방법 사용

1. 리액트 기반 프레임워크 사용하여 앱의 리액트 부분을 구축
2. 프레임워크 configuration에 `/some-app`을 base 경로로 지정
3. `/some-app/`아래 모든 요청을 리액트앱에서 처리할 수 있도록 서버 또는 프록시 구성

## Using React for a part of your existing page
1. 모듈식 JavaScript 환경 설정
- `npm install react react-dom`
- index.js
  ```jsx
  import { createRoot } from 'react-dom/client';
  
  // Clear the existing HTML content
  document.body.innerHTML = '<div id="app"></div>';
  
  // Render your React component instead
  const root = createRoot(document.getElementById('app'));
  root.render(<h1>Hello, world</h1>);
  ```

<br />

2. 페이지의 아무 곳에나 React 구성 요소 렌더링
- index.html
  ```jsx
  <!DOCTYPE html>
  <html>
    <head><title>My app</title></head>
    <body>
      <p>This paragraph is a part of HTML.</p>
      <nav id="navigation"></nav>
      <p>This paragraph is also a part of HTML.</p>
    </body>
  </html>
  ```
- index.js
  ```jsx
  import { createRoot } from 'react-dom/client';
  
  function NavigationBar() {
    // TODO: Actually implement a navigation bar
    return <h1>Hello from React!</h1>;
  }
  
  const domNode = document.getElementById('navigation');
  const root = createRoot(domNode);
  root.render(<NavigationBar />);
  ```
-  렌더링 결과
    <img width="503" alt="image" src="https://user-images.githubusercontent.com/78250089/227422809-467fdcf7-6e31-4a4f-a3b8-bf3b9e92d35d.png">

<br />

# Editor Setup
## Your editor
- VS code - 오늘날 가장 인기있는 에디터
- WebbStorm
- Sublime Text
- Vim

## Recommended text editor features
### Linting
: 코드 작성 시 문제를 찾고 빠르게 고치는데 도움을 줌
- ESLint

### Formatting
: 탭과 공백 등의 규칙에 맞는 형태로 코드를 정리
- Prettier

<br />

# React Developer Tools
<img width="1151" alt="image" src="https://user-images.githubusercontent.com/78250089/227440254-763574f6-d115-4576-9457-3b709c919659.png">
