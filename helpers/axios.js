const axios = require("axios")
const { url, port } = require("config")

const instance = axios.create({
  baseURL: `${url}:${port}`
});

instance.interceptors.request.use(config => {
  return {
    ...config,
    params: {
      ...config.params
    }
  };
});

module.exports = instance
