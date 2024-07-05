import { createSlice } from "@reduxjs/toolkit";
import { LOADING_STATUS } from "../../constants/enums";

export const loadingIndicatorSlice = createSlice({
  initialState: LOADING_STATUS.IDLE,
  name: "loadingStatus",
  reducers: {
      setLoading: (state) => LOADING_STATUS.LOADING,
      setIdle: (state) => LOADING_STATUS.IDLE
  },
});

export const { setLoading, setIdle } = loadingIndicatorSlice.actions;
export default loadingIndicatorSlice.reducer;
