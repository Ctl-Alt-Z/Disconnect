import { getPostOptions, fetchHandler } from "../utils/fetchingUtils";

export const createGoals = async ({ goal_num, goal_string, logs_id }) => {
  return fetchHandler(
    `/api/goals`,
    getPostOptions({ goal_num, goal_string, logs_id })
  );
};

export const getGoals = async ({}) => {
  return fetchHandler("/api/goals/:userId");
};
