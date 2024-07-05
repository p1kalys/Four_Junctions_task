import Toolbar from "@mui/material/Toolbar"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import { ThemeProvider } from "@mui/material/styles"
import logo from "../images/logo.png"
import { appTheme } from "../constants/theme.constant"
import { Button } from "@mui/material"
import { Link } from "react-router-dom"
import {
  ADD_MOVIES_ENDPOINT,
  HOME_ENDPOINT,
  LOGIN_ENDPOINT,
  PROFILE_ENDPOINT,
  SIGNUP_ENDPOINT,
} from "../constants/strings"
import { useAuthPage } from "../hooks/useAuthPage"
import LinearProgressIndicator from "./LinearProgressIndicator"
import useLogin from "../hooks/useLogin"

export function NavBar() {
  const { isUserLoggedIn, logout } = useLogin()
  const isAuthPage = useAuthPage()

  return (
    <ThemeProvider theme={appTheme}>
      <AppBar
        position="fixed"
        style={{
          background: "white",
        }}
      >
        <LinearProgressIndicator />
        <Toolbar variant="dense" style={{ padding: "10px 60px" }}>
          <img
            src={logo}
            alt="App Icon"
            style={{
              width: "90px",
              height: "44px",
              marginRight: "10px",
            }}
          />
          <Box
            sx={{
              flexGrow: 1,
            }}
          />
          {!isAuthPage && !isUserLoggedIn() && (
            <>
              <Link to={SIGNUP_ENDPOINT}>
                <Button
                  variant="text"
                  style={{
                    marginRight: "20px",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  SIGNUP
                </Button>
              </Link>
              <Link to={LOGIN_ENDPOINT}>
                <Button variant="contained" sx={{ borderRadius: 2 }}>
                  LOGIN
                </Button>
              </Link>
            </>
          )}
          {!isAuthPage && isUserLoggedIn() && (
            <>
              <Link to={HOME_ENDPOINT}>
                <Button
                  variant="text"
                  style={{
                    marginRight: "20px",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  SAVED MOVIES
                </Button>
              </Link>
              <Link to={ADD_MOVIES_ENDPOINT}>
                <Button
                  variant="text"
                  style={{
                    marginRight: "20px",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  ADD MOVIES
                </Button>
              </Link>
              <Link to={PROFILE_ENDPOINT}>
                <Button
                  variant="text"
                  style={{
                    marginRight: "20px",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  PROFILE
                </Button>
              </Link>
              <Link to={LOGIN_ENDPOINT} replace>
                <Button
                  onClick={logout}
                  variant="contained"
                  sx={{ borderRadius: 2 }}
                >
                  LOGOUT
                </Button>
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  )
}
