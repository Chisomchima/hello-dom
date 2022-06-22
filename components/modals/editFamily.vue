<template>
  <div>
    <b-modal
      id="edit"
      v-model="modalEdit"
      no-close-on-backdrop
      title="Edit Family"
    >
      <div _ngcontent-dpg-c305="" class="modal-body">
        <div _ngcontent-dpg-c305="">
          <div v-if="newFamily" _ngcontent-dpg-c305="" class="row">
            <div _ngcontent-dpg-c305="" class="col-12 p-r">
              <div _ngcontent-dpg-c305="" class="form-group">
                <label _ngcontent-dpg-c305="">Family Name</label
                ><input
                  v-model="newFamily.family_name"
                  _ngcontent-dpg-c305=""
                  type="text"
                  placeholder="Family Name"
                  class="form-control ng-untouched ng-pristine ng-valid"
                />
              </div>
            </div>
            <div _ngcontent-dpg-c305="" class="col-12 p-r">
              <div _ngcontent-dpg-c305="" class="form-group">
                <label _ngcontent-dpg-c305="">Email Address</label
                ><input
                  v-model="newFamily.email"
                  _ngcontent-dpg-c305=""
                  type="email"
                  placeholder="Email Address"
                  class="form-control ng-untouched ng-pristine ng-valid"
                />
              </div>
            </div>

            <div _ngcontent-dpg-c305="" class="col-md-6 p-r">
              <div _ngcontent-dpg-c305="" class="form-group">
                <label _ngcontent-dpg-c305="">Primary Contact's Name</label
                ><input
                  v-model="newFamily.primary_contact"
                  _ngcontent-dpg-c305=""
                  type="text"
                  placeholder="Primary Contact's Name"
                  class="form-control ng-untouched ng-pristine ng-valid"
                />
              </div>
            </div>
            <div _ngcontent-dpg-c305="" class="col-md-6 p-r">
              <div _ngcontent-dpg-c305="" class="form-group">
                <label _ngcontent-dpg-c305="">Phone Number</label
                ><input
                  v-model="newFamily.phone"
                  _ngcontent-dpg-c305=""
                  type="text"
                  placeholder="Phone Number"
                  class="form-control ng-untouched ng-pristine ng-valid"
                />
              </div>
            </div>
            <div _ngcontent-dpg-c305="" class="col-12 p-r">
              <div _ngcontent-dpg-c305="" class="form-group">
                <label _ngcontent-dpg-c305="">Address</label>
                <textarea
                  id=""
                  v-model="newFamily.address"
                  name=""
                  placeholder="Address"
                  type="text"
                  class="form-control ng-untouched ng-pristine ng-valid"
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
      <template #modal-footer>
        <!-- Emulate built in modal footer ok and cancel button actions -->
        <b-button size="sm" variant="light" class="px-2 mr-2" @click="cancel()">
          Cancel
        </b-button>
        <b-button
          size="sm"
          variant="primary"
          class="px-3"
          @click="editFamily()"
        >
          Save
        </b-button>
        <!-- Button with custom close trigger value -->
      </template>
    </b-modal>
    <b-toast id="my-toast" variant="success" solid>
      <template #toast-title>
        <div class="d-flex flex-grow-1 align-items-baseline text-center">
          <strong class="mr-auto">Notice!</strong>
        </div>
      </template>
      <div class="text-center">
     Family Edited

      </div>
    </b-toast>
  </div>
</template>

<script>
export default {
  props: {
    modalEdit: {
      type: Boolean,
      required: true,
      default: true,
    },

    parentDetails: {
      type: Object,
      required: false,
      default: () => {},
    },
  },
  async asyncData({ $axios }) {

    const slate_family_id = this.parentDetails.id

    const response = await $axios.get(`/slate-admin/family/${slate_family_id}/`)

 
  },
  data() {
    return {
      newFamily: {},
    }
  },
  watch: {
    modalEdit: {
      handler(newValue) {
        if (newValue === true) {
          this.getFamily()
        }
      },
    },
  },

  methods: {
      showToast(){
          this.$bvToast.show('my-toast')
      },
     
    cancel() {
      this.$emit('closeModal')
      
    },
    async editFamily() {
      const slate_family_id = this.parentDetails.id

      try {
        const response = this.$axios.put(
          `/slate-admin/family/${slate_family_id}/`,
          {
            address: this.newFamily.address,
            email: this.newFamily.email,
            family_name: this.newFamily.family_name,
            phone: this.newFamily.phone,
            primary_contact: this.newFamily.primary_contact,
          }
        )
        this.showToast()
this.$emit('refresh')
      } catch (error) {}
    },
    async getFamily() {
      const slate_family_id = this.parentDetails.id

      try {
        const response = await this.$axios.get(
          `/slate-admin/family/${slate_family_id}/`
        )
        const family = response.data.profile_info
        const newFamily = {
          address: family.address,
          email: family.email,
          family_name: family.family_name,
          phone: family.phone,
          primary_contact: family.primary_contact,
        }
        this.newFamily = newFamily
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style scoped></style>
