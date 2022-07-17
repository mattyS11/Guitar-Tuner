import { useState } from "react";
import "./TunerCircle.css";
function TunerCircle(props) {
  const notes = new Map();
  let note;
  let note_accuracy;
  let prev_note_acc = "good";
  notes.set(164, "E");
  notes.set(110, "A");
  notes.set(220, "A");
  notes.set(147, "D");
  notes.set(196, "G");
  notes.set(246, "B");
  notes.set(330, "E");

  // Function: detectNote
  // Params: frequency: The value returned from our audioContext object, which defines the frequency of a note
  // Returns: None
  // Description: Function modifies the cents variable value which serves two purposes, one to actually determine the note, which is done by returning the minimum cents value  based  on all frequencies within our notes list. The second is to determine the accuracy of the note, which will modify the note_accuracy variable to render a visual to the user to notify them how close they are to a given note.
  function detectNote(frequency) {
    console.log(note_accuracy);
    let cents = Infinity;
    let curr_diff;
    notes.forEach((key, value) => {
      // Calculate cents value for each frequency representing a specific note within the notes map.
      curr_diff = Math.abs(1200 * (Math.log(value / frequency) / Math.log(2)));

      //
      if (curr_diff < cents) {
        cents = curr_diff;
        note = key;

        accuracy(cents);
      }
    });
  }

  // Function: accuracy
  // Params: cents
  // Returns: None
  // Description: Function modifies the note_accuracy variable to determine how close a user is to the proper pitch of a specific note. Will render the tuner circle differently based on whatever note_accuracy is.
  function accuracy(cents) {
    console.log(cents);

    if (cents > 100) {
      note_accuracy = prev_note_acc;
    }
    if (cents > 50 && cents < 100) {
      note_accuracy = "bad";
      prev_note_acc = note_accuracy;
    }
    if (cents < 50 && cents < 100) {
      note_accuracy = "medium";
      prev_note_acc = note_accuracy;
    }
    if (cents < 20) {
      note_accuracy = "good";
      prev_note_acc = note_accuracy;
    }

    if (cents < 5) {
      note_accuracy = "perfect";
      prev_note_acc = note_accuracy;
    }
    console.log(prev_note_acc);
  }

  detectNote(props.frequency);

  return <div className={note_accuracy}>{note}</div>;
}

export default TunerCircle;
