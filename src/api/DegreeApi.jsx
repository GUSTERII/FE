const baseSpecializationUrl = "http://localhost:8081/specialization";
const getSpecializationsURL = baseSpecializationUrl + "/all";
const addSpecializationURL = baseSpecializationUrl + "/add";
const updateSpecializationURL = baseSpecializationUrl + "/update";
const deleteSpecializationURL = baseSpecializationUrl + "/delete";
const getAllSpecializationsURL = baseSpecializationUrl + "/allSpecializations";

export const getAllSpecializations = async () => {
  const response = await fetch(getAllSpecializationsURL, {
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

export const getSpecializationsByFaculty = async (facultyName, token) => {
  const bearer = "Bearer " + token;
  const response = await fetch(getSpecializationsURL + `?facultyName=${facultyName}`, {
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
      return {}; // Return an empty object if parsing fails
    }
  } else {
    const errorText = await response.text();
    throw new Error(errorText);
  }
};

export const createSpecialization = async (specialization, token) => {
  const bearer = "Bearer " + token;
  const response = await fetch(addSpecializationURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: bearer,
    },
    body: JSON.stringify(specialization),
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

export const updateSpecialization = async (specialization, token) => {
  const bearer = "Bearer " + token;
  const response = await fetch(updateSpecializationURL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: bearer,
    },
    body: JSON.stringify(specialization),
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

export const deleteSpecialization = async (name, token) => {
  const bearer = "Bearer " + token;
  const response = await fetch(deleteSpecializationURL + `?name=${name}`, {
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
