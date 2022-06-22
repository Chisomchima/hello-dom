<template>
  <div>
    <UtilsFilterComponent disable-visualization>
      <!-- <template #besideFilterButton>
        <BaseButton class="btn-borderless-primary">New Lesson</BaseButton>
      </template> -->
      <template>
        <TableComponent
          :fields="fields"
          :items="items"
          :busy="busy"
          :pages="1"
          @page-changed="pageChange"
          @row-clicked="onRowClicked"
        >
        </TableComponent>
      </template>
    </UtilsFilterComponent>
  </div>
</template>

<script>
// import { DateTime } from 'luxon'
import { isEqual } from 'lodash'
import TableFunc from '~/mixins/TableCompFun' // Table component mixins

export default {
  mixins: [TableFunc],
  data() {
    return {
      items: [],
      offlineData: [],
      fields: [
        // { key: 'sequence', sortable: true, label: 'Sequence No' },
        { key: 'lesson.name', sortable: true, label: 'Name' },
        { key: 'lesson.week.week_name', sortable: true, label: 'Week' },
        // // { key: 'description', sortable: true },
        {
          key: 'lesson.available_date',
          sortable: true,
          label: 'Available Date',
          //   formatter: (value) => {
          //     return DateTime.fromSQL(value).toFormat('DDD')
          //   },
        },
        // { key: 'state', label: 'status', sortable: true },
      ],
    }
  },
  async mounted() {
    this.busy = true

    const dataFromDexie = await this.$dexie.formData
      .filter((pageData) => {
        if (
          pageData.page === 'sms-id-lms-subjects-subject-lesson-add' &&
          isEqual(pageData.params, this.$route.params)
        ) {
          return pageData
        }
        return false
      })
      .toArray()

    // const dataFromDexie = await this.$dexie.formData
    //   .where('page')
    //   .equalsIgnoreCase('sms-id-lms-subjects-subject-lesson-add')
    //   .toArray()

    this.items = dataFromDexie.map((item) => ({
      id: item.id,
      ...item.data,
    }))
    this.busy = false

    // this.offlineData = JSON.parse(this.items.data)
  },
  methods: {
    onRowClicked(e) {
      this.$router.push({
        name: 'sms-id-lms-subjects-subject-lesson-add',
        // params: {
        //   subject: this.$route.params.subject,
        //   lesson: e.id,
        // },
        query: { _name: `${e.lesson.name}`, local_draft_id: e.id },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
</style>