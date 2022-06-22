<template>
  <div
    style="cursor: pointer"
    class="bg-white rounded p-3 my-3"
    @click="
      goToStudent(
        children.admission_id,
        children.school_class_id,
        children.class_student_id
      )
    "
  >
    <div class="d-flex align-items-center">
      <img
        v-if="children.image"
        class="img-fluid rounded-circle childrenimg"
        :src="children.image"
      />

      <img
        v-else
        class="img-fluid rounded-circle childrenimg"
        :src="
          require(`~/assets/img/${
            children.gender === 'male' ? 'male' : 'female'
          }-young.jpeg`)
        "
      />

      <p class="fs-16 bold ml-5">{{ children ? children.name : '' }}</p>
    </div>

    <div class="mt-3">
      <div class="lightbluebg rounded p-3 my-2">
        <div class="d-flex justify-content-between">
          <p class="lightparagraph blue mb-0 width40">Class</p>

          <span class="border-right blue"></span>

          <p class="lightparagraph mb-0 width40">
            {{ children ? children.grade_level : '' }}
          </p>
        </div>
      </div>
      <div class="lightbluebg rounded p-3 my-2">
        <div class="d-flex justify-content-between">
          <p class="lightparagraph blue mb-0 width40">Gender</p>

          <span class="border-right blue"></span>

          <p class="lightparagraph mb-0 text-capitalize width40">
            {{ children ? children.gender : '' }}
          </p>
        </div>
      </div>
      <div class="lightbluebg rounded p-3 my-2">
        <div class="d-flex justify-content-between">
          <p class="lightparagraph blue mb-0 width40">Class Teacher</p>

          <span class="border-right blue"></span>

          <p class="lightparagraph mb-0 width40">
            {{
              children.form_teacher
                ? children.form_teacher.length > 14
                  ? children.form_teacher.slice(0, 14) + '...'
                  : children.form_teacher
                : ''
            }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['children'],
  methods: {
    goToStudent(admissionid, classid, studentidentity) {
      console.log(studentidentity)
      this.$router.push({
        name: 'parent-id-students-student-studentid-gradebook',
        params: {
          id: this.$route.params.id,
          students: admissionid,
          student: classid,
          studentid: studentidentity,
        },
      })

      console.log(this.$route)
    },
  },
}
</script>

<style scoped>
.lightbluebg {
  background: #f2f8fd;
}

.childrenimg {
  height: 48px;
  width: 48px;
}

.width40 {
  width: 40%;
}

.lightparagraph.blue {
  color: #45607c;
}

.lightparagraph {
  font-family: Brown;
  font-size: 14px;
  font-weight: 400;
  line-height: 13px;
  letter-spacing: -0.5px;
}
</style>
