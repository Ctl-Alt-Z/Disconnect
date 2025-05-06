import { fetchHandler } from "../utils/fetchingUtils";

export const createLog = async ({ screentime, entry }) => {
  return fetchHandler(
    "/api/createLogs",
    getPostOptions({ username, password })
  );
};
