import {
  axiosPost,
  axiosGet,
  axiosPatch,
  axiosDelete,
} from "./authRequest.service";

export const getJobPosting = async ({ per_page = 10, page = 1 } = {}) => {
  return await axiosGet(
    `/users/job_postings?per_page=${per_page}&page=${page}`
  );
};

export const postJob = async (data) => {
  return await axiosPost("/users/job_postings", data);
};

export const getDepartments = async (per_page, page) => {
  return await axiosGet(
    `/users/get_departments?page=${page}&per_page=${per_page}`
  );
};

export const editPosting = async (postingId, payload) => {
  return await axiosPatch(`/users/job_postings/${postingId}`, payload);
};

export const deletePosting = async (postingId) => {
  return await axiosDelete(`/users/job_postings/${postingId}`);
};

export const getJobApplicants = async ({ per_page = 10, page = 1 } = {}) => {
  return await axiosGet(
    `/users/job_applicants?per_page=${per_page}&page=${page}`
  );
};

export const getApplicantPosting = async (data) => {
  return await axiosGet("/users/job_postings_apply/234098745", data);
};

export const apply = async (jobId, data) => {
  return await axiosPost(`/users/apply_job/${jobId}`, data);
};

export const createJobStage = async (data) => {
  return await axiosPost("/users/job_stages", data);
};

export const getJobStages = async (data) => {
  return await axiosGet("/users/job_stages", data);
};

export const getWorkflow = async (data) => {
  return await axiosGet("/users/workflow", data);
};

export const editWorkflow = async (stageId, payload) => {
  return await axiosPatch(`/users/job_stage/${stageId}`, payload);
};

export const changeApplicantStage = async (data) => {
  return await axiosPatch("/users/applicant_job_stage", data);
};
