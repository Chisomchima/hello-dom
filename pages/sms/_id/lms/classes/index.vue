<template>
  <div>
    <div class="d-flex align-items-center justify-content-between mb-4">
      <div class="page-heading mb-2 mr-2">Classes</div>
      <!-- <div class="d-flex align-items-center mb-2">
        <div class="mr-2">
          <BaseButton class="py-2 px-3" @click="$bvModal.show('modal')"
            ><span class="iconify" data-icon="bi:house"></span> Add
            House</BaseButton
          >
        </div>
      </div> -->
    </div>

    <UtilsFilterComponent @search-input="pageChange(1, $event)">
      <template #default="{ visualization }">
        <!-- {{ $fetchState.pending }} -->
        <TableComponent
          v-if="visualization === 'list'"
          :fields="fields"
          :pages="pages"
          :busy="busy"
          :items="items"
          @page-changed="pageChange($event)"
          @row-clicked="onRowClicked"
        >
        </TableComponent>
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
                'level',
                'students_count',
                'subjects_count',
              ]"
            ></UtilsGridViewCard>
          </div>
        </div>
      </template>
    </UtilsFilterComponent>
  </div>
</template>

<script>
import TableFunc from '~/mixins/TableCompFun' // Table component mixins
export default {
  mixins: [TableFunc],
  data() {
    return {
      fields: [
        {
          key: 'name',
          label: 'Name',
        },
        { key: 'level', label: 'Grade' },
        { key: 'students_count', label: 'Students' },
        { key: 'subjects_count', label: 'Subjects' },
      ],
    }
  },
  mounted() {
    this.pageChange(1)
  },
  methods: {
    async pageChange(page, search) {
      this.busy = true
      const data = await this.$axios.$get(
        `/schools/v2/lms/${this.$store.state.school.currentAcademicYear.id}/classes/?page=${page}&search=${search}&param=all`
      )
      this.items = data.data
      this.pages = data.pages
      this.busy = false
    },
    onRowClicked(item) {
      console.log(item)
      this.$router.push({
        name: 'sms-id-lms-classes-class',
        params: { class: item.id },
        query: { _name: `${item.name}` },
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
