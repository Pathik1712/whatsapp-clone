const get_session = (name) => {
  return window.sessionStorage.getItem(name)
}

const remove_session = (name) => {
  window.sessionStorage.removeItem(name)
}
const set_session = (name, payload) => {
  window.sessionStorage.removeItem(name)
  window.sessionStorage.setItem(name, payload)
}

export { get_session, remove_session, set_session }
