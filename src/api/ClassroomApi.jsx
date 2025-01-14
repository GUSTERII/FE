const baseRoomsUrl = "http://localhost:8081/sali";
const getRoomsURL = baseRoomsUrl + "/all";
const addRoomURL = baseRoomsUrl + "/add";
const updateRoomURL = baseRoomsUrl + "/update";
const deleteRoomURL = baseRoomsUrl + "/delete";

export const getAllClassrooms = async (token) => {
  const bearer = "Bearer " + token;
  const response = await fetch(getRoomsURL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: bearer,
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
      return { error }; // Return an empty object if parsing fails
    }
  } else {
    throw new Error("Failed to get rooms");
  }
};

export const createClassroom = async (room, token) => {
  const bearer = "Bearer " + token;
  const response = await fetch(addRoomURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: bearer,
    },
    body: JSON.stringify(room),
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
    throw new Error("Failed to add room");
  }
};

export const updateClassroom = async (room, token) => {
  const bearer = "Bearer " + token;
  const response = await fetch(updateRoomURL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: bearer,
    },
    body: JSON.stringify(room),
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
    throw new Error("Failed to update room");
  }
};

export const deleteClassroom = async (name, token) => {
  const bearer = "Bearer " + token;
  const response = await fetch(deleteRoomURL + `?name=${name}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: bearer,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to delete room");
  }
};
