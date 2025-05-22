import { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../contexts/current-user-context";
import { getAllPosts } from "../adapters/post-adapter";
import "../styles/PostPage.css";
import {
  getFavoritesByPostId,
  createFavorites,
  deleteFavorite,
} from "../adapters/fav-adapters";

export default function Posts() {
  const { currentUser } = useContext(CurrentUserContext);
  const [allPosts, setAllPosts] = useState([]);
  const [likes, setLikes] = useState({});
  const [likedPosts, setLikedPosts] = useState({});
  const [loadingPosts, setLoadingPosts] = useState(new Set());
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    if (!currentUser) return;

    const fetchPostsAndLikes = async () => {
      // Fetch all posts
      const posts = await getAllPosts();
      setAllPosts(posts);

      const likesMap = {};
      const likedMap = {};

      // Fetch likes and user favorites per post
      await Promise.all(
        posts.map(async (post) => {
          const favorites = await getFavoritesByPostId({ postId: post.id });
          likesMap[post.id] = favorites.length;

          const currentUserFavorite = favorites.find(
            (fav) => fav && fav.user_id === currentUser.id
          );

          if (currentUserFavorite) {
            likedMap[post.id] = currentUserFavorite.id;
          }
        })
      );

      setLikes(likesMap);
      setLikedPosts(likedMap);
      setLoading(false); // Loading done
    };

    fetchPostsAndLikes();
  }, [currentUser]);

  const handleLikeToggle = async (postId) => {
    if (!currentUser) return;
    if (loadingPosts.has(postId)) return;

    setLoadingPosts((prev) => new Set(prev).add(postId));

    if (likedPosts[postId]) {
      const favoriteId = likedPosts[postId];
      const [result, error] = await deleteFavorite(favoriteId);

      if (!error) {
        setLikes((prev) => ({
          ...prev,
          [postId]: Math.max((prev[postId] || 1) - 1, 0),
        }));
        setLikedPosts((prev) => {
          const copy = { ...prev };
          delete copy[postId];
          return copy;
        });
      }
    } else {
      const [result, error] = await createFavorites({ postId });

      if (!error) {
        setLikes((prev) => ({
          ...prev,
          [postId]: (prev[postId] || 0) + 1,
        }));
        setLikedPosts((prev) => ({
          ...prev,
          [postId]: result.id,
        }));
      }
    }

    setLoadingPosts((prev) => {
      const copy = new Set(prev);
      copy.delete(postId);
      return copy;
    });
  };

  return (
    <>
      <div className="posts-title-wrapper">
        <h2 className="posts-title">Community Reflections</h2>
      </div>

      <div className="posts-scroll-container">
        {loading && <p className="loading-message">Loading posts...</p>}

        {!loading && allPosts.length === 0 && (
          <p className="no-posts-message">No posts available.</p>
        )}

        {!loading &&
          allPosts.length > 0 &&
          allPosts.map((post) => {
            const isLiked = !!likedPosts[post.id];
            const isLoading = loadingPosts.has(post.id);
            return (
              <article key={post.id} className="post-card">
                <h3 className="post-username">{post.username}</h3>
                <p className="post-message">{post.message}</p>
                <button
                  onClick={() => handleLikeToggle(post.id)}
                  disabled={isLoading}
                  className={`like-button ${isLiked ? "liked" : ""}`}
                >
                  {isLiked ? "Flowered 🌸" : "Give Flowers 🌸"}
                </button>
                <p className="likes-count">
                  {likes[post.id] || 0}{" "}
                  {likes[post.id] === 1 ? "flower" : "flowers"}
                </p>
              </article>
            );
          })}
      </div>
    </>
  );
}
