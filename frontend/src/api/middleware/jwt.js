import {Mutex} from 'async-mutex';

const mutex = new Mutex();

const jwt = (instance) => {
  instance.interceptors.request.use(function (config) {
    let accessToken = localStorage.getItem("accessToken");
    config.headers = {
      Authorization: "Bearer " + accessToken,
      ...config.headers
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  })

  instance.interceptors.response.use(
    null,
    async (err) => {
      if (err.response && err.response.status === 401) {
        return await mutex.runExclusive(async () => {
          let refreshToken = localStorage.getItem("refreshToken");
          try {
            let newTokens = await instance.get('/auth/renew/' + refreshToken)
            localStorage.setItem("accessToken", newTokens.data.accessToken)
            localStorage.setItem("refreshToken", newTokens.data.refreshToken)
            err.config.headers.Authorization = "Bearer " + newTokens.data.accessToken
            return instance.request(err.config)
          } catch (e) {
            localStorage.removeItem("accessToken")
            localStorage.removeItem("refreshToken")
            window.location.href = '/'
            return Promise.reject(err)
          }
        })
      }
      return Promise.reject(err)
    })
}

export default jwt
