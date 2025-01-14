
export const EXAMS_ADD_MODAL_INITIAL_FORM = {
  classroom: "",
  group: "",
  subject: "",
  title: "",
  description: "",
  duration: "",
  startTime: "",
  date: "",
};

export const EXAMS_ADD_FIELD_TYPES = {
  description: "textarea",
  date: "date",
  startTime: "time",
  duration: "number",
  default: "text",
};

export const EXAMS_ADD_MODAL_INITIAL_ERRORS = {};

export const EXAMS_ADD_MODAL_FORM_KEYS = [
  "classroom",
  "group",
  "subject",
  "description",
  "duration",
  "startTime",
  "date",
];

export const EXAMS_ADD_MODAL_SELECT_KEYS = ["classroom", "group", "subject"];

export const EXAMS_ADD_FIELD_VALIDATION_MESSAGES = {
  required: (field) => `${field} is required`,
  titleLength: "Title must be at least 5 characters long",
  descriptionLength: "Description must be at least 10 characters long",
};
