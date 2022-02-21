const state={
    goodsForeNo: ''
}
const mutations = {
    STORE_GOODSFORENO(state, params) {
        state.goodsForeNo= params;
    }
}
export default {
    namespaced: true,
    state,
    // getters,
    // actions,
    mutations
}