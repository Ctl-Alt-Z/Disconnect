import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
// must import and register data from react chart
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  scales,
} from "chart.js";
import { getLog } from "../adapters/log-adapter";
import { getGoals } from "../adapters/goal-adapter";
import { Bar } from "react-chartjs-2";
import { Await } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
//  Testing get gaols adapter
//put getGoals in useEffect , get info from main page
// find how to get user id from prams
//labels.map(() => getGoals.datatype.number({ min: 0, max: 24 })),
// console.log(getGoals(2));
// console.log(log[0].goal_num);
// console.log(log[0].screentime);
// console.log(getGoals.goal_num(2));
// console.log(getGoals.screentime(2));
const goals = await getGoals(2);
console.log(goals[0]);

//import that data that you are pulling from on this line

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
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
  scales: {
    y: {
      max: 24,
      title: {
        display: true,
        text: "Hours",
      },
      // ticks: {
      //   stepSize: 1,
      //   autoSkip: false,
      // },
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

///
export default function StatsChart({ userId }) {
  // const { id } = useParams();
  // const { currentUser } = useContext(CurrentUserContext);
  // // const isCurrentUserProfile = currentUser && currentUser.id === Number(id);
  // //
  const [data, setData] = useState([]);
  const [log, setLog] = useState([]);
  const [goal, setGoal] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const goal = await getGoals(userId);
        setGoal(goals);
      } catch (err) {
        console.error("Failed to fetch goal data:", err);
      }
    };

    fetchData();
  }, []);
  // //
  const screenTimeData = Array.isArray(goal)
    ? goal.map((g) => g.screentime)
    : [goal?.screentime];

  const goalNumData = Array.isArray(goal)
    ? goal.map((g) => g.goal_num)
    : [goal?.goal_num];

  console.log(screenTimeData);
  console.log(goalNumData);
  const statsData = {
    labels,
    datasets: [
      {
        label: "Screen Time",
        data: screenTimeData,
        backgroundColor: "rgb(255, 99, 132)",
      },
      {
        label: "Goal",
        data: goalNumData,
        backgroundColor: "rgb(53, 162, 235)",
      },
    ],
  };
  return (
    <>
      <div id="statsData">
        <Bar options={options} data={statsData} />
      </div>
    </>
  );
}
