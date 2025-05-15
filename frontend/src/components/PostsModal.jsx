import { createPost } from '../adapters/post-adapter';
import { useState, useEffect, UserContext } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PostsModal({ onClose }) {
	const [message, setMessage] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const newPost = await createPost({
			message,
		});

		console.log('Post updated successfully:', newPost);
		setMessage('');
		onClose();
	};

	return (
		<>
			<div className="post-modal">
				<h2>Create a post</h2>
				<form action="" onSubmit={handleSubmit}>
					<textarea
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						placeholder="Write your post here..."
					/>
					{error && <p className="error">{error}</p>}
					<button type="submit">Post</button>

					<button type="button" onClick={onClose}>
						cancel
					</button>
				</form>
			</div>
		</>
	);
}
