const Tree = {
    namespaced: true,
    state: {
      node: {}
    },
    getters: {
      node: state => {
        return state.node
      }
    },
    mutations: {
      SET_NODE(state, node) {
        state.node = node
      },
      REMOVE_NODE(state) {
        state.node = {}
        state.project = {}
      }
    }
  }
  export default tree
