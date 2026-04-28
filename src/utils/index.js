export const getStorageData = () => {
  const storageData = sessionStorage.getItem("sessionData");
  const data = JSON.parse(storageData) || {};
  return data;
};

// export const session = {
//   get: (key) => {
//     const data = sessionStorage.getItem(key);
//     return JSON.parse(data);
//   },

//   set: (key, data) => {
//     const sesData = sessionStorage.setItem(key, JSON.stringify(data));
//     return sesData;
//   },

//   clear: () => {
//     return sessionStorage.clear();
//   },
//   logout: () => {
//     sessionStorage.clear();
//     window.location.reload();
//   },
//   exists: (key) => {
//     const data = sessionStorage.getItem(key);
//     if (data) {
//       return true;
//     } else {
//       return false;
//     }
//   },
// };

// src/utils/index.js
export const session = {
  get(key) {
    try {
      const data = sessionStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error(`Error retrieving ${key} from sessionStorage:`, error);
      return null;
    }
  },

  set(key, data) {
    try {
      sessionStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Error setting ${key} in sessionStorage:`, error);
    }
  },

  clear() {
    try {
      sessionStorage.clear();
    } catch (error) {
      console.error("Error clearing sessionStorage:", error);
    }
  },

  logout() {
    try {
      sessionStorage.clear();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  },

  exists(key) {
    return !!sessionStorage.getItem(key);
  },
};
