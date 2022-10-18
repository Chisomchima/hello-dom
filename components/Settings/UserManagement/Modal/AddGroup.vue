<template>
  <ModalWrapper
    :size="`lg`"
    id="addGroup"
    :title="modalTitle"
    @ok="ok()"
    @hide="clear()"
  >
    <ValidationObserver ref="form">
      <form>
        <div class="row">
          <!-- <div class="col-md-12 mb-2">
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
          </div> -->
          <div class="col-md-12 mb-2">
            <ValidationProviderWrapper name="Name" :rules="['required']">
              <input
                v-model="dataObject.name"
                type="text"
                class="form-control"
              />
            </ValidationProviderWrapper>
          </div>
          <div class="col-md-12 mb-2">
            <ValidationProviderWrapper name="Description" :rules="['']">
              <!-- <input
                v-model="dataObject.description"
                type="text"
                class="form-control"
              /> -->
              <textarea
                v-model="dataObject.description"
                cols="20"
                rows="5"
                class="form-control"
              ></textarea>
            </ValidationProviderWrapper>
          </div>

          <div class="col-md-12 mb-2">
            <PickList
              :metaKeySelection="control"
              v-model="dataObject.permissions"
              listStyle="height:400px"
              dataKey="id"
            >
              <template #sourceheader><span class="text-14">Available</span></template>
                  <template #targetheader><span class="text-14">Selected</span></template>
              <template #item="data">
                <div class="product-list-action">
                  <span class="mb-2 text-gray text-10 p-1">{{
                    data.item.name
                  }}</span>
                </div>
              </template>
            </PickList>
          </div>
        </div>
      </form>
    </ValidationObserver>
  </ModalWrapper>
</template>

<script>
import { differenceBy } from 'lodash'
import PickList from 'primevue/picklist'
export default {
  components: { PickList },
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
        description: '',
        permissions: [[], []],
      },
      reqBody: {
        name: '',

        permissions: [[], []],
      },
      title: '',
      permissions: [],
      control: false,
    }
  },
  watch: {
    editData: {
      handler(newVal) {
        if (Object.keys(newVal).length > 0) {
          this.dataObject.permissions[1] = newVal.permissions
          this.dataObject.description = newVal.description
          this.dataObject.name = newVal.name
          this.dataObject.id = newVal.id
          let diff = this.checkDiffference(
            this.dataObject.permissions[0],
            newVal.permissions
          )
          console.log(diff)
          this.dataObject.permissions[0] = diff
        }
      },
      immediate: true,
      deep: true,
    },
    modalTitle() {
      this.title = this.modalTitle
    },
  },
  created() {
    this.callForData()
  },
  methods: {
    async ok() {
      if (await this.$refs.form.validate()) {
        if (this.dataObject.id != '') {
          this.edit()
        } else {
          this.save()
        }
      }
    },
    checkDiffference(yardstick, y) {
      let diff = differenceBy(yardstick, y, 'name')
      return diff
    },
    async callForData() {
      try {
        let permissions = await this.$api.users.getPermissions({ size: 1000 })
        this.dataObject.permissions[0] = permissions.results
      } catch {}
    },
    async save() {
      try {
        let permissions = this.dataObject.permissions[1]
        let permissionsID = []
        if (permissions.length > 0) {
          permissionsID = permissions.map((el) => el.id)
        }
        const data = await this.$api.users.createGroup({
          name: this.dataObject.name,
          permissions: permissionsID,
          description: this.dataObject.description,
        })
        this.$emit('refresh')
        this.$bvModal.hide('addGroup')
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    },
    async edit() {
      try {
        let permissions = this.dataObject.permissions[1]
        let permissionsID = []
        if (permissions.length > 0) {
          permissionsID = permissions.map((el) => el.id)
        }
        const data = await this.$api.users.updateGroup(this.dataObject.id, {
          name: this.dataObject.name,
          permissions: permissionsID,
          description: this.dataObject.description,
        })
        this.$emit('refresh')
        this.$bvModal.hide('addGroup')
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    },

    clear() {
      this.dataObject.id = ''
      this.dataObject.name = ''
      this.dataObject.description = ''
      this.dataObject.permissions[1] = []
      this.callForData()
    },
  },
}
</script>

<style>
.p-picklist-source-controls {
  display: none !important;
  background-color: blue;
}
.p-picklist-target-controls {
  display: none;
  background-color: blue;
}
</style>