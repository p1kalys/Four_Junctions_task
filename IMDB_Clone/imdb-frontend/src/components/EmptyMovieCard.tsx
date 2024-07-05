import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardActions from "@mui/material/CardActions"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { Paper } from "@mui/material"
import { Link } from "react-router-dom"
import { ADD_MOVIES_ENDPOINT } from "../constants/strings"

const EmptyMovieCard = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "50px 0",
        width: "100%",
      }}
    >
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          You haven't added any movie to saved movie.
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={ADD_MOVIES_ENDPOINT}>
          <Button fullWidth color="primary" size="large" variant="contained">
            Add Your First Movie
          </Button>
        </Link>
      </CardActions>
    </Paper>
  )
}

export default EmptyMovieCard
