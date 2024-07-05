import { createSlice } from "@reduxjs/toolkit"
import { ActorResponse } from "../../types/actor"

export interface ProducersState {
  producers: Array<ActorResponse> | null
}

export const initialState: ProducersState = {
  producers: null,
}

export const Producerslice = createSlice({
  initialState,
  name: "Producers",
  reducers: {
    addAllProducers: (state, action) => {
      state.producers = action.payload
    },
    addOneProducer: (state, action) => {
      state.producers = state.producers
        ? [...state.producers, action.payload]
        : [action.payload]
    },
  },
})

export const { addAllProducers, addOneProducer } = Producerslice.actions
export default Producerslice.reducer
