<template>
  <div>
    <div
      class="filter-wrapper d-flex flex-wrap align-items-center justify-content-between"
    >
      <div
        class="d-flex align-items-center justify-content-between justify-content-md-start flex-wrap"
      >
        <div class="mr-2">
          <div class="display-toggle">
            <div class="icon-wrapper" :class="{ active: isActive }" @click="toggleGrid">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.75497 6.39903H1.22682C0.861993 6.39903 0.583008 6.12004 0.583008 5.75521V1.22706C0.583008 0.862237 0.861993 0.583252 1.22682 0.583252H5.75497C6.1198 0.583252 6.39878 0.862237 6.39878 1.22706V5.75521C6.39878 6.12004 6.1198 6.39903 5.75497 6.39903ZM1.87063 5.1114H5.11116V1.87088H1.87063V5.1114Z"
                  fill="#8F9AA3"
                />
                <path
                  d="M5.75497 13.4165H1.22682C0.861993 13.4165 0.583008 13.1375 0.583008 12.7727V8.24452C0.583008 7.87969 0.861993 7.60071 1.22682 7.60071H5.75497C6.1198 7.60071 6.39878 7.87969 6.39878 8.24452V12.7727C6.39878 13.1375 6.1198 13.4165 5.75497 13.4165ZM1.87063 12.1289H5.11116V8.88833H1.87063V12.1289Z"
                  fill="#8F9AA3"
                />
                <path
                  d="M12.7725 6.39903H8.2444C7.87957 6.39903 7.60059 6.12004 7.60059 5.75521V1.22706C7.60059 0.862237 7.87957 0.583252 8.2444 0.583252H12.7725C13.1374 0.583252 13.4164 0.862237 13.4164 1.22706V5.75521C13.4164 6.12004 13.1374 6.39903 12.7725 6.39903ZM8.88821 5.1114H12.1287V1.87088H8.88821V5.1114Z"
                  fill="#8F9AA3"
                />
                <path
                  d="M12.7725 13.4165H8.2444C7.87957 13.4165 7.60059 13.1375 7.60059 12.7727V8.24452C7.60059 7.87969 7.87957 7.60071 8.2444 7.60071H12.7725C13.1374 7.60071 13.4164 7.87969 13.4164 8.24452V12.7727C13.4164 13.1375 13.1374 13.4165 12.7725 13.4165ZM8.88821 12.1289H12.1287V8.88833H8.88821V12.1289Z"
                  fill="#8F9AA3"
                />
              </svg>
            </div>
            <div class="icon-wrapper" :class="{ active: !isActive }" @click="toggleList">
              <svg
                width="14"
                height="10"
                viewBox="0 0 14 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.84495 9.66658H1.22467C0.861063 9.66658 0.583008 9.38042 0.583008 9.0062C0.583008 8.63199 0.861063 8.34583 1.22467 8.34583H1.84495C2.20856 8.34583 2.48662 8.63199 2.48662 9.0062C2.48662 9.38042 2.20856 9.66658 1.84495 9.66658Z"
                  fill="#1070B7"
                />
                <path
                  d="M1.84495 5.66023H1.22467C0.861063 5.66023 0.583008 5.37407 0.583008 4.99985C0.583008 4.62564 0.861063 4.33948 1.22467 4.33948H1.84495C2.20856 4.33948 2.48662 4.62564 2.48662 4.99985C2.48662 5.37407 2.20856 5.66023 1.84495 5.66023Z"
                  fill="#1070B7"
                />
                <path
                  d="M1.84495 1.65401H1.22467C0.861063 1.65401 0.583008 1.36784 0.583008 0.993629C0.583008 0.619415 0.861063 0.333252 1.22467 0.333252H1.84495C2.20856 0.333252 2.48662 0.619415 2.48662 0.993629C2.48662 1.36784 2.20856 1.65401 1.84495 1.65401Z"
                  fill="#1070B7"
                />
                <path
                  d="M4.26178 9.66658C3.89817 9.66658 3.62012 9.38042 3.62012 9.0062C3.62012 8.63199 3.89817 8.34583 4.26178 8.34583H12.7746C13.1382 8.34583 13.4162 8.63199 13.4162 9.0062C13.4162 9.38042 13.1382 9.66658 12.7746 9.66658H4.26178C4.28317 9.66658 4.28317 9.66658 4.26178 9.66658Z"
                  fill="#1070B7"
                />
                <path
                  d="M4.26178 5.66023C3.89817 5.66023 3.62012 5.37407 3.62012 4.99985C3.62012 4.62564 3.89817 4.33948 4.26178 4.33948H12.7746C13.1382 4.33948 13.4162 4.62564 13.4162 4.99985C13.4162 5.37407 13.1382 5.66023 12.7746 5.66023H4.26178C4.28317 5.66023 4.28317 5.66023 4.26178 5.66023Z"
                  fill="#1070B7"
                />
                <path
                  d="M4.26178 1.65401C3.89817 1.65401 3.62012 1.36784 3.62012 0.993629C3.62012 0.619415 3.89817 0.333252 4.26178 0.333252H12.7746C13.1382 0.333252 13.4162 0.619415 13.4162 0.993629C13.4162 1.36784 13.1382 1.65401 12.7746 1.65401H4.26178C4.28317 1.65401 4.28317 1.65401 4.26178 1.65401Z"
                  fill="#1070B7"
                />
              </svg>
            </div>
          </div>
        </div>
        <div class="records-count">
          <span>View by: </span>
          <select class="records-count">
            <option>100 Records</option>
          </select>
        </div>
      </div>
      <div>
        <b-button
          :variant="active === 'mine' ? 'primary' : 'secondary'"
          @click="
            $emit('filter', 'mine');
            active = 'mine';
          "
        >
          My Subject Exercises
        </b-button>
        <b-button
          :variant="active === 'class' ? 'primary' : 'secondary'"
          @click="
            $emit('filter', 'class');
            active = 'class';
          "
        >
          My Class Exercises
        </b-button>

        <!-- <b-button
          variant="primary"
          :variant="active === 'all' ? 'primary' : 'secondary'"
          @click="
            $emit('filter', 'all');
            active = 'all';
          "
        >
          All
        </b-button> -->
      </div>
      <div
        class="d-flex align-items-center justify-content-between justify-content-md-end flex-wrap mb-1 mb-md-0"
      >
        <div class="search-flex">
          <div class="search mr-2 mb-2">
            <span _ngcontent-ptc-c281="" class="input-icon mx-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                aria-hidden="true"
                focusable="false"
                width="1em"
                height="1em"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
                _ngcontent-ptc-c281=""
                data-icon="bx:bx-search"
                data-inline="false"
                class="iconify"
                style="transform: rotate(360deg)"
              >
                <path
                  d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396l1.414-1.414l-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8s3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6s-6-2.691-6-6s2.691-6 6-6z"
                  fill="currentColor"
                ></path></svg
            ></span>

            <input
              v-model="filter"
              type="text"
              placeholder="Search"
              class="ng-valid ng-dirty ng-touched"
              @input="slowSearch()"
            />
          </div>
        </div>
      </div>
    </div>
    <hr />
  </div>
