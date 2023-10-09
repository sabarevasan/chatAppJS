import * as service from '../service/auth';

export const registerUser = formData => dispatch => {
  dispatch({type: 'AUTH_REGISTER_INIT'});
  return service.fireRegisterUser(formData)
    .then(user => dispatch({type: 'AUTH_REGISTER_SUCCESS', user}))
    .catch(error => dispatch({type: 'AUTH_REGISTER_ERROR', error}))
}

export const loginUser = formData => dispatch => {
  dispatch({type: 'AUTH_LOGIN_INIT'});
  return service.fireLoginUser(formData)
  .then(user => dispatch({type: 'AUTH_LOGIN_SUCCESS', user}))
  .catch(error => dispatch({type: 'AUTH_LOGIN_ERROR', error}))
}

export const logoutUser = () => dispatch => 
  service
    .fireLogoutUser()
    .then(_ => {
      dispatch({type: 'AUTH_LOGOUT_SUCCESS'});
      dispatch({type: 'CHATS_FETCH_RESET'});
    })

export const listenToAuthChange = () => dispatch => {
  dispatch({type: 'AUTH_ON_INIT'});
  return service.fireAuthStateChanged(async authUser => {
    if (authUser) {
      const userProfile = await service.getUserDoc(authUser.uid);
      dispatch({type: 'AUTH_ON_SUCCESS', user: userProfile});
    } else {
      dispatch({type: 'AUTH_ON_ERROR'});
    }
  })
}