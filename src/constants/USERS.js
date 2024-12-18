import { BE_URL } from '../constants/URIs';
export const GET_USERS_URL = `${BE_URL}/users`;
export const GET_USER_URL = `${BE_URL}/users/{email}`;
export const GET_TEACHERS_URL = `${BE_URL}/users/teachers`;
export const GET_STUDENTS_URL = `${BE_URL}/users/students`;
export const DELETE_USER_URL = `${BE_URL}/users/{email}`;
