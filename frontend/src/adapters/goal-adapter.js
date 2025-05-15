import { getPostOptions, fetchHandler } from "../utils/fetchingUtils";

export const createGoals = async ({ goal_num, goal_string, logs_id }) => {
  return fetchHandler(
    `api/goal`,
    getPostOptions({ goal_num, goal_string, logs_id })
  );
};
