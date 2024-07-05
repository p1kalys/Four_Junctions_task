import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardMedia,
} from "@mui/material"
import useLogin from "../hooks/useLogin"

const ImdbMovies = () => {
  const { isUserLoggedIn } = useLogin()
  return (
    <>
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
          IMDB MOVIES
        </Typography>
        <Grid container spacing={5}>
          {Array.from(Array(10).keys()).map((index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image="https://wallpaper.forfun.com/fetch/8d/8d06de8bd1b1de239326bec2b89c24eb.jpeg"
                  title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Lizard
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
                    Lizards are a widespread group of squamate reptiles,
                  </Typography>
                </CardContent>
                {isUserLoggedIn()  && (
                  <CardActions>
                    <Button size="small">Add to saved Movies</Button>
                  </CardActions>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  )
}

export default ImdbMovies
