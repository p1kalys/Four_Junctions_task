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
import { ThemeProvider } from "@mui/material/styles"
import { appTheme } from "../constants/theme.constant"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginValidationSchema } from "../Utils/validation"
import { LoginData } from "../types/auth"
import { HOME_ENDPOINT, SIGNUP_ENDPOINT } from "../constants/strings"
import { useEffect } from "react"
import useLogin from "../hooks/useLogin"

export default function Login() {
  const navigate = useNavigate()
  const { user, login } = useLogin()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    resolver: zodResolver(loginValidationSchema),
  })

  const onSubmit: SubmitHandler<LoginData> = async (data: LoginData) => {
    login(data)
  }

  useEffect(() => {
    if (user != null) {
      navigate(HOME_ENDPOINT)
    }
  }, [user])

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
              Login into your account
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              sx={{ mt: 1 }}
            >
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
                disabled={isSubmitting}
                sx={{ mt: 2, mb: 2 }}
              >
                {isSubmitting ? "Loging up..." : "LOGIN"}
              </Button>
              <Grid container justifyContent="center">
                {"Don't have an account?"}
                <Grid item>
                  <Link to={SIGNUP_ENDPOINT}>{"SIGNUP"}</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  )
}
