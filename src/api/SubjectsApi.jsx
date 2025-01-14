import { BE_URL } from '../constants/URIs';
const baseSubjectUrl = BE_URL+"/materie";
const getSubjectsURL = baseSubjectUrl;
const addSubjectURL = baseSubjectUrl;
const deleteSubjectURL = baseSubjectUrl + "/delete";
const updateSubjectURL = baseSubjectUrl + "/update";
const getSubjectByNameURL = baseSubjectUrl + "/name";
const addTeacherURL = baseSubjectUrl + "/teacher";

// Fetch all subjects
export const getSubjects = async () => {
  const response = await fetch(getSubjectsURL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    return await response.json();
  } else {
    const errorText = await response.text();
    throw new Error(errorText);
  }
};

// Create a new subject
export const createSubject = async (subject, token) => {
  const bearer = `Bearer ${token}`;
  const response = await fetch(addSubjectURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: bearer,
    },
    body: JSON.stringify(subject),
  });

  if (response.ok) {
    return await response.json();
  } else {
    const errorText = await response.text();
    throw new Error(errorText);
  }
};

// Update an existing subject
export const updateSubject = async (subject, token) => {
  const bearer = `Bearer ${token}`;
  const response = await fetch(updateSubjectURL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: bearer,
    },
    body: JSON.stringify(subject),
  });

  if (response.ok) {
    return await response.json();
  } else {
    const errorText = await response.text();
    throw new Error(errorText);
  }
};

// Delete a subject by name
export const deleteSubject = async (subjectName, token) => {
  const bearer = `Bearer ${token}`;
  const response = await fetch(`${deleteSubjectURL}?materie=${subjectName}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: bearer,
    },
  });

  if (response.ok) {
    return await response.json();
  } else {
    const errorText = await response.text();
    throw new Error(errorText);
  }
};

// Get a subject by name
export const getSubjectByName = async (subjectName, token) => {
  const bearer = `Bearer ${token}`;
  const response = await fetch(`${getSubjectByNameURL}?name=${subjectName}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: bearer,
    },
  });

  if (response.ok) {
    return await response.json();
  } else {
    const errorText = await response.text();
    throw new Error(errorText);
  }
};

// Add a teacher to a subject
export const addTeacherToSubject = async (subjectName, teacherName, token) => {
  const bearer = `Bearer ${token}`;
  const response = await fetch(`${addTeacherURL}?name=${subjectName}&teacher=${teacherName}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: bearer,
    },
  });

  if (response.ok) {
    return await response.json();
  } else {
    const errorText = await response.text();
    throw new Error(errorText);
  }
};
