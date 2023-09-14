export const find_chats = (data, id) => {
  return data.chats.find((i) => i._id === id)
}

export const findUserdetails = (email, item) => {
  return item.user_info.find((i) => i.user_details.email_id !== email)
}
