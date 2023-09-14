import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit"
import axios from "axios"
import { get_session } from "../../func/use_session.js"

const chats_adpter = createEntityAdapter({
  selectId: (chats) => chats._id,
  sortComparer: (a, b) => {
    let user_a = a.user_info.find(
      (i) => i.user_details.email_id === get_session("email")
    )
    let notification_count_a = a.chats.length - user_a.notification
    let user_b = b.user_info.find(
      (i) => i.user_details.email_id === get_session("email")
    )
    let notification_count_b = b.chats.length - user_b.notification
    if (notification_count_a > notification_count_b) {
      return -1
    }
  },
})
const intial_data = {
  data: {},
  status: "ideal",
  error: null,
  chats_adpter: chats_adpter.getInitialState(),
}

export const fetch_data = createAsyncThunk("data/user-data", async () => {
  try {
    let res = await axios.post("http://localhost:3500/home/user", {
      email: get_session("email"),
    })
    return res.data
  } catch (err) {
    return err.message
  }
})
const user_data_slice = createSlice({
  name: "user_data",
  initialState: intial_data,
  reducers: {
    user_add(state, item) {
      chats_adpter.addOne(state.chats_adpter, item.payload.chats_obj)
      state.data.contacts.push(item.payload.email)
    },
    message(state, item) {
      const entity = state.chats_adpter.entities[item.payload.id]
      entity.chats.push({
        chats_from: item.payload.chats_from,
        text_info: item.payload.text_info,
        text_type: item.payload.text_type,
        src: item.payload.hasOwnProperty("src") ? item.payload.src : null,
        time: item.payload.time,
      })
      chats_adpter.updateOne(state.chats_adpter, {
        id: item.payload.id,
        changes: entity,
      })
    },
    update_notification(state, item) {
      const entity = state.chats_adpter.entities[item.payload.id]
      let user = entity.user_info.findIndex(
        (i) => i.user_details.email_id === item.payload.email
      )
      entity.user_info[user].notification = item.payload.count
      chats_adpter.updateOne(state.chats_adpter, {
        id: item.payload.id,
        changes: entity,
      })
    },
  },
  extraReducers(build) {
    build
      .addCase(fetch_data.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(fetch_data.fulfilled, (state, action) => {
        state.data = action.payload
        chats_adpter.setAll(state.chats_adpter, action.payload.chats)
        delete state.data.chats
        state.status = "success"
      })
      .addCase(fetch_data.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload
      })
  },
})

export const { selectAll: selectallchats, selectById: selectchats } =
  chats_adpter.getSelectors((state) => state.user_data.chats_adpter)

export const user_data = (state) => state.user_data.data
export const user_status = (state) => state.user_data.status
export const user_error = (state) => state.user_data.error

export default user_data_slice.reducer

export const { user_add, message, update_notification } =
  user_data_slice.actions
