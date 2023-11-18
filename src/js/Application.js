import React, { useEffect } from 'react';
import { HashRouter as Router,
         Switch,
         Route,
         Redirect 
        } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import StoreProvider from './store/StoreProvider';
import Home from './views/Home';
import Chat from './views/Chat';
import ChatCreate from './views/ChatCreate';
import Settings from './views/Settings';
import Welcome from './views/Welcome';
import { listenToAuthChange } from './actions/auth';
import { listenToConnectionChanges } from './actions/global';
import { checkUserConnection } from './actions/connection';
import Loader from './components/common/Loader';

function AuthorizedRoute({children, ...rest}) {
  const user = useSelector(({auth}) => auth.user);
  const onlyChild = React.Children.only(children);
  return(
    <Route
      {...rest}
      render={props => 
        user ? 
          React.cloneElement(onlyChild, {...rest, ...props}) : 
          <Redirect to="/"/>
      }
    />
  )
}

const ContentWrapper = ({children}) => <div className='content-wrapper'>{children}</div>

function ChatApp() {
  const dispatch = useDispatch();
  const processing = useSelector(({auth}) => auth.processing);
  const isOnline = useSelector(({global}) => global.isOnline);
  const user = useSelector(({auth}) => auth.user);

  useEffect(() => {
    const unsubFromAuth = dispatch(listenToAuthChange());
    const unsubFromConnectionStatus = dispatch(listenToConnectionChanges());

    return() => {
      unsubFromAuth();
      unsubFromConnectionStatus();
    }
  }, [dispatch])

  useEffect(() => {
    let unsubFromUserConnection;
    if(user?.uid) {
      unsubFromUserConnection = dispatch(checkUserConnection(user.uid));
    }
    return () => {
      unsubFromUserConnection && unsubFromUserConnection();
    }
  }, [dispatch, user])

  if(!isOnline) {
    return <Loader message='Disconnected! Please reconnect....'/>
  }

  if(processing){
    <Loader/>
  }

  return(
      <Router>
        <ContentWrapper>
          <Switch>
            <Route path="/" exact>
              <Welcome/>
            </Route>
            <AuthorizedRoute path="/home">
              <Home/>
            </AuthorizedRoute>
            <AuthorizedRoute path="/createChat">
              <ChatCreate/>
            </AuthorizedRoute>
            <AuthorizedRoute path="/chat/:id">
              <Chat/>
            </AuthorizedRoute>
            <AuthorizedRoute path="/settings">
              <Settings/>
            </AuthorizedRoute>
          </Switch>
        </ContentWrapper>
      </Router>
  )
}

export default function Application() {
  return(
    <StoreProvider>
      <ChatApp/>
    </StoreProvider>
  )
}