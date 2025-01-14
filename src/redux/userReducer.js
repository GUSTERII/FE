// userReducer.js

const initialState = {
  user: {
    token: null,
    refreshToken: null,
    role: null,
    name: null,
    email: null,
    profilePicture: null,
  },
  isLoggedIn: false, // Explicitly track login status
};


const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true, // Set login status to true
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        user: null,
        isLoggedIn: false, // Reset login status
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isLoggedIn: false, // Reset login status
      };
    default:
      return state;
  }
};

export default userReducer;
