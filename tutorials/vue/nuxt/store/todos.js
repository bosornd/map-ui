export const state = () => ({
  list: []
})

export const mutations = {
  add (state, text) {
    state.list.push(text)
  }
}
