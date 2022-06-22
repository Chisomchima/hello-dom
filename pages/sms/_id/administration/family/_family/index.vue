<template>
  <div class="">
    <UtilsHeaderCard
      v-if="family"
      :title="family.family_name + ' Family Profile'"
      :data="family"
      :enableAction="true"
      @edit="editFamily"
      @delete="showDelete"
      :display-key="['members', 'primary_contact', 'phone', 'email', 'address']"
    >
    </UtilsHeaderCard>
    <modal-wrapper
      id="modal-delete-family"
      title="Delete Family"
      variant="danger"
      @ok="deleteFamily"
    >
      <div class="modal-body">
        <div>
          Are you sure you want to delete this entire family? This action cannot
          be undone, click the 'Cancel' button to cancel this action
        </div>
      </div>
    </modal-wrapper>

    <b-modal id="edit-family" v-model="modalEdit" no-close-on-backdrop>
      <div class="modal-body">
        <div>
          <div v-if="family" class="row">
            <div class="col-12">
              <div class="form-group">
                <label>Family Name</label
                ><input
                  v-model="family.family_name"
                  type="text"
                  placeholder="Family Name"
                  class="form-control"
                />
              </div>
            </div>
            <div class="col-12">
              <div class="form-group">
                <label>Email Address</label
                ><input
                  v-model="family.email"
                  type="email"
                  placeholder="Email Address"
                  class="form-control"
                />
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <label>Primary Contact's Name</label
                ><input
                  v-model="family.primary_contact"
                  type="text"
                  placeholder="Primary Contact's Name"
                  class="form-control"
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label>Phone Number</label
                ><input
                  v-model="family.phone"
                  type="text"
                  placeholder="Phone Number"
                  class="form-control"
                />
              </div>
            </div>
            <div class="col-12">
              <div class="form-group">
                <label>Address</label>
                <textarea
                  id=""
                  v-model="family.address"
                  name=""
                  placeholder="Address"
                  type="text"
                  class="form-control"
                  cols="30"
                  rows="2"
                >
                </textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
      <template #modal-header>
        <!-- Emulate built in modal header close button action -->

        <h5>Edit Family</h5>
      </template>

      <template #modal-footer="{ cancel }">
        <!-- Emulate built in modal footer ok and cancel button actions -->
        <b-button size="sm" variant="light" class="px-2 mr-2" @click="cancel()">
          Cancel
        </b-button>
        <b-button
          size="sm"
          variant="primary"
          class="px-3"
          @click="handleEditFamily()"
        >
          Save
        </b-button>
        <!-- Button with custom close trigger value -->
      </template>
    </b-modal>

    <div>
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
      >
        <template v-for="(button, index) in buttons">
          <div
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
      <!-- dynamic comp  -->
      <div>
        <keep-alive>
          <component
            :is="Component"
            v-on:refresh="$nuxt.refresh()"
            :details="everything"
          ></component>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import Student from '~/components/pages/administration/family/student.vue'
import Family from '~/components/pages/administration/family/family_members.vue'
import ModalWrapper from '~/components/ModalWrapper.vue'

export default {
  async asyncData({ route, $axios }) {
    const slate_family_id = route.params.family
    try {
      const response = await $axios.get(
        `/slate-admin/family/${slate_family_id}/`
      )
      const family = response.data.profile_info
      const everything = response.data
      console.log('single family', response.data)

      return { family, everything }
    } catch (error) {
      console.log(error)
    }
  },
  components: { Student, Family, ModalWrapper },
  data() {
    return {
      d: '',
      Component: 'Family',
      everything: {},
      buttons: [
        { name: 'Family Members', isActive: true, component: 'Family' },
        { name: 'Students', isActive: false, component: 'Student' },
      ],

      family: {
        address: 'Gregory Street',
        email: 'philipakunna@gmail.com',
        family_id: 'bd8e0447-b82c-45f9-bc60-c1819102366b',
        family_name: 'Akunna',
        members: 1,
        phone: '08055645332',
        primary_contact: 'Philip Akunna',
      },
      jane: 'ddd',
    }
  },
  async mounted() {
    // await this.getDetails()
  },
  methods: {
    editFamily() {
      this.$bvModal.show('edit-family')
      console.log(this.family)
    },
    async handleEditFamily() {
      const slate_family_id = this.family.family_id

      try {
        const response = await this.$axios.put(
          `/slate-admin/family/${slate_family_id}/`,
          {
            address: this.family.address,
            email: this.family.email,
            family_name: this.family.family_name,
            phone: this.family.phone,
            primary_contact: this.family.primary_contact,
          }
        )
        this.$bvModal.hide('edit-family')
        this.$nuxt.refresh()
        // this.getDetails()
      } catch (error) {}
    },
    showDelete() {
      this.$bvModal.show('modal-delete-family')
    },
    async deleteFamily() {
      const schoolCode = this.$store.state.administration.school.code

      this.$bvModal.hide('modal-delete-family')

      const slate_family_id = this.$route.params.family
      try {
        await this.$axios.delete(`/slate-admin/family/${slate_family_id}/`)
        this.$router.go(-2)
        this.$router.push(`/sms/${schoolCode}/administration/family`)
      } catch (error) {}
    },
    refresh() {},
    switchComponent(e) {
      this.buttons.forEach((each) => {
        each.isActive = false
      })
      e.isActive = true
      this.Component = e.component
    },
    goBack() {
      const school_code = this.$route.params.id

      this.$router.push(`/sms/${school_code}/administration/family`)
    },
  },
}
</script>

<style scoped>
.active_tab {
  color: blue;
  border-bottom-width: 2px !important;
  /* text-decoration: underline; */
}
</style>
