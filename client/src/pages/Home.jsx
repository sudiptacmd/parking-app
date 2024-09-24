import React, { useEffect, useState } from "react";
import CheckIn from "../components/forms/CheckIn";
import Table from "../components/ui/Table";
import axios from "axios";

const Home = () => {
  const [refresh, setRefresh] = useState(false);
  const [slots, setSlots] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/slots")
      .then((response) => {
        setSlots(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);
  return (
    <div className="my-4">
      <CheckIn setRefresh={setRefresh} slots={slots} />
      <Table setRefresh={setRefresh} slots={slots} />
    </div>
  );
};

export default Home;
