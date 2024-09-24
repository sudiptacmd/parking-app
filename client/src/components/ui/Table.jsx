import axios from "axios";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";
import { colors } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#1f2937",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  color: "white",
};
const Table = (props) => {
  const { slots, setRefresh } = props;
  const [timeElapsed, setTimeElapsed] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [breakdown, setBreakdown] = useState([]);
  const [cost, setCost] = useState(0);
  const [time, setTime] = useState("");

  const handleCheckout = async (plt) => {
    await axios
      .post("http://localhost:3000/api/entry/checkout", {
        plate: plt,
      })
      .then((response) => {
        if (response.data) {
          setOpen(true);
          setTime(response.data.time);
          setBreakdown(response.data.info);
          setCost(response.data.cost);
        }
      })
      .then(() => setRefresh((r) => !r));
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeElapsed(
        slots.map((slot) => {
          if (slot.arrival) {
            const arrivalDate = new Date(slot.arrival);
            const now = new Date();
            const timeDiff = now.getTime() - arrivalDate.getTime();
            const hours = Math.floor(timeDiff / (1000 * 60 * 60));
            const minutes = Math.floor(
              (timeDiff % (1000 * 60 * 60)) / (1000 * 60)
            );
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
            return `${hours} H ${minutes} M ${seconds} S`;
          } else {
            return "NOT OCCUPIED";
          }
        })
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, [slots]);
  return (
    <div>
      <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 w-9/12 mx-auto mb-20">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3">Slot</th>
            <th className="px-6 py-3">Plate</th>
            <th className="px-6 py-3">Arrival</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {slots.map((slot, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="px-6 py-4">{index + 1}</td>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {slot.plate}
              </td>
              <td className="px-6 py-4">{timeElapsed[slot.slot_id - 1]}</td>
              <td className="px-6 py-4">
                {slot.plate && (
                  <button
                    onClick={() => handleCheckout(slot.plate)}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Checkout
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 className="text-center text-xl font-semibold mb-2">
            Spending Report
          </h1>
          <p className="text-center">{time}</p>
          {breakdown.map((item) => (
            <div className="flex justify-between mb-1">
              <p>{item[0]}</p>
              <p>{item[1]}</p>
            </div>
          ))}

          <hr />
          <div className="flex flex-row justify-between font-semibold">
            <p>Total Cost</p> <p>Tk. {cost}</p>
          </div>
          <br />
          <div className="text-center">
            <button onClick={handleClose} className="good-button ">
              PAID Tk. {cost}
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Table;
