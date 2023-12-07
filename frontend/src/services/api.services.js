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
}

export default new ApiService()
