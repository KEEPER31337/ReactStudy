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

# Importing and Exporting Components

## The root component file

- **Create React App**에서는 앱 전체가 `src/App.js`에서 실행되며 설정에 따라 root 컴포넌트가 다른 파일에 위치 가능.
  Next.js처럼 파일 기반으로 라우팅하는 프레임워크일 경우 페이지별로 root 컴포넌트가 다를 수 있음.

## Exporting and importing a component

컴포넌트의 모듈성이 강화되고 다른 파일에서 재사용할 수 있도록 파일 분리하는 3단계

1. 컴포넌트 넣을 파일 생성
2. 새로 만든 파일에 컴포넌트 함수 export
3. 컴포넌트를 사용할 파일에 import해서 사용

## Exporting and importing multiple components from the same file

한 파일에 `default export`는 하나만 가질 수 있지만, `named export`는 여러 개 가능

- `named import` 방식은 중괄호를 사용하여 import 가능

# Writing Markup with JSX

JSX는 JavaScript를 확장한 문법으로, JavaScript 파일 안에 HTML과 유사한 마크업을 작성할 수 있도록 해줌.

## JSX: Putting markup into JavaScript

웹이 interactive 해지면서 로직이 컨텐츠를 결정하는 경우가 많아짐
-> JavaScript가 HTML을 담당하게 됨
=> 이것이 바로 React에서 렌더링 로직과 마크업이 같은 위치의 컴포넌트에 함께 있는 이유

## Converting HTML to JSX

JSX는 HTML보다 더 엄격하며 몇 가지 규칙이 더 있음

## The Rules of JSX

1. Return a single root element

- 컴포넌트에서 다수의 엘리먼트들을 반환하기 위해서는 하나의 부모 태그로 감싸줘야 함.
  - \<div>
  - <> (Fragment)

2. Close all the tags

- JSX는 태그를 명식적으로 닫아줘야 함
  - <태그 />
  - <태그></태그>

3. camelCase ~~all~~ most of the things!

- JSX는 JavaScript로 바뀌고 JSX에서 작성된 어트리뷰트는 JavaScript 객체의 키가 됨
- 컴포넌트에서는 종종 어트리뷰트를 변수로 읽고 싶은 경우가 있는데 JavaScript는 변수명에 대시를 포함하거나 class처럼 예약어를 사용할 수 없는 제한이 있음
  => React에서 HTML과 SVG의 어트리뷰트 대부분이 camelCase로 작성됨

## Pro-tip: Use a JSX Converter

[변환기](https://transform.tools/html-to-jsx)를 사용하여 기존 HTML과 SVG를 JSX로 변환할 수 있음

# JavaScript in JSX with Curly Braces

## Passing strings with quotes

- 문자열 어트리뷰트를 JSX에 전달하려면 작은따옴표나 큰따옴표로 묶어야 함
- 텍스트를 동적으로 지정하기 위해서는 중괄호를 사용하여 마크업에서 바로 JavaScript 값을 사용할 수 있음

## Using curly braces: A window into the JavaScript world

JSX 안에서 중괄호는 두 가지 방법으로 사용 가능

1. JSX 태그 안의 문자

- ex. `<h1>{name}'s To Do List</h1>`

2. = 바로 뒤에 오는 어트리뷰트

- ex. `src={avatar}`

## Using “double curlies”: CSS and other objects in JSX

JSX에서 객체를 전달하려면 `person={{ name: "Hedy Lamarr", inventions: 5 }}`와 같이 다른 중괄호 쌍으로 객체를 감싸야 함

- ex. JSX의 인라인 CSS 스타일

+) 인라인 스타일 프로퍼티는 camelCase로 작성

- ex. HTML에서의 `<ul style="background-color: black">`은 컴포넌트에서 `<ul style={{ backgroundColor: 'black' }}>`로 작성
