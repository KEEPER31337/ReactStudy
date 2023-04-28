`components`가 스크린에 보이기 전에 다음과 같은 과정을 거친다

1. Trigger
2. Render
3. Commit

# Step 1: Trigger

`component rendering`에는 2가지 이유가 있다

1. initial render
2. state가 업데이트 될때

## Initial render

앱이 처음 시작되면 `initial render`를 trigger 한다.

`createRoot`로 target DOM node가 호출되면 관련된 모든 `components`의 `initial render`가 trigger 된다

## state가 업데이트 될때

만약 한 `component`의 `state`가 set 함수에 의하여 업데이트 된다면, 자동으로 렌더링이 된다

# Step 2: Render

만약, `initial render`가 `trigger` 되면, `root component`를 렌더링 한다

그외에는, `state`가 업데이트 된 `component`를 렌더링 한다

이 모든 과정은 재귀적으로 이루어 진다

즉, 부모 component가 렌더링되기전에 자식 component가 렌더링 된다

렌더링된 정보들은 `commit` 되기 전까진 화면상엔 반영되지 않는다

**주의!**

모든 렌더링은 순수해야 한다!

1. 같은 input, 같은 output
   같은 input이 들어오면 같은 JSX가 나온다
2. 자기일만 생각하기
   렌더링 되기 전의 어떠한 객체나 변수도 바꾸지 않는다

# Step 3: Commit

만약, `intial render`가 끝나면 모든 `component`를 화면에 그린다

리렌더링일땐, 변화한 화면만 그린다

`React`는 필요한 부분만 그린다. 즉, `rendering`과정에서 계산된 변화가 필요한 부분만 다시 그린다

변화하지 않은 부분은 변경되지 않는다
