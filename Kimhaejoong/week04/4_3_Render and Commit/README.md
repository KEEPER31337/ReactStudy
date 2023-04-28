Trigger

Render

Commit

# ****Step 1: Trigger a render****

1. 구성 요소의 초기 렌더링이거나
2. 컴포넌트의 state가 업데이트되면

컴포넌트를 렌더링해야 합니다.

## ****Initial render****

app이 시작할 때 초기 렌더링이 트리거되야합니다. 프레임워크나 샌드박스가 이 코드를 숨기기도 하지만, `creatRoot`에 의해 실행되고, 컴포넌트의 렌더링을 불러옵니다.

## ****Re-renders when state updates****

State update…

…triggers…

…render!

state가 업데이트 되면 `set` function에 의해 렌더링이 트리거됩니다. 컴포넌트의 state가 업데이트되면 자동으로 렌더링 대기열에 오르게됩니다.

# ****Step 2: React renders your components****

렌더링 이란,  리액트가 컴포넌트를 호출하는 것을 말합니다.

초기 렌더링에서는 루트 컴포넌트를, 재렌더링에서는 state를 업데이트해 트리거된 컴포넌트를 렌더링합니다.

# ****Step 3: React commits changes to the DOM****

컴포넌트 렌더링 이후 리애그는 DOM을 수정합니다.

초기 렌더링에서 리액트는 생성한 모든 DOM 노드를 화면에 표시하고, 재렌더링에서는 렌더링 출력과 일치하도록 수정이 이뤄집니다.
