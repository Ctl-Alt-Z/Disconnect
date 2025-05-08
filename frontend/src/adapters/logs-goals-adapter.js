import { fetchHandler } from "../utils/fetchingUtils";

export const createLog = async ({ screentime, entry }) => {
  return fetchHandler("/api/createLogs", getPostOptions({ screentime, entry }));
};

export const createGoal = async ({ num, string }) => {
  return fetchHandler("/api/createGoal", getPostOptions({ num, string }));
};
