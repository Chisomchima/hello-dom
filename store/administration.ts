import { GetterTree, ActionTree, MutationTree } from 'vuex'

type schoolDetails = {
  image?: string
  id: string
  name: string
  code: string
  years: any
}

export const state = () => ({
  school: {} as schoolDetails | null,
  student: {} as any,
})

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
  SET_SCHOOL: (state, payload: schoolDetails) => {
    state.school = payload
  },

  REMOVE_SCHOOL: (state) => {
    state.school = null
  },
  SET_STUDENT: (state, payload: schoolDetails) => {
    state.student = payload
  },
  REMOVE_STUDENT: (state) => {
    state.student = null
  },
  UPDATE_SCHOOL: (state, payload) => {
    if (state.school) {
      state.school.name = payload
    }
  },
}

export const actions: ActionTree<RootState, RootState> = {
  putSchool({ commit }, load) {
    commit('SET_SCHOOL', load)
  },
  putStudent({ commit }, load) {
    commit('SET_STUDENT', load)
  },
}

// export const getters: GetterTree<RootState, RootState> = {
//     isLoggedIn: (state) => state.token !== null,
// }
