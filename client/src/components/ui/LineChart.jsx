import React, { useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { DateRangePicker, Stack } from "rsuite";

import "rsuite/dist/rsuite-no-reset.min.css";
import axios from "axios";

const SimpleLineChart = () => {
  const [value, setValue] = useState(null);
  const [xAxis, setXAxis] = useState([]);
  const [yAxis, setYAxis] = useState([]);

  const formatTime = (time) => {
    const date = new Date(time);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hour = String(date.getHours()).padStart(2, "0");
    return `${year}-${month}-${day} ${hour}:00:00`;
  };
  //2024-08-23 03:50:37
  const getChart = () => {
    const start = formatTime(value[0]);
    const end = formatTime(value[1]);
    axios
      .post("http://localhost:3000/api/entry", {
        start,
        end,
      })
      .then((response) => {
        const data = response.data;
        const keys = Object.keys(data);
        const values = Object.values(data);
        setXAxis(keys);
        setYAxis(values);
      });
  };
  return (
    <div className="min-h-screen bg-slate-300">
      <br />
      <Stack direction="column" spacing={8} alignItems="center">
        <DateRangePicker
          value={value}
          onChange={setValue}
          showMeridian
          format="yyyy.MM.dd.HH"
          defaultCalendarValue={[new Date("2024-09-20 00:00:00"), new Date()]}
        />
      </Stack>
      <br />
      <button onClick={getChart} className="good-button">
        GO
      </button>
      <br />
      <LineChart
        width={window.innerWidth}
        height={300}
        series={[{ data: yAxis, label: "Cars in Garage" }]}
        xAxis={[{ scaleType: "point", data: xAxis }]}
        className="text-white"
      />
    </div>
  );
};
export default SimpleLineChart;
