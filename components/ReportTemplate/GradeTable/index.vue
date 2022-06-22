<template>
  <b-table-simple bordered responsive>
    <b-thead>
      <b-tr>
        <b-th class="p-4">Subject</b-th>
        <template v-for="(col, index2) in columns">
          <b-th
            v-if="col.type === 'entry'"
            :key="index2"
            class="text-center p-4"
            >{{ col.name }}({{ col.scale_score }})</b-th
          >
          <b-th v-else :key="index2" class="text-center p-4">{{
            col.name
          }}</b-th>
        </template>
      </b-tr>
    </b-thead>
    <b-tbody>
      <b-tr v-for="(item, index) in items" :key="index">
        <b-td class="p-4">{{ item.subject_details.name }}</b-td>
        <!-- <b-td
          v-for="(grade, index2) in item.student_subject_scores"
          class="text-center p-4 pointer"
          :key="index2"
          >{{ grade.student_score }}</b-td
        > -->
        <template v-for="(grade, index2) in item.student_subject_scores">
          <ReportTemplateGradeTableEntryColumn
            v-if="grade.type === 'entry'"
            :key="index2"
            :value="grade.student_score"
            :max="grade.scale_score"
            @change="
              $emit('change', {
                subjectIndex: index,
                subjectScoreIndex: index2,
                value: $event,
              })
            "
          />

          <ReportTemplateGradeTableCommentColumn
            v-else-if="grade.type === 'comment'"
            :key="index2"
            :disable="enableInput"
            :value="grade.student_score"
            @change="
              $emit('change', {
                subjectIndex: index,
                subjectScoreIndex: index2,
                value: $event,
              })
            "
          />

          <b-td v-else :key="index2" class="text-center p-4 pointer">{{
            grade.student_score
          }}</b-td>
        </template>
      </b-tr>
      <!-- <b-tr>
        <b-th>The Netherlands</b-th>
        <b-td>77</b-td>
        <b-td variant="success">89</b-td>
        <b-td>34</b-td>
        <b-td>69</b-td>
        <b-td>85</b-td>
      </b-tr> -->
    </b-tbody>
  </b-table-simple>
</template>

<script>
export default {
  props: {
    enableInput: {
      type: String,
      required: true,
    },
    columns: {
      type: Array,
      default: () => [],
    },
    items: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style scoped></style>
