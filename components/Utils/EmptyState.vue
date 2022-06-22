<template>
  <div class="text-center mt-5">
    <img src="~/assets/lessons/svg/emptyState.svg" alt="Empty Lessons" />
    <p
      class="text-center mt-2"
      style="
        font-family: Brown;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: 16px;
        letter-spacing: 0em;
        text-align: left;
      "
    >
      {{ text }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
  },
}
</script>
