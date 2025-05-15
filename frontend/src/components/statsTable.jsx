import { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { Chart as ChartJS } from "chart.js";

export default function StatsChart() {
  const [options, setOptions] = useState({
    title: {
      text: " User Screen time data",
    },
  });

  return (
    <>
      <BarChart>
        xAxis={[{ data: ["group A", "group B", "group C"] }]}
        series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
        height={300}
      </BarChart>
    </>
  );
}
