// eslint-disable-next-line import/named
import { MutationTree, GetterTree, ActionTree } from 'vuex'

type studentDetails = {
  code: string
  // eslint-disable-next-line camelcase
  current_academic_year: object
  id: string
  image: string
  name: string
}

const student: studentDetails[] | {} = []

export const state = () => ({
  student,
  children: () => [],
})

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
  SET: (state, student: studentDetails) => {
    state.student = student
  },
  REMOVE: (state) => {
    state.student = []
  },
  SETSTUDENT: (state, payload) => {
    state.children = payload
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async setchildren({ commit }, academicyears) {
    try {
      console.log('IMPORTANT', academicyears)

      const children = await this.$axios.get(
        `communications/v2/family/year/${academicyears[0].id}/`
      )

      // this.$store.commit('parent/SETSTUDENT', children.data.data.students)

      if (children.data.data.students) {
        commit('SETSTUDENT', children.data.data.students)
      }
      return Promise.resolve(children)
    } catch (e) {
      return Promise.reject(e)
    }
  },
}

export const getters: GetterTree<RootState, RootState> = {
  getParentSchool: (state: { student: any }) => (code: string) => {
    return state.student.find(
      (student: { code: string }) => student.code === code
    )
  },
  getChildren: (state: { children: any }) => {
    return state.children
  },
}
