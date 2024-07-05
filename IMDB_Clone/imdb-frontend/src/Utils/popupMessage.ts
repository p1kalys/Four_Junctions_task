import { AxiosResponse } from "axios"
import { store } from "../store/store"
import { setSnackbarStatus } from "../store/slice/snackbarSlice"
import {
  EDIT_MOVIES_ENDPOINT,
  INSERT_ACTOR_ENDPOINT,
  INSERT_MOVIE_ENDPOINT,
  INSERT_PRODUCER_ENDPOINT,
  LOGIN_ENDPOINT,
  SIGNUP_ENDPOINT,
} from "../constants/strings"

export const handleSuccessPopupMessage = (response: AxiosResponse) => {
  switch (response.config.url) {
    case SIGNUP_ENDPOINT:
      store.dispatch(
        setSnackbarStatus({
          status: "success",
          message: "Please login. User successfully registered.",
        })
      )
      break
    case LOGIN_ENDPOINT:
      store.dispatch(
        setSnackbarStatus({
          status: "success",
          message: "Successfully logged in.",
        })
      )
      break
    case INSERT_ACTOR_ENDPOINT:
      store.dispatch(
        setSnackbarStatus({
          status: "success",
          message: "Successfully added actor.",
        })
      )
      break
    case INSERT_PRODUCER_ENDPOINT:
      store.dispatch(
        setSnackbarStatus({
          status: "success",
          message: "Successfully added producer.",
        })
      )
      break
    case INSERT_MOVIE_ENDPOINT:
      store.dispatch(
        setSnackbarStatus({
          status: "success",
          message: "Successfully added movie.",
        })
      )
      break
    case EDIT_MOVIES_ENDPOINT:
      store.dispatch(
        setSnackbarStatus({
          status: "success",
          message: "Movie edited successfully.",
        })
      )
      break
  }
}

export const handleErrorPopupMessage = (error: any) => {
  store.dispatch(
    setSnackbarStatus({
      status: "error",
      message: error.message,
    })
  )
}
