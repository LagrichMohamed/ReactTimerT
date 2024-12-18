import  React , {useState, useEffect} from "react";
import Stopwatch from "./components/Stopwatch";

const App = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Stopwatch />
    </div>
  );  
};

export default App;