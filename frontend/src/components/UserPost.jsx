import { useEffect, useState } from 'react';
import { usersPost } from '../adapters/post-adapter';

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
		<div className="user-scroll-container">
			{/* <h2>Your Post</h2> */}
			{posts.length > 0 ? (
				posts.map((post) => (
					<div className="post-card" key={post.id}>
						<p>
							<strong>You</strong>
						</p>
						<p>
							<strong>Posts:</strong> {post.message}
						</p>
					</div>
				))
			) : (
				<p>No posts available.</p>
			)}
		</div>
	);
}
