import { axiosPost, axiosGet } from "./authRequest.service";

export const clockIn = async (data) => {
  return await axiosPost("/users/attendance/clock_in", data);
};

export const clockOut = async (data) => {
  return await axiosPost("/users/attendance/clock_out", data);
};

export const workHours = async (data) => {
  return await axiosPost("/users/work_hours", data);
};

export const getWorkHours = async (data) => {
  return await axiosGet("/users/get_work_hours", data);
};

export const getMyAttendance = async ({ page = 1, per_page = 10 } = {}) => {
  return await axiosGet(`/users/attendances?page=${page}&per_page=${per_page}`);
};

export const allEmployees = async ({ page = 1, per_page = 10 } = {}) => {
  return await axiosGet(`/users/employees?page=${page}&per_page=${per_page}`);
};
export const getEmployeeAttendance = async (data) => {
  return await axiosGet("/users/employee_attendances", data);
};
