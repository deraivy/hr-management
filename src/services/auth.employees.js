import { axiosPost, axiosGet, axiosPut } from "./authRequest.service";

// create employee
export const addEmployee = async (data) => {
  return await axiosPost("/users/create_employee", data);
};

// Get one employee
export const oneEmployee = async (employeeId) => {
  return await axiosGet(`/users/employee/${employeeId}`);
};

// Get all employees
export const allEmployees = async ({ page = 1, per_page = 10 } = {}) => {
  return await axiosGet(`/users/employees?page=${page}&per_page=${per_page}`);
};

// update employee
export const updateEmployees = async (employeeId, data) => {
  return await axiosPut(`/users/edit_employee/${employeeId}`, data);
};

export const addCompensation = async (data) => {
  return await axiosPost("/users/compensation", data);
};

export const uploadFile = async (data) => {
  return await axiosPost("/cloudinary/manage-file", data);
};

export const uploadDocument = async (data) => {
  return await axiosPost("/users/documents_upload", data);
};

export const deleteDocument = async (data) => {
  return await axiosPost("/cloudinary/manage-file", data);
};
