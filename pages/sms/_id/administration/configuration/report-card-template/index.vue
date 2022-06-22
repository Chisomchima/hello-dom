<template>
  <div>
    <div class="d-flex align-items-center justify-content-between mb-4">
      <div class="page-heading">Report Card Templates</div>
      <div>
        <a
          v-role="'admin'"
          class="btn btn-primary py-2 px-3"
          @click.prevent="toRoute()"
          >New Template</a
        >
      </div>
    </div>

    <UtilsFilterComponent disable-visualization>
      <template #default="{ visualization }">
        <TableComponent
          v-if="visualization === 'list'"
          :fields="fields"
          :pages="pages"
          :items="items"
          :busy="busy"
          disable-edit-action
          @page-changed="pageChange"
          @row-clicked="onRowClicked"
          @delete="deleteItem($event)"
        />
        <div v-else class="row">
          <div
            v-for="(value, index) in items"
            :key="index"
            class="col-xl-3 col-lg-6 col-md-4 col-sm-6 mb-4"
          >
            <UtilsGridViewCard
              :data="value"
              :display-key="['name', 'name', 'date_start', 'date_end']"
            ></UtilsGridViewCard>
          </div>
        </div>
      </template>
    </UtilsFilterComponent>
  </div>
</template>

<script>
import { DateTime } from 'luxon'
import TableFunc from '~/mixins/TableCompFun' // Table component mixins
export default {
  mixins: [TableFunc],
  data() {
    return {
      fields: [
        {
          key: 'name',
        },
        {
          key: 'created_on',
          formatter: (value) => {
            return DateTime.fromISO(value).toFormat('DDD')
          },
        },
        {
          key: 'actions',
        },
      ],
    }
  },
  mounted() {
    this.pageChange(1)
  },
  methods: {
    onRowClicked(item) {
      console.log(item)

      this.$router.push({
        name: 'sms-id-administration-configuration-report-card-template-edit-template',
        params: { template: item.id },
        query: { _name: `${item.name}` },
      })
    },
    async pageChange(page) {
      const school = this.$store.getters['school/getSchoolByCode'](
        this.$route.params.id
      )
      this.busy = true
      const data = await this.$axios.$get(
        `/slate-admin/school/${school.id}/card_templates/?page=${page}`
      )

      this.items = data.data
      this.pages = data.pages
      this.busy = false
    },

    toRoute() {
      this.$router.push({
        name: 'sms-id-administration-configuration-report-card-template-create',
      })
    },
    async deleteItem(e) {
      try {
        if (await this.showDeleteMessageBox()) {
          await this.$axios.$delete(`/slate-admin/card_template/${e.id}/`)
          await this.pageChange(1)
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
