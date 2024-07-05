import React, { useRef, useState, useEffect } from "react"
import {
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Container,
  ThemeProvider,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material"
import { appTheme } from "../constants/theme.constant"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { actorValidationSchema } from "../Utils/validation"
import { Dayjs } from "dayjs"
import { Actor } from "../types/actor"


interface ActorDialogProps {
  open: boolean
  onClose: () => void
  insertActor: (actor: Actor) => void
}

const defaultActor = {
  name: "",
  gender: "",
  dob: "",
  bio: "",
}

const ActorDialog: React.FC<ActorDialogProps> = ({
  open,
  onClose,
  insertActor,
}) => {
  const [submitClicked, setSubmitClicked] = useState(false)
  const actorRef = useRef<Actor>(defaultActor)
  const [dob, setDob] = useState<Dayjs | null>(null)

  const handleClose = () => {
    onClose()
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Actor>({
    resolver: zodResolver(actorValidationSchema),
  })

  const onSubmit = async (data: Actor) => {
    actorRef.current = { ...actorRef.current, ...data }
    setSubmitClicked(true)
    if (allFieldsFilled()) {
      insertActor(actorRef.current)
      handleClose()
    }
  }

  const allFieldsFilled = () =>
    Object.values(actorRef.current).every((value) => value !== "")

  useEffect(() => {
    if (dob) {
      actorRef.current = { ...actorRef.current, dob: dob.toISOString() }
    }
  }, [dob])

  useEffect(() => {
    if (open) {
      setSubmitClicked(false)
      reset()
    }
  }, [open])

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
          }}
        >
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Actor</DialogTitle>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
              <DialogContent>
                <Grid sx={{ marginTop: "2px" }} container spacing={2}>
                  <Grid item xs={12}>
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
                    <FormControl
                      {...(errors.gender && {
                        error: true,
                      })}
                      size="small"
                      fullWidth
                    >
                      <InputLabel id="demo-simple-select-label">
                        Gender
                      </InputLabel>
                      <Select
                        {...register("gender")}
                        labelId="gender"
                        id="gender"
                        label="Age"
                      >
                        <MenuItem value={"Male"}>Male</MenuItem>
                        <MenuItem value={"Female"}>Female</MenuItem>
                      </Select>
                      {errors.gender && (
                        <FormHelperText>{errors.gender.message}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        slotProps={{
                          textField: {
                            size: "small",
                            error: actorRef.current.dob === "" && submitClicked,
                            helperText:
                              actorRef.current.dob === "" && submitClicked
                                ? "Date of birth is required"
                                : null,
                          },
                        }}
                        label="Dob"
                        onChange={(newValue) => setDob(newValue)}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      {...register("bio")}
                      {...(errors.bio && {
                        error: true,
                        helperText: `${errors.bio.message}`,
                      })}
                      required
                      fullWidth
                      id="bio"
                      label="Bio"
                      name="bio"
                      size="small"
                      autoComplete="off"
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions sx={{ marginRight: "20px", marginBottom: "20px" }}>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit" variant="contained" color="primary">
                  SAVE
                </Button>
              </DialogActions>
            </Box>
          </Dialog>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default ActorDialog
