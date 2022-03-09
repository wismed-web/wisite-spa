import axios from 'axios'
import router from "../router";
import { ElMessage } from 'element-plus'
let baseUrl = 'http://127.0.0.1:1323/api'
const api = {
  urls: {
    baseApiUrl: baseUrl,
    admin: {
      activate: '/admin/activate',
      onlines: '/admin/onlines',
      users: '/admin/users',
    },
    file: {
      fileitem: '/file/fileitem',
      pathcontent: '/file/pathcontent',
      upload: '/file/upload',
    },
    sign: {
      signout: '/sign-out',
      signin: '/sign/in',
      new: '/sign/new',
      verifyEmail: '/sign/verify-email',
    },
    user: {
      avatar: '/user/avatar',
      profile: '/user/profile',
      setprofile: '/user/setprofile'
    }
  },
  api: {
    get (url, data) {
      return this.ajax(url, 'get', data)
    },
    post (url, data) {
      return this.ajax(url, 'post', data)
    },
    delete (url, data) {
      return this.ajax(url, 'delete', data)
    },
    put (url, data) {
      return this.ajax(url, 'put', data)
    },
    upload (url, formData) {
      return new Promise((resolve, reject) => {
        axios.post(url,formData,{
          headers:
              {
                "Content-Type": "multipart/form-data;charset=UTF-8"
              },
          transformRequest: [function (data) {
            return data
          }]
        }).then(response => {
          if (response.status === 200) {
            resolve(response.data)
          } else {
            reject('Network Error')
          }
        }).catch(error => {
          if (error.response) {
            reject(error.response.data)
          } else {
            reject(error.message)
          }
        })
      })
    },
    ajax (url, method, data) {
      return new Promise((resolve, reject) => {
        axios.request({
          url: url,
          method: method,
          data: data
        }).then(response => {
          if (response.status === 200) {
            resolve(response.data)
          } else {
            reject('Network Error')
          }
        }).catch(error => {
          if (error.response) {
            reject(error.response.data)
          } else {
            reject(error.message)
          }
        })
      })
    }
  },
  util: {
    replacePathParam (url, data) {
      var replaceReg
      for (var key in data) {
        replaceReg = new RegExp('{' + key + '}')
        url = url.replace(replaceReg, data[key])
      }
      return url
    },
    checkPassword (password) {
      if (password === '') {
        this.message.error('Password is must required')
      } else {
        // let upperLetter = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
        // let lowerLetter = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
      }
    },
    getToken() {
      return localStorage.getItem('accessToken')
    },
    setToken(token){
      localStorage.setItem('accessToken', token)
    }
  },
  message: {
    info (message) {
      ElMessage(message)
    },
    success (message) {
      ElMessage({
        message: message,
        type: 'success'
      })
    },
    warn (message) {
      ElMessage({
        message: message,
        type: 'warning'
      })
    },
    error (message) {
      ElMessage.error(message)
    }
  }
}
axios.defaults.baseURL = baseUrl
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.transformRequest = [function (data) {
  let ret = ''
  for (let it in data) {
    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
  }
  return ret
}]
axios.interceptors.request.use(config => {
  config.headers.Authorization = api.util.getToken()
  return config
})
axios.interceptors.response.use(res => {
      console.log(res)
      if (res.status === 200) {
        return res
      } else if (res.status !== 400) {
        if('jwt' in res.data){
          router.push('/')
        }
        return res
      } else {
        return res
      }
    },
    error => {
      return Promise.reject(error)
    }
)
// Vue.prototype.$axios = axios
export default api
