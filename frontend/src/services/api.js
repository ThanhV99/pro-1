import axios from 'axios'
import router from "@/router/index"
import ApiService from "@/services/api.services";
import tokenService from './token.service'

axios.defaults.xsrfCookieName = 'test_csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true
let root_url = import.meta.env.VITE_ROOT_URL || ''

const instance = axios.create({
    baseURL: root_url + '/api/v1/',
    headers: {
        'content-type': 'application/json'
    },

    credentials: "include",
    timeout: 30000,
    timeoutErrorMessage: 'Timeout'
})

// instance.interceptors.request.use(
//     (config) => {
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// instance.interceptors.response.use(function (response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     return response;
// }, function (error) {
//     const originalConfig = error.config;

//     if (originalConfig.url !== "/auth/login/" && error.response) {
//         // Access Token was expired
//         if (error.response.status === 401 && !originalConfig._retry) {
//             originalConfig._retry = true;
//             return new Promise(resolve => {
//                 // delete api.defaults.headers.common['Authorization']
//                 // logout
//                 ApiService.logOut()
//                 resolve();
//             })
//         } else if (error.response.status === 403) {
//             return new Promise(resolve => {
//                 // delete api.defaults.headers.common['Authorization']
//                 // logout
//                 tokenService.removeAllCookies()
//                 router.push('/login')
//                 resolve();
//             });
//         }
//     }
//     return Promise.reject(error);
// });

export default instance