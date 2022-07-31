import "./App.css";
import { useState } from "react";
import PitchDetection from "./PitchDetection";
function App() {
  const [tuneDirection, setTuneDirection] = useState();
  return (
    <div className="App">
      <header className="App-header">Guitar Tuner</header>
      <p>{tuneDirection}</p>
      <PitchDetection setTuneDirection={setTuneDirection}></PitchDetection>
    </div>
  );
}

export default App;
