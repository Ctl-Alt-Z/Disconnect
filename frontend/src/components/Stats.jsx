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
// import currentUser from "../contexts/current-user-context";
import CurrentUserContext from "../contexts/current-user-context";
import CurrentUserContextProvider from "../contexts/CurrentUserContextProvider";
//  Testing get gaols adapter
//put getGoals in useEffect , get info from main page
// find how to get user id from prams
//labels.map(() => getGoals.datatype.number({ min: 0, max: 24 })),
// console.log(getGoals(2));
// console.log(log[0].goal_num);
// console.log(log[0].screentime);
// console.log(getGoals.goal_num(2));
// console.log(getGoals.screentime(2));
// const { currentUser } = useContext(CurrentUserContext);
// const goals = await getGoals(currentUser.id);
// console.log("this is the id", currentUser.id);
// console.log(goals[0]);

//import that data that you are pulling from on this line

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
//Chart.defaults.color = "white";
//adding the specifications of the chart
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      labels: {
        color: "white",
      },
    },
    title: {
      display: true,
      text: "Weekly Screen Time",
      color: "white",
    },
  },
  scales: {
    y: {
      grid: {
        color: "white",
      },
      max: 12,
      title: {
        display: true,
        text: "Hours",
        color: "white",
      },
      ticks: {
        stepSize: 4,
        autoSkip: false,
        color: "white",
      },
    },
    x: {
      grid: {
        color: "white",
      },
      ticks: {
        color: "white",
      },
    },
  },
};

// const labels = [
//   "Sunday",
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
// ];

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
  const { currentUser } = useContext(CurrentUserContext);
  // const goals = await getGoals(currentUser.id);
  // console.log('this is the id', currentUser);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const goal = await getGoals(Number(currentUser.id));
        setGoal(goal);
      } catch (err) {
        console.error("Failed to fetch goal data:", err);
      }
    };

    fetchData();
  }, [currentUser]);
  // //
  const screenTimeData = Array.isArray(goal)
    ? goal.map((g) => g.screentime)
    : [goal?.screentime];

  const goalNumData = Array.isArray(goal)
    ? goal.map((g) => g.goal_num)
    : [goal?.goal_num];

  const labels = Array.isArray(goal)
    ? goal.map((g) => g.date.split("T")[0].split("-").slice(1).join("/"))
    : [goal?.date];

  // console.log(screenTimeData);
  // console.log(goalNumData);
  const statsData = {
    labels,
    datasets: [
      {
        label: "Screen Time",
        data: screenTimeData,
        backgroundColor: "rgb(249, 150, 70)",
      },
      {
        label: "Goal",
        data: goalNumData,
        backgroundColor: "rgb(230, 222, 209)",
      },
    ],
  };
  return (
    <>
      <div id="stats-data">
        <Bar options={options} data={statsData} />
      </div>
    </>
  );
}
