import { useState } from "react";
import AbortController from "./AbortController";

const RaceConditions = () => {
  const [currentId, setCurrentId] = useState(1);

  const handleClick = () => {
    const idToFetch = Math.round(Math.random() * 80);
    setCurrentId(idToFetch);
  };
  return (
    <>
      <div>
        <p>Requesting ID: {currentId}</p>
        <button type="button" onClick={handleClick}>
          Fetch data!
        </button>
      </div>
      <hr />
      {/* <BooleanFlag id={currentId} /> */}
      <AbortController id={currentId} />
    </>
  );
};

export default RaceConditions;
