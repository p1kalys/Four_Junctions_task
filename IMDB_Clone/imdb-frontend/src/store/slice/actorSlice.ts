import { createSlice } from "@reduxjs/toolkit"
import { ActorResponse } from "../../types/actor"

export interface ActorsState {
  actors: Array<ActorResponse> | null
}

export const initialState: ActorsState = {
  actors: null,
}

export const actorSlice = createSlice({
  initialState,
  name: "actors",
  reducers: {
    addAllActors: (state, action) => {
      state.actors = action.payload
    },
    addOneActor: (state, action) => {
      state.actors = state.actors
        ? [...state.actors, action.payload]
        : [action.payload]
    },
  },
})

export const { addAllActors, addOneActor } = actorSlice.actions
export default actorSlice.reducer
