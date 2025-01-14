const studentsBaseURL = "http://localhost:8081/student";
const getStudentsURL = studentsBaseURL + "/all";
// const addStudentURL = studentsBaseURL + "/add";
const editStudentURL = studentsBaseURL + "/update";
const deleteStudentURL = studentsBaseURL + "/delete";

export const getStudents = async (token) => {
  const bearer = "Bearer " + token;
  const response = await fetch(getStudentsURL, {
    method: "GET",
    headers: {
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
    // Read the response body as text and return that
    const errorText = await response.text();
    throw new Error(errorText);
  }
};

export const deleteStudent = async (email, token) => {
  const bearer = "Bearer " + token;
  const response = await fetch(deleteStudentURL + `?email=${email}`, {
    method: "DELETE",
    headers: {
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
    // Read the response body as text and return that
    const errorText = await response.text();
    throw new Error(errorText);
  }
};

export const editStudent = async (student, token) => {
  const bearer = "Bearer " + token;
  const response = await fetch(editStudentURL + `?email=${student.email}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: bearer,
    },
    body: JSON.stringify(student),
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
    // Read the response body as text and return that
    const errorText = await response.text();
    throw new Error(errorText);
  }
};
