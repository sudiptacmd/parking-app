import React from "react";

import LineChart from "../components/ui/LineChart";
const Stats = () => {
  return (
    <div className="text-center bg-slate-300 py-4 text-[#111827]">
      <h1 className="text-2xl font-semibold">Stats</h1>
      <LineChart />
    </div>
  );
};

export default Stats;
