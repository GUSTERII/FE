// userActions.js

export const loginSuccess = (response) => ({
  type: "LOGIN_SUCCESS",
  payload: {
    ...response,
    token: response.token, // Ensure the token is included
  },
});


export const loginFailure = (errorMessage) => ({
  type: 'LOGIN_FAILURE', // Use consistent action type LOGIN_FAILURE
  payload: errorMessage,
});

export const logout = () => ({
  type: 'LOGOUT',
});