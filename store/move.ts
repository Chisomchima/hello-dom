/* eslint-disable camelcase */
/* eslint-disable no-use-before-define */
// eslint-disable-next-line import/named
import { MutationTree, GetterTree, ActionTree } from 'vuex'

export type moveDetails = {
    id:                   number;
    source_location:      string;
    destination_location: string;
    vendor:               string;
    lines:                string;
    created_at:           Date;
    updated_at:           Date;
    created_by:           ApprovedBy;
    updated_by:           ApprovedBy;
    move_id:              string;
    source_move_id:       string;
    type:                 string;
    status:               string;
    source_reference:     ApprovedBy;
    schedule_date:        Date;
    approved_by:          ApprovedBy;
    approved_at:          Date;
    cancelled_by:         ApprovedBy;
    cancelled_at:         Date;
    moved_by:             ApprovedBy;
    moved_at:             Date;
}

export type ApprovedBy = {
    additionalProp1: string;
    additionalProp2: string;
    additionalProp3: string;
}
const move: moveDetails | {} = {}

export const state = () => ({
    move,
})

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
  SET: (state, payload) => {
    state.move = payload
  },
//   REMOVE: (state) => {
//     state.student = []
//   },
//   SETMOVE: (state, payload) => {
//     state.move = payload
//   },
}

export const actions: ActionTree<RootState, RootState> = {
    setMove ({commit}, payload: {})  {
        commit('SET', payload)
    }
//   async setchildren({ commit }, academicyears) {
//     try {
//       console.log('IMPORTANT', academicyears)

//       const children = await this.$axios.get(
//         `communications/v2/family/year/${academicyears[0].id}/`
//       )

//       // this.$store.commit('parent/SETSTUDENT', children.data.data.students)

//       if (children.data.data.students) {
//         commit('SETSTUDENT', children.data.data.students)
//       }
//       return Promise.resolve(children)
//     } catch (e) {
//       return Promise.reject(e)
//     }
//   },
}

export const getters: GetterTree<RootState, RootState> = {
  getMove: (state: { move: any }) =>{
    return state.move
  },
//   getChildren: (state: { children: any }) => {
//     return state.children
//   },
}
