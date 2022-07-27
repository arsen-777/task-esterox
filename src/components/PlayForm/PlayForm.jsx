import React, { useRef, useState } from 'react';
import uuid from 'react-uuid';
import { getStorage } from 'firebase/storage';
export default function PlayForm() {
  const titleRef = useRef(null);
  const dateRef = useRef(null);
  const [time, setTime] = useState(null);
  const [fileName, setFileName] = useState('');
  const [seats, setSeats] = useState();

  const submitHandler = (e) => {
    e.preventDefault();

    // change file type to blob
    let file;
    let reader = new FileReader();
    reader.readAsText(fileName);
    reader.onload = function () {
      file = reader.result;
      let obj = {
        id: uuid(),
        title: titleRef.current.value,
        date: dateRef.current.value,
        time: time,
        image: file,
        seats: seats,
      };
      console.log(obj);
    };
  };

  function handleOptionChange(e) {
    setSeats(e.target.value);
  }
  function handleTime(e) {
    setTime(e.target.value);
  }

  return (
    <div>
      <h3>Add New play</h3>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="title">Title</label>
          <input ref={titleRef} type="text" name="title" />
        </div>
        <div>
          <label htmlFor="date-time">Date/time</label>
          <input ref={dateRef} type="date" name="date-time" />
        </div>
        <div>
          <label htmlFor="time"></label>
          <input onChange={(e) => handleTime(e)} type="time" name="time" />
        </div>
        <div>
          <label htmlFor="seats"></label>
          <select
            onChange={(e) => handleOptionChange(e)}
            name="seats"
            id="seats"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>
        </div>
        <div>
          <label htmlFor="file"></label>
          <input
            onChange={(e) => setFileName(e.target.files[0])}
            type="file"
            name="file"
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
