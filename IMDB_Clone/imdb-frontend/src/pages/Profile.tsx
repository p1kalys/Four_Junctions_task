import Card from "@mui/material/Card"
import CardHeader from "@mui/material/CardHeader"
import Avatar from "@mui/material/Avatar"
import { red } from "@mui/material/colors"
import { Box, Container } from "@mui/material"
import useLogin from "../hooks/useLogin"

export default function Profile() {
  const { user } = useLogin()
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Card sx={{ maxWidth: 345 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                {user?.name[0]}
              </Avatar>
            }
            title={user?.name}
            subheader={`Number : ${user?.number}`}
          />
        </Card>
      </Box>
    </Container>
  )
}
