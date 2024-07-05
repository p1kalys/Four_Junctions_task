import {
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ThemeProvider } from "@mui/material/styles"
import { appTheme } from "../constants/theme.constant"
import { SignUpData } from "../types/auth"
import { signUpValidationSchema } from "../Utils/validation"
import { LOGIN_ENDPOINT } from "../constants/strings"
import useSignUp from "../hooks/useSignUp"
import { useAppSelector } from "../hooks/useRedux"
import { LOADING_STATUS } from "../constants/enums"
import { useEffect } from "react"

export default function SignUp() {
  const { response, setSignUpData } = useSignUp()
  const loadingStatus = useAppSelector((state) => state.loadingStatus)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpData>({
    resolver: zodResolver(signUpValidationSchema),
  })

  const onSubmit: SubmitHandler<SignUpData> = async (data: SignUpData) => {
    setSignUpData(data)
  }

  useEffect(() => {
    if (response != null) {
      navigate(LOGIN_ENDPOINT)
    }
  }, [response])

  return (
    <>
      <ThemeProvider theme={appTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "100vh",
            }}
          >
            <Typography component="h1" variant="h5" sx={{ fontWeight: "bold" }}>
              Signup into your account
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                {...register("name")}
                {...(errors.name && {
                  error: true,
                  helperText: `${errors.name.message}`,
                })}
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="off"
                size="small"
              />
              <TextField
                {...register("number")}
                {...(errors.number && {
                  error: true,
                  helperText: `${errors.number.message}`,
                })}
                margin="normal"
                required
                fullWidth
                id="number"
                label="Number"
                name="number"
                autoComplete="off"
                size="small"
              />
              <TextField
                {...register("password")}
                {...(errors.password && {
                  error: true,
                  helperText: `${errors.password.message}`,
                })}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                size="small"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={
                  isSubmitting || loadingStatus === LOADING_STATUS.LOADING
                }
                sx={{ mt: 2, mb: 2 }}
              >
                {isSubmitting || loadingStatus === LOADING_STATUS.LOADING
                  ? "Signing up..."
                  : "SIGNUP"}
              </Button>
              <Grid container justifyContent="center">
                {"Already a user?"}
                <Grid item>
                  <Link to={LOGIN_ENDPOINT}>{"LOGIN"}</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  )
}
