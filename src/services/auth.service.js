import { axiosPost, axiosGet } from "./authRequest.service";

// User Registeration
export const register = async (data) => {
  return await axiosPost("/auth/register", data);
};

export const login = async (data) => {
  return await axiosPost("/auth/login", data);
};

// Registeration steps
export const stepOne = async (data) => {
  return await axiosPost("/users/create_company", data);
};

export const stepTwo = async (data) => {
  return await axiosPost("/users/create_company", data);
};

export const stepThree = async (data) => {
  return await axiosPost("/users/create_company", data);
};

export const stepFour = async (data) => {
  return await axiosPost("/users/create_company", data);
};

// Get Roles
export const roles = async (data) => {
  return await axiosGet("/users/default_roles", data);
};

// Get industries
export const industries = async (data) => {
  return await axiosGet("/users/get_industries", data);
};

// Get reasons
export const reasons = async (data) => {
  return await axiosGet("/users/get_reasons", data);
};

// Reset Password
export const resetPassword = async (data) => {
  return await axiosPost("/auth/reset_password_request", data);
};

// Resend Reset Password
export const resendToken = async (data) => {
  return await axiosPost("/auth/resend_otp", data);
};

// otp
export const verifyOtp = async (data) => {
  return await axiosPost("/auth/confirm_token", data);
};

export const updatePassword = async (data) => {
  return await axiosPost("/auth/reset_password", data);
};
