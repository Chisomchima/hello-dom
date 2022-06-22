<template>
  <UtilsFilterComponent
    disable-visualization
    @search-input="pageChange(1, $event)"
  >
    <template #besideFilterButton>
      <BaseButton class="btn-borderless-primary" @click="routeToParams()"
        >New Lesson</BaseButton
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
        @row-clicked="onRowClicked"
      >
        <template #state="{ data }">
          <ToggleSwitchButton
            :value="data.value === 'published' ? true : false"
            @change="publish($event, data.item.id)"
          />
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
import modalMsgBox from '@/mixins/modalMsgBox'

export default {
  mixins: [TableFunc, modalMsgBox],
  data() {
    return {
      fields: [
        // { key: 'sequence', sortable: true, label: 'Sequence No' },
        { key: 'name', sortable: true },
        { key: 'week', sortable: true },
        // { key: 'description', sortable: true },
        {
          key: 'available_date',
          sortable: true,
          formatter: (value) => {
            return DateTime.fromSQL(value).toFormat('DDD')
          },
        },
        { key: 'state', label: 'status', sortable: true },
      ],
    }
  },

  async mounted() {
    await this.pageChange(1)
  },
  methods: {
    async pageChange(page, search = '') {
      try {
        this.busy = true
        const data = await this.$axios.$get(
          `/schools/v2/class_subject/${this.$route.params.subject}/lesson/?page=${page}&search=${search}&param=all`
        )
        this.items = data.data
        this.pages = data.pages
        this.busy = false
      } catch (error) {
        console.log(error)
        this.busy = false
      }
    },
    onRowClicked(e) {
      console.log(e)
      this.$router.push({
        name: 'sms-id-lms-subjects-subject-lesson-lesson',
        params: { lesson: e.id },
        query: { _name: `${e.name}` },
      })
    },
    routeToParams() {
      this.$router.push({
        name: 'sms-id-lms-subjects-subject-lesson-add',
        // params: {
        //   grade: this.$route.params.grade
        // }
      })
    },

    async publish(event, id) {
      const result = await this.showConfirmMessageBox(
        'Are you sure you want to publish this lesson?'
      )
      if (result) {
        try {
          if (event) {
            await this.$axios.$put(`schools/v3/lesson/${id}/draft/publish/`)
          } else {
            await this.$axios.$get(`schools/v3/lesson/${id}/unpublish/`)
          }
          await this.pageChange(1)
        } catch (error) {
          console.log(error)
          this.pageChange(1)
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>

<style lang="scss" scoped></style>
