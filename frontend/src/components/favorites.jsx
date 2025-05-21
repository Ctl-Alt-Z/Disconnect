import { useState, useEffect } from "react";
export default function Favs({ userId }) {
  const [favPost, setFavPost] = useState([]);

  useEffect(() => {
    const loadFavs = async () => {
      try {
        const favPosts = await getfavs(userId);
        setFavPost(favPosts);
      } catch (err) {
        console.error("failed to fetch favorites", err);
      }
    };
    loadFavs();
  }, []);

  return (
    <div>
      <h1>Favorites</h1>
      {favPost && favPost.length > 0 ? (
        favPost.map((post, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              margin: "10px",
              padding: "10px",
            }}
          >
            <p>
              <strong>Username:</strong> {post.username}
            </p>
            <p>
              <strong>Post:</strong> {post.message}
            </p>
          </div>
        ))
      ) : (
        <p>No favorite posts found.</p>
      )}
    </div>
  );
}
