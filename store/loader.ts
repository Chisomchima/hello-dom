import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  routerLoadingEnable: true,
})

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
  setRouterLoadingEnable(state, payload) {
    // debugger;
    state.routerLoadingEnable = payload
  },
}
