import { Navigate, Outlet } from "react-router-dom"
import { HOME_ENDPOINT, LOGIN_ENDPOINT } from "../constants/strings"
import { getUserFromToken } from "../Utils/tokenUtils"
import useLogin from "../hooks/useLogin"

export const ProtectedRoute = () => {
  const { logout } = useLogin()
  if (getUserFromToken() == null) {
    logout()
  }
  return getUserFromToken() ? (
    <Outlet />
  ) : (
    <Navigate to={LOGIN_ENDPOINT} replace />
  )
}

export const AuthRoute = () => {
  return getUserFromToken() ? (
    <Navigate to={HOME_ENDPOINT} replace />
  ) : (
    <Outlet />
  )
}