</template>

<script>
import { debounce } from "lodash";

export default {
  props: {
    disableGrid: {
      type: Boolean,
      reuired: false,
      default: false,
    },
  },
  data() {
    return {
      active: "mine",
      isActive: false,
      filter: "",
    };
  },
  methods: {
    slowSearch: debounce(function () {
      this.$emit("searchAllItems", this.filter);
    }, 500),
    toggleGrid() {
      if (this.disableGrid === false) {
        this.isActive = true;
        this.$emit("grid");
      }
    },
    toggleList() {
      this.isActive = false;
      this.$emit("list");
    },
  },
};
</script>

<style scoped>
.search-flex[_ngcontent-ptc-c281] {
  display: flex;
}

.search-flex .search {
  position: relative;
  display: flex;
  align-items: center;
  /* min-width: 322px; */
  max-width: 100%;
  min-height: 36px;
  background: white;
  box-shadow: 0px 2px 10px rgba(169, 181, 192, 0.2);
  border-radius: 6px;
}

.search-flex .dropdown {
  color: #b4bec6;
  font-size: 14px;
  background: white;
  box-shadow: 0px 2px 10px rgba(169, 181, 192, 0.2);
  border-radius: 6px;
}

.search-flex .search[_ngcontent-ptc-c281] .input-icon[_ngcontent-ptc-c281] {
  color: #b4bec6;
}

.search-flex[_ngcontent-ptc-c281]
  .search[_ngcontent-ptc-c281]
  .filter-holder[_ngcontent-ptc-c281] {
  background: #e0e0e0;
  border-radius: 3px;
  color: #828282;
  font-size: 12px;
  min-width: 79px;
  height: 21px;
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}

.search-flex[_ngcontent-ptc-c281]
  .search[_ngcontent-ptc-c281]
  input[_ngcontent-ptc-c281] {
  background: white;
  border: none;
}

.search-flex[_ngcontent-ptc-c281] .dropdown[_ngcontent-ptc-c281] {
  color: #b4bec6;
  font-size: 14px;
  background: white;
  box-shadow: 0px 2px 10px rgba(169, 181, 192, 0.2);
  border-radius: 6px;
}
</style>
