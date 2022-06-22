import { GetterTree, ActionTree, MutationTree } from 'vuex'

type breadcrumbDetails = {
    fullPath: string,
    hash: string,
    meta: object,
    name: string,
    params: object,
    path: string,
    query: {
        tab: ''
    },
}
const routes: breadcrumbDetails[] = []
const rootPage: breadcrumbDetails[] = []
export const state = () => ({
    routes,
    rootPage,
    enable: true,
    enableRootRoute: true,
})
export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
    ADD_TAB(state, payload) {
        if (payload) {
            if (state.routes.length > 0) {

                const lastRoute = state.routes.length - 1

                state.routes[lastRoute].query.tab = payload

            }


        }

    },

    ADD_ROUTE(state, payload) {
        try {
            if (!state.routes.some(e => e.name === payload.name)) {
                state.routes.push(payload)
            }
        } catch (error) {
            console.log(error)
        }
    }, ADD_ROOT_ROUTE(state, payload) {
        try {
            if (state.rootPage.length < 1) {
                state.rootPage.push(payload)
            }
        } catch (error) {
            console.log(error)
        }
    },
    REMOVE_LAST_ROUTE(state) {
        if (state.routes.length) {
            state.enable = false

            state.routes.pop()

        }
    },

    REMOVE_ROUTE(state, payload) {
        state.enable = false
        const index = state.routes.findIndex(route => route.fullPath === payload.fullPath)
        if (state.routes.length >= 1) {
            state.routes.length = index + 1
        }
    }, REMOVE_ROOT_ROUTE(state, payload) {
        state.rootPage = []
    },
    RESET_ROUTE(state) {
        state.routes = []
    },
    DISABLE_BREADCRUMBS(state) {
        state.enable = false
    }, DISABLE_ROOT(state) {
        state.enableRootRoute = false
    }, ENABLE_ROOT(state) {
        state.enableRootRoute = true
    },
    ENABLE_BREADCRUMBS(state) {
        state.enable = true
    },


}
export const actions: ActionTree<RootState, RootState> = {


    sliceRoutes({ commit }) {
        // commit('DISABLE_BREADCRUMBS')
        commit('RESET_ROUTE')
        // setTimeout(() => {
        //     commit('ENABLE_BREADCRUMBS')
        // }, 1000);
    },
    removeRoute({ commit, dispatch }, payload) {
        // dispatch('breadecrumbs/removeRoot')
        if (payload) {
            console.log('payload from store', payload)

            commit('REMOVE_ROUTE', payload)
            setTimeout(() => {
                commit('ENABLE_BREADCRUMBS')
            }, 1000);

        }


    },
    popRoute({ commit }) {

        commit('REMOVE_LAST_ROUTE')
        setTimeout(() => {
            commit('ENABLE_BREADCRUMBS')
        }, 3500);

    },
    removeRoot({ commit }) {
        commit('DISABLE_ROOT')
        commit('REMOVE_ROOT_ROUTE')
        setTimeout(() => {
            commit('ENABLE_ROOT')
        }, 2000);
    }


}




