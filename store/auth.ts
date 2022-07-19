import { GetterTree, ActionTree, MutationTree } from 'vuex'

type UserDetails = {
    avatar?: string,
    first_name: string,
    last_name: string,
    gender: "male" | "female"
};


export const state = () => ({
    user: {} as UserDetails | null,
    token: null as unknown as string || null,
    userSigningUp: '' as string,
    disablePage: false as Boolean
})

export type RootState = ReturnType<typeof state>


export const mutations: MutationTree<RootState> = {
    SET_USER: (state, user: UserDetails) => {
        state.user = user;
    },
    SET_TOKEN: (state, token: string) => {
        state.token = token;
    },
    REMOVE_TOKEN: (state) => {
        state.token = null;
        state.user = null;
    },
    SET_SIGNUP_USER: (state, value) => {
        state.userSigningUp = value;
    },
    SET_PAGE_DISABLED: (state, value) => {
        state.disablePage = value;
    }
}


export const actions: ActionTree<RootState, RootState> = {

    async login({ commit }, { username, password }) {
        try {
            const response = await this.$axios.$post('/users/api-token-auth/', { username, password });

            if (response.token) {
                commit('SET_USER', response);
                commit('SET_TOKEN', response.token);
            }
            return Promise.resolve(response);
        } catch (e) {
            return Promise.reject(e);
        }
    },

    async signUp({ commit }, payload) {
        try {
            const response = await this.$axios.$post('/api-auth/signup/', payload);
            // if (response.data.token) {
            //     commit('SET_USER', response.data.user_details);
            //     commit('SET_TOKEN', response.data.token);
            // }
            return Promise.resolve(response);
        } catch (e) {
            return Promise.reject(e);
        }
    },
    logout({ commit }) {
        commit('REMOVE_TOKEN');
        this.replaceState({
            auth: {
                token: null,
                user: { avatar: null, first_name: null, last_name: null },
                userSigningUp: '',
                disablePage:false,
            },
            roles: {
                roles: [] as [],
                access: true,
                currentSchoolCode: null,
            },
            school: {
                schools: [],
                currentAcademicYear: {}
            },
            parent: {
                student: [],
            },
            student: {
                schools: [],
                classDetails: {},
                currentAcademicYear: {}
            },
            administration: {
                school: {},
                student: {},

            },
            staff: {
                discoveryData: [],
            },
            loader: {
                routerLoadingEnable: true,
            },

            breadcrumbs: {
                routes: [],
                rootPage: [],
                enable: true,
                enableRootRoute: true,
            },
            requestInProgress: false,
        } as unknown as RootState)
    },
}

export const getters: GetterTree<RootState, RootState> = {
    isLoggedIn: (state) => !!(state.token),
}