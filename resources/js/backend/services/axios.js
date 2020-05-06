import Vue from 'vue'
import axios from 'axios'
import { UserService } from './storage'

const axiosInstance = axios.create({
    baseURL: '/api/'
})

Vue.use({
    install (Vue) {
        Vue.prototype.$api = axiosInstance
    }
})

export { axiosInstance }

let axiosMethods = {
    setButtonInterceptor(buttonId) {
        axiosInstance.interceptors.request.use(function (config) {
            if (document.getElementById(buttonId)) {
                document.getElementById(buttonId).disabled = true;
            }
            return config;
        });

        axiosInstance.interceptors.response.use(function (response) {
            if (document.getElementById(buttonId)) {
                document.getElementById(buttonId).disabled = false;
            }
            return response;
        }, function (error) {
            if (document.getElementById(buttonId)) {
                document.getElementById(buttonId).disabled = false;
            }
            return Promise.reject(error);
        });
    },

    set401Interceptor() {
        axiosInstance.interceptors.response.use(function (response) {
            return response;
        }, function (error) {
            if (
                ! error.message ||
                (error.response.status === 401 &&
                    error.response.data.message.includes('Unauthenticated'))
            ) {
                UserService.removeUser()
                window.location.href = '/login?action=session-expired'
                return
            }

            return Promise.reject(error);
        });
    },
}


axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

let token = document.head.querySelector('meta[name="csrf-token"]')

if (token) {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content
}

axiosMethods.setButtonInterceptor('submit-form')

axiosMethods.set401Interceptor()

export default axiosMethods
