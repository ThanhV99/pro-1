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

    logIn = (email, password) => {
        const data = {
            username: email,
            password: password
        };
        
        api({ url: "/auth/login/", method: "POST",  data}).then(response => {
            // Handle the response
            console.log(response);
        })
        .catch(error => {
            // Handle errors
            console.error(error);
        });
    }
}

export default new ApiService()
