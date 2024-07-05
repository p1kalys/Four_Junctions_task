import { Alert, Snackbar } from "@mui/material"
import { useAppSelector, useAppDispatch } from "../hooks/useRedux"
import { setSnackbarStatus } from "../store/slice/snackbarSlice"
import { SNACKBAR_STATUS } from "../constants/enums"

export const CustomSnackBar = () => {
  const dispatch = useAppDispatch()
  const snackbarStatus = useAppSelector((state) => state.snackbarStatus)

  return (
    <Snackbar
      open={
        snackbarStatus.status === SNACKBAR_STATUS.SUCCESS ||
        snackbarStatus.status === SNACKBAR_STATUS.ERROR
      }
      autoHideDuration={3000}
      onClose={() =>
        dispatch(
          setSnackbarStatus({
            status: SNACKBAR_STATUS.IDLE,
            message: snackbarStatus.message,
          })
        )
      }
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert
        onClose={() =>
          dispatch(
            setSnackbarStatus({
              status: SNACKBAR_STATUS.IDLE,
              message: snackbarStatus.message,
            })
          )
        }
        severity={
          snackbarStatus.status === SNACKBAR_STATUS.SUCCESS
            ? "success"
            : "error"
        }
        variant="filled"
        sx={{ width: "100%" }}
      >
        {snackbarStatus.message}
      </Alert>
    </Snackbar>
  )
}
