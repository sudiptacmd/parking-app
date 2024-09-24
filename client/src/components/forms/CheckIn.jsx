import axios from "axios";
import React, { useEffect, useState } from "react";

const CheckIn = (props) => {
  const { slots, setRefresh } = props;
  const [info, setInfo] = useState("");
  const [remaining, setRemaining] = useState(0);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!info) {
      alert("Enter Car Numberplate");
      return;
    }
    if (
      remaining > 0 &&
      !slots.some((slot) => slot.plate === info.toUpperCase())
    ) {
      await axios.post("http://localhost:3000/api/entry/add", {
        plate: info.toUpperCase(),
      });
      setRefresh((r) => !r);
      setInfo("");
    } else if (slots.some((slot) => slot.plate === info.toUpperCase())) {
      alert("Already checked in");
    } else {
      alert("No slots available");
    }
  };
  useEffect(() => {
    const emptySlots = slots.filter((slot) => !slot.plate);
    setRemaining(emptySlots.length);
  }, [slots]);
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="p-4 shadow-md hover:shadow-xl my-2 w-1/3 flex flex-col items-center mx-auto gap-2 duration-300 bg-[#1f2937]"
      >
        <h1 className="font-semibold text-xl">INPUT CAR NUMBERPLATE</h1>
        <input
          type="text"
          value={info}
          name=""
          id=""
          maxLength={11}
          placeholder="DMGA311873"
          onChange={(e) => setInfo(e.target.value)}
          className="focus:outline-none text-center w-full border-2 border-[#fff] p-2 rounded-md font-semibold bg-[#1f2937] text-white"
        />
        <button className="good-button bg-[#2563eb] hover:bg-[#132ec7]">
          Check in
        </button>
      </form>
      <span className="flex flex-row gap-2 items-center justify-center my-10">
        Remaining slots:{" "}
        <p className={remaining < 5 ? "text-red-500 text-3xl" : "text-3xl"}>
          {remaining}
        </p>
      </span>
    </div>
  );
};

export default CheckIn;
