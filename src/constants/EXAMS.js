// exams
const CREATE_EXAM_URL = `${BE_URL}/exam/create`;
const GET_EXAM_URL = `${BE_URL}/exam`;
const GET_USER_EXAMS_URL = `${BE_URL}/exam/get/user`;
const UPDATE_EXAM_URL = `${BE_URL}/exam/update`;
const CONFIRM_EXAM_URL = `${BE_URL}/exam/confirm`;
const GET_SPECIALIZATION_EXAMS_URL = `${BE_URL}/exam/get/specialization/{specializationName}`;
// exams period
const GET_EXAMS_PERIOD_URL = `${BE_URL}/exam/get/period`;
const CREATE_EXAMS_PERIOD_URL = `${BE_URL}/exam/create/period`;
const UPDATE_EXAMS_PERIOD_URL = `${BE_URL}/exam/update/period`;

export {
    CREATE_EXAM_URL,
    GET_EXAM_URL,
    GET_USER_EXAMS_URL,
    UPDATE_EXAM_URL,
    CONFIRM_EXAM_URL,
    GET_SPECIALIZATION_EXAMS_URL,
    GET_EXAMS_PERIOD_URL,
    CREATE_EXAMS_PERIOD_URL,
    UPDATE_EXAMS_PERIOD_URL
};