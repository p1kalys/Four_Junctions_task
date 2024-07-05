import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardMedia,
  ThemeProvider,
} from "@mui/material"
import { EDIT_MOVIES_ENDPOINT } from "../constants/strings"
import useLogin from "../hooks/useLogin"
import EmptyMovieCard from "../components/EmptyMovieCard"
import { appTheme } from "../constants/theme.constant"
import useMovies from "../hooks/useMovies"
import { useNavigate } from "react-router-dom"
import { MovieResponse } from "../types/movie"

const SavedMovies = () => {
  const { user } = useLogin()
  const { moviesArr } = useMovies()
  const navigate = useNavigate()

  const handleEditClick = (movieResponse: MovieResponse) => {
    navigate(EDIT_MOVIES_ENDPOINT, {state: {movieResponse : movieResponse}})
  }

  return (
    <>
      <ThemeProvider theme={appTheme}>
        <Container
          maxWidth="lg"
          sx={{ py: 5, maxHeight: "calc(100vh)", overflow: "auto" }}
          style={{ scrollbarWidth: "none" }}
        >
          <Typography
            variant="h4"
            align="left"
            style={{ marginTop: "40px" }}
            sx={{ py: 5 }}
          >
            SAVED MOVIES
          </Typography>

          {moviesArr != null && moviesArr.length === 0 && <EmptyMovieCard />}
          {moviesArr != null && moviesArr.length > 0 && (
            <>
              <Grid container spacing={5}>
                {moviesArr.map((movie) => (
                  <Grid item xs={12} sm={4} key={movie._id}>
                    <Card sx={{ maxWidth: 345 }}>
                      <CardMedia
                        sx={{ height: 140 }}
                        image={movie.poster}
                        title="green iguana"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {movie.name}
                        </Typography>
                        <Typography
                          sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: "3",
                            WebkitBoxOrient: "vertical",
                          }}
                          variant="body2"
                          color="text.secondary"
                        >
                          {movie.plot}
                        </Typography>
                      </CardContent>
                      {user && (
                        <CardActions>
                          <Button size="small" onClick={() => handleEditClick(movie)}>EDIT</Button>
                        </CardActions>
                      )}
                    </Card>
                  </Grid>
                ))}
              </Grid> 
            </>
          )}
        </Container>
      </ThemeProvider>
    </>
  )
}

export default SavedMovies
