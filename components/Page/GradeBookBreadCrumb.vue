<template>
  <div>
    <div
      class="
        filter-wrapper
        d-flex
        flex-wrap
        align-items-center
        justify-content-between
        mb-4
      "
    >
      <div class="page-back-navigation mb-1 mb-md-0">
        <a href="#" @click.prevent="removeQuery()">
          <span class="pr-1">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.8337 10H4.16699"
                stroke="#1070B7"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10.0003 15.8334L4.16699 10L10.0003 4.16671"
                stroke="#1070B7"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
          <span>Subject List</span>
          <span class="mx-2"
            ><span
              class="iconify"
              data-inline="false"
              data-icon="fluent:chevron-right-16-filled"
              style="height: 15px; width: 15px; color: #8f9aa3"
            ></span
          ></span>
          <span class="text-dark">{{
            $route.query.grade_book_subject_name
          }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    removeQuery() {
      const query = Object.assign({}, this.$route.query)
      delete query.grade_book_subject
      delete query.grade_book_subject_name
      this.$router.replace({ query })
    }
  }
}
</script>

<style lang="scss" scoped></style>
