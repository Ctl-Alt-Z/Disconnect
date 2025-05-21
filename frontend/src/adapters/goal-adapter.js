import { getPostOptions, fetchHandler } from "../utils/fetchingUtils";

export const createGoals = async ({ goal_num, goal_string, logs_id }) => {
  return fetchHandler(
    `/api/goals`,
    getPostOptions({ goal_num, goal_string, logs_id })
  );
};
export const getGoals = async (id) => {
  try {
    const [allGoals, error] = await fetchHandler(`/api/goals/${id}`);
    if (error) {
      console.error("Error fetching stata:", error.message);
      return [];
    }
    console.log(allGoals);
    return allGoals;
  } catch (error) {
    console.error("Unexpected error fetching stats:", error.message);
    return [];
  }
};
