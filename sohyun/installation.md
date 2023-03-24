# Installation

[Installation 번역하면서 공부한 내용] : (https://www.notion.so/Installation-a0648d469e414eafaa103ea325e4e196?pvs=4)


## Start a New React Project
* * *
### local 개발은 Node.js 설치 필요 
framework 없이 react개발도 가능하지만, 페이지 일부에만 적용가능하다. 완전히 React로 새로운 app이나 site를 구축하는 경우 framework를 사용하는 것이 좋다.

## Add React to an Existing Project
* * *
### 기존의 website에 전체 하위 경로를 React로 사용

다른 서버 기술로 구축된 기존의 **example.com** web app이 있고, **React로** [**example.com/some-app/](http://example.com/some-app/) 로 모든 경로를 구현한다고 가정하자.**

**권장 설정 방법**

1. [**React 기반 framework**](https://react.dev/learn/start-a-new-react-project) 중 하나를 사용하여 app의 React 부분을 빌드한다.
2. framework 구성에서 **기본 경로를 /some-app 으로 지정**한다. (Next.js, Gatsby)
3. React app의 모든 요청이 /some-app/ 밑으로 처리가 되도록 **server 또는 proxy를 구성한다.**  

이렇게 하면 app의 React 부분이 해당 framework에 적용된 [**모범 사례를 활용할 수 있다.**](https://react.dev/learn/start-a-new-react-project#can-i-use-react-without-a-framework)

### 기존의 website에 일부를 React로 사용

2단계로 수행할 수 있다.

1. [**JSX 구문**](https://react.dev/learn/writing-markup-with-jsx)을 사용하고 import/export 구문을 사용해서 code를 모듈로 분할하고 npm package registry로 부터 package를 사용할 수 있는 **JavaScript 환경을 세팅**한다.
2. page에 보여주고 싶은 부분을 **React components로 Render**한다. 


### 기존의 Native Mobile App에 React Native 사용

기존의 native app은 React Native와 통합될 수 있다.


## Editor Setup
* * *
### 가장 많이 사용되는 Editor

VSCode가 가장 많이 사용된다.

### 추천하는 text editor 기능들

##### Linting

코드 작성 시, 코드의 문제점을 찾아 수정할 수 있도록 도와준다.

##### Formatting

Prettier를 사용하자.

## React Developer Tools
* * *
React 개발자 도구를 사용해서 React component 검사 및 props와 state를 편집해서 성능 문제 식별 가능

###### 자세한 내용을 확인하고 싶다면 직접 홈페이지 참고하기