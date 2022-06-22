<template>
  <div class="container">
    <!-- <BackwardNavigation /> -->

    <div class="card">
      <div class="card-body p-xl-5">
        <div class="">
          <div class="card card-bordered">
            <div class="card-body">
              <div class="text-dark fs-20 line-height-100p mb-4">
                Basic Information
              </div>

              <div class="fs-14 line-height-100p">
                <div
                  class="
                    d-flex
                    flex-wrap
                    align-items-center
                    no-gutters
                    border-bottom
                    py-3
                  "
                >
                  <div class="col-4 mb-2 mb-md-0">
                    <div class="text-light">Photo</div>
                  </div>
                  <div class="col-8 text-right">
                    <div class="position-relative">
                      <img
                        class="object-fit-cover rounded-circle"
                        width="72"
                        height="72"
                        :src="
                          user.avatar.length > 0 ? user.avatar : dummyAvatar
                        "
                      />
                      <button
                        class="
                          bg-transparent
                          border-0
                          p-0
                          position-absolute
                          bottom-0
                          right-0
                        "
                        @click="onClickFileUpload"
                      >
                        <input
                          ref="fileInput"
                          class="invisible"
                          type="file"
                          name="imagesArray"
                          @change="onChange"
                        />

                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="12" cy="12" r="12" fill="#1070B7" />
                          <path
                            d="M12 16.6665H17.25"
                            stroke="white"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M14.625 7.04164C14.8571 6.80957 15.1718 6.6792 15.5 6.6792C15.6625 6.6792 15.8234 6.71121 15.9735 6.77339C16.1237 6.83558 16.2601 6.92673 16.375 7.04164C16.4899 7.15654 16.5811 7.29296 16.6432 7.44309C16.7054 7.59322 16.7374 7.75413 16.7374 7.91664C16.7374 8.07914 16.7054 8.24005 16.6432 8.39018C16.5811 8.54032 16.4899 8.67673 16.375 8.79164L9.08333 16.0833L6.75 16.6666L7.33333 14.3333L14.625 7.04164Z"
                            stroke="white"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                <PageProfileARow
                  :obj-key="['first_name', 'middle_name', 'last_name']"
                  :label="'Name'"
                  @save="UpdateProfile($event)"
                >
                  <div class="d-flex no-gutters" style="column-gap: 8px">
                    <PageProfileCustomInputForNameRow
                      v-model="user.first_name"
                      :label="'First Name'"
                    />
                    <PageProfileCustomInputForNameRow
                      v-model="user.middle_name"
                      :label="'Middle Name'"
                    />
                    <PageProfileCustomInputForNameRow
                      v-model="user.last_name"
                      :label="'Last Name'"
                    />
                  </div>
                </PageProfileARow>

                <PageProfileARow
                  :obj-key="'email'"
                  :label="'Email Address'"
                  @save="UpdateProfile($event)"
                >
                  <PageProfileAnInput
                    v-model="user.email"
                    :label="'Email Address'"
                  />
                </PageProfileARow>

                <PageProfileARow
                  :obj-key="'date_of_birth'"
                  :label="'Birthday'"
                  @save="UpdateProfile($event)"
                >
                  <PageProfileAnInput
                    v-model="user.date_of_birth"
                    :label="'Birthday'"
                  />
                </PageProfileARow>

                <PageProfileARow
                  :obj-key="'phone_number'"
                  :label="'Phone number'"
                  @save="UpdateProfile($event)"
                >
                  <PageProfileAnInput
                    v-model="user.phone_number"
                    :label="'Phone Number'"
                  />
                </PageProfileARow>

                <PageProfileARow
                  :obj-key="'gender'"
                  read-only
                  :label="'Gender'"
                  @save="UpdateProfile($event)"
                >
                  <PageProfileAnInput
                    v-model="user.gender"
                    read-only
                    class="text-capitalize"
                    :label="'Gender'"
                  />
                </PageProfileARow>

                <div
                  class="
                    d-flex
                    flex-wrap
                    align-items-center
                    no-gutters
                    border-bottom
                    py-3
                  "
                >
                  <div class="col-md-3 col-12 mb-2 mb-md-0">
                    <div class="text-light">Password</div>
                  </div>
                  <div class="col-md-7 col-9">
                    <div class="text-dark">••••••••••••••</div>
                    <div class="fs-12 text-light mt-1">
                      Last modified: 24th August 2021
                    </div>
                  </div>
                  <div class="col-md-2 col-3 text-right">
                    <span
                      class="text-primary pointer fs-12 font-weight-bold"
                      @click.prevent="
                        $router.push('/auth/profile/change-password')
                      "
                      >Change Password</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  async asyncData({ $axios, store }) {
    const userObject = await $axios.$get('/util/v2/profile/')
    store.commit('auth/SET_USER', userObject)
    const user = {
      avatar: userObject.avatar,
      first_name: userObject.first_name,
      last_name: userObject.last_name,
      middle_name: userObject.middle_name,
      date_of_birth: userObject.date_of_birth,
      email: userObject.email,
      gender: userObject.gender,
      phone_number: userObject.phone_number,
      bio: userObject.bio,
      hobbies: userObject.hobbies,
      lga: userObject.lga,
      state: userObject.state,
      country: userObject.country,
    }
    return {
      user,
    }
  },

  data() {
    return {
      dummyAvatar:
        'https://546458-1766807-raikfcquaxqncofqfm.stackpathdns.com/pub/media/wordpress/d5f1425700d7460bb2aa1e1e8e1b7e49.jpg',
      imagesArray: '',
      user: {
        phone_number: '',
        gender: '',
        email: '',
        date_of_birth: '',
        first_name: '',
        last_name: '',
        middle_name: '',
        avatar: '',
      },
    }
  },
  methods: {
    async UpdateProfile(event: string | Array<String>) {
      // console.log(event)
      const user: any = this.user
      let object: { [key: string]: any } = {}

      if (typeof event === 'string') {
        object = { [event]: user[event] }
      } else {
        event.forEach((key: any) => {
          object[key] = user[key]
        })
      }

      await this.$axios.$put('/util/v2/profile/update/', object)
      await this.$nuxt.refresh()
      // this.$store.commit('auth/SET_USER', user)
    },

    onChange(event: any) {
      this.imagesArray = event.target.files[0]
      this.updateAvatar()
    },
    onClickFileUpload() {
      if (this.$refs.fileInput) {
        const uploadField = this.$refs.fileInput as any
        uploadField.click()
      }
    },

    async updateAvatar() {
      const formData = new FormData()
      formData.append('avatar', this.imagesArray)
      await this.$axios.$put('/util/v2/avatar/update/', formData)
      await this.$nuxt.refresh()
    },
  },
})
</script>

<style lang="scss" scoped></style>
