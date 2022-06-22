<template>
  <UtilsFilterComponent>
    <template #besideFilterButton>
      <BaseButton @click="routeToParams()">Add Subjects</BaseButton>
    </template>
    <template #default="{ visualization }">
      <TableComponent
        v-if="visualization === 'list'"
        :fields="fields"
        :pages="pages"
        :items="items"
        :busy="busy"
        @page-changed="pageChange"
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
            :display-key="['name', 'code', 'type', 'active']"
          ></UtilsGridViewCard>
        </div>
      </div>
    </template>
  </UtilsFilterComponent>
</template>

<script>
import { DateTime } from 'luxon'
import TableFunc from '~/mixins/TableCompFun' // Table component mixins

export default {
  mixins: [TableFunc],
  props: {
    school: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      fields: [
        { key: 'sequence', sortable: true, label: 'Sequence No' },
        { key: 'name', sortable: true },
        { key: 'code', sortable: true },
        { key: 'type', sortable: true },
        // {
        //   key: 'date_created',
        //   sortable: true,
        //   formatter: (value) => {
        //     return DateTime.fromISO(value).toFormat('DDD')
        //   }
        // },
        // { key: 'active', sortable: true }
      ],
    }
  },

  async mounted() {
    await this.pageChange(1)
  },
  methods: {
    async pageChange(page) {
      this.busy = true
      const data = await this.$axios.$get(
        `/slate-admin/school/${this.school.id}/subjects/?grade__exact=${this.$route.params.grade}&page=${page}`
      )
      this.items = data.data
      this.pages = data.pages
      this.busy = false
    },
    onRowClicked(e) {
      console.log(e)
      this.$router.push({
        name: 'sms-id-administration-configuration-grade-grade-subject-subject',
        params: {
          subject: e.id,
          // grade: this.$route.params.grade }
        },
        query: { _name: `${e.name}` },
      })
    },
    routeToParams() {
      this.$router.push({
        name: 'sms-id-administration-configuration-grade-grade-add',
        params: {
          grade: this.$route.params.grade,
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
