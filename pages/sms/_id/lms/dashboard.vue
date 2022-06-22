<template>
  <ComingSoon />
</template>

<script>
import axios from "axios";
import longDiv from "~/components/lms/longDiv.vue";
import SigninFooter from "~/components/Layout/Auth/signinFooter.vue";

import LMS from "~/mixins/lms";
export default {
  mixins: [LMS],
  components: { longDiv, SigninFooter },
  data() {
    return {
      questions: [],
      courses: [
        {
          time: "june",
        },
        {
          time: "july",
        },
        {
          time: "august",
        },
        {
          time: "October",
        },
        {
          time: "December",
        },
      ],
    };
  },
  created() {
    // this.getDashboard()
  },

  methods: {
    async getDashboard() {
      const store = this.$store.state.administration.school.id;
      const slate_exercise_id = "fe46ab53-2fdb-4242-b877-5b74d0c0e5e5";

      console.log("from store", store);
      const axiosrequest1 = this.$axios.get(
        `/quiz/v2/quiz_config/${slate_exercise_id}/students/`
      );
      const axiosrequest2 = this.$axios.get(
        "quiz/v3/9c2222c4-a3fd-4a22-886f-c1e2185b37d2/student/quizzes/list/?status=all&page=2"
      );
      // you could also use destructuring to have an array of responses
      await axios.all([axiosrequest1, axiosrequest2]).then(
        axios.spread(function (res1, res2) {
          console.log("first", res1);
          console.log("second", res2);
        })
      );

      try {
        const { data, status } = await this.$axios.get(
          `/quiz/v2/quiz_config/${slate_exercise_id}/students/`
        );

        // const response = await this.$axios.get(`/schools/v2/lms/${store}/dashboard/`)
        if ((status === 200) | 2001) {
          console.log("quiz", data.data.quiz_details.quiz_meta_data.sections);

          data.data.quiz_details.quiz_meta_data.sections.map((section) => {
            section.questions.map((quiz) => {
              this.questions.push(quiz.text);
              // console.log(quiz.text)
            });
          });
          console.log("questions", this.questions);
          // data.data.schools.map((school) => {
          //   school.data.map((single)=>{
          //     this.schools.push(single)
          //   })
          // })
          // console.log('local dashboard',this.schools)
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
.first {
  background-color: #5096f1;
  max-width: 32%;
}
.second {
  background-color: #161e40;
  max-width: 32%;
}
.fourth {
  background-color: #eeb35b;
  max-width: 32%;
}
.overall_container {
}
.sidebar_container {
}

.no-arrow::before {
  display: none !important;
}
.no-arrow::after {
  display: none;
}
.overall_container {
  background-color: #e6e8e9;
}
.rounded-row {
  border-radius: 20px;
}
.layout {
  display: grid;
  grid-template-columns: 3fr 12fr;
  gap: 0;
}

@media screen and (max-width: 996px) {
  .main_container.mobile {
    /* width: var(--sidebar-width); */

    margin-left: 0px !important;
  }
}
</style>
