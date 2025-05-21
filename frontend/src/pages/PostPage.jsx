import { useEffect, useState } from "react";
import { getAllPosts } from "../adapters/post-adapter";
import {
  getFavoritesByPostId,
  createFavorites,
} from "../adapters/fav-adapters";

export default function Feed() {
  const [allPosts, setAllPosts] = useState([]);
  const [likes, setLikes] = useState({}); // store likes count per postId
  const [likedPosts, setLikedPosts] = useState(new Set());

  useEffect(() => {
    const fetchPostsAndLikes = async () => {
      const posts = await getAllPosts();
      setAllPosts(posts);

      const likesMap = {};
      const likedSet = new Set();

      await Promise.all(
        posts.map(async (post) => {
          const favorites = await getFavoritesByPostId({ postId: post.id });

          likesMap[post.id] = favorites.length;

          // Assume the backend only returns favorites for this post,
          // including the current user's entry if they liked it.
          const currentUserLiked = favorites.some(
            (fav) => fav && fav.userId // if backend includes userId from session
          );

          if (currentUserLiked) {
            likedSet.add(post.id);
          }
        })
      );

      setLikes(likesMap);
      setLikedPosts(likedSet);
    };

    fetchPostsAndLikes();
  }, []);

  const handleLike = async (postId) => {
    const [result, error] = await createFavorites({
      postId,
    });
    console.log(result);

    if (error) {
      console.error("Error adding favorite:", error.message);
      return;
    }

    // Optimistically update likes count
    setLikes((prev) => ({
      ...prev,
      [postId]: (prev[postId] || 0) + 1,
    }));
    setLikedPosts((prev) => new Set(prev).add(postId));
  };

  return (
    <>
      <h1>Posts</h1>
      <div>
        {allPosts.length > 0 ? (
          allPosts.map((post) => (
            <div
              key={post.id}
              style={{
                border: "1px solid #ccc",
                margin: "10px",
                padding: "10px",
              }}
            >
              <h3>{post.username}</h3>
              <p>{post.message}</p>
              <button
                onClick={() => handleLike(post.id)}
                disabled={likedPosts.has(post.id)}
              >
                {likedPosts.has(post.id) ? "Liked 🌸" : "Flower 🌸"}
              </button>
              <p>{likes[post.id] || 0} Flower(s)</p>
            </div>
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </>
  );
}
