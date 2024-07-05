import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode"
import { User } from "../types/auth"

const TOKEN_COOKIE_KEY = "accessToken"

export const setAccessTokenCookie = (token: string) => {
  const defaultExpiration = new Date(Date.now() + 24 * 60 * 60 * 1000);
  Cookies.set(TOKEN_COOKIE_KEY, token, { expires: defaultExpiration });
};



export const getAccessTokenCookie = () => {
  return Cookies.get(TOKEN_COOKIE_KEY)
}

export const removeAccessTokenCookie = () => {
  Cookies.remove(TOKEN_COOKIE_KEY)
}

export const getUserFromToken = () => {
  const token = getAccessTokenCookie()
  if (token === null || token === undefined) return null

  const decodedPayload = jwtDecode<User>(token)
  return {
    id: decodedPayload.id,
    name: decodedPayload.name,
    number: decodedPayload.number,
  }
}

export const getExpirationFromToken = (token: string) => {
  if (token === null || token === undefined) return null;

  const decodedPayload = jwtDecode(token);
  if (!decodedPayload || !decodedPayload.exp) return null;

  return decodedPayload.exp;
};

