import {
  axiosGet,
  axiosPost,
  axiosPatch,
  axiosDelete,
} from "./authRequest.service";

// Get Roles
export const leaveType = async (data) => {
  return await axiosGet("/users/leave_types", data);
};

export const fetchLeaveRequests = async ({ page = 1, per_page = 10 } = {}) => {
  return await axiosGet(
    `/users/leave_requests?page=${page}&per_page=${per_page}`
  );
};

export const requestLeave = async (data) => {
  return await axiosPost("/users/request_for_leave", data);
};

export const employeeTimeOff = async ({ page = 1, per_page = 10 } = {}) => {
  return await axiosGet(
    `/users/employees_timeoff?page=${page}&per_page=${per_page}`
  );
};

export const allHolidays = async (data) => {
  return await axiosGet("/users/get_holidays", data);
};

export const addHolidays = async (data) => {
  return await axiosPost("/users/create_holiday", data);
};
export const editHolidays = async (holidayId, payload) => {
  return await axiosPatch(`/users/edit_holiday/${holidayId}`, payload);
};

export const destroyHoliday = async (holiday_id) => {
  return await axiosDelete(`/users/delete_holiday/${holiday_id}`);
};
