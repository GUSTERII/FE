import { BE_URL } from '../constants/URIs';
const basicURL = BE_URL+"/auth";
const loginURL = basicURL + "/sign-in";
const forgotPasswordURL = basicURL + "/forgot-password";
const resetPasswordURL = basicURL + "/reset-password";
const createUserURL = basicURL + "/create-user";

export const createUser = async (user, token) => {
  const bearer = "Bearer " + token;

  const response = await fetch(createUserURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: bearer,
    },
    body: JSON.stringify(user),
  });

  if (response.ok) {
    try {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        return await response.json();
      } else {
        return {}; // Return an empty object if there's no JSON body
      }
    } catch (error) {
      return {}; // Return an empty object if parsing fails
    }
  } else {
    throw new Error("Create user failed");
  }
};

export const login = async (email, password) => {
  const response = await fetch(loginURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    try {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        return await response.json();
      } else {
        return {}; // Return an empty object if there's no JSON body
      }
    } catch (error) {
      return {}; // Return an empty object if parsing fails
    }
  } else {
    throw new Error("Login failed");
  }
};

export const forgotPassword = async (email) => {
  const response = await fetch(
    `${forgotPasswordURL}?email=${encodeURIComponent(email)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (response.ok) {
    try {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        return await response.json();
      } else {
        return {}; // Return an empty object if there's no JSON body
      }
    } catch (error) {
      return {}; // Return an empty object if parsing fails
    }
  } else {
    throw new Error("Forgot password failed");
  }
};

export const resetPassword = async (token, password) => {
  const response = await fetch(
    `${resetPasswordURL}?token=${encodeURIComponent(
      token
    )}&password=${encodeURIComponent(password)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (response.ok) {
    try {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        return await response.json();
      } else {
        return {}; // Return an empty object if there's no JSON body
      }
    } catch (error) {
      return {}; // Return an empty object if parsing fails
    }
  } else {
    throw new Error("Password reset failed");
  }
};
