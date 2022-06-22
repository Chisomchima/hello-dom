<template>
  <ComingSoon />
</template>

<script>
import longDiv from "~/components/lms/longDiv.vue";
import SigninFooter from "~/components/Layout/Auth/signinFooter.vue";

export default {
  components: { longDiv, SigninFooter },
  data() {
    return {
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
</style>
