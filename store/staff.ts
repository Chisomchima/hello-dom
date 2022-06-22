import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
    discoveryData: [],
})

export type RootState = ReturnType<typeof state>


export const mutations: MutationTree<RootState> = {
    SET_DISCOVERY: (state, payload) => {
        state.discoveryData = payload;
    },

}
export const getters: GetterTree<RootState, RootState> = {
    getSchoolByCode: (state) => (code: string) => {
        return state.discoveryData.find((school: any) => school.school_details.code === code)
    },
}



