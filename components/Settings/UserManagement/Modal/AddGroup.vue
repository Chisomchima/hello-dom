<template>
  <ModalWrapper :size="`md`" id="addGroup" :title="modalTitle" @ok="ok()" @hide="clear()">
    <ValidationObserver ref="form">
      <form>
        <div class="row">
          <div class="col-md-12 mb-2">
            <ValidationProviderWrapper name="Permission(s)" :rules="['required']">
              <VSelect
                v-model="dataObject.permissions"
                :options="permissions"
                label="name"
                multiple
                taggable
                :reduce="(opt) => opt"
              >
              </VSelect>
            </ValidationProviderWrapper>
          </div>
          <div class="col-md-12 mb-2">
            <ValidationProviderWrapper name="Name" :rules="['required']">
              <input
                v-model="dataObject.name"
                type="text"
                class="form-control"
              />
            </ValidationProviderWrapper>
          </div>
          
<!-- 
          <div
              class="col-md-12"
              v-for="(item, index) in labServiceOptions"
              :key="index"
            >
              <p class="m-3 text-16 text-center">{{ item.lab_unit }}</p>
              <div class="row">
                <div
                  class="col-md-4 mb-2 d-flex align-items-center"
                  v-for="(service, serviceIndex) in item.lab_panels"
                  :key="serviceIndex"
                >
                  <input
                    style="height: 20px; width: 20px"
                    id=""
                    type="checkbox"
                    name=""
                    v-model="service.selected"
                    @change="
                      $emit('toggle', {
                        child: serviceIndex,
                        parent: index,
                        state: $event.target.checked,
                      })
                    "
                  />
                  <p class="text-grey text-14 ml-2 mb-0 w-75">
                    {{ service.name }}
                  </p>
                </div>
              </div>
            </div> -->

        </div>
      </form>
    </ValidationObserver>
  </ModalWrapper>
</template>

<script>
export default {
  props: {
    editData: {
      type: Object,
      require: false,
      default: () => ({}),
    },
     modalTitle: {
      type: String,
      require: true,
      default: () => 'Add Group',
    },
  },
  data() {
    return {
      dataObject: {
        name: '',
        permissions: []
      },
      title: '',
      permissions: []
    }
  },
  watch: {
    editData: {
      handler(newVal) {
        if (Object.keys(newVal).length > 0) {
          this.dataObject = newVal
        }
      },
      immediate: true,
      deep: true,
    },
    modalTitle() {
      this.title = this.modalTitle
    },
  },
  async created() {
    let permissions = await this.$api.users.getPermissions({ size: 1000 })
    this.permissions = permissions.results
  },
  methods: {
    async ok() {
      if (await this.$refs.form.validate()) {
        if (this.dataObject.id) {
          this.edit()
        } else {
          this.save()
        }
      }
    },
    async save() {
      try {
        const data = await this.$api.users.createGroup(this.dataObject)
        this.$emit('refresh')
        this.$bvModal.hide('addGroup')
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    },
    async edit() {
      try {
        const data = await this.$api.users.updateGroup(
          this.dataObject.id,
          this.dataObject
        )
        this.$emit('refresh')
        this.$bvModal.hide('addGroup')
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    },

    clear() {
      this.dataObject = {
        name: '',
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>