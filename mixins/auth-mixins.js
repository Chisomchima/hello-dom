export default {

    methods: {
        async setDataInStore() {
            try {
              if (this.$store.state.student.schools.length <= 0) {
                const result = await this.$axios.$get('/lms/menu')
                const menuResponseData = result.data
                this.$store.commit('school/SET', menuResponseData.teachers)
                this.$store.commit('parent/SET', menuResponseData.children_school)
                const studentArray = menuResponseData.schools.find(
                  (item) => item.key === 'my_school'
                ).data
                this.$store.commit('student/SET', studentArray)
              }
            } catch (error) {
              console.log(error)
            }
          },

          async setRolesInStore() {
            try {
              const {
                data: { data },
              } = await this.$axios(`/util/v2/discovery/check/`)
              if (data.type.includes('staff')) {
                const staffData = await this.$axios.$get(`/util/v2/discovery/staff/`)
                this.$store.commit('staff/SET_DISCOVERY', staffData.data)
      
                const schoolCodeAndStaffID = staffData.data.map((item) => ({
                  school_code: item.school_details.code,
                  school_id: item.school_details.id,
                  staff_id: item.staff_details.id,
                }))
                const promiseArray = schoolCodeAndStaffID.map((item) =>
                  this.$axios.$get(
                    `/util/v2/roles/staff/${item.staff_id}/school/${item.school_id}/`
                  )
                )
      
                const result = await Promise.all(promiseArray)
                const userRolesBySchool = result.map((item, index) => ({
                  roles: item.data.map((item) => item.name),
                  code: schoolCodeAndStaffID[index].school_code,
                }))
      
                this.$store.commit('roles/SET_ROLES', userRolesBySchool)
              }
            } catch (error) {
              console.log(error)
            }
          },

          async redirect() {
            try {
              const {
                data: { data },
              } = await this.$axios(`/util/v2/discovery/check/`)
      
              if (data.type.includes('student')) {
                const { data: studentData } = await this.$axios.$get(
                  `/util/v2/discovery/student/`
                )
                this.$store.commit('student/SET_STUDENT_DISCOVERY', studentData)
                if (this.$route.query.redirect === 'true') {
                  this.$router.back()
                  return
                }
                this.$router.push(
                  `/student/lms/${studentData[0].school_details.code}/subjects`
                )
              } else if (data.type.includes('staff')) {
                console.log(';staff')
                const {
                  data: { data },
                } = await this.$axios.get(`/util/v2/discovery/staff/`)
      
                this.store(data[0].school_details)
      
                if (this.$route.query.redirect === 'true') {
                  this.$router.back()
                  return
                }
      
                this.$router.push(`/sms/${data[0].school_details.code}/lms/classes`)
              } else {
                this.$router.push('/')
              }
            } catch (error) {
              console.log(error)
            }
          }
    }
}