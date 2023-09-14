import { configureStore } from "@reduxjs/toolkit"
import user_data from "./slice/user_data.js"

export default configureStore({
  reducer: {
    user_data,
  },
})
