import { useEffect, useState } from "react";
import { getAllPosts } from "../adapters/post-adapter";

export default function Feed() {
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    const doFetch = async () => {
      const posts = await getAllPosts();
      console.log("Fetched posts:", posts);
      setAllPosts(posts);
    };
    doFetch();
  }, []);

  return (
    <>
      <h1>Posts</h1>
      <div>
        {allPosts.length > 0 ? (
          allPosts.map((post, index) => (
            <div key={index}>
              <h3>{post.username}</h3>
              <p>{post.message}</p>
            </div>
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </>
  );
}
