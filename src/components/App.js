import React from "react";

const App = (props) => {
  const click = () => console.log('zzw666!')
  return <div onClick={click}>zzw1994529 - {props.title}</div>
}

export default App
