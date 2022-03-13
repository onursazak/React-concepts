import React, { useEffect, useState } from "react";

export default function Index(props) {
  const [data, setData] = useState(null);
  const [fetchedId, setFetchedId] = useState(null);

  /*

    You'll still have a race-condition in the sense that multiple requests will be in-flight, but only the results from the last one will be used and update the DOM.
    
  */
  useEffect(() => {
    // ----
    let active = true;

    const fetchData = async () => {
      setTimeout(async () => {
        const response = await fetch(
          `https://swapi.dev/api/people/${props.id}/`
        );
        const newData = await response.json();

        if (active) {
          setFetchedId(props.id);
          setData(newData);
        }
      }, Math.round(Math.random() * 12000));
    };

    fetchData();

    // active is set to false before next render
    return () => {
      active = false;
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
