<template>
  <div>
    <UtilsFilterComponent
      disable-visualization
      @search-input="pageChange(1, $event)"
    >
      <template #besideFilterButton>
        <BaseButton class="btn-primary" @click="$bvModal.show('modal')"
          >Add Template</BaseButton
        >
      </template>
      <template #default="{ visualization }">
        <TableComponent
          v-if="visualization === 'list'"
          :fields="fields"
          :pages="pages"
          :items="items"
          :busy="busy"
          @page-changed="pageChange"
        >
        </TableComponent>
      </template>
    </UtilsFilterComponent>
    <ReportTemplateLinkModal @refresh="refreshPage" />
  </div>
</template>

<script>
// import { DateTime } from 'luxon'
import TableFunc from '~/mixins/TableCompFun' // Table component mixins
import modalMsgBox from '@/mixins/modalMsgBox'

export default {
  mixins: [TableFunc, modalMsgBox],
  data() {
    return {
      fields: [
        // { key: 'sequence', sortable: true, label: 'Sequence No' },
        { key: 'name', sortable: true },
        { key: 'actions', sortable: true },
      ],
    }
  },
  async mounted() {
    await this.pageChange(1)
  },
  methods: {
    refreshPage() {
      this.pageChange()
    },
    async pageChange(page = 1, search = '') {
      try {
        this.busy = true
        const data = await this.$axios.$get(
          `/slate-admin/class/${this.$route.params.class}/card_templates/?page=${page}&search=${search}&param=all`
        )
        this.items = data.data
        this.pages = data.pages
        this.busy = false
      } catch (error) {
        this.busy = false
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
