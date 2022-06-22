<template>
  <UtilsFilterComponent @search-input="searchFilter = $event">
    <template #default="{ visualization }">
      <TableComponent
        v-if="visualization === 'list'"
        :fields="fields"
        :pages="1"
        :items="items"
        :filter="searchFilter"
        :busy="$fetchState.pending"
      >
        <template #status="{ data }">
          <span v-if="data.value === 'Not Started'" class="text-danger">{{
            data.value
          }}</span>
          <span v-if="data.value === 'Completed'" class="text-success">{{
            data.value
          }}</span>
        </template>
      </TableComponent>
      <div v-else class="row">
        <div
          v-for="(value, index) in items"
          :key="index"
          class="col-xl-3 col-lg-6 col-md-4 col-sm-6 mb-4"
        >
          <UtilsGridViewCard
            :data="value"
            :display-key="['name', 'name', 'started_lesson', 'status']"
          ></UtilsGridViewCard>
        </div>
      </div>
    </template>
  </UtilsFilterComponent>
</template>

<script>
import TableFunc from '~/mixins/TableCompFun' // Table component mixins
export default {
  mixins: [TableFunc],
  data() {
    return {
      searchFilter: '',
      fields: [
        {
          key: 'name'
        },
        { key: 'started_lesson' },
        { key: 'status' }
      ]
    }
  },
  async fetch() {
    const { data } = await this.$axios.$get(
      `./schools/v3/lesson/${this.$route.params.lesson}/progress/`
    )
    this.items = data
  },
  methods: {}
}
</script>

<style lang="scss" scoped></style>
