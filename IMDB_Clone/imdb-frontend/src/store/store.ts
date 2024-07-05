import { configureStore } from "@reduxjs/toolkit"
import loadingIndicatorSlice from "./slice/loadingIndicatorSilce"
import snackbarStatusSlice from "./slice/snackbarSlice"
import loginSlice from "./slice/authSlice"
import actorSlice from "./slice/actorSlice"
import producerSlice from "./slice/producerSlice"
import movieSlice from "./slice/movieSlice"

export const store = configureStore({
  reducer: {
    loadingStatus: loadingIndicatorSlice,
    snackbarStatus: snackbarStatusSlice,
    loginSlice: loginSlice,
    actorSlice: actorSlice,
    producerSlice: producerSlice,
    movieSlice: movieSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
