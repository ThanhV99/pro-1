import { ref } from 'vue'
import api from './api'
import router from "@/router/index"
import tokenService from './token.service'

class ApiService {
    logOut = () => {
        api({ url: "/auth/logout/", method: "POST" }).then(() => {
            // commit
            tokenService.removeAllCookies()
            router.push('/login')
        })
    }

    logIn = () => {
        api({ url: "/auth/login/", method: "POST" }).then(() => {
            // commit
            tokenService.removeAllCookies()
            router.push('/')
        })
    }
}

export default new ApiService()
