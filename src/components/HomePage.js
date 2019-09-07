import React, {useContext, useEffect} from 'react';
import ContactList from './ContactList/ContactList';
import FriendList from './ContactList/FriendList';
import SearchBar from './ContactList/SearchBar';
import ChatHeader from './ContactList/ChatHeader';
import MsgChatBox from './chatArea/MsgChatBox';
import MsgChatItemList from './chatArea/MsgChatItemList';
import './HomePage.scss';
import {ChatViewContext} from '../Context';
// const {masterState, dispatch} = useContext(ChatViewContext);

// let socket = require('socket.io-client')('ws://localhost:8080');

// socket.on('initial data', (data) => {
// 	dispatch({
// 		type: 'LOAD_INITIAL_DATA',
// 		chatrooms: data
// 	});
// });

/***************************** HOME PAGE ********************************/

const HomePage = () => {
	// const { masterState } = useContext(ChatViewContext);

	const {masterState, dispatch} = useContext(ChatViewContext);

	console.log('STATE', masterState);

	let socket = require('socket.io-client')('ws://localhost:8080');
	// socket.on('initial data', (data) => {
	// 	console.log('DATA', data);

	// 	dispatch({
	// 		type: 'LOAD_INITIAL_DATA',
	// 		data
	// 	});

	// 	console.log('STATE 2', masterState);
	// });

	useEffect(() => {
		socket.on('initial data', (data) => {
			console.log('DATA', data);

			dispatch({
				type: 'LOAD_INITIAL_DATA',
				data
			});

			console.log('STATE 2', masterState);
		});
		return () => {
			socket.removeEventListener('initial data');
		};
	}, [masterState.chatrooms]);

	return (
		<main className='layout'>
			<header className='header'></header>
			<div className='contactsArea'>
				<div className='chatHeader'>
					<ChatHeader />
					<SearchBar />
				</div>
				<div className='contacts'>{masterState.friendsView ? <FriendList /> : <ContactList />}</div>
			</div>
			<div className='chatBox'>
				<div className='chatArea'>
					{masterState.activeChat && masterState.chatrooms.length > 0 ? <MsgChatItemList /> : null}
				</div>
				<div className='chatInput'>
					<MsgChatBox />
				</div>
			</div>
		</main>
	);
};

export default HomePage;
