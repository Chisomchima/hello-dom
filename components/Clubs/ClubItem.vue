<template>
  <div class="col-xl-4 col-lg-6 col-md-6 mb-3">
    <div
      class="
        bg-grayish-blue
        border border-gray
        rounded
        overflow-hidden
        font-family_brown
        line-height-100p
        d-block
        pointer
      "
    >
      <div>
        <img
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
          class="w-100 object-fit-cover"
          height="128"
        />
      </div>
      <div class="px-3 py-3">
        <div class="text-truncate text-dark font-weight-bold mb-3">
          {{ club.name }}
        </div>
        <div class="fs-14">
          <div class="mb-2">
            <span class="text-light">Spots:</span>
            <span class="text-dark"
              >{{ club.students_enrolled }}/{{ club.student_limit }}</span
            >
          </div>
          <div class="mb-2">
            <span class="text-light">Club Days:</span>
            <span class="text-dark">3</span>
          </div>
          <div class="">
            <span class="text-light">Instructor:</span>
            <span class="text-primary">Honest Onah</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClubItem',
  props: {
    club: {
      type: Object,
      required: true,
    },
  },
}
</script>
