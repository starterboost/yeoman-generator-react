import { createHashHistory } from 'history';

export const configureHistory = () => {
	const history = createHashHistory({
		hashType: 'slash',
		getUserConfirmation: (message, callback) => callback(window.confirm(message))
	});
	
	window.goTo = path => history.push(path);
	window.goBack = path => history.goBack();

	return history;
}

export default configureHistory;

