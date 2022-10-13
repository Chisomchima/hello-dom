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
            <PickList
              :metaKeySelection="control"
              v-model="dataObject.permissions"
              listStyle="height:3000px"
              dataKey="id"
            >
              <template #sourceheader> Available </template>
              <template #targetheader> Selected </template>
              <template #item="data">
                <div class="product-list-action">
                  <span
                    class="
                      mb-2
                      text-info
                      border border-info
                      rounded
                      text-10
                      p-1
                    "
                    >{{ data.item.name }}</span
                  >
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
        id: '',
        name: '',
        permissions: [[], []],
      },
      reqBody: {
        name: '',
        permissions: [[], []],
      },
      title: '',
      permissions: [],
      control: false,
      list: [
        {
          rating: 5,
        },
        {
          rating: 4,
        },
        {
          rating: 3,
        },
        {
          rating: 5,
        },
        {
          rating: 4,
        },
        {
          rating: 4,
        },
        {
          rating: 3,
        },
        {
          rating: 5,
        },
      ],
    }
  },
  watch: {
    editData: {
      handler(newVal) {
        if (Object.keys(newVal).length > 0) {
          this.dataObject.permissions[1] = newVal.permissions
          this.dataObject.name = newVal.name
          this.dataObject.id = newVal.id
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
    async callForData() {
      try {
        let permissions = await this.$api.users.getPermissions({ size: 1000 })
        this.dataObject.permissions[0] = permissions.results
      } catch {}
    },
    async save() {
      try {
        console.log('save')
        const data = await this.$api.users.createGroup({
          name: this.dataObject.name,
          permissions: this.dataObject.permissions[1],
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
        console.log('edit')
        const data = await this.$api.users.updateGroup(this.dataObject.id, {
          name: this.dataObject.name,
          permissions: this.dataObject.permissions[1],
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
      this.dataObject.permissions[1] = []
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