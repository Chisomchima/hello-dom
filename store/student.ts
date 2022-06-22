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
  classDetails: {},
  studentProfile: {},
  discoveryData: [],
  currentAcademicYear: null,
  studentLoadingComplete: false,
})

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
  SET: (state, schools: schoolDetails[]) => {
    state.schools = schools
  },
  REMOVE: (state) => {
    state.schools = []
  },

  SET_STUDENT_CLASS_DETAILS: (state, classDetails) => {
    state.classDetails = classDetails
  },

  SET_STUDENT_LOAD_COMPLETE: (state, loading) => {
    console.log('jhhey i was called', loading)

    state.studentLoadingComplete = loading
  },
  SET_STUDENT_DISCOVERY: (state, payload) => {

    state.discoveryData = payload
  },

  SET_STUDENT_PROFILE_DETAILS: (state, profile) => {
    state.studentProfile = profile
  },

  SET_CURRENT_ACADEMIC_YEAR: (state, academicYear) => {
    state.currentAcademicYear = academicYear
  },
}

export const getters: GetterTree<RootState, RootState> = {
  getSchoolByCode: (state) => (code: string) => {
    return state.schools.find((school: schoolDetails) => school.code === code)
  },
}
