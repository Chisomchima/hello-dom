<template>
  <div>
    <!-- <BackwardNavigation text="Class" /> -->

    <UtilsHeaderCard
      :enableAction="false"
      :title="cardTitle"
      :data="data"
      :display-key="['grade', 'code', 'academic_year', 'location']"
    >
    </UtilsHeaderCard>

    <UtilsBaseCardTab>
      <UtilsCardTab
        v-for="(component, index) in componentsLoop"
        :key="index"
        :title="component.title"
      >
        <component
          :is="component.component"
          v-bind="component.props"
          :students="data.students"
          :subjects="data.subjects"
          :teachers="data.teachers"
        ></component>
      </UtilsCardTab>
    </UtilsBaseCardTab>
  </div>
</template>

<script>
import ClassStudents from '~/components/pages/administration/classes/classesStudents.vue'
import ClassTeachers from '~/components/pages/administration/classes/classesTeachers.vue'
import ClassesGradeBook from '~/components/pages/administration/classes/classesGradebook.vue'
import LmsClassesSubjects from '~/components/LmsClassesSubjects.vue'
import LmsClassesStudents from '~/components/LmsClassesStudents.vue'

import ClassesAttendance from '~/components/pages/administration/classes/classesAttendance.vue'
import ClassesClassBoard from '~/components/pages/administration/classes/classesClassBoard.vue'
import ClassesCommunications from '~/components/pages/administration/classes/classesCommunications.vue'
import ClassesLibrary from '~/components/pages/administration/classes/classesLibrary.vue'
import ClassesReportCard from '~/components/pages/administration/classes/classesReportCard.vue'
import ClassTimeTable from '~/components/ClassTimeTable.vue'

export default {
  components: {
    ClassStudents,
    ClassTeachers,
    ClassesGradeBook,
    ClassesAttendance,
    ClassesClassBoard,
    ClassesCommunications,
    ClassesLibrary,
    ClassesReportCard,
    ClassTimeTable,
    LmsClassesSubjects,
    LmsClassesStudents,
  },
  async asyncData({ $axios, route, store }) {
    const school = store.getters['school/getSchoolByCode'](route.params.id)

    const { data } = await $axios.$get(
      `./schools/v2/lms/class/${route.params.class}/`
    )
    data.location = data.hall
    return {
      headerActions: ['set_academic_year'],
      data,
      cardTitle: data.class_name,
      school,
    }
  },
  data() {
    return {
      key: 'value',
      componentsLoop: [
        {
          title: 'Attendance',
          component: 'ClassesAttendance',
        },
        { title: 'Class Board', component: 'ClassesClassBoard' },
        { title: 'Parent Communication', component: 'ClassesCommunications' },
        { title: 'Class Library', component: 'ClassesLibrary' },

        {
          title: 'Students',
          component: 'LmsClassesStudents',
        },
        {
          title: 'Subjects',
          component: 'LmsClassesSubjects',
        },

        {
          title: 'Time Table',
          component: 'ClassTimeTable',
          props: {
            readOnly: true,
          },
        },
        { title: 'Gradebook', component: 'ClassesGradeBook' },
        { title: 'Report Card', component: 'LmsClassReportCard' },
      ],
    }
  },
}
</script>

<style lang="scss" scoped></style>
