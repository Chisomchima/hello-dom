<template>
  <div style="display: flex; flex-wrap: nowrap">
    <div style="background: #ebf4f9; margin-right: 10px">
      <div
        style="width: 576px; height: 220px"
        class="d-flex justify-content-between"
      >
        <div style="margin-left: 30px; margin-top: 53px; font-size: 20px">
          <p style="color: #312f4e; opacity: 0.9; margin-bottom: 0">
            You have
            <span style="color: #44afff">{{ newLessons }}</span>
            new lessons<br />and
            <span style="color: #44afff">{{ newExercises }}</span>
            Exercises.
          </p>
          <p
            style="
              color: #312f4e;
              opacity: 0.9;
              margin-bottom: 0;
              margin-top: 20px;
              font-size: 14px;
              white-space: nowrap;
            "
          >
            Keep up the good work and get learning!
          </p>
        </div>
        <img
          :src="
            require(`~/assets/img/welcome${
              gender == 'male' ? 'boy' : 'girl'
            }.svg`)
          "
          alt=""
          class="img-fluid"
        />
      </div>
    </div>

    <!-- <div style="border-radius: 8px; margin-right: 10px; position: relative">
      <p
        style="
          position: absolute;
          z-index: 1;
          bottom: 16px;
          color: #fff;
          width: 100%;
          margin: 0;
        "
        class="text-center"
      >
        School Excursion to the central park and zoo.
      </p>
      <img src="/img/horse_rider.png" alt="" />
    </div> -->
    <!-- <div style="border-radius: 8px">
      <img src="/img/horse_rider.png" alt="" />
    </div> -->
    <!-- <div
      style="
        background: #ebf4f9;
        width: 576px;
        height: 220px;
        margin-right: 10px;
      "
    >
      <div style="width: 600px"></div>
    </div> -->
  </div>
</template>

<script>
export default {
  props: ['gender'],
  computed: {
    newLessons() {
      if (this.$store.state.student.classDetails.student_notification_card) {
        return this.$store.state.student.classDetails.student_notification_card.count_lessons.toLocaleString()
      } else {
        return '...'
      }
    },
    newExercises() {
      if (this.$store.state.student.classDetails.student_notification_card) {
        return this.$store.state.student.classDetails.student_notification_card.count_exercises.toLocaleString()
      } else {
        return '...'
      }
    },
  },
}
</script>
