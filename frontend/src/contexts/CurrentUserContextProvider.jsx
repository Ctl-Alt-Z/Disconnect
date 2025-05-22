import { useState } from 'react';
import CurrentUserContext from './current-user-context';

export default function CurrentUserContextProvider({ children }) {
	const [seconds, setSeconds] = useState(1800);
	const [currentUser, setCurrentUser] = useState(null);
	const context = { currentUser, setCurrentUser, seconds, setSeconds };

	return (
		<CurrentUserContext.Provider value={context}>
			{children}
		</CurrentUserContext.Provider>
	);
}
