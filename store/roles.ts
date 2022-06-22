import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  // roles: ['teacher', 'admin', 'records', 'hr', 'accountant', 'book_keeper'],
  roles: [] as [],
  access: true,
  currentSchoolCode: null,
})

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
  SET_ROLES(state, roles) {
    state.roles = roles
  },
  SET_ACCESS(state, access) {
    state.access = access
  },
}
