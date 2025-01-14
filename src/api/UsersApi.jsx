import { BE_URL } from "../constants/URIs";

const basicURL = BE_URL + "/users";
const changePasswordURL = basicURL + "/change-password";
const getTeachersURL = basicURL + "/teachers";

export const getUsers = async (token) => {
  const bearer = "Bearer " + token;
  const response = await fetch(basicURL, {
    method: "GET",
    headers: {
      Authorization: bearer,
    },
  });

  if (response.ok) {
    try {
      return await response.json();
    } catch (error) {
      return {}; // Return an empty object if parsing fails
    }
  } else {
    const errorText = await response.text();
    throw new Error(errorText);
  }
};

export const getUserByEmail = async (email, token) => {
  const bearer = "Bearer " + token;
  const response = await fetch(`${basicURL}/${email}`, {
    method: "GET",
    headers: {
      Authorization: bearer,
    },
  });

  if (response.ok) {
    try {
      return await response.json();
    } catch (error) {
      return {}; // Return an empty object if parsing fails
    }
  } else {
    const errorText = await response.text();
    throw new Error(errorText);
  }
};

export const changePassword = async (
  currentPassword,
  newPassword,
  confirmPassword,
  token
) => {
  const bearer = "Bearer " + token;
  const response = await fetch(changePasswordURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: bearer,
    },
    body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
  });

  if (response.ok) {
    return { success: true };
  } else {
    const errorText = await response.text();
    throw new Error(errorText);
  }
};

export const getTeachers = async (token) => {
  const bearer = "Bearer " + token;
  const response = await fetch(getTeachersURL, {
    method: "GET",
    headers: {
      Authorization: bearer,
    },
  });

  if (response.ok) {
    try {
      return await response.json();
    } catch (error) {
      return []; // Return an empty array if parsing fails
    }
  } else {
    const errorText = await response.text();
    throw new Error(errorText);
  }
};

export const deleteUserByEmail = async (email, token) => {
  const bearer = "Bearer " + token;
  const response = await fetch(`${basicURL}/${email}`, {
    method: "DELETE",
    headers: {
      Authorization: bearer,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText);
  }
};
