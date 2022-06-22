export default {
  MAKE(state, payload) {
    state.profile = { name: payload }
    console.log('name', state)
  },
  ADD_ROUTE(state, payload) {
    state.routes.push(payload)
  },
}
