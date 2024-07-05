import { LoginData, SignUpData } from "../types/auth"
import http from "../Utils/http-common"
import { LOGIN_ENDPOINT, SIGNUP_ENDPOINT } from "../constants/strings"

class AuthService {
  register(signUpData: SignUpData) {
    return http.post<String>(SIGNUP_ENDPOINT, signUpData)
  }
  login(loginData: LoginData) {
    return http.post<String>(LOGIN_ENDPOINT, loginData)
  }
}

const authService = new AuthService();

export default authService;