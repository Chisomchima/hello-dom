<template>
  <ModalWrapper
    id="verifyPassword"
    :title="modalTitle"
    :submitTitle="`Update`"
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
              <BaseInput v-model="dataObject.new_password" type="password" />
            </ValidationProviderWrapper>
          </div>
          <div class="col-md-12 mb-2">
            <ValidationProviderWrapper
              name="Confirm password"
              :rules="['required']"
            >
              <BaseInput
                v-model="dataObject.confirm_password"
                type="password"
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
      console.log(this.$store.state.auth.user.username)
      return this.$store.state.auth.user.username
    },
  },
  mounted() {
    this.dataObject.username = this.username
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
      if (this.dataObject.new_password === this.dataObject.confirm_password) {
        try {
          const data = await this.$api.users.verifyPassword(this.dataObject)
          if (data.token) {
            await this.$store.dispatch('auth/verifyAndUpdate', data.token)
            this.$bvModal.hide('verifyPassword')
            this.$router.push('/dashboard')
          }
        } catch (error) {}
      } else {
        this.$toast({
          type: 'info',
          text: `Password do not match`,
        })
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