import React, { useState } from "react";

function useCount() {
  const [count, setCount] = useState(0);

  const increment = () => setCount((c) => (c < 20 ? c + 1 : 0));
  const decrement = () => setCount((c) => (c > 0 ? c - 1 : 0));

  return { count, increment, decrement };
}

const Count = () => {
  return (
    <>
      <h1>Count: {useCount().count}</h1>
      <button onClick={useCount().increment}>Increment</button>
      <button onClick={useCount().decrement}>Decrement</button>
    </>
  );
};

export default Count;
