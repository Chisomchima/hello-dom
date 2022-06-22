<template>
  <div>
    <div v-if="status != 'approved'" class="text-right mb-3" style="margin-top: -0.5rem">
      <!-- <button class="btn btn-primary py-2 px-3">Save Entry</button> -->
      <BaseButton
        watch-request
        class="btn pointer d-inline-flex align-content-center"
        @click="$emit('sync')"
      >
        <!-- <div class="mr-1 line-height-0">
          <span class="iconify fs-16" data-icon="fa-solid:sync-alt"></span>
        </div> -->
        <strong class="fs-14 px-2">Sync Grades</strong>
      </BaseButton>
    </div>
    <div>
      <ReportTemplateGradeTable :enable-input="status != 'approved'" :columns="reportColumns" :items="report" @change="$emit('change',$event)" />
    </div>
  </div>
</template>

<script>
import TableFunc from '~/mixins/TableCompFun' // Table component mixins
export default {
  mixins: [TableFunc],
  props: {
    report: {
      type: Array,
      required: true,
    },
    reportColumns: {
      type: Array,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      fields: [
        {
          key: 'subject_details.name',
        },
        {
          key: 'student_subject_scores',
        },
      ],
    }
  },
  methods: {
    logger(index,index2,values) {
      console.log(index,index2,values)
    },
  },
}
</script>

<style lang="scss" scoped></style>
