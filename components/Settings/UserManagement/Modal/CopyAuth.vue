<template>
  <ModalWrapper
    :size="`md`"
    id="copyAuth"
    :title="modalTitle"
    :cancelText="'Close'"
    :submitTitle="`Copy`"
    :arrangement="true"
    @ok="copyText()"
  >
    <ValidationObserver ref="form">
      <form>
        <div class="row">
          <div class="col-md-12 mb-2 text-center">
            <pre>Username: {{ person.username }}</pre>
            <pre>Email: {{ person.email }}</pre>
            <pre
              @click="copyText()"
            >Code: <span class="text-info point hov">{{person.recovery_password}}</span></pre>
          </div>
        </div>
      </form>
    </ValidationObserver>
  </ModalWrapper>
</template>

<script>
export default {
  props: {
    modalTitle: {
      type: String,
      require: true,
      default: () => 'Copy authentication code',
    },
    user: {
      type: Object,
      require: true,
      default: () => {},
    },
  },
  watch: {
    user() {
      this.person = this.user
    },
  },
  data() {
    return {
      dataObject: {
        name: '',
        permissions: [],
      },
      title: '',
      password: '',
      person: {},
    }
  },
  async created() {
    let permissions = await this.$api.users.getPermissions({ size: 1000 })
    this.permissions = permissions.results
  },
  methods: {
    copyText() {
      navigator.clipboard.writeText(this.person.recovery_password)
      this.$toast({
        type: 'info',
        text: `Copied`,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
hov:hover {
  text-color: $COLOR_ONE;
}
</style>