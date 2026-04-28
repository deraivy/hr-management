import { session } from "@/utils";
import axios from "axios";
import router from "@/router";

const baseUrl = process.env.VUE_APP_URL;

export const axiosPost = async (point, data) => {
  const sessionData = session.get("sessionData");
  let options = null;
  if (sessionData) {
    options = {
      headers: {
        Authorization: `Bearer ${sessionData.access_token}`,
      },
    };
  }

  try {
    const result = await axios.post(baseUrl + point, data, options);
    return { status: result.status, error: null, data: result.data };
  } catch (error) {
    if (!error.response) {
      return {
        status: 0,
        error: { message: error.message || "Network error" },
        data: null,
      };
    } else {
      if (error.response.status === 401) {
        session.logout();
        if (router.currentRoute.name !== "login") {
          router.push({ name: "login" });
        }
      }
      return {
        status: error.response.status,
        error: error.response.data,
        data: null,
      };
    }
  }
};

export const axiosDelete = async (point) => {
  const sessionData = session.get("sessionData");
  let options = null;
  if (sessionData) {
    options = {
      headers: {
        Authorization: `Bearer ${sessionData.access_token}`,
      },
    };
  }

  try {
    const result = await axios.delete(baseUrl + point, options);
    return { status: result.status, error: null, data: result.data };
  } catch (error) {
    if (!error.response) {
      return {
        status: 0,
        error: { message: error.message || "Network error" },
        data: null,
      };
    } else {
      if (error.response.status === 401) {
        session.logout();
        if (router.currentRoute.name !== "login") {
          router.push({ name: "login" });
        }
      }
      return {
        status: error.response.status,
        error: error.response.data,
        data: null,
      };
    }
  }
};

export const axiosPatch = async (point, data) => {
  const sessionData = session.get("sessionData");
  let options = null;
  if (sessionData) {
    options = {
      headers: {
        Authorization: `Bearer ${sessionData.access_token}`,
      },
    };
  }

  try {
    const result = await axios.patch(baseUrl + point, data, options);
    return { status: result.status, error: null, data: result.data };
  } catch (error) {
    if (!error.response) {
      return {
        status: 0,
        error: { message: error.message || "Network error" },
        data: null,
      };
    } else {
      if (error.response.status === 401) {
        session.logout();
        if (router.currentRoute.name !== "login") {
          router.push({ name: "login" });
        }
      }
      return {
        status: error.response.status,
        error: error.response.data,
        data: null,
      };
    }
  }
};

export const axiosPut = async (point, data) => {
  const sessionData = session.get("sessionData");
  let options = null;
  if (sessionData) {
    options = {
      headers: {
        Authorization: `Bearer ${sessionData.access_token}`,
      },
    };
  }

  try {
    const result = await axios.put(baseUrl + point, data, options);
    return { status: result.status, error: null, data: result.data };
  } catch (error) {
    if (!error.response) {
      return {
        status: 0,
        error: { message: error.message || "Network error" },
        data: null,
      };
    } else {
      if (error.response.status === 401) {
        session.logout();
        if (router.currentRoute.name !== "login") {
          router.push({ name: "login" });
        }
      }
      return {
        status: error.response.status,
        error: error.response.data,
        data: null,
      };
    }
  }
};

export const axiosGet = async (point) => {
  const sessionData = session.get("sessionData");
  let options = null;
  if (sessionData) {
    options = {
      headers: {
        Authorization: `Bearer ${sessionData.access_token}`,
      },
    };
  }

  try {
    const result = await axios.get(baseUrl + point, options);
    return { status: result.status, error: null, data: result.data };
  } catch (error) {
    if (!error.response) {
      return {
        status: 0,
        error: { message: error.message || "Network error" },
        data: null,
      };
    } else {
      if (error.response.status === 401) {
        session.logout();
        if (router.currentRoute.name !== "login") {
          router.push({ name: "login" });
        }
      }
      return {
        status: error.response.status,
        error: error.response.data,
        data: null,
      };
    }
  }
};
