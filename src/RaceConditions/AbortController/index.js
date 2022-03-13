import React, { useEffect, useState } from "react";

export default function Index(props) {
  const [data, setData] = useState(null);
  const [fetchedId, setFetchedId] = useState(null);

  /*

  1)initialising an AbortController at the start of the effect,
  2)passing the AbortController.signal to fetch via the options argument,
  3)catching any AbortErrors that get thrown (when abort() is called, the fetch() promise rejects with an AbortError, 
    see MDN reference https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort), 
  and calling the abort function inside the clean-up function
  */

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      setTimeout(async () => {
        try {
          console.log("abortController.signal: ", abortController.signal);
          const response = await fetch(
            `https://swapi.dev/api/people/${props.id}/`,
            {
              signal: abortController.signal,
            }
          );
          const newData = await response.json();

          setFetchedId(props.id);
          setData(newData);
        } catch (error) {
          if (error.name === "AbortError") {
            console.log("aborted errors");
            // Aborting a fetch throws an error
            // So we can't update state afterwards
          }
          // Handle other request errors here
        }
      }, Math.round(Math.random() * 12000));
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [props.id]);

  if (data) {
    return (
      <div>
        <p style={{ color: fetchedId === props.id ? "green" : "red" }}>
          Displaying Data for: {fetchedId}
        </p>
        <p>{data.name}</p>
      </div>
    );
  } else {
    return null;
  }
}
