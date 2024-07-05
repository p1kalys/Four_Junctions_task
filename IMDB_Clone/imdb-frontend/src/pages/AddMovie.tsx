import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import AddIcon from "@mui/icons-material/Add"
import { ThemeProvider, Theme } from "@mui/material/styles"
import { appTheme } from "../constants/theme.constant"
import {
  Chip,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material"
import ActorDialog from "../components/ActorDialog"
import useActor from "../hooks/useActor"
import { useEffect, useState } from "react"
import useProducer from "../hooks/useProducer"
import ProducerDialog from "../components/ProducerDialog"
import { Movie } from "../types/movie"
import { movieValidationSchema } from "../Utils/validation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import useMovie from "../hooks/useMovies"
import { useNavigate } from "react-router-dom"
import { HOME_ENDPOINT } from "../constants/strings"

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

export default function AddMovie() {
  const { newActor, insertActor, actorsArr } = useActor()
  const { newProducer, insertProducer, producersArr } = useProducer()
  const { newMovie, insertMovie } = useMovie()
  const navigate = useNavigate()

  const [personName, setPersonName] = useState<string[]>([])
  const [selectedActorIds, setSelectedActorIds] = useState<string[]>([])
  const [producer, setProducer] = useState("")

  const [actorDialogVisibility, setActorDialogVisibility] = useState(false)
  const [producerDialogVisibility, setProducerDialogVisibility] =
    useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Movie>({
    resolver: zodResolver(movieValidationSchema),
  })

  const onSubmit = async (data: Movie) => {
    data.actors = selectedActorIds;
    insertMovie(data)
    // navigate(HOME_ENDPOINT)
  }

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event
    setPersonName(typeof value === "string" ? value.split(",") : value)
    if (actorsArr) {
      const actorIds = actorsArr
        .filter((actor) => value.includes(actor.name))
        .map((actor) => actor._id)
      setSelectedActorIds(actorIds)
    }
  }

  function getStyles(
    name: string,
    personName: readonly string[],
    theme: Theme
  ) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    }
  }

  useEffect(() => {
    if (newProducer) {
      setProducer(newProducer._id)
    }
  }, [newProducer])

  useEffect(() => {
    if (newActor) {
      setPersonName([...personName, newActor.name])
      setSelectedActorIds([...selectedActorIds, newActor._id])
    }
  }, [newActor])


  useEffect(() => {
    if (newMovie != null) {
      navigate(HOME_ENDPOINT)
    }
  }, [newMovie])

  return (
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
          <Typography component="h1" variant="h5">
            Add to saved movies
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("name")}
                  {...(errors.name && {
                    error: true,
                    helperText: `${errors.name.message}`,
                  })}
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  size="small"
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("releaseYear")}
                  {...(errors.releaseYear && {
                    error: true,
                    helperText: `${errors.releaseYear.message}`,
                  })}
                  required
                  fullWidth
                  id="relaseYear"
                  label="Release Year"
                  name="releaseYear"
                  size="small"
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12} sm={9}>
                <FormControl
                  {...(errors.actors && {
                    error: true,
                  })}
                  size="small"
                  sx={{ width: "100%" }}
                >
                  <InputLabel id="demo-multiple-chip-label">Actor</InputLabel>
                  <Select
                    {...register("actors")}
                    labelId="actors"
                    id="actors"
                    multiple
                    value={personName}
                    onChange={handleChange}
                    input={
                      <OutlinedInput id="select-multiple-chip" label="Chip" />
                    }
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                  >
                    {actorsArr &&
                      actorsArr.map((actor) => (
                        <MenuItem
                          key={actor._id}
                          value={actor.name}
                          style={getStyles(actor.name, personName, appTheme)}
                        >
                          {actor.name}
                        </MenuItem>
                      ))}
                  </Select>
                  {errors.actors && (
                    <FormHelperText>{errors.actors.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Button
                  sx={{ width: "100%", height: "100%" }}
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={() => setActorDialogVisibility(true)}
                >
                  ADD
                </Button>
              </Grid>
              <Grid item xs={12} sm={9}>
                <FormControl
                  {...(errors.producer && {
                    error: true,
                  })}
                  size="small"
                  sx={{ width: "100%" }}
                >
                  <InputLabel id="demo-simple-select-autowidth-label">
                    Producer
                  </InputLabel>
                  <Select
                    {...register("producer")}
                    labelId="producer"
                    id="producer"
                    value={producer}
                    onChange={(event: SelectChangeEvent) => {
                      setProducer(event.target.value)
                    }}
                    autoWidth
                    label="Age"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {producersArr &&
                      producersArr.map((producer) => (
                        <MenuItem value={producer._id}>
                          {producer.name}
                        </MenuItem>
                      ))}
                  </Select>
                  {errors.producer && (
                    <FormHelperText>{errors.producer.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Button
                  sx={{ width: "100%", height: "100%" }}
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={() => setProducerDialogVisibility(true)}
                >
                  ADD
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("plot")}
                  {...(errors.plot && {
                    error: true,
                    helperText: `${errors.plot.message}`,
                  })}
                  required
                  fullWidth
                  id="plot"
                  label="Plot"
                  name="plot"
                  size="small"
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("poster")}
                  {...(errors.poster && {
                    error: true,
                    helperText: `${errors.poster.message}`,
                  })}
                  required
                  fullWidth
                  name="poster"
                  label="Poster"
                  type="poster"
                  id="poster"
                  size="small"
                  autoComplete="off"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add
            </Button>
          </Box>
        </Box>
      </Container>
      <ActorDialog
        open={actorDialogVisibility}
        onClose={() => setActorDialogVisibility(false)}
        insertActor={insertActor}
      />
      <ProducerDialog
        open={producerDialogVisibility}
        onClose={() => setProducerDialogVisibility(false)}
        insertProducer={insertProducer}
      />
    </ThemeProvider>
  )
}
