const baseFacultyUrl = "http://localhost:8081/facultate";
const getFacultiesURL = baseFacultyUrl + "/all";
const addFacultyURL = baseFacultyUrl + "/add";
const updateFacultyURL = baseFacultyUrl + "/update";
const deleteFacultyURL = baseFacultyUrl + "/delete";

export const getAllFaculties = async () => {
  const response = await fetch(getFacultiesURL, {
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

export const createFaculty = async (faculty, token) => {
  const bearer = "Bearer " + token;
  const response = await fetch(addFacultyURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: bearer,
    },
    body: JSON.stringify(faculty),
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

export const updateFaculty = async (faculty, token) => {
  const bearer = "Bearer " + token;
  const response = await fetch(updateFacultyURL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: bearer,
    },
    body: JSON.stringify(faculty),
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

export const deleteFaculty = async (name, token) => {
  const bearer = "Bearer " + token;
  const response = await fetch(deleteFacultyURL + `?name=${name}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: bearer,
    },
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText);
  }
};
