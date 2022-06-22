<template>
  <div class="row">
    <div v-if="false" class="col d-flex text-center justify-content-center">
      <b-spinner
        style="width: 3rem; height: 3rem"
        label="Large Spinner"
        variant="primary"
      ></b-spinner>
    </div>

    <template v-else>
      <UtilsMiniColorCard
        v-for="(item, index) in subjects"
        :key="index"
        :subject="item"
        :name="item.subject"
        :bg-color="item.icon_data.icon_bg_color"
        :color="item.icon_data.icon_font_color"
        :teacher="
          item.teachers.length > 0
            ? item.teachers[0].first_name + ' ' + item.teachers[0].last_name
            : '---'
        "
        :code="item.code"
        :lessons-count="item.lesson_count"
        :school-class="item.school_class"
        :grade-book-count="item.gradebook_count"
        :exercise-count="item.exercise_count"
        :others="['gradebook_count']"
        @click="routeTo(item)"
      >
        <template #others>
          <span class="content-text-small mb-1 text-capitalize">
            Gradbook Entries
          </span>
        </template>
      </UtilsMiniColorCard>
    </template>
    <!-- </template> -->
  </div>
</template>

<script>
import TableFunc from '~/mixins/TableCompFun' // Table component mixins
export default {
  mixins: [TableFunc],
  props: {
    subjects: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    routeTo(item) {
      this.$router.push({
        name: 'sms-id-lms-subjects-subject',
        params: {
          subject: item.id,
        },
        query: { _name: `${item.name}` },
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
