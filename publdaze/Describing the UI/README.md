# Your First Component

## Components: UI building blocks

웹에서는 HTML을 통해 `<h1>`, `<li>`와 같은 태그를 사용하여 풍부한 구조의 문서를 만들 수 있는데, **React를 사용하면** 이런 markup, CSS, JavaScript를 앱의 재사용 가능한 UI 요소인 `Component`로 결합할 수 있음.

- 프로젝트의 성장에 따라 이미 구현된 컴포넌트를 재사용하며 더 빠른 속도의 개발 가능
- [Chakra UI](https://chakra-ui.com/), [Material UI](https://mui.com/core/)와 같은 React 오픈소스 커뮤니티에서 공유되는 수천 개의 컴포넌트로 프로젝트를 빠르게 시작 가능

## Defining a component

기존 웹 페이지는 웹 개발자가 콘텐츠를 마크업한 후 JavaScript를 뿌려 상호작용을 추가하였는데, **React는** 같은 기술을 사용하면서도 상호작용을 우선시 함: React 컴포넌트는 마크업으로 뿌릴 수 있는 JavaScript 함수

[ 컴포넌트를 빌드하는 방법 ]

1. Export the component
   `export default` 접두사는 표준 JavaScript 구문으로 다른 파일들에서 import하기 위해 해당 파일의 main 함수를 표시해줌.
2. Define the function
   `function Profile() { }`를 사용하여 `Profile`라는 JavaScript 함수를 정의할 수 있음
   > JSX에서 React 컴포넌트 명은 대문자로 시작해야 작동함.
3. Add markup

```jsx
return <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />;
```

이 컴포넌트는 `<img />` 태그를 반환함. `<img />`는 HTML처럼 작성되었지만 실제로는 JavaScript이며 이 구문을 JSX라고 함.

## Using a component

`Profile`이라는 컴포넌트를 정의했으면 다른 컴포넌트 안에서 중첩하여 사용 가능.

```jsx
function Profile() {
  return <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />;
}

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

- 브라우저에 표시되는 내용

```jsx
<section>
  <h1>Amazing scientists</h1>
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
</section>
```

- 컴포넌트 중첩 및 구성
  - 같은 파일에 여러 컴포넌트 포함 가능
  - `Profile` 컴포넌트는 `Gallery` 컴포넌트 내에 랜더링 되는데 이때 `Gallery`는 `Profile`를 자식으로 가지는 **부모 컴포넌트**라고 할 수 있음
  - 컴포넌트를 한 번 정의한 다음 원하는 곳에 원하는 만큼 여러 번 사용할 수 있음

> 컴포넌트를 중첩하려 렌더링 하는 건 가능하지만 정의를 중첩해서는 암됨
