import { ref } from 'vue'
import api from './api'
import router from "@/router/index"
import tokenService from './token.service'

class ApiService {
    logOut = () => {
        api({ url: "/auth/logout/", method: "POST" }).then(() => {
            tokenService.removeAllCookies()
            router.push('/login')
        })
    }


    logIn = async (email, password) => {
        const data = {
            username: email,
            password: password
        };
        const message = ref(null)
        await api({ url: "/auth/login/", method: "POST", data }).then(response => {
            // Handle the response
            if (response && response.status == 200) {
                const key = response.data.key
                message.value = "login success"
                tokenService.setCookieByKeyValue('token', key)
                router.push('/')
            }
        })
            .catch(error => {
                // Handle errors
                if (error.response && error.response.status === 400) {
                    message.value = error.response.data.message || 'Invalid credentials';
                } else {
                    message.value = 'An error occurred during login';
                }
            });
        return { message }
    }


    register = async (email, last_name, password, password2) => {
        const data = {
            email: email,
            last_name: last_name,
            password: password,
            password2: password2
        }
        const messages = ref(null)
        await api({ url: "/register/", method: "POST", data }).then(response => {
            // Handle the response
            if (response && response.status == 200) {
            }
        })
            .catch(error => {
                // Handle errors
                if (error.response && error.response.status === 400) {
                    messages.value = error.response.data;
                } else {
                    messages.value = 'An error occurred during register';
                }
            });
        return { messages }
    }
}

export default new ApiService()
