import { useState, useEffect } from "react"
import { LoginData } from "../types/auth"
import authService from "../services/auth.services"
import { useAppDispatch, useAppSelector } from "./useRedux"
import { setUser } from "../store/slice/authSlice"
import {
  removeAccessTokenCookie,
  setAccessTokenCookie,
} from "../Utils/tokenUtils"

const useLogin = () => {
  const [loginData, setLoginData] = useState<LoginData | null>(null)
  const user = useAppSelector((state) => state.loginSlice).user
  const dispatch = useAppDispatch()

  const isUserLoggedIn = () => {
    return user != null
  }

  const login = (loginFormData: LoginData) => {
    setLoginData(loginFormData)
  }

  const logout = () => {
    dispatch(setUser(null))
    removeAccessTokenCookie()
  }

  useEffect(() => {
    const fetchData = async () => {
      if (loginData) {
        await authService.login(loginData)
          .then((response: any) => {
            setAccessTokenCookie(response.data.token)
            dispatch(setUser(response.data.user))
          })
          .catch((e: Error) => {
            console.log(e)
          })
      }
    }

    fetchData()
  }, [loginData])

  return { user, login, logout, isUserLoggedIn }
}

export default useLogin
