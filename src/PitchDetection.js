import classes from "./PitchDetection.module.css";
import React, { useState } from "react";
import TunerCircle from "./TunerCircle";
let audioContext;

let pitch;
let stream;
let listen = false;
function PitchDetection() {
  const [freq, setFreq] = useState(0);
  const [isSetUp, setIsSetUp] = useState(false);

  async function setup() {
    audioContext = new AudioContext();
    stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });
    startPitch(stream, audioContext);
    audioContext.resume();
  }
  if (!isSetUp) {
    setup();
    setIsSetUp(true);
  }

  function startPitch(stream, audioContext) {
    pitch = window.ml5.pitchDetection(
      "./model/",
      audioContext,
      stream,
      modelLoaded
    );
  }
  function modelLoaded() {
    console.log(pitch);
  }
  function getPitch() {
    pitch.getPitch(function (err, frequency) {
      if (frequency) {
        setFreq(frequency);
      } else {
        setFreq("No freq");
      }
      if (listen) {
        getPitch();
      }
    });
  }
  function startListening() {
    listen = true;
    audioContext.resume();
    getPitch();
  }

  function stopListening() {
    setFreq(0);
    listen = false;
  }
  return (
    <React.Fragment>
      <div className={classes.container}>
        <TunerCircle frequency={freq} />
      </div>
      <span>
        <button className={classes.button} onClick={startListening}>
          Start Listening
        </button>
        <button className={classes.button} onClick={stopListening}>
          Stop Listening
        </button>
      </span>
    </React.Fragment>
  );
}

export default PitchDetection;
