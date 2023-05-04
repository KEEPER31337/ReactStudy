import { useState } from "react";

export default function Form() {
  const [isSent, setIsSent] = useState(false);
  const [message, setMessage] = useState("Hi!");

  console.log(`현재 isSent값은 ${isSent}입니다.`);

  if (isSent) {
    console.log("React는 새로운 isSent값에 따라 컴포넌트를 다시 렌더링합니다.");
    return <h1>Your message is on its way!</h1>;
  }

  return (
    <form
      onSubmit={(e) => {
        console.log("onSubmit 이벤트 핸들러가 실행됩니다.");
        e.preventDefault();
        setIsSent(true);
      }}
    >
      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
}
