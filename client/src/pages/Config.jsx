import axios from "axios";
import React, { useEffect, useState } from "react";

const Config = () => {
  const [rows, setRows] = useState(0);
  useEffect(() => {
    axios.get("http://localhost:3000/api/slots").then((response) => {
      setRows(response.data.length);
    });
  }, [rows]);

  const addRow = () => {
    axios
      .post("http://localhost:3000/api/setup/slot")
      .then(() => setRows(rows + 1));
  };
  const subRow = () => {
    if (rows > 0) {
      axios
        .delete("http://localhost:3000/api/setup/slot")
        .then(() => setRows(rows - 1));
    } else {
      alert("No space to remove");
    }
  };
  return (
    <div className="text-center my-4">
      <h1 className="text-2xl font-semibold my-2">Configure</h1>
      <p className="font-semibold">Your Parking has {rows} spaces</p>
      <br />
      <p>Configure your parking spaces</p>
      <br />
      <div>
        <button onClick={subRow} className="bad-button">
          REMOVE SPACE
        </button>

        <button onClick={addRow} type="button" className="good-button">
          ADD SPACE
        </button>
      </div>
    </div>
  );
};

export default Config;
