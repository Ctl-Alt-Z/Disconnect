import { useState } from "react";
// const navigate = useNavigate();
// const { id } = useParams();
// must import and register data fro react chart
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { getLog } from "../adapters/log-adapter";
import { getGoals } from "../adapters/goal-adapter";
import { Bar } from "react-chartjs-2";

//  Testing get gaols adapter
//put getGoals in useEffect , get info from main page
// find how to get user id from prams
console.log(getGoals(2));

//import that data that you are pulling from on this line

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
//
//adding the specifications of the chart
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Weekly Screen Time",
    },
  },
};

const labels = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const statsData = {
  labels,
  datasets: [
    {
      label: "Screen Time",
      // data: labels.map(() => getLog.datatype.number({ min: 0, max: 24 })),
      backgroundColor: "rgb(255, 99, 132)",
    },
    {
      label: "Goal",
      data: labels,
      backgroundColor: "rgb(53, 162, 235)",
    },
  ],
};

///
export default function StatsChart() {
  return (
    <>
      <div id="statsData">
        <Bar options={options} data={statsData} />
      </div>
    </>
  );
}
