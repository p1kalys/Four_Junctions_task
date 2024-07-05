import Box from "@mui/material/Box"
import LinearProgress from "@mui/material/LinearProgress"
import { LOADING_STATUS } from "../constants/enums"
import { useAppSelector } from "../hooks/useRedux"

const LinearProgressIndicator = () => {
  const loadingStatus = useAppSelector((state) => state.loadingStatus)
  return (
    <Box sx={{ width: "100%" }}>
      {loadingStatus === LOADING_STATUS.LOADING && <LinearProgress />}
    </Box>
  )
}

export default LinearProgressIndicator
