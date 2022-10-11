<template>
  <ModalWrapper
    id="verifyPassword"
    :title="modalTitle"
    @ok="ok()"
    @close="clear()"
    @hide="clear()"
    :persistent="true"
  >
    <ValidationObserver ref="form">
      <form>
        <div class="row">
          <div class="col-md-12 mb-2">
            <ValidationProviderWrapper name="Username" :rules="['required']">
              <input
                v-model="dataObject.username"
                type="text"
                class="form-control"
              />
            </ValidationProviderWrapper>
          </div>
          <div class="col-md-12 mb-2">
            <ValidationProviderWrapper
              name="Recovery password"
              :rules="['required']"
            >
              <input
                v-model="dataObject.recovery_password"
                type="text"
                autocomplete="off"
                class="form-control"
              />
            </ValidationProviderWrapper>
          </div>
          <div class="col-md-12 mb-2">
            <ValidationProviderWrapper
              name="New password"
              :rules="['required']"
            >
              <input
                v-model="dataObject.new_password"
                type="password"
                autocomplete="off"
                class="form-control"
              />
            </ValidationProviderWrapper>
          </div>
          <div class="col-md-12 mb-2">
            <ValidationProviderWrapper
              name="Confirm password"
              :rules="['required']"
            >
              <input
                v-model="dataObject.confirm_password"
                type="password"
                autocomplete="off"
                class="form-control"
              />
            </ValidationProviderWrapper>
          </div>
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
      default: () => 'Update password',
    },
  },
  data() {
    return {
      dataObject: {
        username: '',
        new_password: '',
        recovery_password: '',
        confirm_password: '',
      },
      title: '',
    }
  },
  computed: {
    username() {
      if (this.$store.state.username) {
        return this.$store.state.username
      }
    else{
        return ''
    }
    },
  },
  mounted() {
    this.dataObject.username = this.username
  },
  async created() {
    let groups = await this.$api.users.getGroups({ size: 1000 })
    this.groups = groups.results
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

  methods: {
    async ok() {
      if (await this.$refs.form.validate()) {
        this.save()
      }
    },
    async save() {
      try {
        const data = await this.$api.users.createUser(this.dataObject)
        this.$emit('refresh')
        this.$bvModal.hide('addUser')
      } catch (error) {
        console.log(error)
      }
    },

    clear() {
      this.dataObject = {
        username: '',
        new_password: '',
        recovery_password: '',
        confirm_password: '',
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>