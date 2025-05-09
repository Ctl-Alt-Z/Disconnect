import { fetchHandler } from "../utils/fetchingUtils";

export const getAllPosts = async () => {
  const [allPost, error] = await fetchHandler("api/posts/");
  return [allPost, error];
};

export const posts = async (id) => {
  const [post, error] = await fetchHandler(`api/post/${id}`);
  return [post, error];
};
