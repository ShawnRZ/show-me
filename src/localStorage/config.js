/**
 * 保存 port 到 localStorage
 * @param {string} port
 */
export const setPort = (port) => {
  localStorage.setItem("port", port);
};

/**
 * 保存 token 到 localStorage
 * @param {string} token
 */
export const setToken = (token) => {
  localStorage.setItem("token", token);
};

/**
 * 从 localStorage 中返回 port
 * @returns {string}
 */
export const getPort = () => {
  return localStorage.getItem("port") || "";
};

/**
 * 从 localStorage 中返回 token
 * @returns {string}
 */
export const getToken = () => {
  return localStorage.getItem("token") || "";
};
