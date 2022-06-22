<template>
  <div>
    <UtilsFilterComponent>
      <template #besideFilterButton>
        <BaseButton @click="$bvModal.show('modal')">Add Category</BaseButton>
      </template>
      <template #default="{ visualization }">
        <TableComponent
          v-if="visualization === 'list'"
          :items="items"
          :fields="fields"
          :busy="busy"
          @row-clicked="onRowClicked"
        ></TableComponent>

        <div v-else class="row">
          <div
            v-for="(value, index) in items"
            :key="index"
            class="col-xl-3 col-lg-6 col-md-4 col-sm-6 mb-4"
          >
            <UtilsGridViewCard
              :data="value"
              :display-key="[
                'name',
                'name',
                'number_of_subjects',
                'number_of_subjects'
              ]"
            ></UtilsGridViewCard>
          </div>
        </div>
      </template>
    </UtilsFilterComponent>

    <b-modal
      id="modal"
      title="Add Category"
      centered
      ok-title="Save"
      @ok="handleOk"
    >
      <ValidationObserver ref="form">
        <form @submit.stop.prevent="handleSubmit">
          <div class="form-group">
            <ValidationProviderWrapper
              name="Name"
              :rules="['required']"
              label="Name"
            >
              <BaseInput v-model="category.name"></BaseInput>
            </ValidationProviderWrapper>
          </div>

          <div class="form-group">
            <ValidationProviderWrapper
              :name="'Sequence'"
              :rules="['required']"
              :label="'Sequence'"
            >
              <BaseInput v-model="category.sequence"></BaseInput>
            </ValidationProviderWrapper>
          </div>
        </form>
      </ValidationObserver>
    </b-modal>
  </div>
</template>

<script>
import TableFunc from '~/mixins/TableCompFun' // Table component mixins

export default {
  mixins: [TableFunc],
  props: {
    school: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      category: {
        name: '',
        sequence: ''
      },
      fields: [
        { key: 'name', sortable: true },
        { key: 'number_of_subjects', sortable: true }
      ]
    }
  },

  async mounted() {
    await this.getCategories()
  },
  methods: {
    async getCategories() {
      this.busy = true
      const { data } = await this.$axios.$get(
        `/slate-admin/grade/${this.$route.params.grade}`
      )
      const items = []
      for (const property in data.categories) {
        const object = {
          name: property,
          number_of_subjects: data.categories[property].length
        }
        items.push(object)
      }
      this.items = items
      this.busy = false
    },
    onRowClicked(e) {
      console.log(e)
    },
    resetForm() {
      this.category = {}
    },
    async checkFormValidity() {
      const result = await this.$refs.form.validate()
      return result
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    async handleSubmit() {
      // Exit when the form isn't valid
      const result = await this.checkFormValidity()
      if (!result) {
        return
      }
      try {
        await this.$axios.$post(
          `./slate-admin/school/${this.school.id}/subject/category/`,
          {
            grade_level_id: this.$route.params.grade,
            ...this.category
          }
          // this.category
        )
        this.resetForm()
        await this.getCategories()
        // Hide the modal manually
        this.$nextTick(() => {
          this.$refs.form.reset()
          this.$bvModal.hide('modal')
        })
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
