import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import JoinedChatsList from '../components/JoinedChatsList';
import ViewTitle from '../components/common/ViewTitle';
import AvailableChatsList from '../components/AvailableChatsList'
import { fetchChats } from '../actions/chats';
import { withBaseLayout } from '../layouts/Base';
import notifications from '../utils/notifications';

function Home() {
  const dispatch = useDispatch();
  const joinedChats = useSelector(({chats}) => chats.joinedChats);
  const availableChats = useSelector(({chats}) => chats.availableChats);

  useEffect(() => {
    notifications.setup();
    dispatch(fetchChats())
  }, [dispatch]);

  return (
    <div className="row no-gutters fh">
      <div className="col-3 fh">
        <JoinedChatsList chats={joinedChats}/>
      </div>
      <div className="col-9 fh">
        <ViewTitle text="Choose your chat channel">
          <Link className="btn btn-outline-primary" to="/createChat">Create chat channel</Link>
        </ViewTitle>
        <AvailableChatsList chats={availableChats}/>
      </div>
    </div>
  );
}

export default withBaseLayout(Home);