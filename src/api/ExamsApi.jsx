const baseExamsURL = "http://localhost:8081/exam";
const getExamsURL = baseExamsURL + "/get";
const createExamsURL = baseExamsURL + "/create";
const confirmExamsURL = baseExamsURL + "/confirm";
const updateExamsURL = baseExamsURL + "/update";
const getUserExamsURL = baseExamsURL + "/get/user";
const getExamsPeriodURL = baseExamsURL + "/get/period";
const updateExamsPeriodURL = baseExamsURL + "/update/period";
const createExamsPeriodURL = baseExamsURL + "/create/period";

export const getExams = async () => {
  const response = await fetch(getExamsURL, {
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

export const createExams = async (exam, token) => {
  const bearer = "Bearer " + token;
  const response = await fetch(createExamsURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: bearer,
    },
    body: JSON.stringify(exam),
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

export const confirmExams = async (exams, token) => {
  const bearer = "Bearer " + token;
  const response = await fetch(confirmExamsURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: bearer,
    },
    body: JSON.stringify(exams),
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

export const updateExams = async (exams, token) => {
  const bearer = "Bearer " + token;
  const response = await fetch(updateExamsURL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: bearer,
    },
    body: JSON.stringify(exams),
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

export const getUserExams = async (token) => {
  const bearer = "Bearer " + token;
  const response = await fetch(getUserExamsURL, {
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

export const getExamsBySpecialization = async (specializationName) => {
  const response = await fetch(`${baseExamsURL}/get/specialization/${specializationName}`, {
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

export const getExamsPeriod = async (token) => {
  const bearer = "Bearer " + token;
  const response = await fetch(getExamsPeriodURL, {
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

export const updateExamsPeriod = async (period, token) => {
  const bearer = "Bearer " + token;
  const response = await fetch(updateExamsPeriodURL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: bearer,
    },
    body: JSON.stringify(period),
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

export const createExamsPeriod = async (period, token) => {
  const bearer = "Bearer " + token;
  const response = await fetch(createExamsPeriodURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: bearer,
    },
    body: JSON.stringify(period),
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
