<template>
  <div class="d-flex align-items-center justify-content-between flex-wrap mb-4">
    <div class="filter-wrapper mr-2">
      <div class="search-input student-filter-input">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          focusable="false"
          width="1em"
          height="1em"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 32 32"
          class="iconify icon"
          data-inline="false"
          data-icon="carbon:search"
          style="transform: rotate(360deg)"
        >
          <path
            d="M29 27.586l-7.552-7.552a11.018 11.018 0 1 0-1.414 1.414L27.586 29zM4 13a9 9 0 1 1 9 9a9.01 9.01 0 0 1-9-9z"
            fill="currentColor"
          ></path>
        </svg>
        <input
          type="text"
          class="form-control rounded-pill w-100"
          placeholder="Search "
        />
      </div>
    </div>
    <div class="d-flex align-items-center">
      <div class="font-family_brown fs-14 text-black">Sort by:</div>
      <div class="student-filter-input ml-2">
        <select class="form-control">
          <option>Newest to Oldest</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>
