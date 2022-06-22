<template>
  <div @click="handleMouseDown">
    <div class="">
      <div class="filter-wrapper mr-2">
        <div class="search-input student-filter-input mb-2">
          <div class="d-flex justify-content-end">
            <!-- <span
              class="iconify icon"
              data-inline="false"
              data-icon="carbon:search"
            ></span> -->
            <input
              id="search"
              type="text"
              class="form-control rounded-pill custom-width"
              placeholder="Search for Resource"
              style="cursor: pointer"
              @click="showCollaspe"
              @input="searchDebounced('name', $event.target.value)"
            />
          </div>
        </div>
        <b-collapse id="collapse-1" v-model="visible" class="w-100">
          <div
            id="element-id"
            class="mt-2 rounded p-2 w-100"
            :style="{ 'background-color': '#F5F6F7' }"
          >
            <div class="row w-100">
              <div class="col">
                <label for="name" class="ml-3 mb-0">Name</label>
                <input
                  type="text"
                  class="form-control rounded-pill collaspseInput"
                  placeholder=" Name"
                  @input="searchDebounced('name', $event.target.value)"
                />
              </div>
              <div class="col">
                <label for="name" class="ml-3 mb-0">Author</label>
                <input
                  type="text"
                  class="form-control rounded-pill collaspseInput"
                  placeholder="Author"
                  @input="searchDebounced('author', $event.target.value)"
                />
              </div>
              <div class="col">
                <label for="name" class="ml-3 mb-0">Description</label>
                <input
                  type="text"
                  class="form-control rounded-pill collaspseInput"
                  placeholder=" Description"
                  @input="searchDebounced('description', $event.target.value)"
                />
              </div>
              <div class="col">
                <label for="name" class="ml-3 mb-0">Publishers</label>
                <input
                  type="text"
                  class="form-control rounded-pill collaspseInput"
                  placeholder="Publishers"
                  @input="searchDebounced('publisher', $event.target.value)"
                />
              </div>
            </div>
          </div>
        </b-collapse>
      </div>
      <!-- library filter -->
      <!--
       
         <div class="d-flex align-items-center">
            <div class="font-family_brown fs-14 text-black">Sort by:</div>
            <div class="student-filter-input ml-2">
              <select class="form-control">
                <option>Newest to Oldest</option>
                <option>Newest to Oldest</option>
                <option>Newest to Oldest</option>
              </select>
            </div>
          </div>
          -->
    </div>
  </div>
</template>

<script>
import { debounce } from "lodash";

export default {
  props: {
    visibleProp: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      input: "",
      visible: this.visibleProp,
    };
  },
  methods: {
    handleMouseDown(ev) {
      let clickOutside = true;
      let el = ev.target;
      while (el.parentElement) {
        if (el.id === "element-id" || el.id === "search") clickOutside = false;
        el = el.parentElement;
      }
      if (clickOutside) {
        this.visible = false;

        // do whatever you wanna do if clicking outside
      }
    },
    showCollaspe() {
      this.visible = !this.visible;
      this.$emit("visible", this.visible);
    },

    searchDebounced: debounce(function (param, search) {
      this.$emit("search", param, search);
    }, 500),
  },
};
</script>

<style scoped>
.collaspseInput {
  display: inline-block;
}
.custom-width {
  max-width: 15rem;
}
</style>
