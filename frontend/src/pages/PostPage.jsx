import { useEffect, useState } from "react";
import { getAllPosts } from "../adapters/post-adapter";

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    const doFetch = async () => {
      const posts = await getAllPosts();
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
              <h3>{post.title}</h3>
              <p>{post.content}</p>
            </div>
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </>
  );
};

export default Feed;
