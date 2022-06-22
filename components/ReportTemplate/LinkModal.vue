<template>
  <ModalWrapper
    not-scrollable
    title="Add Report Template"
    @show="getTemplates()"
    @ok="handleOk"
  >
    <form @submit.stop.prevent="handleSubmit">
      <div class="form-group">
        <ValidationProviderWrapper
          name="Report Card Template"
          :rules="['required']"
        >
          <VSelect v-model="templateSelected" :options="templates" label="name"></VSelect>
        </ValidationProviderWrapper>
      </div>
    </form>
  </ModalWrapper>
</template>

<script>
export default {
  data() {
    return {
      templates: [],
      templateSelected:{}
    }
  },
  methods: {
    async getTemplates() {
      try {
        const school = this.$store.getters['school/getSchoolByCode'](
          this.$route.params.id
        )
        const { data } = await this.$axios.$get(
          `slate-admin/school/${school.id}/card_templates/?paginate=false`
        )
        this.templates = data
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    },
    handleOk(e) {
      try {
        e.preventDefault()
       const data = this.$axios.$post(
          `./slate-admin/class/${this.$route.params.class}/card_templates/`,{
              template_id: this.templateSelected.id
          }
        );
        this.$bvModal.hide('modal');
        this.templateSelected = {};
        this.$emit('refresh');
        console.log(data)
      } catch (error) {}
    },
  },
}
</script>

<style lang="scss" scoped></style>
