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
			<div className="postmodal-div">
				<div className="post-modal">
					<h2 id="post-title">Create a post</h2>
					<form className="post-form" action="" onSubmit={handleSubmit}>
						<textarea
							id="post-textarea"
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							placeholder="Share your achivements with the community..."
						/>
						{error && <p className="error">{error}</p>}
						<div className="post-buttons">
							<button id="post-submit" type="submit">
								<img
									width="35"
									height="35"
									src="https://img.icons8.com/ios/50/FFFFFF/paper-plane--v1.png"
									alt="paper-plane--v1"
								/>
							</button>
							<button id="cancel-post" type="button" onClick={onClose}>
								<img
									width="40"
									height="40"
									src="https://img.icons8.com/wired/64/FFFFFF/cancel--v1.png"
									alt="cancel--v1"
								/>
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
