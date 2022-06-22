import { GetterTree, ActionTree, MutationTree } from 'vuex'


type schoolDetails = {
    code: string
    id: string
    image: string
    name: string
}

const schools: schoolDetails[] = []

export const state = () => ({
    schools,
    currentAcademicYear: {},
})

export type RootState = ReturnType<typeof state>


export const mutations: MutationTree<RootState> = {
    SET: (state, schools: schoolDetails[]) => {
        state.schools = schools;
    },
    REMOVE: (state) => {
        state.schools = [];
    },

    SET_CURRENT_ACADEMIC_YEAR: (state, academicYear) => {
        state.currentAcademicYear = academicYear;
    },
}


export const getters: GetterTree<RootState, RootState> = {
    getSchoolByCode: (state) => (code: string) => {
        if (state.schools.length > 0) {
            return state.schools.find((school: schoolDetails) => school.code === code);
        }
        return null;
    },
}