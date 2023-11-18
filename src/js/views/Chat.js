import React, { useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ViewTitle from '../components/common/ViewTitle';
import Loader from '../components/common/Loader';
import ChatUserList from '../components/ChatUserList';
import ChatMessagesList from '../components/ChatMessagesList';
import { withBaseLayout } from '../layouts/Base';
import { followChat, followStatus } from '../actions/chats';

function Chat() {
    const { id } = useParams();
    const peopleWatchers = useRef({});
    const dispatch = useDispatch();
    const activeChat = useSelector(({chats}) => chats.activeChats[id]);
    const joinedUsers = activeChat?.joinedUsers;

    useEffect(() => {
        const endFollowChat = dispatch(followChat(id));
        return () => {
            endFollowChat();
            endFollowJoinedUserStatus();
        }
    }, []);

    useEffect(() => {
        joinedUsers && followJoinedUserStatus(joinedUsers);
    }, [joinedUsers]);

    const followJoinedUserStatus = useCallback(currentJoinedUsers => {
        currentJoinedUsers.forEach(user => {
            if(!peopleWatchers.current[user.uid]) {
                peopleWatchers.current[user.uid] = dispatch(followStatus(user.uid, id))
            }
        })
    }, [dispatch, id])

    const endFollowJoinedUserStatus = useCallback(() => {
        Object.keys(peopleWatchers.current)
        .forEach(id => peopleWatchers.current[id]())
    }, [peopleWatchers.current])

    if(!activeChat?.id) {
        return <Loader message="Loading chat...."/>
    }

    return(
        <div className="row no-gutters fh">
            <div className="col-3 fh">
                <ChatUserList users={activeChat?.joinedUsers}/>
            </div>
            <div className="col-9 fh">
                <ViewTitle text={`Channel: ${activeChat?.name}`}/>
                <ChatMessagesList />
            </div>
        </div>
    );
}

export default withBaseLayout(Chat, {canGoBack: true});