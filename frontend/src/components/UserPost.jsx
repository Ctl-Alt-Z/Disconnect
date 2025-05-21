import { useEffect, useState } from "react";
import { usersPost } from "../adapters/post-adapter";

export default function AllUsersPost({ userId }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const allPosts = await usersPost(userId);
      console.log(allPosts);
      setPosts(allPosts);
    };
    fetch();
  }, []);

  return (
    <div>
      <h2>Your Post</h2>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id}>
            <h4>{post.message}</h4>
          </div>
        ))
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
}
