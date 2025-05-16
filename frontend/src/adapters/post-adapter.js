import { fetchHandler, getPostOptions } from "../utils/fetchingUtils";

export const getAllPosts = async () => {
  try {
    const [allPost, error] = await fetchHandler("api/posts/");
    if (error) {
      console.error("Error fetching posts:", error.message);
      return [];
    }
    console.log(allPost);
    return allPost;
  } catch (error) {
    console.error("Unexpected error fetching posts:", error.message);
    return [];
  }
};

export const usersPost = async (id) => {
  try {
    const [posts, error] = await fetchHandler(`/api/users/${id}/posts`);

    if (error) {
      console.error("Error fetching user posts:", error.message);
      return [];
    }

    return posts;
  } catch (error) {
    console.error("Unexpected error fetching user posts:", error.message);
    return [];
  }
};

export const createPost = async (message) => {
  const [post, err] = await fetchHandler(
    "api/posts/",
    getPostOptions({ message })
  );
  console.log("Post created:", post);
  return post;
};
