<template>
  <div>
    <!-- <BackwardNavigation text="Report Card" /> -->

    <UtilsHeaderCard
      :title="cardTitle"
      :data="data"
      :display-key="[
        'grade',
        'class',
        'form_teacher',
        'academic_year',
        'academic_period',
        'report_card_template_name',
      ]"
    >
    </UtilsHeaderCard>

    <UtilsFilterComponent>
      <template #default="{ visualization }">
        <TableComponent
          v-if="visualization === 'list'"
          :fields="fields"
          :items="items"
          @row-clicked="onRowClicked"
        />
        <div v-else class="row">
          <div
            v-for="(value, index) in items"
            :key="index"
            class="col-xl-3 col-lg-6 col-md-4 col-sm-6 mb-4"
          >
            <UtilsGridViewCard
              :data="value"
              :display-key="['first_name', 'last_name', 'gender', 'status']"
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
  async asyncData({ route, $axios }) {
    // const school = store.getters['school/getSchoolByCode'](route.params.id)
    const { data } = await $axios.$get(
      `./schools/v2/report_card/batch/${route.params.report_card}/`
    )

    // set current academic year as default

    return {
      data,
      items: data.students,
      cardTitle: data.name,
    }
    // console.log(data)
  },
  data() {
    return {
      stg: 'value',
      fields: [
        {
          key: 'first_name',
          sortable: true,
        },
        { key: 'last_name', label: 'Surname', sortable: true },
        { key: 'gender', sortable: true },
        { key: 'status', sortable: true },
      ],
    }
  },
  mounted() {},
  methods: {
    onRowClicked(e) {
      console.log(e)

      this.$router.push({
        name: 'sms-id-administration-configuration-report-card-report_card-student-student',
        params: {
          student: e.class_student_id,
          report_card: this.$route.params.report_card,
          id: this.$route.params.id,
        },
      })
      // ;('sms-id-administration-configuration-report-card-report_card-student')
    },
  },
}
</script>

<style lang="scss" scoped></style>
