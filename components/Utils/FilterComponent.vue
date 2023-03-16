<template>
  <div class="card">
    <slot name="top"></slot>
    <div class="card-body">
      <div
        class="
          filter-wrapper
          d-flex
          flex-wrap
          align-items-end
          justify-content-between
        "
      >
        <div class="d-flex">
          <div v-if="dropdownFilter" class="pr-3">
            <b-dropdown no-caret id="dropdown-1" class="rounded-0">
              <template #button-content>
                <div class="col-md-2 text-14">Filter</div>
              </template>
              <!-- <b-dropdown-item @click="uncleared">Uncleared</b-dropdown-item>
              <b-dropdown-item @click="cleared">Cleared</b-dropdown-item> -->

              <b-dropdown-item
                v-for="(item, index) in dropDownOptions"
                :key="index"
              >
                <div class="text-capitalize" @click="$emit('dropdown', item)">
                  {{ item }}
                </div>
              </b-dropdown-item>
            </b-dropdown>
          </div>

          <slot name="beforeActions"></slot>
          <div
            class="
              d-flex
              align-items-center
              justify-content-between justify-content-md-start
              flex-wrap
              my-3 my-lg-0
            "
          >
            <div class="mr-2 w-100">
              <div v-if="!disableVisualization" class="display-toggle">
                <div
                  class="icon-wrapper"
                  :class="[visualization === 'grid' ? 'active' : '']"
                  @click="toggleVisualization()"
                >
                  <b-icon icon="grid"></b-icon>
                </div>
                <div
                  class="icon-wrapper"
                  :class="[visualization === 'list' ? 'active' : '']"
                  @click="toggleVisualization()"
                >
                  <b-icon icon="card-list"></b-icon>
                </div>
                <slot name="besidesFilterBy"></slot>
              </div>
            </div>

            <div v-if="!disablePagination" class="records-count">
              <span>View by: </span>
              <select
                class="records-count"
                @change="$emit('view-by', $event.target.value)"
              >
                <option
                  v-for="(option, optionIndex) in options"
                  :key="optionIndex"
                  :value="option"
                >
                  {{ option }} Records
                </option>
                <option value="9999">Infinite Records</option>
                <option value="" disabled selected>Default Records</option>
              </select>
            </div>
          </div>
        </div>
        <slot name="besidesViewBy"></slot>

        <div
          class="
            d-flex
            align-items-center
            justify-content-between justify-content-md-end
            flex-wrap
            mb-1 mb-md-0
          "
        >
          <div
            v-if="!disableSearch"
            class="
              search-input
              m-3
              d-flex
              align-items-center
              justify-content-end
            "
            style="width: 400px"
          >
            <span
              class="iconify icon"
              data-inline="false"
              data-icon="carbon:search"
            ></span>
            <v-select
              v-if="hasCategory"
              v-model="category"
              class="w-75 mr-3 text-grey text-14 p-auto"
              :options="categories"
              :placeholder="
                searchPlaceholder ? searchPlaceholder : 'Search by category'
              "
              multiple
              taggable
              label="search by category"
              :reduce="(option) => option"
            >
            </v-select>
            <input
              type="text"
              class="form-control w-50"
              :placeholder="
                searchPlaceholder ? searchPlaceholder : ' Search by Name'
              "
              @input="searchDebounced($event.target.value)"
            />

            <!-- <input
                type="text"
                class="form-control ml-3 w-100"
                :placeholder="
                  searchPlaceholder ? searchPlaceholder : ' Search by category'
                "
                @input="categorySearch($event.target.value)"
              /> -->
          </div>
          <div>
            <slot name="besideFilterButton"></slot>
            <!-- <button
              class="btn filters-btn"
              data-toggle-visibility="#filters-container"
            >
              <div class="d-flex align-items-center">
                <span>Filters</span>
                <span
                  class="iconify"
                  data-inline="false"
                  data-icon="fluent:filter-16-filled"
                ></span>
              </div>
            </button> -->
          </div>
          <div id="filters-container" class="filters-container d-none">
            <div
              class="filter-closer"
              data-toggle-visibility="#filters-container"
            >
              <span
                class="iconify"
                data-inline="false"
                data-icon="eva:close-outline"
              ></span>
            </div>

            <div class="filters-container-content">
              <div class="search-input mb-2">
                <span
                  class="iconify icon"
                  data-inline="false"
                  data-icon="carbon:search"
                ></span>
                <input
                  type="text"
                  class="form-control w-100"
                  placeholder="Search for class"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <slot
        v-if="!$store.state.auth.disablePage"
        :visualization="visualization"
      ></slot>
      <div v-else class="text-center m-auto mt-5">
        <font-awesome-icon
          icon="fas fa-lock"
          class="mb-4 text-primary"
          style="font-size: 60px"
        />
        <h3 class="text-capitalize">
          you don't have permission to view this information
        </h3>
        <p class="text-center paragraph-denied">
          You do not have permission to access this information. please contact
          your systems administrator.
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { debounce } from 'lodash'

import Vue from 'vue'

type visualize = 'grid' | 'list' | any

export default Vue.extend({
  props: {
    searchPlaceholder: {
      type: String,
      default: '',
    },
    hasCategory: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Array,
      default: () => [],
    },
    options: {
      type: Array,
      default: () => [25, 50, 100, 500],
    },
    disablePagination: {
      type: Boolean,
      default: false,
    },
    disableVisualization: {
      type: Boolean,
      default: false,
    },
    disableSearch: {
      type: Boolean,
      default: false,
    },
    busy: {
      type: Boolean,
      required: false,
    },

    visual: {
      type: String,
      default: 'list',
    },
    dropdownFilter: {
      type: Boolean,
      default: false,
    },
    filterComp: {
      type: Boolean,
      default: false,
    },
    dropDownOptions: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    const visualization: visualize = this.visual
    return {
      visualization,
      category: [],
      categories: [],
    }
  },
  watch: {
      items(newVal){
        const categories = newVal.map((el) => {
          return el.category.name
        })
        this.categories = [...new Set(categories)]
      },
      category(newVal){
        this.$emit('cat-search-input', newVal);
        console.log(newVal, 'newval')
      }
  },
 
  methods: {
    searchDebounced: debounce(function (this: any, search: string) {
      this.$emit('search-input', search)
    }, 500),
    toggleVisualization() {
      this.visualization =
        this.visualization === 'grid' ? 'list' : ('grid' as visualize)
      this.$emit('visualization', this.visualization)
    },
    uncleared() {
      this.$emit('uncleared')
      console.log('yay')
    },
    cleared() {
      this.$emit('cleared')
      console.log('yay')
    },
    all() {
      this.$emit('all')
      console.log('yay')
    },
  },
})
</script>

<style>
@media (max-width: 767px) {
  .form-control {
  }
}
</style>
