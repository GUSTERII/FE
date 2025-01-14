const baseGroupUrl = "http://localhost:8081/grupa";
const getGroupsURL = baseGroupUrl + "/all";
const createGroupURL = baseGroupUrl + "/create";

export const getAllGroups = async () => {
  const response = await fetch(getGroupsURL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
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
    const errorText = await response.text();
    throw new Error(errorText);
  }
};

export const createGroup = async (groupData, token) => {
  const bearer = "Bearer " + token;
  const response = await fetch(createGroupURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: bearer,
    },
    body: JSON.stringify(groupData),
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
    const errorText = await response.text();
    throw new Error(errorText);
  }
};
