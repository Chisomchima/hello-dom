import { GetterTree, ActionTree, MutationTree } from 'vuex';


export const state = () => ({
    requestInProgress: false as Boolean,
})
export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
    toggleRequestInProgress(state, value = null) {
        if (value === null) {
            state.requestInProgress = !state.requestInProgress;
        } else {
            state.requestInProgress = value;
        }

    }
}