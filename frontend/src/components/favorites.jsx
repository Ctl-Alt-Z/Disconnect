import { useState, useEffect } from 'react';
import { favorites } from '../adapters/fav-adapters';
export default function Favs({ userId }) {
	const [favPost, setFavPost] = useState([]);

	useEffect(() => {
		const loadFavs = async () => {
			try {
				const favPosts = await favorites(userId);
				setFavPost(favPosts);
			} catch (err) {
				console.error('failed to fetch favorites', err);
			}
		};
		loadFavs();
	}, []);

	return (
		<div className="user-scroll-container">
			{/* <h1 id="fav-title">Favorites</h1> */}
			{favPost && favPost.length > 0 ? (
				favPost.map((post, index) => (
					<div className="post-card" key={index}>
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
