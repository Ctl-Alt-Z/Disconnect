import { useEffect, useState } from "react";
import { getAllPosts } from "../adapters/post-adapter";

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);

  // useEffect(() => {
  //   const doFetch = async () => {
  //     const posts = await getAllPosts();
  //     setAllPosts(posts);
  //   };
  //   doFetch();
  // }, []);

  return (
    <>
      <h1> Welcome to the Disconnect Community </h1>
      <div>
        {allPosts.length > 0 ? (
          allPosts.map((post, index) => (
            <div key={index}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
            </div>
          ))
        ) : (
          <p>Explore the posts of fellow users </p>
        )}
        <form>
          <button>Post</button>
        </form>

        <br></br>

        <form>
          <button>Like</button>
        </form>
      </div>
    </>
  );
};

export default Feed;

// import { useEffect, useState } from "react";
// import { getAllPosts } from "../adapters/post-adapter";

// export default function Feed() {
//   const [allPosts, setAllPosts] = useState([]);

//   // useEffect(() => {
//   // 	const doFetch = async () => {
//   // 		const posts = await getAllPosts();
//   // 		console.log('Fetched posts:', posts);
//   // 		setAllPosts(posts);
//   // 	};
//   // 	doFetch();
//   // }, []);

//   return (
//     <>
//       <h1>Posts</h1>
//       <div>
//         {allPosts.length > 0 ? (
//           allPosts.map((post, index) => (
//             <div key={index}>
//               <h3>{post.username}</h3>
//               <p>{post.message}</p>
//             </div>
//           ))
//         ) : (
//           <p>No posts available.</p>
//         )}
//       </div>
//     </>
//   );
// }
