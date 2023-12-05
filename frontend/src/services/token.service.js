import { useCookies } from "vue3-cookies";

const { cookies } = useCookies();


class TokenService {
    getCookieByKey(key) {
        return cookies.get(key);
    }

    removeCookieByKey(key) {
        cookies.remove(key);
    }

    setCookieByKeyValue(key, value) {
        cookies.set(key, value);
    }

    removeAllCookies() {
        cookies.keys().forEach(cookie => cookies.remove(cookie))
    }
}

export default new TokenService();
