<template>
  <div class="">
    <div>
      <!-- <span class="text-primary" @click="goBack" :style="{ cursor: 'pointer' }">
        <span class="iconify" data-icon="akar-icons:arrow-left"></span>
        Employees
      </span> -->
      <div class="row mt-2 new-height mt-2">
        <div class="col-lg-4 my-3 my-lg-0">
          <SideMenu :profile="profile" />
        </div>
        <div class="bg-white rounded col-lg-8 my-3 my-lg-0">
          <div
            class="
              d-flex
              p-b-0
              mb-0
              px-3
              justify-content-start
              border-bottom border-secondary
              align-items-center
            "
            style="overflow-x: scroll"
          >
            <template v-for="(button, index) in buttons">
              <div
                :id="button.component"
                :key="index"
                class="mr-4 dynamic-tabs py-2 align-self-center"
                :class="{
                  'active_tab border-bottom text-primary border-primary ':
                    button.isActive,
                }"
                @click="switchComponent(button)"
              >
                {{ button.name }}
              </div>
            </template>
          </div>
          <!-- dynamic component here -->
          <div class="p-3">
            <keep-alive>
              <component
                :is="currentTabComponent"
                :details="profile"
                @refresh="refresh"
              ></component>
            </keep-alive>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdmissionRecord from '~/components/pages/administration/students/profile.vue'
import Profile from '~/components/pages/hr/employees/employee_profile.vue'
import Education from '~/components/pages/hr/employees/employee_education.vue'
import Attachment from '~/components/pages/hr/employees/employee_atachment.vue'
import Information from '~/components/pages/hr/employees/employee_information.vue'
import SideMenu from '~/components/pages/hr/employees/employee_side_menu.vue'
import ImageCropper from '~/components/Utils/ImageCropper.vue'
import Persist from '~/mixins/persistComponent'

export default {
  components: {
    Profile,
    Education,
    SideMenu,
    AdmissionRecord,
    Attachment,
    Information,

    ImageCropper,
  },
  mixins: [Persist],
  async asyncData({ $axios, route }) {
    try {
      const {
        data: { data },
      } = await $axios.get(`/slate-admin/staff/hr/${route.params.employee}/`)
      console.log('response', data)
      const profile = data
      return { profile }
    } catch (error) {
      console.error(error)
    }
  },
  data() {
    return {
      message: 'Copy These Text',
      profile: {},
      dummyAvatar:
        'https://546458-1766807-raikfcquaxqncofqfm.stackpathdns.com/pub/media/wordpress/d5f1425700d7460bb2aa1e1e8e1b7e49.jpg',

      currentTabComponent: 'Profile',
      user: {
        avatar: '',
      },
      schoolId: '',
      showCropper: false,
      selectedHouse: '',
      selectedClass: '',
      version: 1,
      houseList: [],
      classList: [],
      details: null,
      buttons: [
        {
          name: 'Profile Information',
          isActive: true,
          component: 'Profile',
          page: 'HrEmployee',
        },
        {
          name: 'Education',
          isActive: false,
          component: 'Education',
          page: 'HrEmployee',
        },
        {
          name: 'HR Information',
          isActive: false,
          component: 'Information',
          page: 'HrEmployee',
        },
        {
          name: 'Attachment',
          isActive: false,
          component: 'Attachment',
          page: 'HrEmployee',
        },
        {
          name: 'Roles & Permissions',
          isActive: false,
          component: 'SetUserRoles',
          page: 'HrEmployee',
        },
      ],
    }
  },

  computed: {
    avatar() {
      return `${this.user.avatar}?v=${this.version}`
    },
  },
  mounted() {
    this.version = Math.random()
  },
  methods: {
    async refresh() {
      await this.$nuxt.refresh()
    },
    async reload() {
      await this.$nuxt.refresh()
    },
    edit() {
      this.$router.push(`${this.$route.params.student}/edit`)
    },

    goBack() {
      const school_code = this.$route.params.id
      this.$router.push(`/sms/${school_code}/staff/employee`)
    },
  },
}
</script>

<style>
/* .student_profile {
  display: grid;
  grid-template-columns: 3fr 7fr;
  gap: 30px;
} */

.custom-badge {
  border: solid rgb(81, 177, 89);
  border-width: 2px;
  border-radius: 10px;
  padding: 4px;
  /* background-color: rgba(112, 211, 81, 0.808); */
}

.profile-details {
  display: grid;
  grid-template-columns: 4fr 8fr 4fr 1fr;
}

.active_tab {
  color: blue;
  border-bottom-width: 2px !important;
  /* text-decoration: underline; */
}

.size {
  font-size: 20px !important;
}
.new-height {
  min-height: 35rem;
}
</style>
