import { axiosPost, axiosGet } from "./authRequest.service";

export const clockIn = async (data) => {
  return await axiosPost("/users/attendance/clock_in", data);
};

export const getPayroll = async ({ page = 1, per_page = 10 } = {}) => {
  return await axiosGet(
    `/users/employee_payroll?page=${page}&per_page=${per_page}`
  );
};

export const onePayroll = async (payrollId) => {
  return await axiosGet(`/users/payroll_detail/${payrollId}`);
};

// export const onePayroll = async (userId) => {
//   if (!userId) throw new Error("User ID is required");

//   // Correct URL and no extra ', data'
//   return await axiosGet(`/users/payroll_detail/${userId}`);
// };
