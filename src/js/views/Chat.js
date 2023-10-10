import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ViewTitle from '../components/common/ViewTitle';
import ChatUserList from '../components/ChatUserList';
import ChatMessagesList from '../components/ChatMessagesList';
import { withBaseLayout } from '../layouts/Base';
import { followChat } from '../actions/chats';

function Chat() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const activeChat = useSelector(({chats}) => chats.activeChat[id]);

    useEffect(() => {
        const endFollowChat = dispatch(followChat(id));
        return () => {
            endFollowChat();
        }
    }, []);

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